import React from 'react';
import TrackList from './TrackList';
import styles from '../styles/PlaylistCard.module.css';


function Playlist({ playlistName, playlistTracks, onRemove, onSave, setPlaylistName }) {
    const handleFocus = (e) => {
        e.target.style.borderColor = 'white';
    };

    const handleBlur = (e) => {
        e.target.style.borderColor = '';
    };

    return (
        <div className={styles.playlist}>
            <input
                type="text"
                placeholder="Enter playlist name"
                className={styles.input}
                value={playlistName}
                onChange={(e) => setPlaylistName(e.target.value)}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
            <TrackList tracks={playlistTracks} onRemove={onRemove} isRemoval={true} />
            <button className={styles.button} onClick={onSave}>Save to Spotify</button>
        </div>
    );
}

export default Playlist;