import { APIDeleteCard, APIHandleLikeCard, getUsers } from "./api";

//Функция создания карточки
const cardTemplate = document.querySelector("#card-template").content;
getUsers("/users/me");

export function createCard(
  cardContent,
  currentUserId,
  handleDeleteCard,
  likeCard,
  handleImage
) {
  const cardTemplateCopy = cardTemplate.firstElementChild.cloneNode(true);

  const cardImageTemplate = cardTemplateCopy.querySelector(".card__image");
  const cardDescriptionTemplate =
    cardTemplateCopy.querySelector(".card__title");
  const deleteButtonTemplate = cardTemplateCopy.querySelector(
    ".card__delete-button"
  );
  const cardLikeButton = cardTemplateCopy.querySelector(".card__like-button");
  const cardLikeCounter = cardTemplateCopy.querySelector(".card__like-counter");

  cardImageTemplate.setAttribute("src", cardContent.link);
  cardImageTemplate.setAttribute("alt", cardContent.name);
  cardDescriptionTemplate.textContent = cardContent.name;
  cardLikeCounter.textContent = cardContent.likes.length;

  if (cardContent.likes.some((like) => like._id === currentUserId)) {
    cardLikeButton.classList.add("card__like-button_is-active");
  }

  if (cardContent.owner["_id"] === currentUserId) {
    deleteButtonTemplate.addEventListener("click", () =>
      handleDeleteCard(cardContent._id, cardTemplateCopy)
    );
  } else {
    deleteButtonTemplate.classList.add("card__delete-button_disabled");
  }

  cardImageTemplate.addEventListener("click", () => handleImage(cardContent));

  cardLikeButton.addEventListener("click", () =>
    likeCard(cardContent, cardLikeButton, cardLikeCounter)
  );

  return cardTemplateCopy;
}

//Функция удаления карточки

export function deleteCard(card) {
  card.remove();
}

export function handleDeleteCard(cardId, cardElement) {
  APIDeleteCard(cardId)
    .then((res) => {
      deleteCard(cardElement);
    })
    .catch((err) => {
      console.log(err);
    });
}

//Лайк карточки
export function likeCard(cardContent, currentLikeButton, likeCounter) {
  const method = currentLikeButton.classList.contains(
    "card__like-button_is-active"
  )
    ? "DELETE"
    : "PUT";

  APIHandleLikeCard(cardContent._id, method)
    .then((res) => {
      currentLikeButton.classList.toggle("card__like-button_is-active");
      likeCounter.textContent = res.likes.length;
    })
    .catch((err) => {
      console.log(err);
    });
}
