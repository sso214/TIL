---
title : TodoList Test   
date : 2022.12.21
---

# TodoList Test 코드 작성

## Recap
TodoList를 활용한 간단한 테스트 코드 예시

## TodoList 구성
간단한 TodoList 구현하고 테스트 코드를 작성해보았다.   
TodoList는 TodoAddForm, TodoHeader, TodoItem 컴포넌트로 구성되어있으며,  
index.tsx에서 해당 컴포넌트들을 조합했다.

#### TodoAddForm.tsx
```tsx
import { ChangeEvent, FormEvent, useState } from 'react';
import { v4 as uuid } from 'uuid';
import type { ITodo } from '../../pages';
import * as S from './styles';

interface Props {
  addTodo: (todo: ITodo) => void;
}

const TodoAddForm = ({ addTodo }: Props) => {
  const [addTask, setAddTask] = useState('');

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => setAddTask(e.target.value);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (addTask) {
      addTodo({ idx: uuid(), task: addTask, completed: false });
      setAddTask('');
    }
  };

  return (
    <S.AddTodoForm>
      <form onSubmit={handleSubmit}>
        <input data-testid='addInput' type='text' value={addTask} onChange={handleInput} placeholder='New Todo' />
        <button data-testid='addButton'>Add Todo</button>
      </form>
    </S.AddTodoForm>
  );
};

export default TodoAddForm;
```

#### TodoHeader.tsx
```tsx
import * as S from './styles';

interface Props {
  totalNumber: number;
  completedTotalNumber: number;
}

const TodoHeader = ({ totalNumber, completedTotalNumber }: Props) => {
  return (
    <S.TodoHeader>
      <h1 data-testid='title'>Todo App</h1>
      <p data-testid='count'>
        총 {totalNumber}개 중 {completedTotalNumber}개 완료
      </p>
    </S.TodoHeader>
  );
};

export default TodoHeader;
```

#### TodoItem.tsx
```tsx
import { ChangeEvent, FormEvent, useState } from 'react';
import type { ITodo } from '../../pages';
import * as S from './styles';

interface Props {
  data: ITodo;
  toggleTodo: (idx: ITodo['idx']) => void;
  updateTodo: (idx: ITodo['idx'], task: ITodo['task']) => void;
  deleteTodo: (idx: ITodo['idx']) => void;
}
const TodoItem = ({ data: { idx, task, completed }, toggleTodo, updateTodo, deleteTodo }: Props) => {
  const [isEdit, setIsEdit] = useState(false);
  const [updateTask, setUpdateTask] = useState(task);

  const handleUpdateTask = (e: ChangeEvent<HTMLInputElement>) => setUpdateTask(e.target.value);
  const handleEditStatus = () => setIsEdit(!isEdit);
  const handleToggle = () => toggleTodo(idx);
  const handleRemove = () => deleteTodo(idx);
  const handleUpdate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    updateTodo(idx, updateTask);
    handleEditStatus();
  };

  return isEdit ? (
    <S.EditTodo data-testid='todoEdit' isCompleted={completed}>
      <form onSubmit={handleUpdate}>
        <input type='text' value={updateTask} onChange={handleUpdateTask} />
        <button>save</button>
      </form>
    </S.EditTodo>
  ) : (
    <S.ViewTodo data-testid='todo' isCompleted={completed}>
      <i className={completed ? 'xi-check-square' : 'xi-checkbox-blank'} />
      <p onClick={handleToggle}>{task}</p>
      <button type='button' onClick={handleEditStatus}>
        <i className='xi-pen' />
      </button>
      <button type='button' onClick={handleRemove}>
        <i className='xi-trash' />
      </button>
    </S.ViewTodo>
  );
};

export default TodoItem;
```

#### index.tsx
```tsx
import { useState } from 'react';
import type { NextPage } from 'next';
import styled from 'styled-components';
import TodoHeader from '../components/TodoHeader';
import TodoAddForm from '../components/TodoAddForm';
import TodoItem from '../components/TodoItem';

const TodoContainer = styled.div`
  max-width: 500px;
  margin: 50px auto;

  background: #fff;
  border-radius: 4px;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.1);

  & > div,
  & > ul {
    padding-left: 25px;
    padding-right: 25px;
  } 

  & > ul {
    padding-bottom: 25px;
  }
