import './App.scss';
import { useContext } from 'react';
import { AppContext } from './AppContext';

function App() {
	const { state, dispatch } = useContext(AppContext);
	return (
		<div className="App">
			<h1>useContext / useReducer Site</h1>
			<div>count = {state.count}</div>
			<div className="buttonArea">
				<button
					className="decrease"
					onClick={() => dispatch('decreaseCount')}
				>
					-
				</button>
				<button
					className="increase"
					onClick={() => dispatch('increaseCount')}
				>
					+
				</button>
			</div>
		</div>
	);
}

export default App;
