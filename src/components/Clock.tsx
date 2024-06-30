import { useState, useEffect } from 'react';

interface ClockObject {
  hours12: number;
  hours24: number;
  minutes: number;
  timeOfDay: string;
}

function getTime(): ClockObject {
  const time = new Date();
  const hours24 = time.getHours();
  const minutes = time.getMinutes();
  const timeOfDay = hours24 >= 12 ? 'PM' : 'AM';

  let hours12 = hours24;
  if (hours24 > 12) {
    hours12 = hours24 - 12;
  } else if (hours24 === 0) {
    hours12 = 12;
  }
  return { hours12, hours24, minutes, timeOfDay };
}

const Clock: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<ClockObject>(getTime());
  const [is24HourFormat, setIs24HourFormat] = useState<boolean>(false);

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setCurrentTime(getTime());
    }, 30000);

    return () => clearInterval(timeInterval);
  }, []);

  const toggleTimeFormat = () => {
    setIs24HourFormat((prevState) => !prevState);
  };

  const formatTime = (hours: number, minutes: number) => {
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${hours}:${formattedMinutes}`;
  };

  return (
    <div className="clock-container widget-container" onClick={toggleTimeFormat}>
      <div className="clock-wrapper">
        {!is24HourFormat && <p>{currentTime.timeOfDay}</p>}
        <p className="time">
          {formatTime(
            is24HourFormat ? currentTime.hours24 : currentTime.hours12,
            currentTime.minutes,
          )}
        </p>
      </div>
    </div>
  );
};

export { Clock };
