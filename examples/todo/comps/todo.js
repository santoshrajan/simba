import { H, CreateComponent } from 'https://cdn.jsdelivr.net/gh/santoshrajan/simba/simba.js'

const render = (props, state) => H('li', props, state.text)

export default initialState => {
  const Todo = CreateComponent(render, {
    className: 'panel-block is-size-3',
    ondblclick: (e) => {
      const itemElem = e.target
      const text = itemElem.textContent
      const editElem = H(
        'input',
        {
          className: 'input is-size-3',
          value: text,
          onchange: (e) => Todo(state => { state.text = editElem.value }),
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
  return Todo(state => initialState)
}
