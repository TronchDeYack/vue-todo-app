<script setup>
import IconDelete from './icons/IconDelete.vue'

const props = defineProps({
  todo: {
    type: Object,
    required: true,
  }
})

defineEmits(['delete', 'toggle'])
</script>

<template>
  <div 
    class="todo-list-item"
    data-testid="todo-list-item"
  >
    <div class="left">
      <input type="checkbox" data-testid="toggle" :checked="todo.done" @change="$emit('toggle', todo.id)"/>
      <div 
        class="title"
        data-testid="todo-list-item-title"
        :class="{
          'line-throught': todo.done,
        }"
      >
        {{ todo.text }}
      </div>
    </div>
    <div class="actions">
      <IconDelete data-testid="delete" class="delete-icon" @click="$emit('delete', todo.id)"/>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.todo-list-item {
  display: flex;
  width: 100%;
  padding: 8px 16px;

  .title {
    font-weight: 600;
    font-size: 14px;
  }

  .left {
    width: 100%;
    display: flex;
    align-items: center;

    input[type="checkbox"] {
      margin-right: 16px;
    }
  }

  .actions {
    display: flex;
    align-items: center;
  }

  .line-throught {
    text-decoration: line-through;
  }

  .delete-icon {
    width: 16px;
    height: 16px;
    cursor: pointer;
  }
}
</style>