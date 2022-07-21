import './App.scss';
import { useContext } from 'react';
import { AppContext } from './AppContext';

function App() {
	const { state, dispatch, actionManager } = useContext(AppContext);

	const handleButtonAdd = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
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
				{state.germanNouns.map((item, i) => {
					return (
						<fieldset className="germanNoun" key={i}>
							<legend>ID: {item.id}</legend>

							<div className="row">
								<label htmlFor="article">Article</label>
								{item.isEditing ? (
									<input
										id="article"
										value={item.article}
										onChange={(e) =>
											dispatch({
												type: 'changeItemProperty',
												payload: {
													itemType: 'germanNouns',
													property: 'article',
													id: item.id,
													value: e.target.value,
												},
											})
										}
									/>
								) : (
									<div className="value">{item.article}</div>
								)}
							</div>

							<div className="row">
								<label htmlFor="singular">Singular</label>
								{item.isEditing ? (
									<input
										id="singular"
										value={item.singular}
										onChange={(e) =>
											dispatch({
												type: 'changeItemProperty',
												payload: {
													itemType: 'germanNouns',
													property: 'singular',
													id: item.id,
													value: e.target.value,
												},
											})
										}
									/>
								) : (
									<div className="value">{item.singular}</div>
								)}
							</div>

							<div className="row">
								<label htmlFor="plural">Plural</label>
								{item.isEditing ? (
									<input
										id="plural"
										value={item.plural}
										onChange={(e) =>
											dispatch({
												type: 'changeItemProperty',
												payload: {
													itemType: 'germanNouns',
													property: 'plural',
													id: item.id,
													value: e.target.value,
												},
											})
										}
									/>
								) : (
									<div className="value">{item.plural}</div>
								)}
							</div>
							<div className="buttonRow">
								<div className="message">
									{item.message}
								</div>
								<div className="buttonArea">
									{!item.isEditing && !item.isDeleting && (
										<>
											<button
												onClick={(e) =>
													dispatch({
														type: 'toggleItemEditing',
														payload: {
															itemType:
																'germanNouns',
															id: item.id,
														},
													})
												}
											>
												Edit
											</button>
											<button
												onClick={(e) =>
													dispatch({
														type: 'toggleItemDeleting',
														payload: {
															itemType:
																'germanNouns',
															id: item.id,
														},
													})
												}
											>
												Delete
											</button>
											<button onClick={handleButtonAdd}>
												Add
											</button>
										</>
									)}
									{item.isEditing && (
										<>
											<button
												onClick={(e) =>
													dispatch({
														type: 'clearItemEditing',
														payload: {
															itemType:
																'germanNouns',
															id: item.id,
														},
													})
												}
											>
												Clear
											</button>
											<button
												onClick={(e) =>
													dispatch({
														type: 'saveItemEditing',
														payload: {
															itemType:
																'germanNouns',
															id: item.id,
														},
													})
												}
											>
												Save
											</button>
										</>
									)}
									{item.isDeleting && (
										<>
											<button
												onClick={(e) =>
													actionManager({
														type: 'deleteItem',
														payload: {
															itemType:
																'germanNouns',
															id: item.id,
														},
													})
												}
											>
												Yes, delete it.
											</button>
											<button
												onClick={(e) =>
													dispatch({
														type: 'clearItemDeleting',
														payload: {
															itemType:
																'germanNouns',
															id: item.id,
														},
													})
												}
											>
												No, do not delete it.
											</button>
										</>
									)}
								</div>
							</div>
						</fieldset>
					);
				})}
			</div>
		</div>
	);
}

export default App;
