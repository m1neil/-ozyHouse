export function initPopup() {
	const parent = document.querySelectorAll('[data-modal-parent]')
	if (!parent.length) return
	parent.forEach(wrapper => {
		wrapper.addEventListener('click', openModal)
	})
}

function openModal(e) {
	const target = e.target
	if (!target.closest('[data-modal-link]'))
		return
	const wrapperCard = target.closest('.card-pet')
	if (wrapperCard) return

}

function setImageModal(src, alt) {
	console.log(src)
	console.log(alt)

}