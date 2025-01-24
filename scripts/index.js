const cardTemplate = document.querySelector("#card-template").content;
const cardList = document.querySelector(".places__list");

//Функция создания карточки

function createCard(cardContent, deleteCard) {
  const cardTemplateCopy = cardTemplate.cloneNode(true);

  const cardImageTemplate = cardTemplateCopy.querySelector(".card__image");
  const cardDescriptionTemplate = cardTemplateCopy.querySelector(".card__title");
  const deleteButtonTemplate = cardTemplateCopy.querySelector(".card__delete-button");

  cardImageTemplate.setAttribute("src", cardContent.link);
  cardImageTemplate.setAttribute('alt', cardContent.alt);
  cardDescriptionTemplate.textContent = cardContent.name;

  deleteButtonTemplate.addEventListener("click", deleteCard);

  return cardTemplateCopy;
}

//Функция удаления карточки

function deleteCard(event) {
  const listItemToDelete = event.target.closest(".places__item");
  listItemToDelete.remove();
}

//Вывод карточки на страницу

initialCards.forEach((item) => {
  cardList.append(createCard(item, deleteCard));
});
