import { R, H } from 'https://cdn.jsdelivr.net/gh/santoshrajan/simba/simba.js'

import addNew from './comps/addnew.js'

import todos from './comps/todos.js'

/* Render to #App */

R(
  H('h1', { className: 'title is-1' }, 'Todo'),
  H(addNew, { className: 'field' }),
  H('p', { className: 'help' }, 'Double click todo below to edit'),
  H(todos, { className: 'panel' }),
  document.getElementById('App')
)
