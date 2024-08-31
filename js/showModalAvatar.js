const modalContainer = document.querySelector('[data-modal-avatar-container]');
const modalCloseBtn = document.querySelector('[data-modal-avatar-close-btn]');
const overlay = document.querySelector('[data-avatar-overlay]');
const modalImg = document.querySelector('[modal-avatar-img]');

const toggleModal = function () {
  modalContainer.classList.toggle('active');
  overlay.classList.toggle('active');
};

function closeModal() {
  modalCloseBtn.addEventListener('click', toggleModal);
  overlay.addEventListener('click', toggleModal);
}

function showModalAvatar(modalAvatar) {
  modalImg.src = modalAvatar.querySelector('[data-modal-avatar]').src;
  modalImg.alt = modalAvatar.querySelector('[data-modal-avatar]').alt;

  toggleModal();
  closeModal();
}

export { showModalAvatar };
