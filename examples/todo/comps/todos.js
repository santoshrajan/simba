import { H, CreateComponent } from 'https://cdn.jsdelivr.net/gh/santoshrajan/simba/simba.js'

const render = (props, state) => {
  return H('ul', ...state.todos)
}

export default CreateComponent(render, { className: 'panel' })
