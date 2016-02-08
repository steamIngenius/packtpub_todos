import React from 'react'
import ReactDOM from 'react-dom'
import fireflux from './fireflux'

class TodoApp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      todos : []
    }
  }
  render() {
    let todos = this.state.todos.map((todo) => {
      return (
        <li key={todo.id}>
          <button onClick={this.removeTodo.bind(this, todo)}>done</button>
          {todo.text}
        </li>
      )
    })

    return (
      <div className="todoAppWrapper">
        <button onClick={this.addTodo}>Add</button>
        <ul>
          {todos}
        </ul>
      </div>
    )

  }
  addTodo() {
    let todo = window.prompt("Input your task")
    fireflux.actions.addTodo(todo)
  }
  removeTodo(todo) {
    fireflux.actions.removeTodo(todo)
  }
  componentDidMount() {
    fireflux.on('change', () => {
      this.setState({ todos : fireflux.store.todos })
    })
  }
}

ReactDOM.render(<TodoApp />, document.body)
