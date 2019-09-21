import React from 'react';
import PropTypes from 'prop-types';
import './todo.css';

const todoStyle = isDone => isDone ? 'todo done' : 'todo';

const Todo = ({ task, isDone = false, onClick = () => { } }) => {
  const click = evt => {
    onClick({ task, isDone });
    evt.preventDefault();
  };

  return (
    <section className={todoStyle(isDone)} onClick={click}>
      <h1>{task}</h1>
    </section>
  );
};

Todo.propTypes = {
  task: PropTypes.string.isRequired,
  isDone: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Todo;
