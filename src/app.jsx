import React from "react";
import TodoList from "./todo-list/todo-list.jsx";
import state from './state';
import { Provider } from "react-redux";

const App = () => {
  return (
    <Provider store={state}>
      <div>
        <TodoList />
      </div>
    </Provider>
  );
};

export default App;
