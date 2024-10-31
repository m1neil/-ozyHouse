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