import { useState, useEffect } from 'react';

interface DateObject {
  date: number;
  month: string;
}

function capitalizedMonth(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function getDate(): DateObject {
  const day = new Date();
  let month = day.toLocaleString('default', { month: 'long' });
  month = capitalizedMonth(month);
  const date = day.getDate();
  return { date, month };
}

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<DateObject>({ date: 0, month: '' });

  useEffect(() => {
    setCurrentDate(getDate());
  }, []);

  return (
    <div className="calendar-container widget-container">
      <div className="date-wrapper">
        <p className="date">{currentDate.date}</p>
        <p className="month">{currentDate.month}</p>
      </div>
    </div>
  );
};

export default Calendar;
