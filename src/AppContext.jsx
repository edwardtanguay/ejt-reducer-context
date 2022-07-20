import { useState, useEffect } from 'react';
import { createContext } from 'react';
import { useReducer } from 'react';
import axios from 'axios';
import { useThunkReducer } from 'react-hook-thunk-reducer';

export const AppContext = createContext();

const api_base_url = 'http://localhost:4555';

const initialState = {
	count: 0,
	germanNouns: [],
	germanNounForm: {
		article: 'aa',
		singular: 'ss',
		plural: 'pp',
	},
};

function reducer(state, action) {
	let itemType = '';
	let property = '';
	let id = 0;
	let value = '';
	let item = {};
	let message = '';

	let _state = { ...state };
	switch (action.type) {
		case 'increaseCount':
			_state.count++;
			break;
		case 'decreaseCount':
			_state.count--;
			break;
		case 'loadGermanNouns':
			_state.germanNouns = action.payload;
			break;
		case 'changeItemProperty':
			itemType = action.payload.itemType;
			property = action.payload.property;
			id = action.payload.id;
			value = action.payload.value;
			_state[itemType].find((m) => m.id === id)[property] = value;
			break;
		case 'toggleItemEditing':
			itemType = action.payload.itemType;
			id = action.payload.id;
			item = _state[itemType].find((m) => m.id === id);
			item.isEditing = !item.isEditing;
			item.message = 'Edit this item.';
			break;
		case 'clearItemEditing':
			itemType = action.payload.itemType;
			id = action.payload.id;
			item = _state[itemType].find((m) => m.id === id);
			item.isEditing = false;
			item.article = item.originalItem.article;
			item.singular = item.originalItem.singular;
			item.plural = item.originalItem.plural;
			item.message = 'Manage options:';
			break;
		case 'saveItemEditing':
			itemType = action.payload.itemType;
			id = action.payload.id;
			item = _state[itemType].find((m) => m.id === id);
			saveItem = { article, singular, plural } = item;
			item.isEditing = false;
			item.message = 'Manage options:';
			break;
		case 'toggleItemDeleting':
			itemType = action.payload.itemType;
			id = action.payload.id;
			item = _state[itemType].find((m) => m.id === id);
			item.isDeleting = !item.isDeleting;
			item.message = 'Are you sure you want to delete this item?';
			break;
		case 'clearItemDeleting':
			itemType = action.payload.itemType;
			id = action.payload.id;
			item = _state[itemType].find((m) => m.id === id);
			item.isDeleting = false;
			item.message = 'Manage options:';
			break;
		case 'deleteItem':
			itemType = action.payload.itemType;
			id = action.payload.id;
			_state[itemType] = _state[itemType].filter((m) => m.id !== id);
			state.germanNouns.pop();
			break;
		case 'displayItemMessage':
			itemType = action.payload.itemType;
			id = action.payload.id;
			item = _state[itemType].find((m) => m.id === id);
			message = action.payload.message;
			item.message = message;
			item.isDeleting = false;
			item.isEditing = false;
			break;
	}
	return _state;
}

export const AppProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		(async () => {
			const _germanNouns = (
				await axios.get(`${api_base_url}/germanNouns`)
			).data;
			_germanNouns.forEach((m) => {
				m.isEditing = false;
				m.isDeleting = false;
				m.message = 'Manage options:';
				m.originalItem = { ...m };
			});
			dispatch({ type: 'loadGermanNouns', payload: _germanNouns });
		})();
	}, []);

	const apiDeleteItem = async (action) => {
		// const response = axios.put(`${api_base_url}/${itemType}/${id}`, saveItem);
		const itemType = action.payload.itemType;
		const id = action.payload.id;
		try {
			const response = await axios.delete(
				`${api_base_url}/${itemType}/${id}`
			);
			if (response.status === 300) {
				dispatch(action);
			} else {
				dispatch({
					type: 'displayItemMessage',
					payload: {
						itemType,
						id,
						message: 'sorry, API had an error',
					},
				});
			}
		} catch (e) {
				dispatch({
					type: 'displayItemMessage',
					payload: {
						itemType,
						id,
						message: 'API IS NOT AVAILABLE, try again',
					},
				});
		}
	};

	return (
		<AppContext.Provider
			value={{
				state,
				dispatch,
				apiDeleteItem,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};
