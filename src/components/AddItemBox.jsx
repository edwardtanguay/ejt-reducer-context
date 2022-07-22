import { useContext } from 'react';
import { AppContext } from '../AppContext';

export const AddItemBox = () => {
	const { state, dispatch, actionManager } = useContext(AppContext);

	const item = {
		article: state.addItem.article,
		singular: state.addItem.singular,
		plural: state.addItem.plural,
	};

	return (
		<>
			{state.isAdding === true && (
				<fieldset className="germanNoun">
					<legend>ADD ITEM</legend>

					<div className="row">
						<label htmlFor="article">Article</label>
						<input
							id="article"
							value={item.article}
							onChange={(e) =>
								dispatch({
									type: 'changeAddItemProperty',
									payload: {
										itemType: 'germanNouns',
										property: 'article',
										id: item.id,
										value: e.target.value,
									},
								})
							}
						/>
					</div>

					<div className="row">
						<label htmlFor="singular">Singular</label>
						<input
							id="singular"
							value={item.singular}
							onChange={(e) =>
								dispatch({
									type: 'changeAddItemProperty',
									payload: {
										itemType: 'germanNouns',
										property: 'singular',
										id: item.id,
										value: e.target.value,
									},
								})
							}
						/>
					</div>

					<div className="row">
						<label htmlFor="plural">Plural</label>
						<input
							id="plural"
							value={item.plural}
							onChange={(e) =>
								dispatch({
									type: 'changeAddItemProperty',
									payload: {
										itemType: 'germanNouns',
										property: 'plural',
										id: item.id,
										value: e.target.value,
									},
								})
							}
						/>
					</div>

					<div className="buttonRow">
						<div className="message">{state.addMessage}</div>
						<div className="buttonArea">
							<button
								onClick={() =>
									dispatch({ type: 'clearAddingItem' })
								}
							>
								Clear
							</button>
							<button
								onClick={(e) =>
									actionManager({
										type: 'saveItemAdding',
										payload: {
											itemType: 'germanNouns',
											id: item.id,
											item: {
												article: item.article,
												singular: item.singular,
												plural: item.plural,
											},
										},
									})
								}
							>
								Save
							</button>
						</div>
					</div>
				</fieldset>
			)}
		</>
	);
};
