<script setup>
import { ref } from 'vue'
import TodoListItem from './TodoListItem.vue'
import TodoListHeader from './TodoListHeader.vue'

const props = defineProps({
  todos: {
    type: Array,
    required: true,
  }
})

const showTaskDone = ref(true)

defineEmits(['delete', 'toggle', 'clear-all'])
</script>

<template>
  <div class="todo-list">
    <TodoListHeader 
      :todos="todos" 
      v-model:showTaskDone="showTaskDone"
      @clear-all="$emit('clear-all')"
    />
    <TransitionGroup name="list" tag="div">
      <TodoListItem 
        v-for="todo in todos"
        v-show="showTaskDone || !todo.done"
        :key="todo.id"
        :todo="todo"
        @delete="id => $emit('delete', id)"
        @toggle="id => $emit('toggle', id)"
      />
    </TransitionGroup>
  </div>
</template>

<style lang="postcss" scoped>
.todo-list {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;

  .todo-list-header {
    display: flex;
    justify-content: space-between;
  }

  .todo-list-item:not(:last-of-type) {
    border-bottom: 2px solid var(--vt-c-divider-light-1);
  }
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>