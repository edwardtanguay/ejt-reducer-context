import './App.scss';
import { useContext } from 'react';
import { AppContext } from './AppContext';

function App() {
	const { state, dispatch } = useContext(AppContext);
	return (
		<div className="App">
			<h1>useContext / useReducer Site</h1>

			<h2>Count</h2>
			<div className="countArea">
				<button
					className="decrease"
					onClick={() => dispatch({ type: 'decreaseCount' })}
				>
					-
				</button>
				<button
					className="increase"
					onClick={() => dispatch({ type: 'increaseCount' })}
				>
					+
				</button>
				<div className="count">{state.count}</div>
			</div>

			<h2>Items from API</h2>
			<div className="germanNounArea">
				{state.germanNouns.map((gn, i) => {
					return (
						<div className="germanNoun" key={i}>
							{gn.singular}
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default App;
