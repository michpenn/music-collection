const minimist = require("minimist");
const chalk = require("chalk");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("db.json");
const db = low(adapter);

db.defaults({ library: [] }).write();

function errorLog(error) {
  const eLog = chalk.red(error);
  console.log(eLog);
}

function addAlbum(args) {
  if (args._.length !== 3) {
    errorLog("Incorrect number of arguments to add an album");
  } else if (checkLibraryForAlbumTitle(args._[1])) {
    errorLog("This album title already exists in the library!");
  } else {
    require("./commands/add")(args._[1], args._[2]);
  }
}

function checkLibraryForAlbumTitle(title) {
  return db
    .get("library")
    .find({ title: title })
    .value();
}

function playAlbum(title) {
  if (checkLibraryForAlbumTitle(title)) {
    require("./commands/play")(title);
  } else {
    errorLog(`The album ${title} is not in the library`);
  }
}

function showAll(args) {
  let lib;
  if (args._.length === 2) {
    lib = db.get("library").value();
  } else if (args._.length === 4 && args._[2] === "by") {
    lib = db
      .get("library")
      .filter({ artist: args._[3] })
      .value();
  } else {
    return errorLog("Your request is not in the library");
  }

  if (lib.length === 0) {
    return errorLog("Your request is not in the library");
  } else {
    lib.forEach(album => {
      console.log(
        `"${album.title}" by ${album.artist} (${
          album.played ? "played" : "unplayed"
        })`
      );
    });
  }
}

function showUnplayed(args) {
  let lib;
  if (args._.length === 2) {
    lib = db
      .get("library")
      .filter({ played: false })
      .value();
  } else if (args._.length === 4 && args._[2] === "by") {
    lib = db
      .get("library")
      .filter({ artist: args._[3], played: false })
      .value();
  } else {
    return errorLog("Your request is not in the library");
  }

  if (lib.length === 0) {
    return errorLog("Your request is not in the library");
  } else {
    lib.forEach(album => {
      console.log(`"${album.title}" by ${album.artist}`);
    });
  }
}

module.exports = () => {
  const args = minimist(process.argv.slice(2));
  const command = args._[0];

  switch (command) {
    case "add":
      addAlbum(args);
      break;
    case "play":
      playAlbum(args._[1]);
      break;
    case "show":
      if (args._[1] === "all") {
        showAll(args);
      } else if (args._[1] === "unplayed") {
        showUnplayed(args);
      } else {
        errorLog(`"${command}" is not a valid command!`);
      }
      break;
    case "quit":
      require("./commands/quit")();
      break;
    case "help":
      require("./commands/help")();
      break;
    default:
      if (process.argv[1].includes("/bin/music")) {
        require("./commands/welcome")();
      } else {
        errorLog(`"${command}" is not a valid command!`);
      }
      break;
  }
};
