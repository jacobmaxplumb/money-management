import { useEffect, useState } from "react";
import { TodoList } from "./components/TodoList";
import axios from "axios";

function App() {
	const [todos, setTodos] = useState([]);

	useEffect(() => {
		axios.get("http://localhost:8080/todos").then((res) => {
				setTodos(res.data);
			}).catch((err) => {
        console.log(err);
        setTodos([])
      });
	}, []);

	const addTodo = (text) => {
		setTodos([...todos, text]);
	};

	return (
		<>
			{todos.map((item) => (<div key={item.id}>{item.title}</div>))}
		</>
	);
}

export default App;
