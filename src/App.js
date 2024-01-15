import { useEffect, useState } from "react";
import { TodoList } from "./components/TodoList";
import axios from "axios";
import * as yup from "yup";

const initialFormValues = {title: '', completed: false};
const initialErrors = {title: '', completed: ''};

const formSchema = yup.object().shape({
  title: yup.string().required('Title is required').min(3, 'Title must be at least 3 characters'),
  completed: yup.boolean().required('Completed is required')
});

function App() {
	const [todos, setTodos] = useState([]);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [disabled, setDisabled] = useState(true);
  const [errors, setErrors] = useState(initialErrors);

  const getData = () => {
    axios.get("http://localhost:8080/todos").then((res) => {
				setTodos(res.data);
			}).catch((err) => {
        console.log(err);
        setTodos([])
      });
  }

	useEffect(() => {
		getData();
	}, []);

  useEffect(() => {
    formSchema.isValid(formValues).then((valid) => {
      setDisabled(!valid);
    })
  }, [formValues])

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8080/todos', formValues).then((res) => {
      setTodos([...todos, res.data]);
      setFormValues(initialFormValues);
    }).catch((err) => {console.log(err)})
  }

  const handleChange = (e) => {
    const {name, value, checked, type} = e.target;
    const valueToUse = type === 'checkbox' ? checked : value;
    setFormValues({...formValues, [name]: valueToUse})

    yup.reach(formSchema, name).validate(valueToUse).then(() => {
      setErrors({...errors, [name]: ''})
    }).catch((err) => {
      setErrors({...errors, [name]: err.errors[0]})
    })
  }

	return (
		<>
      <form onSubmit={handleSubmit}>
        <input name="title" onChange={handleChange} value={formValues.title} />
        {errors.title && <div>{errors.title}</div>}
        <input name="completed" onChange={handleChange} checked={formValues.completed} type="checkbox" />
        <button disabled={disabled}>Submit</button>
      </form>
			{todos.map((item) => (<div key={item.id}>{item.title}</div>))}
		</>
	);
}

export default App;
