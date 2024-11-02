'use strict'
import { initMenu } from './menu.js'
import { initFixedHeader } from './fixed-header.js'
import { initSliders } from './sliders.js'
import { HttpRequest } from './HttpRequest.js'
import { initPhoneNumber } from './phoneNumber.js'

window.addEventListener('load', windowLoaded)

function windowLoaded() {
	initMenu(400)
	initFixedHeader()
	initPhoneNumber()
	const slider = document.querySelector('.pets__slider')
	if (slider) {
		let amountCard = slider.hasAttribute('data-amount') ?
			parseInt(slider.getAttribute('data-amount')) : 3

		if (isNaN(amountCard) || amountCard <= 0)
			throw new RangeError("The number should be more than zero!");

		HttpRequest.getData(`https://dog.ceo/api/breed/hound/images/random/${amountCard}`)
			.then(({ message }) => {
				slider.prepend(getCardsList(message, 'pets', true))
				initSliders()
			})
			.catch(error => {
				console.error(error.message)
			})
	}
}

function getCardsList(images, bemClass, isCardInSlider = false) {
	const wrapper = document.createElement('div')
	wrapper.className = bemClass ? `${bemClass}__wrapper swiper-wrapper` : 'swiper-wrapper'

	images.forEach(image => {
		const article = document.createElement('article')
		article.className = "pets__card card-pet"

		const imgWrap = document.createElement('div')
		imgWrap.className = 'card-pet__img --loading'

		const img = document.createElement('img')
		img.src = image
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

		const title = document.createElement('h5')
		title.className = 'card-pet__title'
		title.textContent = 'Name pet'
		contentBody.append(title)

		const button = document.createElement('button')
		button.type = 'button'
		button.className = 'card-pet__more button button--border'
		button.textContent = 'Learn more'
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