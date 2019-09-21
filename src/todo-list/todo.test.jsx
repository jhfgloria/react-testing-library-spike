import React from 'react';
import Todo from './todo.jsx';
import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('Todo component', () => {
  afterEach(cleanup);

  it('Renders task text', () => {
    const { getByText } = render(<Todo task="Buy milk" />);
    expect(getByText("Buy milk")).toBeInTheDocument();
  });

  it('Renders undone task', () => {
    const { container } = render(<Todo task="Buy milk" />);
    expect(container.querySelector("section.done")).not.toBeInTheDocument();
  });

  it('Renders done task', () => {
    const { container } = render(<Todo task="Buy milk" isDone />);
    expect(container.querySelector("section.done")).toBeInTheDocument();
  });

  describe('On clicking', () => {
    it('Calls onClick prop', () => {
      const spy = { state: false, arg: null, f: function (arg) { this.arg = arg; this.state = true; } };
      const { container } = render(<Todo task="Buy milk" onClick={spy.f.bind(spy)} />);
      fireEvent.click(container.querySelector("section"));
      expect(spy.state).toBe(true);
      expect(spy.arg).toEqual({ task: "Buy milk", isDone: false });
    });
  });
});
