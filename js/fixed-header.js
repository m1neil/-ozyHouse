export function initFixedHeader() {
	const header = document.querySelector('header.header')
	const heightTrigger = header.getAttribute('data-header-fixed') ?
		parseFloat(header.getAttribute('data-header-fixed')) : 100
	window.addEventListener('scroll', () => {
		console.log(scrollY)

		if (scrollY > heightTrigger && !header.classList.contains('--fixed'))
			header.classList.add('--fixed')
		else if (scrollY < heightTrigger && header.classList.contains('--fixed'))
			header.classList.remove('--fixed')
	})
}