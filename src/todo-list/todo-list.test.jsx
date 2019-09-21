import React from 'react';
import { TodoList } from './todo-list.jsx';
import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('Todo-list component', () => {
  afterEach(cleanup);

  it('Renders heading', () => {
    const { getByText } = render(<TodoList todos={[]} />);
    expect(getByText("ToDos")).toBeInTheDocument();
  });

  it('Renders the list of todos', () => {
    const todos = [
      { task: 'Buy milk' },
      { task: 'Buy eggs' },
    ];
    const { getByText } = render(<TodoList todos={todos} />);
    expect(getByText("Buy milk")).toBeInTheDocument();
    expect(getByText("Buy eggs")).toBeInTheDocument();
  });

  it('Renders a text input for todos', () => {
    const { getByLabelText, container } = render(<TodoList todos={[]} />);
    expect(getByLabelText("New Todo:")).toBeInTheDocument();
    expect(container.querySelector("input[type='text']")).toBeInTheDocument();
  });

  it('Renders a submit button', () => {
    const { getByText } = render(<TodoList todos={[]} />);
    expect(getByText("Add")).toBeInTheDocument();
  });

  describe('On changing todo', () => {
    it('Calls passed onChangeTodo callback', () => {
      const spy = { state: false, arg: null, f: function (arg) { this.arg = arg; this.state = true; } };
      const { getByPlaceholderText } = render(<TodoList todos={[]} onChangeTodo={spy.f.bind(spy)} />);
      fireEvent.change(getByPlaceholderText("Introduce your task"), { target: { value: "Buy eggs" } });
      expect(spy.state).toBe(true);
      expect(spy.arg).toEqual("Buy eggs");
    });
  });

  describe('Clicking add todo', () => {
    it('Calls passed onAddTodo callback', () => {
      const spy = { state: false, f: function () { this.state = true; } };
      const { getByText } = render(<TodoList todos={[]} onAddTodo={spy.f.bind(spy)} />);
      fireEvent.click(getByText("Add"));
      expect(spy.state).toBe(true);
    });
  });
});
