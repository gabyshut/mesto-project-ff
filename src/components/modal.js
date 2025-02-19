export function openImageModal(
  targetElement,
  imageModal,
  elementImage,
  elementCaption
) {
  openModal(imageModal);
  elementImage.setAttribute("src", targetElement.getAttribute("src"));
  elementImage.setAttribute("alt", targetElement.getAttribute("alt"));
  const cardTitle = targetElement
    .closest(".card")
    .querySelector(".card__title").textContent;
  elementCaption.textContent = cardTitle;
}

export function openModal(element) {
  document.addEventListener("keydown", closeModalByEscape);
  element.classList.add("popup_is-animated");
  setTimeout(() => {
    element.classList.add("popup_is-opened");
  }, 10);
}

export function closeModal(evt) {
  //Закрытие на крестик или оверлей
  if (
    evt.target.classList.contains("popup__close") ||
    evt.target.classList.contains("popup")
  ) {
    evt.target.closest(".popup").classList.remove("popup_is-opened");
  }
}

export function closeModalByEscape(event) {
  if (event.key === "Escape" && document.querySelector(".popup_is-opened")) {
    document
      .querySelector(".popup_is-opened")
      .classList.remove("popup_is-opened");
    document.removeEventListener("keydown", closeModalByEscape);
  }
}
