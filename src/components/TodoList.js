import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { List } from 'react-virtualized';

import TodoListItem from './TodoListItem';
import './TodoList.scss';

const TodoList = ({ todos, onRemove, onToggle }) => {
  /**
   * react-virtualized의 List 컴포넌트에서 각 TodoItem을 렌더링 할 때 사용
   * index, key, style 값을 파라미터에 객체타입으로 받아와서 사용한다.
   */
  const rowRenderer = useCallback(
    ({ index, key, style }) => {
      const todo = todos[index];
      return (
        <TodoListItem
          todo={todo}
          key={key}
          onRemove={onRemove}
          onToggle={onToggle}
          style={style}
        />
      );
    },
    [onRemove, onToggle, todos],
  );

  return (
    // <div className="TodoList">
    //   {todos.map(todo => (
    //     <TodoListItem
    //       todo={todo}
    //       key={todo.id}
    //       onRemove={onRemove}
    //       onToggle={onToggle}
    //     />
    //   ))}
    // </div>
    <List
      className="TodoList"
      width={512} // 전체 너비
      height={342} // 전체 높이
      rowCount={todos.length} // 항목 개수
      rowHeight={57} // 항목 높이
      rowRenderer={rowRenderer} // 항목을 렌더링할 때 쓰는 함수
      list={todos} // 배열
      style={{ outline: 'none' }} // List에 기본 적용되는 outline 스타일 제거
    />
  );
};

TodoList.propTypes = {
  todos: PropTypes.array,
  onRemove: PropTypes.func,
  onToggle: PropTypes.func,
};

export default React.memo(TodoList);
