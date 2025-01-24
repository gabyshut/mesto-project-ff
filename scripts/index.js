const cardTemplate = document.querySelector("#card-template").content;
const cardList = document.querySelector(".places__list");

//Функция создания карточки

function createCard(cardContent, deleteCard) {
  const cardTemplateCopy = cardTemplate.firstElementChild.cloneNode(true);

  const cardImageTemplate = cardTemplateCopy.querySelector(".card__image");
  const cardDescriptionTemplate = cardTemplateCopy.querySelector(".card__title");
  const deleteButtonTemplate = cardTemplateCopy.querySelector(".card__delete-button");

  cardImageTemplate.setAttribute("src", cardContent.link);
  cardImageTemplate.setAttribute('alt', cardContent.alt);
  cardDescriptionTemplate.textContent = cardContent.name;

  deleteButtonTemplate.addEventListener("click", () => deleteCard(cardTemplateCopy));

  return cardTemplateCopy;
}

//Функция удаления карточки

function deleteCard(card) {
  card.remove();
}

//Вывод карточки на страницу

initialCards.forEach((item) => {
  cardList.append(createCard(item, deleteCard));
});
