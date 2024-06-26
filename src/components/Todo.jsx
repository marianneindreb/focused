import { useState } from 'react';

const Todo = () => {
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState('');

  const addGoal = () => {
    const goal = {
      id: goals.length + 1,
      goalName: newGoal,
      checked: false,
    };
    setGoals([...goals, goal]);
    setNewGoal('');
  };

  const deleteGoal = (id) => {
    setGoals(goals.filter((goal) => goal.id !== id));
  };

  const checkGoal = (id) => {
    setGoals(
      goals.map((goal) => (goal.id === id ? { ...goal, checked: !goal.checked } : goal)),
    );
  };

  const handleInputChange = (e) => {
    setNewGoal(e.target.value);
  };

  return (
    <div className="container">
      <h3>Set todays goals</h3>
      <div className="input-container">
        <input
          type="text"
          placeholder="New goal.."
          value={newGoal}
          onChange={handleInputChange}
        />
        <button onClick={addGoal}>+</button>
      </div>
      <div className="goals-container">
        {goals.map((goal) => (
          <div key={goal.id}>
            <div className="list-item">
              <input
                type="checkbox"
                checked={goal.checked}
                onChange={() => checkGoal(goal.id)}
              />
              <p className={goal.checked ? 'checked' : ''}> {goal.goalName} </p>
              <button onClick={() => deleteGoal(goal.id)}>X</button>
            </div>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Todo;
