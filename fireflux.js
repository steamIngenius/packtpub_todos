import Firebase from 'firebase/lib/firebase-web'
import { EventEmitter } from 'events'

const ref = new Firebase('https://fir3flux.firebaseIO.com')
const fireflux = new EventEmitter()
fireflux.store = {
  todos : []
}
fireflux.actions = {
  addTodo : function(text) {
    ref.push({ text : text })
  },
  removeTodo : function(todo) {
    ref.child(todo.id).remove()
  }
}

ref.on('value', (snap) => {
  let val = snap.val() || []
  if (typeof val == 'object') val = Object.keys(val).map((id) => {
    let todo = val[id]
    todo.id = id
    return todo
  })
  fireflux.store.todos = val
  fireflux.emit('change')
})

export { fireflux as default }
