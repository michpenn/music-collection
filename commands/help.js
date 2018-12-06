module.exports = () => {
  const usageText = `
      Music collection helps you manage your music library.
    
      usage:
        .bin/music <command>
    
        commands can be:
    
        add "Album Name" "Artist": used to add a new album
        play "Album Name": used to play an album
        show all: used to show all albums
        show played: used to show all played albums
        show all by "Artist": used to show all albums by an artist
        show unplayed by "Artist": used to show all unplayed albums by an artist
        help: used to print the usage guide
      `;

  console.log(usageText);
};
