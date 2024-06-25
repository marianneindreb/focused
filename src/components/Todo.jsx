import { useState } from 'react';

const hey = '';

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
    <div>
      <h3>Set todays goals!</h3>
      <div>
        <input
          type="text"
          placeholder="New goal.."
          value={newGoal}
          onChange={handleInputChange}
        />
        <button onClick={addGoal}>+</button>
      </div>
      <div className="list">
        {goals.map((goal) => (
          <div key={goal.id}>
            <div>
              <input
                type="checkbox"
                checked={goal.checked}
                onChange={() => checkGoal(goal.id)}
              />
              <p>{goal.goalName}</p>
              <button onClick={() => deleteGoal(goal.id)}>X</button>
            </div>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

const StyledContainer = styled.div`
  border-radius: 5px;
  border: 1px solid black;
  width: 350px;
  height: 500px;
  padding: 10px;
  margin: 0 10px;
`;

const StyledGoal = styled.div`
  display: flex;
  align-items: center;

  button {
    background-color: transparent;
    border: 1px solid white;
    border-radius: 5px;
    width: 30px;
    height: 30px;
    margin-left: 10px;
  }
`;

const StyledGoalName = styled.p`
  margin: 0 10px;
  flex-grow: 1;
  opacity: ${({ checked }) => (checked ? 0.5 : 1)};
  text-decoration: ${({ checked }) => (checked ? 'line-through' : 'none')};
`;

const StyledInput = styled.div`
  input {
    padding: 10px;
    width: 75%;
    margin: 0 5px 20px 0;
  }
  button {
    background-color: transparent;
    border: 1px solid black;
    border-radius: 5px;
    width: 40px;
    height: 40px;
  }
`;

export default Todo;
