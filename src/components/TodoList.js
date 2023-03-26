import React from 'react';
import PropTypes from 'prop-types';

import TodoListItem from './TodoListItem';
import './TodoList.scss';

const TodoList = ({ todos, onRemove }) => {
  return (
    <div className="TodoList">
      {todos.map(todo => (
        <TodoListItem todo={todo} key={todo.id} onRemove={onRemove} />
      ))}
    </div>
  );
};

TodoList.propTypes = {
  todos: PropTypes.array,
  onRemove: PropTypes.func,
};

export default TodoList;
