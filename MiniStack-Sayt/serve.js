// Oddiy statik server (mahalliy ko'rish uchun): node serve.js [port]
const http = require("http"), fs = require("fs"), path = require("path");
const root = __dirname, port = +process.argv[2] || 5173;
const types = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".png": "image/png", ".apk": "application/vnd.android.package-archive", ".zip": "application/zip", ".json": "application/json", ".svg": "image/svg+xml" };
http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split("?")[0]);
  if (p.endsWith("/")) p += "index.html";
  const file = path.join(root, path.normalize(p));
  if (!file.startsWith(root)) { res.writeHead(403); return res.end(); }
  fs.stat(file, (err, st) => {
    if (err || !st.isFile()) { res.writeHead(404); return res.end("404"); }
    res.writeHead(200, { "Content-Type": types[path.extname(file)] || "application/octet-stream", "Content-Length": st.size });
    fs.createReadStream(file).pipe(res);
  });
}).listen(port, () => console.log("MiniStack sayti: http://localhost:" + port));
