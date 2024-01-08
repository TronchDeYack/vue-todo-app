<script setup>
import { computed } from 'vue'

const props = defineProps({
  todos: {
    type: Array,
    required: true,
  },
  showTaskDone: {
    type: Boolean,
    required: true,
  }
})

const remainingTask = computed(() => props.todos.filter(t => !t.done))

defineEmits(['clear-all', 'update:showTaskDone'])
</script>

<template>
  <div class="todo-list-header">
    <div data-testid="remaining">
      Remaining tasks : {{ remainingTask.length }}
    </div>

    <div class="header-actions">
      <button data-testid="clear-all-button" type="button" @click="$emit('clear-all')">
        Clear all tasks
      </button>

      <button data-testid="toggle-task-done-button" type="button" @click="$emit('update:showTaskDone', !showTaskDone)">
        {{ showTaskDone ? 'Hide tasks done' : 'Show tasks done' }}
      </button>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.todo-list-header {
  display: flex;
  justify-content: space-between;
}
</style>