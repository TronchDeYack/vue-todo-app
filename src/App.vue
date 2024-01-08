<script setup>
import { ref } from 'vue'
import TodoList from './components/TodoList.vue'

const todos = ref([])
const todo = ref('')

function onSubmit() {
  todos.value.push({
    id: Math.floor(Math.random() * 10000),
    text: todo.value,
    done: false,
  })
  todo.value = ''
  todoInput.value.focus()
}

const todoInput = ref()

function onDeleteTodo (id) {
  todos.value = todos.value.filter(t => t.id !== id)
}

function onToggleTodo (id) {
  const currentTodo = todos.value.find(t => t.id === id)
  currentTodo.done = !currentTodo.done
}

function onClearAll () {
  todos.value.forEach(t => {
    t.done = true
  })
}
</script>

<template>
  <div class="todo-app">
    <form class="todo-form" @submit.prevent="onSubmit()">
      <input ref="todoInput" v-model="todo" data-testid="todo-input"/>
      <button type="submit">Add</button>
    </form>

    <div v-if="todos.length === 0" data-testid="no-task-message">
      You have no task yet
    </div>
    <TodoList 
      v-else 
      data-testid="todo-list"
      :todos="todos" 
      @delete="onDeleteTodo" 
      @toggle="onToggleTodo"
      @clear-all="onClearAll()"
    />
  </div>
</template>

<style lang="postcss" scoped>
.todo-app {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;

  .todo-list, .todo-form, input {
    width: 100%;
  }

  .todo-form {
    display: flex;
    margin-bottom: 16px;

    input {
      padding: 4px 12px;
      border-radius: 4px;
      margin-right: 8px;
    }
  }
}
</style>