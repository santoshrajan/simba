import produce from 'https://unpkg.com/immer/dist/immer.module.js'

const isGenericObject = obj => Object.prototype.toString.call(obj) === '[object Object]'
const state = Symbol('state')
const props = Symbol('props')
const id = Symbol('id')

const uniqueElemId = (function () {
  let last = Date.now()
  return function () {
    const time = Date.now()
    last = time > last ? time : last + 1
    return last
  }
})()

const findById = (val, node) => {
  if (node[id] === val) return node
  for (let elem of node.children) {
    let found = findById(val, elem)
    if (found) return found
  }
  return null
}

export const H = (tag, props = {}, ...children) => {
  if (!isGenericObject(props)) {
    children.unshift(props)
    props = {}
  }

  if (typeof tag === 'function') {
    return tag(props)
  }

  const elem = document.createElement(tag)
  for (let [key, value] of Object.entries(props)) {
    if (key === 'style') {
      elem.style.cssText = value
    } else {
      elem[key] = value
    }
  }
  if (children.length > 0) {
    R(...children, elem)
  }
  return elem
}

export const R = (...nodes) => {
  const mountNode = nodes.pop()
  for (let elem of nodes) {
    let type = typeof elem
    if (type === 'string' || type === 'number') {
      elem = document.createTextNode(elem)
    }
    mountNode.appendChild(elem)
  }
}

export const CreateComponent = render => init => {
  let patches = []
  const comp = setState => {
    if (isGenericObject(setState)) {
      const ret = render(setState, comp[state])
      ret[id] = uniqueElemId()
      comp[id] = ret[id]
      comp[props] = setState
      return ret
    }
    comp[state] = produce(comp[state], setState, p => {
      patches = p
    })
    if (patches.length > 0) {
      const newNode = render(comp[props], comp[state])
      const oldNode = findById(comp[id], document.body)
      newNode[id] = oldNode[id]
      oldNode.parentNode.replaceChild(newNode, oldNode)
    }
  }
  comp[state] = init || {}
  comp[props] = {}
  return comp
}
