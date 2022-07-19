import './App.scss';
import { useContext } from 'react';
import { AppContext } from './AppContext';

function App() {
	const { count, setCount } = useContext(AppContext);
	return (
		<div className="App">
			<h1>useContext / useReducer Site</h1>
			<div>count = {count}</div>
			<div className="buttonArea">
				<button
					className="decrease"
					onClick={() => setCount(count - 1)}
				>
					-
				</button>
				<button
					className="increase"
					onClick={() => setCount(count + 1)}
				>
					+
				</button>
			</div>
		</div>
	);
}

export default App;
