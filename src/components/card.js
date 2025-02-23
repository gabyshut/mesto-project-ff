//Функция создания карточки
const cardTemplate = document.querySelector("#card-template").content;

export function createCard(cardContent, deleteCard, likeCard, handleImage) {
  const cardTemplateCopy = cardTemplate.firstElementChild.cloneNode(true);

  const cardImageTemplate = cardTemplateCopy.querySelector(".card__image");
  const cardDescriptionTemplate = cardTemplateCopy.querySelector(".card__title");
  const deleteButtonTemplate = cardTemplateCopy.querySelector(".card__delete-button");
  const cardLikeButton = cardTemplateCopy.querySelector(".card__like-button");

  cardImageTemplate.setAttribute("src", cardContent.link);
  cardImageTemplate.setAttribute('alt', cardContent.alt);
  cardDescriptionTemplate.textContent = cardContent.name;

  deleteButtonTemplate.addEventListener("click", () => deleteCard(cardTemplateCopy));
  
  cardImageTemplate.addEventListener('click', () => handleImage(cardContent));

  cardLikeButton.addEventListener("click", likeCard);

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