`;

export type ITodo = { idx: string; task: string; completed: boolean };

const TodoList: NextPage = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);

  const addTodo = (todo: ITodo) => setTodos([todo, ...todos]);

  const deleteTodo = (idx: string) => setTodos(todos.filter((item) => item.idx !== idx));

  const toggleTodo = (idx: string) => {
    const updateTodo = todos.map((todo) => {
      if (todo.idx === idx) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(updateTodo);
  };

  const updateTodo = (idx: string, task: string) => {
    const updateTodo = todos.map((todo) => {
      if (todo.idx === idx) {
        return { ...todo, task: task };
      }
      return todo;
    });
    setTodos(updateTodo);
  };

  return (
    <TodoContainer>
      <TodoHeader totalNumber={todos.length} completedTotalNumber={todos.filter((item) => item.completed).length} />

      <TodoAddForm addTodo={addTodo} />

      <ul>
        {todos?.map((todo) => (
          <TodoItem
            key={todo.idx}
            data={todo}
            toggleTodo={toggleTodo}
            updateTodo={updateTodo}
            deleteTodo={deleteTodo}
          />
        ))}
      </ul>
    </TodoContainer>
  );
};

export default TodoList;
```

## 기능별 화면 동작  
선언형 프로그래밍 테스트 코드를 작성하기 위해 상태값과 내부 로직에 대한 테스트보다,   
사용자가 어떤 의도를 가지고 있는지에 집중한 테스트 코드를 작성에 중점을 둠.  
=>  
테스트 코드를 작성하기 전 TodoList의 기본 기능인 CRUD와   
그에 해당하는 사용자의 입장에서의 화면 움직임과 동작을 정리.  

### TodoList render 
동작 : render    
point : 화면 진입 시 요소들이 잘 렌더링 되었는가?  

- 타이틀이 화면에 노출되었는가
- count가 0으로 화면에 노출되었는가
- add input의 value 값이 빈 값으로 화면에 노출되었는가
- add button이 화면에 노출되었는가
- 화면에 노출된 todo들의 갯수가 0개인가


### Todo 추가
동작 : input 값 입력 → Enter or Add 버튼 click  
point : todo 추가 후 화면의 움직임  

- count가 todo의 갯수만큼 화면에 노출되었는가
- add input의 value 값이 빈 값으로 화면에 노출되었는가
- 화면에 노출된 todo들의 갯수가 올바르게 노출되었는가
- 새로 추가한 todo의 텍스트가 방금 input에 입력한 텍스트와 일치한가


### 3. Todo 삭제
동작 : todo의 삭제 버튼 click  
point : todo 삭제 후 화면의 움직임  

- count가 올바르게 노출되는가
- 화면에 노출된 todo 갯수가 올바른가
- 삭제한 Todo가 화면에 노출되지 않는가


### 4. Todo 수정
동작 : todo의 edit 버튼 click  
point : todo edit 버튼 클릭 후 화면의 움직임  

- 화면에 todo 수정 화면이 노출되는가
- edit input에 value 값이 해당 todo의 text로 되어있는가

동작 : edit input clear → edit input 값 입력 → Enter or Save 버튼 click  
point : todo 값 수정 후 화면의 움직임  

- todo 수정 화면이 비노출되는가
- 수정한 텍스트가 반영되었는가


### 5. Todo 상태 변경
동작 : todo를 toggle click  
point : todo 상태 변경 후 화면의 움직임  

- completed count가 올바르게 노출되는가
- 아이콘의 클래스명이 올바르게 노출되는가

## Test Code 작성
renderTodoList 렌더링 함수 작성.  
=>  
- RTL을 사용해 컴포넌트 렌더링, 테스트 케이스를 위한 helper 함수를 export
- 각 테스트 케이스에서 렌더링 함수를 호출해 편리하게 필요한 유틸리티 함수 사용 가능


위에서 정의한 각 기능에 매치되는 테스트 코드 작성

