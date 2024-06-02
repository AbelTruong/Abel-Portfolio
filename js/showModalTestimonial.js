const modalContainer = document.querySelector("[data-modal-testimonial-container]")
const modalCloseBtn = document.querySelector("[data-modal-testimonial-close-btn]")
const overlay = document.querySelector("[data-testimonial-overlay]")

// modal variable
const modalImg = document.querySelector("[data-testimonial-img]")
const modalTitle = document.querySelector("[data-testimonial-title]")
const modalText = document.querySelector("[data-modal-testimonial-text]")

// modal toggle function
const toggleModal = function () {
  overlay.classList.toggle("active")
  modalContainer.classList.toggle("active")
}

function closeModal() {
  // add click event to modal close button
  modalCloseBtn.addEventListener("click", toggleModal)
  overlay.addEventListener("click", toggleModal)
}

function showModalTestimonial(testimonialsItem) {
  // add click event to all modal items
  modalImg.src = testimonialsItem.querySelector("[data-testimonials-avatar]").src
  modalImg.alt = testimonialsItem.querySelector("[data-testimonials-avatar]").alt
  modalTitle.innerHTML = testimonialsItem.querySelector("[data-testimonials-title]").innerHTML
  modalText.innerHTML = testimonialsItem.querySelector("[data-testimonials-text]").innerHTML

  toggleModal()
  closeModal()
}

export { showModalTestimonial }
