'use client';
import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { Todo } from '../../common/types/Todo';

const defaultTodos: Todo[] = [
  { id: 1, text: 'Pay electric bill', isChecked: false },
  { id: 2, text: 'Walk the dog', isChecked: false },
];

export default function TodoList() {
  const [todos, setTodos] = useState(defaultTodos);
  const [inputTodoText, setInputTodoText] = useState('');
  const [active, setActive] = useState(false);
  const [complete, setComplete] = useState(false);


  function onNewTodoChange(event: ChangeEvent<HTMLInputElement>): void {
    setInputTodoText(event.target.value);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>): void {
    console.log(event.key);
    if (event.key === 'Enter') {
      addNewTodo();
    }
  }

  function addNewTodo(): void {
    if (inputTodoText !== '') {
      const newTodo = constructNewTodo(inputTodoText)
      addToTodosState(newTodo);
      setInputTodoText('');
      addToDb(newTodo);
    }
  }

  function addToTodosState(todo: Todo): void {
    setTodos([...todos, todo]);
  }

  function constructNewTodo(text: string): Todo {
    return { id: getNewId(todos), text: text, isChecked: false };
  }

  async function addToDb(todo: Todo): Promise<void> {
    await fetch('/api', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(todo),
    });
  }

  function onCheckBoxChange(event: ChangeEvent<HTMLInputElement>, todo: Todo): void {
    setTodos(todos.map((t) => {
      if (t.id === todo.id) {
        return { ...t, isChecked: event.target.checked };
      }
      return t;
    }));
  }

  function clearCompleted(_event: any): void {
    setTodos(todos.filter((todo) => !todo.isChecked));
  }

  function TodoItem({ todo }: { todo: Todo }) {
    const { id, text, isChecked } = todo;

    if (active && isChecked) {
      return null;
    }

    if (complete && !isChecked) {
      return null;
    }

    return (
      <li key={id} className={isChecked ? 'completed' : ''}>
        <input type='checkbox' onChange={(event) => onCheckBoxChange(event, todo)} checked={isChecked} />
        <span>{text}</span>
      </li>
    );
  }

  function TodoItems({ todos }: { todos: Todo[] }) {
    return todos.map((todo) => <TodoItem key={todo.id} todo={todo} />);
  }

  return (
    <>
      <div className='space-x-4'>
        <button onClick={(_event) => setActive(!active)}>Active</button>
        <button onClick={(_event) => setComplete(!complete)}>Completed</button>
        <button onClick={clearCompleted}>Clear Completed</button>
      </div>
      <input type='text' placeholder='Add a new todo' onKeyDown={handleKeyDown} onChange={onNewTodoChange} value={inputTodoText} className='text-black' data-test="new-todo" />
      <ul className='todo-list'>
        <TodoItems todos={todos} />
      </ul>
    </>
  );
}

export function getNewId(todos: Todo[]): number {
  return Math.max(...todos.map((todo) => todo.id), 0) + 1;
}