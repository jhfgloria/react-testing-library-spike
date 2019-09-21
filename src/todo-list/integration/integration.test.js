import React from 'react';
import ConnectedTodoList from '../todo-list.jsx';
import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from "react-redux";
import { rootReducer } from '../../state';
import { createStore } from 'redux';

describe('Connected Todo-list component', () => {
  const providerWrapper = ({ children }) => {
    return (
      <Provider store={createStore(rootReducer)}>
        {children}
      </Provider>
    );
  };

  const customRender = () => render(<ConnectedTodoList />, { wrapper: providerWrapper });

  afterEach(cleanup);

  it('Renders initial empty list', () => {
    const { container } = customRender();
    expect(container.querySelector('section.task')).not.toBeInTheDocument();
  });

  describe('Adding todo', () => {
    it('Changes the list of todos', () => {
      const { getByPlaceholderText, getByText } = customRender();
      fireEvent.change(getByPlaceholderText('Introduce your task'), { target: { value: 'Buy milk' } });
      fireEvent.click(getByText('Add'));

      fireEvent.change(getByPlaceholderText('Introduce your task'), { target: { value: 'Buy eggs' } });
      fireEvent.click(getByText('Add'));

      fireEvent.change(getByPlaceholderText('Introduce your task'), { target: { value: '' } });

      expect(getByText('Buy milk')).toBeInTheDocument();
      expect(getByText('Buy eggs')).toBeInTheDocument();
    });
  });

  describe('Completing todo', () => {
    it('Moves todo to done', () => {
      const { getByPlaceholderText, getByText, container } = customRender();
      fireEvent.change(getByPlaceholderText('Introduce your task'), { target: { value: 'Buy milk' } });
      fireEvent.click(getByText('Add'));

      fireEvent.change(getByPlaceholderText('Introduce your task'), { target: { value: '' } });

      fireEvent.click(getByText('Buy milk'));
      expect(container.querySelector('section.todo.done')).toBeInTheDocument();
    });
  });
});