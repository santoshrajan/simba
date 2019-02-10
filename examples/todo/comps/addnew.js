import { H } from 'https://cdn.jsdelivr.net/gh/santoshrajan/simba/simba.js'

import Todos from './todos.js'

import createTodo from './todo.js'

const onAddNew = (e) => {
  e.preventDefault()
  const value = e.target.value.trim()
  if (value.length === 0) return
  const todoElem = createTodo({ text: value })
  Todos(state => { state.todos.unshift(todoElem) })
  e.target.value = ''
}

export default (props) => H(
  'div',
  props,
  H('label', { className: 'label' }, 'What needs to be done?'),
  H(
    'div',
    { className: 'control' },
    H(
      'input',
      {
        className: 'input is-size-3',
        type: 'text',
        value: '',
        onchange: onAddNew,
        autofocus: true
      }
    )
  )
)
