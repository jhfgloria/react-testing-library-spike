import reducer from './reducer.js';

describe('Todos reducer', () => {
  it('Starts with initial state', () => {
    const store = reducer();
    expect(store.todos).toHaveLength(0);
    expect(store.todo).toEqual({ task: "" });
  });

  describe('todos.add', () => {
    it('Keeps state if store todo\'s task is empty', () => {
      const store = reducer();
      expect(reducer(store, { type: 'todos.add' })).toEqual(store);
    });

    it('Adds store\'s todo to store\' todos', () => {
      const store = reducer();
      store.todo = { task: "Buy eggs" };
      const newState = reducer(store, { type: 'todos.add' });
      expect(newState.todos[0]).toEqual({ task: "Buy eggs" });
    });
  });

  describe('todos.complete', () => {
    it('Sets todo to done', () => {
      const store = reducer();
      store.todos = [{ task: "Buy milk" }];
      const newState = reducer(store, { type: 'todos.complete', payload: { todo: { task: "Buy milk" } } });
      expect(newState.todos[0].isDone).toBe(true);
    });
  });

  describe('todos.change', () => {
    it('Sets stores\' todo', () => {
      const store = reducer();
      const newState = reducer(store, { type: 'todos.change', payload: { value: "Buy milk" } });
      expect(newState.todo).toEqual({ task: 'Buy milk' });
    });
  });
});