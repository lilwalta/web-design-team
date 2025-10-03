const http = require("http");
const url = require("url");
const fs = require("fs");
const path = require("path");

const db = require('./db');

const posts = db.prepare(`
  SELECT posts.id, title, content, name AS category, created_at
  FROM posts
  LEFT JOIN categories ON posts.category_id = categories.id
`).all();

console.log(posts);

const techPosts = db.prepare(`
  SELECT title, content
  FROM posts
  WHERE category_id = (SELECT id FROM categories WHERE name = ?)
`).all('Tech');

console.log(techPosts);




const publicDir = path.join(__dirname, "..", "public");

const routes = {
  "/": (_, res) => serveFile("index.html", res)
};

function serveFile(fileName, res) {
  const filePath = path.join(publicDir, fileName);
  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("404 Not Found");
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(content);
    }
  });
}

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const handler = routes[parsedUrl.pathname];

  if (handler) {
    handler(req, res);
  } else {
    const filePath = path.join(publicDir, parsedUrl.pathname);
    fs.readFile(filePath, (err, content) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("404 Not Found");
      } else {
        const ext = path.extname(filePath).toLowerCase();
        const types = {
          ".html": "text/html",
          ".css": "text/css",
          ".js": "application/javascript",
          ".json": "application/json",
          ".png": "image/png",
          ".jpg": "image/jpeg",
          ".jpeg": "image/jpeg",
          ".gif": "image/gif"
        };
        const contentType = types[ext] || "application/octet-stream";

        res.writeHead(200, { "Content-Type": contentType });
        res.end(content);
      }
    });
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
  console.log(`Serving files from: ${publicDir}`);
});

