import { useRef, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faAngleLeft, faAngleRight, faPause } from '@fortawesome/free-solid-svg-icons';
import chillHop from '../utils';

const MusicPlayer = () => {
  const [songs] = useState(chillHop());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
  });
  const audioRef = useRef(null);

  const playSong = () => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  const timeUpdate = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    setSongInfo({ ...songInfo, currentTime: current, duration });
  };

  const rangeHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };

  const skipTrackHandler = (direction) => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    if (direction === 'skip-forward') {
      setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    } else if (direction === 'skip-back') {
      if ((currentIndex - 1) % songs.length === -1) {
        setCurrentSong(songs[songs.length - 1]);
      } else {
        setCurrentSong(songs[(currentIndex - 1) % songs.length]);
      }
    }
    if (isPlaying) {
      setTimeout(() => {
        audioRef.current.play();
      }, 100);
    }
  };

  const selectSong = (song) => {
    setCurrentSong(song);
    if (isPlaying) {
      setTimeout(() => {
        audioRef.current.play();
      }, 100);
    }
  };

  return (
    <div className="player-container widget-container">
      <div className="song-container">
        <img alt={currentSong.name} src={currentSong.cover} />
        <h3>{currentSong.name}</h3>
      </div>

      <div className="player">
        <div className="time-control">
          <input
            type="range"
            min={0}
            onChange={rangeHandler}
            max={songInfo.duration || 0}
            value={songInfo.currentTime}
          />
        </div>
        <div className="play-control">
          <FontAwesomeIcon
            className="skip-back"
            size="2x"
            icon={faAngleLeft}
            onClick={() => skipTrackHandler('skip-back')}
          />
          <FontAwesomeIcon
            onClick={playSong}
            className="play"
            size="2x"
            icon={isPlaying ? faPause : faPlay}
          />
          <FontAwesomeIcon
            className="skip-forward"
            size="2x"
            icon={faAngleRight}
            onClick={() => skipTrackHandler('skip-forward')}
          />
        </div>
        <audio
          onTimeUpdate={timeUpdate}
          onLoadedMetadata={timeUpdate}
          ref={audioRef}
          src={currentSong.audio}></audio>
      </div>
      <div className="library-container">
        {songs.map((song) => (
          <img
            key={song.id}
            src={song.cover}
            alt={song.name}
            onClick={() => selectSong(song)}
            className={`library-song ${song.id === currentSong.id ? 'library-song-selected' : ''}`}
          />
        ))}
      </div>
    </div>
  );
};

export default MusicPlayer;
