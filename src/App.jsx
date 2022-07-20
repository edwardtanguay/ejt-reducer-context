import './App.scss';
import { useContext } from 'react';
import { AppContext } from './AppContext';

function App() {
	const { state, dispatch } = useContext(AppContext);

	const handleButtonAdd = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	};
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
						<fieldset className="germanNoun" key={i}>
							<legend>ID: {gn.id}</legend>

							<div className="row">
								<label htmlFor="article">Article</label>
								<div className="value">{gn.article}</div>
							</div>

							<div className="row">
								<label htmlFor="singular">Singular</label>
								<div className="value">{gn.singular}</div>
							</div>

							<div className="row">
								<label htmlFor="plural">Plural</label>
								<div className="value">{gn.plural}</div>
							</div>
							<div className="buttonRow">
								<button>Edit</button>
								<button>Delete</button>
								<button onClick={handleButtonAdd}>Add</button>
							</div>
						</fieldset>
					);
				})}
			</div>
		</div>
	);
}

export default App;