```tsx
import React from "react";
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import TodoList from './index';

export function renderTodoList() {
  const ENTER_KEY = '[Enter]';
  const TEXT_ARRAY = ['Send Email', 'Bake Cake', 'Checked TodoList'];

  const result = render(<TodoList />);

  const Title = () => result.getByTestId('title');
  const Count = () => result.getByTestId('count');
  const AddInput = () => result.getByTestId('addInput');
  const AddButton = () => result.getByTestId('addButton');
  const Todos = () => result.queryAllByTestId('todo');
  const EditTodos = () => result.queryAllByTestId('todoEdit');

  const Todo = (todoIndex: number) => Todos()[todoIndex].children[1];
  const EditTodo = (todoIndex: number) => EditTodos()[todoIndex];
  const TodoDeleteButton = (todoIndex: number) => Todos()[todoIndex].children[3];
  const TodoEditButton = (todoIndex: number) => Todos()[todoIndex].children[2];
  const TodoIcon = (todoIndex: number) => Todos()[todoIndex].children[0];
  const TodoEditInput = (todoIndex: number) => EditTodos()[todoIndex].children[0].children[0];
  const TodoEditSaveButton = (todoIndex: number) => EditTodos()[todoIndex].children[0].children[1];

  async function changeAddInput(text: string) {
    await userEvent.type(AddInput(), text);
  }
  async function clickAddButton() {
    await userEvent.click(AddButton());
  }
  async function addTodos(array: string[]) {
    for (const value of array) {
      await changeAddInput(value);

      if (value === array[0]) await changeAddInput(ENTER_KEY);
      else await clickAddButton();
    }
  }
  async function clickTodo(todoIndex: number) {
    await userEvent.click(Todo(todoIndex));
  }
  async function clickTodoDeleteButton(todoIndex: number) {
    await userEvent.click(TodoDeleteButton(todoIndex));
  }
  async function clickTodoEditButton(todoIndex: number) {
    await userEvent.click(TodoEditButton(todoIndex));
  }
  async function clearTodoEditInput(todoIndex: number) {
    await userEvent.clear(TodoEditInput(todoIndex));
  }
  async function changeTodoEditInput(todoIndex: number, text: string) {
    await userEvent.type(TodoEditInput(todoIndex), text);
  }
  async function clickTodoEditSaveButton(todoIndex: number) {
    await userEvent.click(TodoEditSaveButton(todoIndex));
  }

  const getCountText = (total: number, completed: number) => `총 ${total}개 중 ${completed}개 완료`;
  const getTodoText = (todoIndex: number) => [...TEXT_ARRAY].reverse()[todoIndex];

  return {
    TEXT_ARRAY,
    result,
    Title,
    Count,
    AddInput,
    AddButton,
    Todos,
    EditTodos,
    Todo,
    EditTodo,
    TodoDeleteButton,
    TodoEditInput,
    TodoIcon,
    getCountText,
    getTodoText,
    addTodos,
    clickTodo,
    clickTodoDeleteButton,
    clickTodoEditButton,
    clearTodoEditInput,
    changeTodoEditInput,
    clickTodoEditSaveButton,
  }
}

describe('TodoList를 처음 렌더링했을 때 화면이 올바르게 노출된다.', () => {
  test('Render TodoList', () => {
    const { Title, Count, AddInput, AddButton, Todos, getCountText } = renderTodoList();

    expect(Title()).toBeInTheDocument();
    expect(Count()).toHaveTextContent(getCountText(0,0));
    expect(AddInput()).toHaveValue('');
    expect(AddButton()).toBeInTheDocument();
    expect(Todos().length).toBe(0);
  });

  test('Add Input을 통해 새로운 Todo를 추가했을 때 TodoList가 갱신된다.', async () => {
    const { TEXT_ARRAY, addTodos, Count, AddInput, Todos, Todo, getCountText, getTodoText } = renderTodoList();
    const newTodoIndex = 0;

    await addTodos(TEXT_ARRAY);

    expect(Count()).toHaveTextContent(getCountText(TEXT_ARRAY.length, 0));
    expect(AddInput()).toHaveValue('');
    expect(Todos().length).toBe(TEXT_ARRAY.length);
    expect(Todo(newTodoIndex)).toHaveTextContent(getTodoText(newTodoIndex));
  });

  test('Todo의 삭제 버튼을 클릭했을 때 해당 Todo가 TodoList에서 제거된다.', async () => {
    const { TEXT_ARRAY, addTodos, clickTodoDeleteButton, Count, Todos, getCountText, getTodoText } = renderTodoList();
    const targetTodoIndex = 0;
    const remainTodoLength = TEXT_ARRAY.length - 1;

    await addTodos(TEXT_ARRAY);
    await clickTodoDeleteButton(targetTodoIndex);

    expect(Count()).toHaveTextContent(getCountText(remainTodoLength, 0));
    expect(Todos().length).toBe(remainTodoLength);
    for (const todo of Todos()) {
      expect(todo).not.toHaveTextContent(getTodoText(targetTodoIndex));
    }
  });

  test('Todo의 Edit 버튼을 클릭했을 때 해당 Todo를 수정할 수 있는 Input이 노출되고 텍스트를 수정할 수 있다.', async () => {
    const { TEXT_ARRAY, addTodos, clickTodoEditButton, EditTodo, changeTodoEditInput, clickTodoEditSaveButton, getTodoText, Todo, TodoEditInput, clearTodoEditInput } = renderTodoList();
    const targetTodoIndex = 0;
    const changeText = 'Learn jest';

    await addTodos(TEXT_ARRAY);
    await clickTodoEditButton(targetTodoIndex);

    expect(EditTodo(targetTodoIndex)).toBeInTheDocument();
    expect(TodoEditInput(targetTodoIndex)).toHaveValue(getTodoText(targetTodoIndex));

    await clearTodoEditInput(targetTodoIndex);
    await changeTodoEditInput(targetTodoIndex, changeText);
    await clickTodoEditSaveButton(targetTodoIndex);

    expect(EditTodo(targetTodoIndex)).toBeUndefined();
    expect(Todo(targetTodoIndex)).toHaveTextContent(changeText);
  });

  test('Todo를 클릭했을 때 해당 Todo의 completed 상태 값이 변경된다.', async () => {
    const { TEXT_ARRAY, addTodos, clickTodo, getCountText, Count, TodoIcon } = renderTodoList();
    const targetTodoIndex = 0;
    const completeIcon = 'xi-check-square';
    const incompleteIcon = 'xi-checkbox-blank';

    await addTodos(TEXT_ARRAY);
    await clickTodo(targetTodoIndex);

    expect(Count()).toHaveTextContent(getCountText(TEXT_ARRAY.length, 1));
    expect(TodoIcon(targetTodoIndex).className).toBe(completeIcon);


    await clickTodo(targetTodoIndex);

    expect(Count()).toHaveTextContent(getCountText(TEXT_ARRAY.length, 0));
    expect(TodoIcon(targetTodoIndex).className).toBe(incompleteIcon);
  });
});
```


