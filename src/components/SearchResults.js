import React from 'react';
import TrackList from './TrackList';

function SearchResults({ searchResults, onAdd }) {
    return (
        <div>
            <h2>Results</h2>
            <p>Click the + button to add song to your Playlist</p>
            <TrackList tracks={searchResults} onAdd={onAdd} isRemoval={false} />
        </div>
    );
}

export default SearchResults;