import { useState, ChangeEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

interface Goal {
  id: number;
  goalName: string;
  checked: boolean;
}

const Todo: React.FC = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [newGoal, setNewGoal] = useState<string>('');

  const addGoal = () => {
    setGoals((currentGoals) => {
      const goal: Goal = {
        id: currentGoals.length + 1,
        goalName: newGoal,
        checked: false,
      };
      return [...goals, goal];
    });
    setNewGoal('');
  };

  const deleteGoal = (id: number) => {
    setGoals((currentGoals) => currentGoals.filter((goal) => goal.id !== id));
  };

  const toggleCheck = (id: number) => {
    setGoals(
      goals.map((goal) => (goal.id === id ? { ...goal, checked: !goal.checked } : goal)),
    );
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewGoal(e.target.value);
  };

  return (
    <div className="todo-container widget-container">
      <h3>Set today's goals</h3>
      <div className="input-wrapper">
        <input
          type="text"
          placeholder="New goal.."
          value={newGoal}
          onChange={handleInputChange}
        />
        <FontAwesomeIcon onClick={addGoal} icon={faPlus} className="add-button" />
      </div>
      <div className="goals-container">
        {goals.map((goal) => (
          <div key={goal.id}>
            <div className="list-item">
              <input
                type="checkbox"
                checked={goal.checked}
                onChange={() => toggleCheck(goal.id)}
              />
              <p className={goal.checked ? 'checked' : ''}> {goal.goalName} </p>

              <FontAwesomeIcon
                onClick={() => deleteGoal(goal.id)}
                icon={faTrash}
                className="delete-button"
              />
            </div>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export { Todo };
