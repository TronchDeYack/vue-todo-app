import { mount } from '@vue/test-utils'
import App from './App.vue'

import TodoList from './components/TodoList.vue'

let wrapper

describe('TodoApp', () => {
  beforeEach(() => {
    wrapper = mount(App, {
      shallow: true,
    })
  })

  test('It should display an empty message when there are no tasks.', () => {
    expect(wrapper.find('[data-testid=no-task-message]').text()).toEqual('You have no task yet')
  })

  describe('when adding new task', () => {
    beforeEach(async () => {
      await wrapper.find('[data-testid=todo-input]').setValue('My task')
      //I am obliged to do it instead of clicking on the button because it does not call the submit :(
      await wrapper.find('form').trigger('submit')
    })
    test('It should display the new task', async () => {
      expect(wrapper.findComponent(TodoList).props().todos).toEqual([{
        id: 0,
        text: 'My task',
        done: false,
      }])
    })

    test('It should clear the input', () => {
      expect(wrapper.find('[data-testid=todo-input]').element.value).toEqual('')
    })
  })

  describe('with some tasks in the list', () => {
    beforeEach(async () => {
      await wrapper.find('[data-testid=todo-input]').setValue('My task')
      await wrapper.find('form').trigger('submit')
      await wrapper.find('[data-testid=todo-input]').setValue('My other task')
      await wrapper.find('form').trigger('submit')
    })

    describe('when deleting a task', () => {
      beforeEach(async () => {
        await wrapper.findComponent(TodoList).vm.$emit('delete', 0)
      })

      test('it should remove task from the list.', () => {
        expect(wrapper.findComponent(TodoList).props().todos).toEqual([{
          id: 1,
          text: 'My other task',
          done: false,
        }])
      })
    })

    describe('when toggling one task', () => {
      beforeEach(async () => {
        await wrapper.findComponent(TodoList).vm.$emit('toggle', 1)
      })

      test('it should update task to done.', () => {
        expect(wrapper.findComponent(TodoList).props().todos).toEqual([{
          id: 0,
          text: 'My task',
          done: false,
        },{
          id: 1,
          text: 'My other task',
          done: true,
        }])
      })
    })

    describe('when clearing all tasks', () => {
      beforeEach(async () => {
        await wrapper.findComponent(TodoList).vm.$emit('clear-all')
      })

      test('it should update all tasks to done.', () => {
        expect(wrapper.findComponent(TodoList).props().todos).toEqual([{
          id: 0,
          text: 'My task',
          done: true,
        },{
          id: 1,
          text: 'My other task',
          done: true,
        }])
      })
    })
  })
})