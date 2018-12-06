const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("db.json");
const db = low(adapter);

module.exports = (title, artist) => {
  db.get("library")
    .push({ title: title, artist: artist, played: false })
    .write();
  console.log(`Added "${title}" by "${artist}"`);
};
