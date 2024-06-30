interface DateObject {
  dayOfMonth: number;
  month: string;
}

function capitalizedMonth(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function getDate(): DateObject {
  const day = new Date();
  let month = day.toLocaleString('default', { month: 'long' });
  month = capitalizedMonth(month);
  const dayOfMonth = day.getDate();
  return { dayOfMonth, month };
}

const Calendar: React.FC = () => {
  const currentDate = getDate();
  return (
    <div className="calendar-container widget-container">
      <div className="date-wrapper">
        <p className="date">{currentDate.dayOfMonth}</p>
        <p className="month">{currentDate.month}</p>
      </div>
    </div>
  );
};

export { Calendar };
