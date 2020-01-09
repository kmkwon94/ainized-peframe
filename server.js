var http = require("http"),
  express = require("express"),
  Busboy = require("busboy"),
  path = require("path"),
  fs = require("fs");
const { PythonShell } = require("python-shell");

var app = express();
var repo_dir = "/peframe/peframe";

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

app.post("/readfile", async (req, res) => {
  console.log(input);
  const { i, o } = await runPython(input);
  console.log(i, o);
  console.log("start readfile");
  res.writeHead(200, { "Content-Type": "text/html" });
  res.write("<html><body>");
});

app.post("/fileupload", function(req, res) {
  var fileuploaded = true;
  var busboy = new Busboy({ headers: req.headers });
  busboy.on("file", function(fieldname, file, filename, encoding, mimetype) {
    if (filename === "") {
      fileuploaded = false;
      console.log("here");
    }

    console.log(fieldname, filename);
    file.pipe(fs.createWriteStream(input));
  });

  busboy.on("finish", function() {
    console.log("Upload complete");
    if (!fileuploaded) {
      res.writeHead(400);
      res.end();
      return;
    }

    res.redirect(307, fullUrl + "readfile");
  });

  req.pipe(busboy);
  console.log("end fileupload post");
});

app.listen(80, () => {
  console.log("server connect");
});

runPython = input => {
  return new Promise((resolve, reject) => {
    PythonShell.run(
      repo_dir + "peframecli.py",
      { args: [input] },
      async (err, result) => {
        if (err) {
          if (err.traceback === undefined) {
            console.log(err.message);
          } else {
            console.log(err.traceback);
          }
        }
        console.log(input);
        const inputdir = await result[result.length - 1];
        resolve(inputdir);
      }
    );
  });
};
