import { useEffect, useRef, useState } from 'react'
import { Check, Trash2 } from 'lucide-react'
import { PRIORITIES } from '../constants'

export default function TodoItem({ todo, onToggle, onDelete, onEdit, onCycle }) {
  const [editing, setEditing] = useState(false)
  const [text, setText] = useState(todo.text)
  const inputRef = useRef(null)

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [editing])

  const save = () => {
    const trimmed = text.trim()
    if (trimmed) onEdit(todo.id, trimmed)
    else setText(todo.text)
    setEditing(false)
  }

  const cancel = () => {
    setText(todo.text)
    setEditing(false)
  }

  const priority = PRIORITIES[todo.priority]

  return (
    <div className={`row enter mb-3 ${todo.removing ? 'removing' : ''}`}>
      <div className="card flex items-center gap-3 rounded-xl border border-gray-100 bg-white px-3 py-3 shadow-md sm:px-4">
        <button
          onClick={() => onToggle(todo.id)}
          aria-label="ทำเครื่องหมายเสร็จ"
          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 transition ${
            todo.done
              ? 'border-indigo-500 bg-indigo-500 text-white'
              : 'border-gray-300 hover:border-indigo-400'
          }`}
        >
          {todo.done && <Check size={14} strokeWidth={3} />}
        </button>

        <div className="min-w-0 flex-1">
          {editing ? (
            <input
              ref={inputRef}
              value={text}
              onChange={(e) => setText(e.target.value)}
              onBlur={save}
              onKeyDown={(e) => {
                if (e.key === 'Enter') save()
                if (e.key === 'Escape') cancel()
              }}
              className="w-full rounded-md border border-indigo-300 px-2 py-1 outline-none focus:ring-2 focus:ring-indigo-200"
            />
          ) : (
            <span
              onDoubleClick={() => setEditing(true)}
              title="ดับเบิลคลิกเพื่อแก้ไข"
              className={`block cursor-text select-none break-words ${
                todo.done ? 'text-gray-400 line-through' : 'text-gray-800'
              }`}
            >
              {todo.text}
            </span>
          )}
        </div>

        <button
          onClick={() => onCycle(todo.id)}
          title="คลิกเพื่อเปลี่ยนความสำคัญ"
          className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ${priority.badge}`}
        >
          {priority.label}
        </button>

        <button
          onClick={() => onDelete(todo.id)}
          aria-label="ลบ"
          className="shrink-0 rounded-lg p-2 text-gray-400 transition hover:bg-red-50 hover:text-red-500"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  )
}
