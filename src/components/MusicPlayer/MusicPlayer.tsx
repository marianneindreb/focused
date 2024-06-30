import React, { useRef, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faAngleLeft, faAngleRight, faPause } from '@fortawesome/free-solid-svg-icons';
import { SongItem, chillHop } from './song-config';

interface SongInfo {
  currentTime: number;
  duration: number;
}

const MusicPlayer: React.FC = () => {
  const [songs] = useState<SongItem[]>(chillHop);
  const [currentSong, setCurrentSong] = useState<SongItem>(songs[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [songInfo, setSongInfo] = useState<SongInfo>({
    currentTime: 0,
    duration: 0,
  });

  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    setIsPlaying((prevState) => !prevState);
  };

  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  const timeUpdate: React.ReactEventHandler<HTMLAudioElement> = (e) => {
    const target = e.target as HTMLAudioElement;
    const current = target.currentTime;
    const duration = target.duration;
    setSongInfo({ ...songInfo, currentTime: current, duration });
  };

  const rangeHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (audioRef.current) {
      audioRef.current.currentTime = parseFloat(e.target.value);
      setSongInfo((info) => ({ ...info, currentTime: parseFloat(e.target.value) }));
    }
  };

  const skipTrackHandler = (direction: 'skip-forward' | 'skip-back') => {
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
        if (audioRef.current) {
          audioRef.current.play();
        }
      }, 100);
    }
  };

  const selectSong = (song: SongItem) => {
    setCurrentSong(song);
    if (isPlaying) {
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.play();
        }
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
            max={songInfo.duration}
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
            onClick={togglePlay}
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
            role="button"
            onClick={() => selectSong(song)}
            className={`library-song ${song.id === currentSong.id ? 'library-song-selected' : ''}`}
          />
        ))}
      </div>
    </div>
  );
};

export { MusicPlayer };
