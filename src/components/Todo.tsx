import { useState, ChangeEvent } from 'react';

interface Goal {
  id: number;
  goalName: string;
  checked: boolean;
}

const Todo: React.FC = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [newGoal, setNewGoal] = useState<string>('');

  const addGoal = () => {
    const goal: Goal = {
      id: goals.length + 1,
      goalName: newGoal,
      checked: false,
    };
    setGoals([...goals, goal]);
    setNewGoal('');
  };

  const deleteGoal = (id: number) => {
    setGoals(goals.filter((goal) => goal.id !== id));
  };

  const checkGoal = (id: number) => {
    setGoals(
      goals.map((goal) => (goal.id === id ? { ...goal, checked: !goal.checked } : goal)),
    );
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewGoal(e.target.value);
  };

  return (
    <div className="todo-container widget-container">
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
