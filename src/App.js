import { useState } from 'react';
import { TodoList } from './components/TodoList';

function App() {
  const [todos, setTodos] = useState([]);
  console.log(todos);
  
  const addTodo = (text) => {
    setTodos([...todos, text])
  }

  return (
    <>
      <TodoList todos={todos} addTodo={addTodo} />
    </>
  );
}

export default App;
