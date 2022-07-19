import { createContext } from 'react';
import { useReducer } from 'react';

export const AppContext = createContext();

const initialState = {
	count: 0
};

function reducer(state, action) {
	let obj = {...state};
	switch (action) {
		case 'increaseCount':
			obj.count++;
			break;
		case 'decreaseCount':
			obj.count--;
			break;
	}
	return obj;
}

export const AppProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<AppContext.Provider value={{
			state,
			dispatch
		}}>{children}</AppContext.Provider>
	)
}