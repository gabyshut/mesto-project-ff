import "./pages/index.css";
import { initialCards } from "./scripts/cards.js";
import { createCard, deleteCard, likeCard } from "./components/card.js";
import {
  openImageModal,
  openModal,
  closeModal,
  closeModalByEscape,
} from "./components/modal.js";

const cardList = document.querySelector(".places__list");

//Вывод карточки на страницу

initialCards.forEach((item) => {
  cardList.append(createCard(item, deleteCard));
});

//Открытие попапов
const popupProfileEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupTypeImage = document.querySelector(".popup_type_image");
const popupImage = document.querySelector(".popup__image");
const popupImageCaption = document.querySelector(".popup__caption");

document.addEventListener("click", function (evt) {
  if (evt.target.classList.contains("profile__edit-button")) {
    openModal(popupProfileEdit);
  }
  if (evt.target.classList.contains("profile__add-button")) {
    openModal(popupNewCard);
  }

  if (evt.target.classList.contains("card__image")) {
    openImageModal(evt.target, popupTypeImage, popupImage, popupImageCaption);
  }

  closeModal(evt);
});

//Закрытие на Esc
document.addEventListener("keydown", closeModalByEscape);

//Редактирование профиля

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileFormElement = document.querySelector(
  '.popup__form[name="edit-profile"]'
);
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");

nameInput.value = profileTitle.textContent;
jobInput.value = profileDescription.textContent;

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  document
    .querySelector(".popup_is-opened")
    .classList.remove("popup_is-opened");
}

profileFormElement.addEventListener("submit", handleFormSubmit);

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

  const newCard = createCard(cardContentNew, deleteCard);
  cardList.prepend(newCard);
  document
    .querySelector(".popup_is-opened")
    .classList.remove("popup_is-opened");

  cardFormElement.reset();
});

//Лайк карточки

const placesList = document.querySelector(".places__list");
placesList.addEventListener("click", likeCard);
