import React from 'react';
import styles from '../styles/Track.module.css';

function Track({ track, onAdd, onRemove, isRemoval }) {
    const handleAdd = () => {
        onAdd(track);
    };
    const handleRemove = () => {
        onRemove(track);
    };
    return (
        <div className={`${styles.info} ${styles.card} ${styles.grid}`}>
            <div>
                <h3>{track.name}</h3>
                <p>{track.artist} | {track.album}</p>
            </div>
            <button className={isRemoval ? styles.redButton : styles.button} onClick={isRemoval ? handleRemove : handleAdd}>
                {isRemoval ? "-" : "+"}
            </button>
        </div>
    );
}

export default Track;