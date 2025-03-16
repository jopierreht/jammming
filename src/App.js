import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";
import Playlist from "./components/Playlist";
import Spotify from "./components/Spotify";
import "./index.css"; // Import the CSS file for styling

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState("");
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [hasSearched, setHasSearched] = useState(false); // Track if user has searched
  const [playlistVisible, setPlaylistVisible] = useState(false); // Track if playlist is visible
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Handle song search
  const search = (term) => {
    if (!hasSearched) setHasSearched(true); // Show results when first search occurs
    Spotify.searchItem(term).then((results) => {
      setSearchResults(results);
    });
  };

  // Add track to playlist and remove from search results
  const addTrack = (track) => {
    if (!playlistVisible) setPlaylistVisible(true); // Show playlist section on first track added
    setPlaylistTracks((prevTracks) =>
      prevTracks.some((t) => t.id === track.id) ? prevTracks : [...prevTracks, track]
    );
    setSearchResults((prevResults) => prevResults.filter((t) => t.id !== track.id)); // Remove from search results
  };

  // Remove track from playlist and return to search results
  const removeTrack = (track) => {
    setPlaylistTracks((prevTracks) => {
      const updatedTracks = prevTracks.filter((t) => t.id !== track.id);
      if (updatedTracks.length === 0) setPlaylistVisible(false); // Hide if empty
      return updatedTracks;
    });
    setSearchResults((prevResults) => [...prevResults, track]); // Add back to search results
  };

  const savePlaylist = () => {
    if (!playlistName.trim()) { // Ensuring no empty spaces
      setErrorMessage("Please enter the name of the playlist.");
      setSuccessMessage(""); // Clear success message
      return;
    }
    if (playlistTracks.length === 0) {
      setErrorMessage("Please add tracks to the playlist.");
      setSuccessMessage(""); // Clear success message
      return;
    }
  
    setErrorMessage(""); // Clear errors
    const trackUris = playlistTracks.map((track) => track.uri);
  
    Spotify.savePlaylist(playlistName, trackUris).then(() => {
      setPlaylistTracks([]); // Clear playlist
      setPlaylistVisible(false); // Hide playlist section
      setPlaylistName(""); // Reset name input
      setSuccessMessage(`Your playlist "${playlistName}" has been added to Spotify!`);
    });
  };

  return (
    <div className={`app-container ${hasSearched ? "top-layout" : "center-layout"}`}>

      {/* Search Section */}
      <div className="search-container">
        <h1 className="title">muzra</h1>
        <h2 className="subtitle">Search for your favorite songs and create a playlist</h2>
        <SearchBar onSearch={search} />
      </div>

      {/* Search Results & Playlist Section */}
      {hasSearched && (
        <div className="content">
          <div>
            <SearchResults searchResults={searchResults} onAdd={addTrack} />
            {searchResults.length === 0 && <p className="no-results">No results found, try searching something else!</p>}
          </div>
          <div>
            {playlistVisible && (
              <Playlist
                playlistName={playlistName}
                playlistTracks={playlistTracks}
                onRemove={removeTrack}
                onSave={savePlaylist}
                setPlaylistName={setPlaylistName}
              />
            )}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;