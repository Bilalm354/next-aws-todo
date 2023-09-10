"use client"
import { ChangeEvent, KeyboardEvent, useState } from 'react'

const defaultTodos = [
  { id: 1, text: 'Pay electric bill' },
  { id: 2, text: 'Walk the dog' },
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
      setTodos([...todos, { id: todos.length + 1, text: newTodo }]);
      setNewTodo('');
    }
  }

  return (
    <>
      <input type='text' placeholder='Add a new todo' onKeyDown={handleKeyDown} onChange={onNewTodoChange} className='text-black' data-test="new-todo" />
      <ul className='todo-list'>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input type='checkbox' />
            <span>{todo.text}</span>
          </li>
        ))}
      </ul>
    </>
  )
}
