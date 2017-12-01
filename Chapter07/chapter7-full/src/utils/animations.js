import Vue from 'vue'

/**
 * Creates a floating image that animate from an element to a target element.
 *
 * @export
 * @param {object} { el, targetEl, imageUrl, imageClass }
 */
export function flyingImage ({ el, targetEl, imageUrl, imageClass }) {
  if (targetEl) {
    const bounds = el.getBoundingClientRect()
    const animatedEl = document.createElement('img')
    animatedEl.setAttribute('src', imageUrl)
    animatedEl.classList.add('animation')
    animatedEl.classList.add('flying-image')
    animatedEl.classList.add(imageClass)
    animatedEl.style.top = `${bounds.top}px`
    animatedEl.style.left = `${bounds.left}px`
    document.body.appendChild(animatedEl)
    Vue.nextTick(() => {
      const targetBounds = targetEl.getBoundingClientRect()
      animatedEl.style.top = `${targetBounds.top + targetBounds.height / 2}px`
      animatedEl.style.left = `${targetBounds.left + targetBounds.width / 2}px`
      setTimeout(() => {
        document.body.removeChild(animatedEl)
      }, 500)
    })
  }
}