## 테스트 코드 작성하면서 유의해야 할 부분
1. 테스트명은 선언적으로 명사에 좀 더 숙어가 있게 정의하는게 좋다.  
   (상세하게 구체적으로 구구절절 작성)  
   그래야 테스트명만 보고 해당 테스트 코드가 무엇을 의미하는지 파악하기 쉬움  
   ex. Todo 삭제 → Todo 삭제 버튼 클릭 시 TodoList item이 제거된다. 
2. 작성한 테스트 코드가 수정에 용이한지 다시 한번 생각.   
   (유지보수 측면)  
   컴포넌트에 디테일한 상황이 바뀌어도 테스트는 여전히 성공해야 함.  
   다만 핵심 로직이 변경되면 실패해야 함.   
   코어하지 않으면 빼는 것도 나쁘지 않음    
3. 테스팅 레벨  
   해당 테스트의 그룹을 어떻게 나눠야 할지.    
   컴포넌트 레벨 vs page 레벨  
4. 내가 얼마나 의미 있는 테스트를 작성했는가 다시 한번 생각해보기  
   이 코드가 의미있는 테스트 코드인가?


## Reference
- [jest Docs](https://jestjs.io/docs/getting-started)
- [testing-library Docs](https://testing-library.com/docs/user-event/intro/)
- [TypeScript에서 RTL로 선언적인 테스트 코드 작성하기](https://bokjiho.medium.com/typescript%EC%97%90%EC%84%9C-rtl%EB%A1%9C-%EC%84%A0%EC%96%B8%EC%A0%81%EC%9D%B8-%ED%85%8C%EC%8A%A4%ED%8A%B8-%EC%BD%94%EB%93%9C-%EC%9E%91%EC%84%B1%ED%95%98%EA%B8%B0-edb0ba29f73b)
- [TodoList Test Code Example](https://codesandbox.io/s/2489y40n6n?file=/src/__tests__/TodoList.test.js:3365-3449)
