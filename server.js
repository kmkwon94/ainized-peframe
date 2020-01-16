var express = require("express"),
  Busboy = require("busboy"),
  fs = require("fs");
const { PythonShell } = require("python-shell");
const cors = require("cors");
function index(req, res) {
  res.writeHead(200, { "Content-Type": "text/html" }); //이 밑에 쓰인 content type을 text/html로 하겠다.
  res.write(
    '<form action="./fileupload" method="post" enctype="multipart/form-data">'
  );
  res.write('<input type="file" name="filetoupload"><br>');
  res.write('<input type="submit">');
  res.write("</form>");
  return res.end(); //응답 프로세스를 종료합니다.
}

function runPython(filename) {
  return new Promise((resolve, reject) => {
    PythonShell.run(
      "/ainized-peframe/peframe/peframecli.py",
      { args: ["-j", filename] },
      async (err, result) => {
        if (err) {
          if (err.traceback === undefined) {
            console.log(err.message);
          } else {
            console.log(err.traceback);
          }
          reject(err);
        } else {
          console.log("Now the result will be appeared");
          console.log(filename);
          const inputdir = await result; // [result.length - 1];
          resolve(inputdir);
        }
      }
    );
  });
}

function fileupload(req, res) {
  var fileuploaded = true;
  var busboy = new Busboy({ headers: req.headers });
  let fn = "";
  busboy.on("file", function(fieldname, file, filename, encoding, mimetype) {
    if (filename === "") {
      fileuploaded = false;
      console.log("here");
    }

    fn = filename;
    console.log(fieldname, filename);
    file.pipe(fs.createWriteStream("/ainized-peframe/uploads/" + filename));
  });

  busboy.on("finish", async function() {
    console.log("Upload complete");
    if (!fileuploaded) {
      res.writeHead(400);
      res.end();
      return;
    }

    const run_output = await runPython("/ainized-peframe/uploads/" + fn);
    /*run_output = [
      // 진짜 Python 프로그램의 stdout이 한줄한줄(String) Array로 들어옴.
      "{",
      '    "id": null,',
      "}"
    ];*/
    const json_output = run_output.join("\n"); // 하나의 String으로 합침.
    const json_values = JSON.parse(json_output); // JSON으로 만듬.
    //res.writeHead(200, { "Content-Type": "application/json" }); //?
    //res.write(json_output).end();
    res.json(json_values).end();
  });

  req.pipe(busboy);
  console.log("end fileupload post");
}

var app = express();
app.use(cors({ origin: "https://ainize.ai" }));
app.post("/", index);
app.post("/fileupload", fileupload);

app.listen(80, () => {
  console.log("server connect");
});
