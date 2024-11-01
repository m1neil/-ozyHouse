'use strict'
import { initMenu } from './menu.js'
import { initFixedHeader } from './fixed-header.js'
import { initSliders } from './sliders.js'

window.addEventListener('load', windowLoaded)

function windowLoaded() {
	initMenu(400)
	initFixedHeader()
	initSliders()
}
