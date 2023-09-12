"use client"
import { ChangeEvent, KeyboardEvent, useState } from 'react'

interface Todo {
  id: number,
  text: string,
  isChecked: boolean
}

const defaultTodos: Todo[] = [
  { id: 1, text: 'Pay electric bill', isChecked: false },
  { id: 2, text: 'Walk the dog', isChecked: false },
]

export default function TodoList() {
  const [todos, setTodos] = useState(defaultTodos);
  const [newTodo, setNewTodo] = useState('');


  function onNewTodoChange(event: ChangeEvent<HTMLInputElement>): void {
    setNewTodo(event.target.value);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>): void {
    console.log(event.key)
    if (event.key === 'Enter') {
      setTodos([...todos, { id: todos.length + 1, text: newTodo, isChecked: false }]);
      setNewTodo('');
    }
  }

  function onCheckBoxChange(event: ChangeEvent<HTMLInputElement>, todo: Todo): void {
    setTodos(todos.map((t) => {
      if (t.id === todo.id) {
        return { ...t, isChecked: event.target.checked }
      }
      return t;
    }))
  }

  return (
    <>
      <input type='text' placeholder='Add a new todo' onKeyDown={handleKeyDown} onChange={onNewTodoChange} className='text-black' data-test="new-todo" />
      <ul className='todo-list'>
        {todos.map((todo) => {
          const { id, text, isChecked } = todo;
          return (
            <li key={id} className={isChecked ? 'completed' : ''}>
              <input type='checkbox' onChange={(event) => onCheckBoxChange(event, todo)} checked={isChecked} />
              <span>{text}</span>
            </li>
          )
        })}
      </ul>
    </>
  )
}
