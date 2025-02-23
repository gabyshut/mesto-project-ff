import { popupImage, popupImageCaption, popupTypeImage } from "..";

export function openModal(modal){
  modal.classList.add('popup_is-animated');
  setTimeout(() => {
    modal.classList.add('popup_is-opened');
  }, 10);
  
  document.addEventListener('keyup', closeModalByEscape);
}

export function closeModal(modal){
  modal.classList.remove('popup_is-opened');
  document.removeEventListener('keyup', closeModalByEscape);
}

export function closeModalByClick(evt){
    if (
    evt.target.classList.contains("popup__close") ||
    evt.target.classList.contains("popup")
  ) {
    closeModal(evt.target.closest(".popup"));
  }
}

export function closeModalByEscape(evt){
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector('.popup_is-opened');
    closeModal(openedPopup);
  }
}

