import { useState, useEffect } from 'react';
import { createContext } from 'react';
import { useReducer } from 'react';
import axios from 'axios';

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
	let saveItem = {};

	let obj = { ...state };
	switch (action.type) {
		case 'increaseCount':
			obj.count++;
			break;
		case 'decreaseCount':
			obj.count--;
			break;
		case 'loadGermanNouns':
			obj.germanNouns = action.payload;
			break;
		case 'changeItemProperty':
			itemType = action.payload.itemType;
			property = action.payload.property;
			id = action.payload.id;
			value = action.payload.value;
			state[itemType].find((m) => m.id === id)[property] = value;
			break;
		case 'toggleItemEditing':
			itemType = action.payload.itemType;
			id = action.payload.id;
			item = state[itemType].find((m) => m.id === id);
			item.isEditing = !item.isEditing;
			item.manageMessage = 'Edit this item.'
			break;
		case 'clearItemEditing':
			itemType = action.payload.itemType;
			id = action.payload.id;
			item = state[itemType].find((m) => m.id === id);
			item.isEditing = false; 
			item.article = item.originalItem.article;
			item.singular = item.originalItem.singular;
			item.plural = item.originalItem.plural;
			item.manageMessage = 'Manage options:';
			break;
		case 'toggleItemDeleting':
			itemType = action.payload.itemType;
			id = action.payload.id;
			item = state[itemType].find((m) => m.id === id);
			item.isDeleting = !item.isDeleting;
			item.manageMessage = 'Are you sure you want to delete this item?'
			break;
		case 'clearItemDeleting':
			itemType = action.payload.itemType;
			id = action.payload.id;
			item = state[itemType].find((m) => m.id === id);
			item.isDeleting = false;
			item.manageMessage = 'Manage options:';
			break;
		case 'saveItemEditing':
			itemType = action.payload.itemType;
			id = action.payload.id;
			item = state[itemType].find((m) => m.id === id);
			saveItem = { article, singular, plural } = item;
			// const response = axios.put(`${api_base_url}/${itemType}/${id}`, saveItem);
			item.isEditing = false;
			item.manageMessage = 'Manage options:';

			break;
	}
	return obj;
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
				m.manageMessage = 'Manage options:';
				m.originalItem = { ...m }
			});
			dispatch({ type: 'loadGermanNouns', payload: _germanNouns });
		})();
	}, []);

	return (
		<AppContext.Provider
			value={{
				state,
				dispatch,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};
