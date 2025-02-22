import "./pages/index.css";
import { initialCards } from "./scripts/cards.js";
import { createCard, deleteCard, likeCard } from "./components/card.js";
import {
  handleImage,
  openModal,
  closeModal,
  closeModalByEscape,
  closeModalByClick
} from "./components/modal.js";

const cardList = document.querySelector(".places__list");

//Вывод карточки на страницу

initialCards.forEach((item) => {
  cardList.append(createCard(item, deleteCard, likeCard, handleImage));
});

//Открытие и закрытие попапов
const popupProfileEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
export const popupTypeImage = document.querySelector(".popup_type_image");
export const popupImage = document.querySelector(".popup__image");
export const popupImageCaption = document.querySelector(".popup__caption");

document.addEventListener("click", function (evt) {
  if (evt.target.classList.contains("profile__edit-button")) {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    openModal(popupProfileEdit);
    closeModalByEscape(popupProfileEdit);
  }
  if (evt.target.classList.contains("profile__add-button")) {
    openModal(popupNewCard);
    closeModalByEscape(popupNewCard);
  }
  closeModalByClick(evt);
});



//Редактирование профиля

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileFormElement = document.querySelector(
  '.popup__form[name="edit-profile"]'
);
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");



function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(popupProfileEdit);
}

profileFormElement.addEventListener("submit", handleProfileFormSubmit);

//Создание карточки пользователем
const placeNameInput = document.querySelector(".popup__input_type_card-name");
const linkInput = document.querySelector(".popup__input_type_url");
const cardFormElement = document.querySelector(
  '.popup__form[name="new-place"]'
);

cardFormElement.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const cardContentNew = {
    name: placeNameInput.value,
    link: linkInput.value,
    alt: placeNameInput.value,
  };

  const newCard = createCard(cardContentNew, deleteCard, likeCard, handleImage);
  cardList.prepend(newCard);
  closeModal(document.querySelector(".popup_is-opened"));

  cardFormElement.reset();
});

