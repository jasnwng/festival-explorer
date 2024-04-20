import apiService from "../services/ApiServices";

const playlist = {};

playlist.populate = async (lineUp, removedArtists, playlistURIs) => {
  for (let i = 0; i < lineUp.length; i++) {
    if (!removedArtists.includes(i)) {
      setTimeout(() => {
        apiService.getArtist(lineUp[i].name, (data) => {
          console.log(data);
          apiService.getArtistTracks(data.id, (data) => {
            data.forEach(track => playlistURIs.push(track.uri));
          });
        })
        // setPercentLoaded(i / (lineUp.length - 1));
      }, i * 200)
    }
  }
}
  
playlist.create = async (festival, playlistURIs) => {
  const userId = await apiService.getUserId();
  const playlistId = await apiService.createPlaylist(userId, festival.name, `${festival.name} 2024 playlist generated by Festify`);
  apiService.addTracksToPlaylist(playlistId, playlistURIs);
}


export default {playlist}