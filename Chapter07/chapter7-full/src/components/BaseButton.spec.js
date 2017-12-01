import BaseButton from './BaseButton.vue'
import { shallow } from 'vue-test-utils'
import { createRenderer } from 'vue-server-renderer'

describe('BaseButton', () => {
  test('click event', () => {
    const wrapper = shallow(BaseButton)
    wrapper.trigger('click')
    expect(wrapper.emitted().click).toBeTruthy()
  })

  test('icon prop', () => {
    const wrapper = shallow(BaseButton, {
      propsData: {
        icon: 'add',
      },
    })
    expect(wrapper.contains('.icon')).toBe(true)
    const icon = wrapper.find('.icon')
    expect(icon.text()).toBe('add')
  })

  test('snapshot', () => {
    const renderer = createRenderer()
    const wrapper = shallow(BaseButton, {
      // Props values
      propsData: {
        icon: 'add',
        disabled: true,
        badge: '3',
      },
      // Slots content
      slots: {
        default: '<span>Add Item</span>',
      },
    })
    renderer.renderToString(wrapper.vm, (err, str) => {
      if (err) throw new Error(err)
      expect(str).toMatchSnapshot()
    })
  })
})
