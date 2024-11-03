'use strict'
import { initMenu } from './menu.js'
import { initFixedHeader } from './fixed-header.js'
import { initSliders } from './sliders.js'
import { HttpRequest } from './HttpRequest.js'
import { initPhoneNumber } from './phoneNumber.js'
import { initGoto } from './functions.js'
import { initPopup } from './popup.js'

window.addEventListener('load', windowLoaded)

function windowLoaded() {
	initMenu(400)
	initFixedHeader()
	initPhoneNumber()
	initGoto()
	initPopup()
	const slider = document.querySelector('.pets__slider')
	if (slider) {
		let amountCard = slider.hasAttribute('data-amount') ?
			parseInt(slider.getAttribute('data-amount')) : 3

		if (isNaN(amountCard) || amountCard <= 0)
			throw new RangeError("The number should be more than zero!");

		HttpRequest.getData(`https://api.thecatapi.com/v1/images/search?limit=${amountCard}&has_breeds=1&breed_ids=beng,abys`)
			.then(data => {
				const newData = Promise.all(data.map(({ id }) => {
					const data = HttpRequest.getData(`https://api.thecatapi.com/v1/images/${id}`)
					return data
				}))
				return newData
			})
			.then(data => {
				const spinner = document.querySelector('.spinner')
				if (spinner) spinner.remove()
				console.log(data)
				slider.prepend(getCardsList(data, 'pets', true))
				initSliders()
			})
			.catch(error => {
				console.debug(error.message)
				alert(`Reload the page! Click F5 on your keyboard.`)
			})
	}
}

function getCardsList(images, bemClass, isCardInSlider = false) {
	const wrapper = document.createElement('div')
	wrapper.className = bemClass ? `${bemClass}__wrapper swiper-wrapper` : 'swiper-wrapper'


	images.forEach(({ id, url, breeds }) => {
		const article = document.createElement('article')
		article.className = "pets__card card-pet"

		const imgWrap = document.createElement('div')
		imgWrap.className = 'card-pet__img --loading'

		const img = document.createElement('img')
		img.src = url
		img.alt = 'pet'
		img.loading = 'lazy'
		img.onload = () => {
			imgWrap.classList.add('--load')
			setTimeout(() => {
				imgWrap.classList.remove('--loading')
			}, 500);
		}
		imgWrap.append(img)
		article.append(imgWrap)

		const contentBody = document.createElement('div')
		contentBody.className = 'card-pet__body'

		const namePet = breeds[0]?.name ?? 'unknown'
		const title = document.createElement('h5')
		title.className = 'card-pet__title'
		title.textContent = namePet
		contentBody.append(title)

		const button = document.createElement('button')
		button.type = 'button'
		button.className = 'card-pet__more button button--border'
		button.textContent = 'Learn more'
		button.setAttribute('data-modal-link', '#popup')
		button.setAttribute('data-image-id', id)
		button.setAttribute('aria-label', 'Open a modal window')
		contentBody.append(button)
		article.append(contentBody)

		if (isCardInSlider) {
			const cardWrapper = document.createElement('div')
			cardWrapper.className = bemClass ? `${bemClass}__slide swiper-slide` : 'swiper-slide'
			cardWrapper.append(article)
			wrapper.append(cardWrapper)
		} else wrapper.append(article)
	})

	return wrapper
}