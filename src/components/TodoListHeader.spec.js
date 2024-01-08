import { mount } from '@vue/test-utils'

import TodoListHeader from './TodoListHeader.vue'

describe('TodoListHeader', () => {
  test('It should display the number of remaining tasks', () => {
    const wrapper = mount(TodoListHeader, {
      props: {
        todos: [{
          text: 'This is a task',
          done: false,
        }, {
          text: 'Another task',
          done: true,
        }, {
          text: 'Do it right now !',
          done: false,
        }],
        showTaskDone: true,
      }
    })
    expect(wrapper.find('[data-testid="remaining"]').text()).toEqual('Remaining tasks : 2')
  })

  test('It should emit "clear all" event when clicking on the button "clear all"', async () => {
    const wrapper = mount(TodoListHeader, {
      props: {
        todos: [{
          text: 'This is a task',
          done: false,
        }, {
          text: 'Another task',
          done: true,
        }, {
          text: 'Do it right now !',
          done: false,
        }],
        showTaskDone: true,
      }
    })

    await wrapper.find('[data-testid="clear-all-button"]').trigger('click')

    expect(wrapper.emitted()).toHaveProperty('clear-all')
  })

  test('It should emit an update of showTaskDone when clicking on the button "show task done"', async () => {
    const wrapper = mount(TodoListHeader, {
      props: {
        todos: [{
          text: 'This is a task',
          done: false,
        }, {
          text: 'Another task',
          done: true,
        }, {
          text: 'Do it right now !',
          done: false,
        }],
        showTaskDone: false,
      }
    })

    await wrapper.find('[data-testid="toggle-task-done-button"]').trigger('click')

    expect(wrapper.emitted('update:showTaskDone')[0][0]).toEqual(true)
  })

  test('It should emit an update of showTaskDone when clicking on the button "hide task done"', async () => {
    const wrapper = mount(TodoListHeader, {
      props: {
        todos: [{
          text: 'This is a task',
          done: false,
        }, {
          text: 'Another task',
          done: true,
        }, {
          text: 'Do it right now !',
          done: false,
        }],
        showTaskDone: true,
      }
    })

    await wrapper.find('[data-testid="toggle-task-done-button"]').trigger('click')

    expect(wrapper.emitted('update:showTaskDone')[0][0]).toEqual(false)
  })

  test('It should display "Hide task done" in the toggle button when tasks done are displayed.', () => {
    const wrapper = mount(TodoListHeader, {
      props: {
        todos: [{
          text: 'This is a task',
          done: false,
        }, {
          text: 'Another task',
          done: true,
        }, {
          text: 'Do it right now !',
          done: false,
        }],
        showTaskDone: true,
      }
    })

    expect(wrapper.find('[data-testid="toggle-task-done-button"]').text()).toEqual('Hide tasks done')
  })

  test('It should display "Show task done" in the toggle button when tasks done are hidden.', () => {
    const wrapper = mount(TodoListHeader, {
      props: {
        todos: [{
          text: 'This is a task',
          done: false,
        }, {
          text: 'Another task',
          done: true,
        }, {
          text: 'Do it right now !',
          done: false,
        }],
        showTaskDone: false,
      }
    })

    expect(wrapper.find('[data-testid="toggle-task-done-button"]').text()).toEqual('Show tasks done')
  })
})