import Todo from "./components/Todo";

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

const StyledContainer = styled.div`
  display: flex;
  padding: 20px;
  align-items: center;
  justify-content: space-between;
`;

export default App;
