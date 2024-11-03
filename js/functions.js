import { menuClose } from "./menu.js"

export function toggleLockBody(delay = 500) {
	if (!document.documentElement.classList.contains('lock'))
		blockBody()
	else unBlockBody(delay)
}

export function blockBody() {
	document.documentElement.classList.add('lock')
}

export function unBlockBody(delay = 500) {
	setTimeout(() => {
		document.documentElement.classList.remove('lock')
	}, delay)
}

export function initGoto() {
	const parents = document.querySelectorAll('[data-goto-parent]')
	parents.forEach(parent => {
		parent.addEventListener('click', scrollToBlock)
	})
}

/* TODO: Дописать функционал когда мы нажали на ссылку которая ведет на другую страницу. 
	1. Надо это понять
	2. Надо пользователя переместить на нужную страницу
	3. И проскролить куда надо
*/
function scrollToBlock(e) {
	const target = e.target

	if (target.closest('[data-goto]')) {
		const link = target.closest('[data-goto]')
		const selector = link.getAttribute('data-goto')
		const element = document.querySelector(selector)
		if (!element) return
		const header = document.querySelector('.header')
		const headerHeight =
			header.getAttribute('data-scroll-height') ?
				parseInt(header.getAttribute('data-scroll-height')) : 0

		if (isNaN(headerHeight))
			throw new SyntaxError("A positive number was expected!");

		const top = element.getBoundingClientRect().top - headerHeight

		if (document.documentElement.classList.contains('menu-open')) {
			menuClose()
			unBlockBody(0)
		}

		window.scrollBy({
			top,
			behavior: 'smooth'
		})
		e.preventDefault()
	}
}