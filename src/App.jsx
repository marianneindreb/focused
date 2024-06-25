import Todo from "./components/Todo";
import styled from "styled-components";

function App() {
  return (
    <>
      <h1>
        What is your source of <strong>focus</strong> today?
      </h1>
      <StyledContainer>
        <Todo />
      </StyledContainer>
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
