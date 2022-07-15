import { createContext } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
	const count = 3;

	return (
		<AppContext.Provider value={{
			count
		}}>{children}</AppContext.Provider>
	)
}