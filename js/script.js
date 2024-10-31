'use strict'
import { initMenu } from './menu.js'

window.addEventListener('load', windowLoaded)

function windowLoaded() {
	initMenu(400)
}
