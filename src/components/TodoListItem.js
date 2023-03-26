import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import {
  MdCheckBoxOutlineBlank,
  MdCheckBox,
  MdRemoveCircleOutline,
} from 'react-icons/md';

import './TodoListItem.scss';

const TodoListItem = ({ todo, onRemove }) => {
  const { id, text, checked } = todo;

  const onClick = () => onRemove(id);

  return (
    <div className="TodoListItem">
      <div className={cn('checkbox', { checked })}>
        {checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
        <div className="text">{text}</div>
      </div>
      <div className="remove" onClick={onClick}>
        <MdRemoveCircleOutline />
      </div>
    </div>
  );
};

TodoListItem.propTypes = {
  todo: PropTypes.object,
  onRemove: PropTypes.func,
};

export default TodoListItem;
