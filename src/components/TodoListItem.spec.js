import { mount } from '@vue/test-utils'

import TodoListItem from './TodoListItem.vue'

describe('TodoListItem', () => {
  test('It should display the title of the task', () => {
    const wrapper = mount(TodoListItem, {
      props: {
        todo: {
          text: 'This is a task',
          done: false,
        }
      }
    })
    expect(wrapper.find('[data-testid="todo-list-item-title"]').text()).toEqual('This is a task')
  })

  test('It should cross out the title when the task is done', () => {
    const wrapper = mount(TodoListItem, {
      props: {
        todo: {
          text: 'This is a task',
          done: true,
        }
      }
    })
    expect(wrapper.find('[data-testid="todo-list-item-title"]').classes()).toContain('line-throught')
  })

  test('It should not cross out the title when the task is not done yet', () => {
    const wrapper = mount(TodoListItem, {
      props: {
        todo: {
          text: 'This is a task',
          done: false,
        }
      }
    })
    expect(wrapper.find('[data-testid="todo-list-item-title"]').classes()).not.toContain('line-throught')
  })

  test('It should emit the "delete" event with the task id when clicking on the delete icon.', () => {
    const wrapper = mount(TodoListItem, {
      props: {
        todo: {
          id: 'task-1',
          text: 'This is a task',
          done: false,
        }
      }
    })

    wrapper.find('[data-testid=delete]').trigger('click')

    expect(wrapper.emitted('delete')[0][0]).toBe('task-1')
  })

  test('It should emit the "toggle" event with the task id when clicking on the checkbox.', () => {
    const wrapper = mount(TodoListItem, {
      props: {
        todo: {
          id: 'task-1',
          text: 'This is a task',
          done: false,
        }
      }
    })

    wrapper.find('[data-testid=toggle]').trigger('change')

    expect(wrapper.emitted('toggle')[0][0]).toBe('task-1')
  })
})