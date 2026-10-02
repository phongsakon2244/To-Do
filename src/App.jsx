import { useRef, useState } from 'react'
import { ListChecks, Plus } from 'lucide-react'
import TodoItem from './components/TodoItem'
import { FILTERS, PRIORITIES, PRIORITY_ORDER, REMOVE_DELAY } from './constants'

const INITIAL_TODOS = [
  { id: 1, text: 'ซื้อของเข้าบ้าน', done: false, priority: 'medium' },
  { id: 2, text: 'ส่งรายงานให้หัวหน้า', done: false, priority: 'high' },
  { id: 3, text: 'อ่านหนังสือ 20 หน้า', done: true, priority: 'low' },
]

export default function App() {
  const [todos, setTodos] = useState(INITIAL_TODOS)
  const [input, setInput] = useState('')
  const [priority, setPriority] = useState('medium')
  const [filter, setFilter] = useState('all')
  const nextId = useRef(INITIAL_TODOS.length + 1)

  const add = () => {
    const text = input.trim()
    if (!text) return
    setTodos((s) => [{ id: nextId.current++, text, done: false, priority }, ...s])
    setInput('')
  }

  const toggle = (id) =>
    setTodos((s) => s.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))

  const edit = (id, text) =>
    setTodos((s) => s.map((t) => (t.id === id ? { ...t, text } : t)))

  const cycle = (id) =>
    setTodos((s) =>
      s.map((t) =>
        t.id === id
          ? { ...t, priority: PRIORITY_ORDER[(PRIORITY_ORDER.indexOf(t.priority) + 1) % PRIORITY_ORDER.length] }
          : t
      )
    )

  const remove = (id) => {
    setTodos((s) => s.map((t) => (t.id === id ? { ...t, removing: true } : t)))
    setTimeout(() => setTodos((s) => s.filter((t) => t.id !== id)), REMOVE_DELAY)
  }

  const clearCompleted = () => {
    setTodos((s) => s.map((t) => (t.done ? { ...t, removing: true } : t)))
    setTimeout(() => setTodos((s) => s.filter((t) => !t.done)), REMOVE_DELAY)
  }

  const remaining = todos.filter((t) => !t.done).length
  const completedCount = todos.length - remaining
  const visible = todos.filter(
    (t) => filter === 'all' || (filter === 'active' ? !t.done : t.done)
  )

  const emptyText =
    filter === 'completed'
      ? 'ยังไม่มีงานที่เสร็จแล้ว'
      : filter === 'active'
      ? 'ไม่มีงานค้างแล้ว เยี่ยมมาก! 🎉'
      : 'ยังไม่มีงาน เพิ่มงานแรกได้เลย'

  return (
    <div className="mx-auto max-w-xl px-4 py-8 sm:py-12">
      <header className="mb-6 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500 text-white shadow-md">
          <ListChecks size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold leading-tight">รายการงานของฉัน</h1>
          <p className="text-sm opacity-60">จัดการงานประจำวันอย่างเป็นระเบียบ</p>
        </div>
      </header>

      <div className="card mb-5 rounded-2xl border border-gray-100 bg-white p-4 shadow-lg">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && add()}
            placeholder="เพิ่มงานใหม่..."
            className="min-w-0 flex-1 rounded-xl border border-gray-200 px-4 py-2.5 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
          />
          <button
            onClick={add}
            className="flex shrink-0 items-center gap-1.5 rounded-xl bg-indigo-500 px-4 py-2.5 font-medium text-white transition hover:bg-indigo-600 active:scale-95"
          >
            <Plus size={18} />
            <span className="hidden sm:inline">เพิ่ม</span>
          </button>
        </div>

        <div className="mt-3 flex items-center gap-2">
          <span className="mr-1 text-sm text-gray-500">ความสำคัญ:</span>
          {PRIORITY_ORDER.map((key) => (
            <button
              key={key}
              onClick={() => setPriority(key)}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                priority === key
                  ? PRIORITIES[key].active
                  : 'border-gray-200 bg-white text-gray-500 hover:bg-gray-50'
              }`}
            >
              {PRIORITIES[key].label}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-5 flex gap-1 rounded-xl bg-gray-200/70 p-1">
        {FILTERS.map(([key, label]) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`flex-1 rounded-lg py-2 text-sm font-medium transition ${
              filter === key
                ? 'bg-white text-indigo-600 shadow'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div>
        {visible.length === 0 ? (
          <div className="card rounded-xl border border-gray-100 bg-white py-10 text-center text-gray-400 shadow-md">
            {emptyText}
          </div>
        ) : (
          visible.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggle}
              onDelete={remove}
              onEdit={edit}
              onCycle={cycle}
            />
          ))
        )}
      </div>

      <div className="mt-4 flex items-center justify-between text-sm">
        <span className="opacity-70">
          เหลืออีก <b>{remaining}</b> งาน
        </span>
        <button
          onClick={clearCompleted}
          disabled={completedCount === 0}
          className="rounded-lg px-3 py-1.5 text-red-500 transition hover:bg-red-50 disabled:opacity-30 disabled:hover:bg-transparent"
        >
          ล้างงานที่เสร็จแล้ว ({completedCount})
        </button>
      </div>

      <p className="mt-8 text-center text-xs opacity-40">
        ดับเบิลคลิกที่ข้อความเพื่อแก้ไข • คลิกป้ายความสำคัญเพื่อเปลี่ยนระดับ
      </p>
    </div>
  )
}
