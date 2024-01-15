import { useState } from "react";

export const TodoList = (props) => {
	return (
		<div>
			{props.todos.map(
                (item, index) => (<div key={index}>{item}</div>)
            )}
            <button onClick={() => {props.addTodo('hello')}}>Add</button>
		</div>
	);
};
