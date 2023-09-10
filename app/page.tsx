import Image from 'next/image'

const defaultTodos = [
  { id: 1, text: 'Pay electric bill' },
  { id: 2, text: 'Walk the dog' },
]

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ul className='todo-list'>
        {defaultTodos.map((todo) => (
          <li key={todo.id}>
            <input type='checkbox' />
            <span>{todo.text}</span>
          </li>
        )
        )
        }
      </ul>
    </main>
  )
}
