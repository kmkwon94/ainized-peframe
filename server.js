var http = require("http"),
  express = require("express"),
  Busboy = require("busboy"),
  path = require("path"),
  fs = require("fs");
const { PythonShell } = require("python-shell");

var app = express();
var repo_dir = "/ainized-peframe/peframe";

var fullUrl = "";

app.get("/", function(req, res) {
  fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
  console.log(fullUrl);
  res.writeHead(200, { "Content-Type": "text/html" });
  res.write(
    '<form action="' +
      fullUrl +
      'fileupload" method="post" enctype="multipart/form-data">'
  );
  res.write('<input type="file" name="filetoupload"><br>');
  res.write('<input type="submit">');
  res.write("</form>");
  return res.end();
});

app.post("/", async (req, res) => {
  console.log("input");
  console.log(i);
  console.log("start readfile");
  res.writeHead(200, { "Content-Type": "text/html" });
  res.write("<html><body>");
});

app.post("/readfile", function(req, res) {});

app.post("/fileupload", function(req, res) {
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

    const i = await runPython("/ainized-peframe/uploads/" + fn);
    res.redirect(307, fullUrl + "readfile");
  });

  req.pipe(busboy);
  console.log("end fileupload post");
});

app.listen(80, () => {
  console.log("server connect");
});

runPython = filename => {
  return new Promise((resolve, reject) => {
    PythonShell.run(
      repo_dir + "/peframecli.py",
      { args: [filename] },
      async (err, result) => {
        if (err) {
          if (err.traceback === undefined) {
            console.log(err.message);
          } else {
            console.log(err.traceback);
          }
        }
        console.log(filename);
        const inputdir = await result[result.length - 1];
        resolve(inputdir);
      }
    );
  });
};
