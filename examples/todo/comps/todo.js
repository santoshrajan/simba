import { H, CreateComponent } from 'https://cdn.jsdelivr.net/gh/santoshrajan/simba/simba.js'

const render = (props, state) => H('li', props, state.text)

const Todo = CreateComponent(render)

export default initialState => {
  const todo = Todo(initialState)
  return todo({
    className: 'panel-block is-size-3',
    ondblclick: (e) => {
      const itemElem = e.target
      const text = itemElem.textContent
      const editElem = H(
        'input',
        {
          className: 'input is-size-3',
          value: text,
          onchange: (e) => todo(state => { state.text = editElem.value }),
          onblur: (e) => {
            if (e.target.value === text) {
              itemElem.textContent = text
            }
          }
        }
      )
      itemElem.replaceChild(editElem, itemElem.firstChild)
      editElem.focus()
    }
  })
}
