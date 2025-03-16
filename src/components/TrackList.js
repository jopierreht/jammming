import React from 'react';
import Track from './Track';
import styles from '../styles/PlaylistCard.module.css';

function TrackList({ tracks = [], onAdd, onRemove, isRemoval }) {
    return (
        <div>
            {Array.isArray(tracks) ? tracks.map(track => (
                <Track
                    key={track.id}
                    track={track}
                    onAdd={onAdd}
                    onRemove={onRemove}
                    isRemoval={isRemoval}
                />
            )) : <p className={styles.description}>No tracks available.</p>}
        </div>
    );
}

export default TrackList;