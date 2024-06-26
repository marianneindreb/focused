import Todo from './components/Todo';
import './styles/app.scss';

function App() {
  return (
    <>
      <h1>
        What is your source of <strong>focus</strong> today?
      </h1>
      <div>
        <Todo />
      </div>
    </>
  );
}

export default App;
