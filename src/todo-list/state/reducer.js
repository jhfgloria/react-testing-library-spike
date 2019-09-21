import { COMPLETE_TODO, ADD_TODO, CHANGE_TODO } from './actions.js';

const initialState = { todos: [], todo: { task: "" } };

const handler = {
  [COMPLETE_TODO]: function (state, action) {
    const todos = state.todos.map(t => t.task == action.payload.todo.task ? { ...t, isDone: true } : { ...t });
    return { ...state, todos: [...todos] };
  },
  [ADD_TODO]: function (state) {
    return state.todo.task.length ? { ...state, todos: [...state.todos, state.todo] } : state;
  },
  [CHANGE_TODO]: function (state, action) {
    return { ...state, todo: { task: action.payload.value } };
  },
};

export default function (state = initialState, action) {
  return handler[action?.type]?.(state, action) || state;
};
