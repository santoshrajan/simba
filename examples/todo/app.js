import { R, H } from 'https://cdn.jsdelivr.net/gh/santoshrajan/simba/simba.js'

import addNew from './comps/addnew.js'

import Todos from './comps/todos.js'

/* Render to #App */

R(
  H('h1', { className: 'title is-1' }, 'Todo'),
  H(addNew, { className: 'field' }),
  H('p', { className: 'help' }, 'Double click todo below to edit'),
  Todos(state => { state.todos = [] }),
  document.getElementById('App')
)
