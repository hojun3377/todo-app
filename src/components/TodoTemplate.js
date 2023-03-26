import React from 'react';
import PropTypes from 'prop-types';

import './TodoTemplate.scss';

const TodoTemplate = ({ children }) => {
  return (
    <div className="TodoTemplate">
      <div className="app-title">일정관리</div>
      <div className="content">{children}</div>
    </div>
  );
};

TodoTemplate.propTypes = {
  children: PropTypes.element,
};

export default TodoTemplate;
