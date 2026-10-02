export const PRIORITIES = {
  low: {
    label: 'ต่ำ',
    badge: 'bg-emerald-100 text-emerald-700 ring-emerald-200',
    active: 'bg-emerald-500 text-white border-emerald-500',
  },
  medium: {
    label: 'กลาง',
    badge: 'bg-amber-100 text-amber-700 ring-amber-200',
    active: 'bg-amber-500 text-white border-amber-500',
  },
  high: {
    label: 'สูง',
    badge: 'bg-red-100 text-red-700 ring-red-200',
    active: 'bg-red-500 text-white border-red-500',
  },
}

export const PRIORITY_ORDER = ['low', 'medium', 'high']

export const FILTERS = [
  ['all', 'ทั้งหมด'],
  ['active', 'ยังไม่เสร็จ'],
  ['completed', 'เสร็จแล้ว'],
]

// Must match the CSS transition duration in index.css (.row)
export const REMOVE_DELAY = 280
