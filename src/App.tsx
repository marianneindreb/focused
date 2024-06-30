import { MusicPlayer } from './components/MusicPlayer';
import { Todo } from './components/Todo';
import { Calendar } from './components/Calendar';
import { Clock } from './components/Clock';
import { PomodoroTimer } from './components/PomodoroTimer';
import { WeatherWidget } from './components/WeatherWidget';
import { WaterCounter } from './components/WaterCounter';
import { MotivationalQuote } from './components/MotivationalQuote';
import { ImageWidget } from './components/ImageWidget';
import './styles/app.scss';
import { DarkMode } from './components/DarkMode';

function App() {
  return (
    <div className="top-wrapper">
      <h1>
        What is your source of <strong>focus</strong> today?
      </h1>
      <DarkMode />
      <div className="app-container">
        <Todo />
        <Clock />

        <Calendar />
        <PomodoroTimer />

        <WaterCounter />
        <MotivationalQuote />
        <ImageWidget />

        <MusicPlayer />
        <WeatherWidget />
      </div>
    </div>
  );
}

export { App };
