import { handleImage } from "./modal";

//Функция создания карточки
const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");
const popupTypeImage = document.querySelector(".popup_type_image");
const popupImage = document.querySelector(".popup__image");
const popupImageCaption = document.querySelector(".popup__caption");

export function createCard(cardContent, deleteCard, likeCard, handleImage) {
  const cardTemplateCopy = cardTemplate.firstElementChild.cloneNode(true);

  const cardImageTemplate = cardTemplateCopy.querySelector(".card__image");
  const cardDescriptionTemplate = cardTemplateCopy.querySelector(".card__title");
  const deleteButtonTemplate = cardTemplateCopy.querySelector(".card__delete-button");

  cardImageTemplate.setAttribute("src", cardContent.link);
  cardImageTemplate.setAttribute('alt', cardContent.alt);
  cardDescriptionTemplate.textContent = cardContent.name;

  deleteButtonTemplate.addEventListener("click", () => deleteCard(cardTemplateCopy));
  
  cardImageTemplate.addEventListener('click', () => handleImage(cardContent));

  placesList.addEventListener("click", likeCard);

  return cardTemplateCopy;
}

//Функция удаления карточки

export function deleteCard(card) {
  card.remove();
}

//Лайк карточки
export function likeCard(evt){
    if (evt.target.classList.contains('card__like-button')){
      evt.target.classList.add('card__like-button_is-active');
    }
  }