import React from "react";
export const ListContext = React.createContext();

const initialState = {
  prev: null,
  flags: [],
};

export function accordionReducer(state, { type, index }) {
  switch (type) {
    case "toggle":
      if (
        state.prev !== index &&
        state.prev !== null &&
        state.flags[state.prev]
      ) {
        state.flags[state.prev] = false;
      }
      state.flags[index] = !state.flags[index];
      state.prev = index;
      return { ...state };

    default:
      throw new Error();
  }
}

export const ListProvider = ({ children }) => {
  const contextValue = React.useReducer(accordionReducer, initialState);
  return (
    <ListContext.Provider value={contextValue}>{children}</ListContext.Provider>
  );
};
export const useList = () => {
  const contextValue = React.useContext(ListContext);
  return contextValue;
};
