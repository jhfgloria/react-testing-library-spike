import React from 'react';
import PropTypes from 'prop-types';
import Todo from './todo.jsx';
import { addTodo, changeTodo, completeTodo } from './state/actions.js';
import { useSelector, useDispatch } from 'react-redux';

const List = ({ todos, onCompleteTodo }) =>
  todos.map(todo =>
    <Todo key={`todo-${todo.task}`} task={todo.task} isDone={todo.isDone} onClick={onCompleteTodo} />
  );

const TodoList = ({ todos, onAddTodo = () => { }, onChangeTodo = () => { }, onCompleteTodo = () => { } }) => {
  const changeTodo = evt => {
    onChangeTodo(evt.target.value);
    evt.preventDefault();
  };

  const submitTodo = evt => {
    onAddTodo();
    evt.preventDefault();
  };

  return (
    <div>
      <h1>ToDos</h1>
      <List todos={todos} onCompleteTodo={onCompleteTodo} />

      <form onSubmit={submitTodo}>
        <label htmlFor="new-todo">New Todo:</label>
        <input placeholder="Introduce your task" onChange={changeTodo} id="new-todo" type="text"></input>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

const ConnectedTodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos.todos);
  const add = () => dispatch(addTodo());
  const change = value => dispatch(changeTodo(value));
  const complete = todo => dispatch(completeTodo(todo));

  return <TodoList todos={todos} onAddTodo={add} onChangeTodo={change} onCompleteTodo={complete} />;
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.exact({
    task: PropTypes.string.isRequired,
    isDone: PropTypes.bool,
  })).isRequired,
  onAddTodo: PropTypes.func,
};

export default ConnectedTodoList;
export { TodoList };
