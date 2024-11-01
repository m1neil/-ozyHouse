'use strict'
import { initMenu } from './menu.js'
import { initFixedHeader } from './fixed-header.js'
import { SliderCard } from './SliderCard.js'

window.addEventListener('load', windowLoaded)

function windowLoaded() {
	initMenu(400)
	initFixedHeader()
	const sliderMedia = new Map()
	sliderMedia.set(1150, {
		gap: 40,
		amountSlide: 2
	})
	sliderMedia.set(620, {
		amountSlide: 1,
		speedAnimation: 400
	})

	new SliderCard(
		'.pets__slider',
		3,
		90,
		600,
		sliderMedia
	)
}
