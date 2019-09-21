export const COMPLETE_TODO = "todos.complete";
export const ADD_TODO = "todos.add";
export const CHANGE_TODO = "todos.change";

export const changeTodo = value => ({
  type: CHANGE_TODO,
  payload: { value },
});

export const completeTodo = todo => ({
  type: COMPLETE_TODO,
  payload: { todo },
});

export const addTodo = () => ({
  type: ADD_TODO,
});