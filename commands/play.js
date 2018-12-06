const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("db.json");
const db = low(adapter);

module.exports = title => {
  db.get("library")
    .find({ title: title })
    .assign({ played: true })
    .write();
  console.log(`You're listening to "${title}"`);
};
