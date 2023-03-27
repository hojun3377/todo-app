// import React, { useState, useRef, useCallback } from 'react';
import React, { useReducer, useRef, useCallback } from 'react';

import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';

/**
 * 최적화 예제를 실행하기 위해 todo를 2500개 만드는 함수
 * @returns
 */
function createBulkTodos() {
  const array = [];
  for (let i = 1; i <= 2500; i++) {
    array.push({
      id: i,
      text: `할 일 ${i}`,
      checked: false,
    });
  }

  return array;
}

/**
 * useReducer를 이용한 최적하 예제를 실행하기 위한 reducer 함수
 * @param {Array} todos
 * @param {Object} action
 * @returns
 */
function todoReducer(todos, action) {
  switch (action.type) {
    case 'INSERT':
      return todos.concat(action.todos);
    case 'REMOVE':
      return todos.map(todo => todo.id !== action.id);
    case 'TOGGLE':
      return todos.map(todo =>
        todo.id === action.id ? { ...todo, checked: !todo.checked } : todo,
      );
    default:
      return todos;
  }
}

function App() {
  /*
   * 최적화 전
   */
  // const [todos, setTodos] = useState([
  //   { id: 1, text: '리액트의 기초 알아보기', checked: true },
  //   { id: 2, text: '컴포넌트 스타일링 해보기', checked: true },
  //   { id: 3, text: '일정 관리 앱 만들어보기', checked: false },
  // ]);

  /*
   * 최적화 ( useState의 함수형 업데이트 )
   */
  // const [todos, setTodos] = useState(createBulkTodos);

  /*
   * 최적화 ( useReducer)
   * 초기 렌더링(mount) 될 때만 createBulkTodos를 실행하기 위해 초기 값을 undefined로 설정하고
   * 3번째 파라미터에 초기 값을 생성하는 함수인 createBulkTodos를 넣어준다.
   */
  const [todos, dispatch] = useReducer(todoReducer, undefined, createBulkTodos);

  // const nextId = useRef(4);
  const nextId = useRef(2501);

  /**
   * 최적화 전
   * todoListItem 하나만 변화해도 함수를 새로 생성하기 때문에
   * 변화하지 않은 todoListItem들의 props가 변경되어
   *  리렌더링이 불필요한 요소들도 리렌더링되어 느려진다.
   */
  // const onInsert = useCallback(
  //   text => {
  //     const todo = {
  //       id: nextId.current,
  //       text,
  //       checekd: false,
  //     };

  //     setTodos(todos.concat(todo));
  //     nextId.current += 1;
  //   },
  //   [todos],
  // );

  // const onRemove = useCallback(
  //   id => {
  //     setTodos(todos.filter(todo => todo.id !== id));
  //   },
  //   [todos],
  // );

  // const onToggle = useCallback(
  //   id => {
  //     setTodos(
  //       todos.map(todo =>
  //         todo.id === id ? { ...todo, checked: !todo.checked } : todo,
  //       ),
  //     );
  //   },
  //   [todos],
  // );

  /**
   * 최적화 후
   */
  const onInsert = useCallback(text => {
    const todo = {
      id: nextId.current,
      text,
      checekd: false,
    };

    // setTodos(todos => todos.concat(todo));
    dispatch({ type: 'INSERT', todo });

    nextId.current += 1;
  }, []);

  const onRemove = useCallback(id => {
    // setTodos(todos => todos.filter(todo => todo.id !== id));
    dispatch({ type: 'REMOVE', id });
  }, []);

  const onToggle = useCallback(id => {
    // setTodos(todos =>
    //   todos.map(todo =>
    //     todo.id === id ? { ...todo, checked: !todo.checked } : todo,
    //   ),
    // );
    dispatch({ type: 'TOGGLE', id });
  }, []);

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
    </TodoTemplate>
  );
}

export default App;
