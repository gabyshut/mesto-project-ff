import "./pages/index.css";
import { createCard, likeCard, handleDeleteCard } from "./components/card.js";
import {
  openModal,
  closeModal,
  closeModalByEscape,
  closeModalByClick,
} from "./components/modal.js";

import {
  clearValidation,
  disableSubmitButton,
  enableValidation,
} from "./components/validation.js";
import {
  getCards,
  getUsers,
  postNewCard,
  updateAvatar,
  updateUserInfo,
} from "./components/api.js";
import { formValidationConfig } from "./components/formConfig.js";

const cardList = document.querySelector(".places__list");

const popupProfileEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");

const popupTypeImage = document.querySelector(".popup_type_image");
const popupImage = document.querySelector(".popup__image");
const popupImageCaption = document.querySelector(".popup__caption");

const popupChangeAvatar = document.querySelector(".popup_type_change-avatar");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileFormElement = document.querySelector(
  '.popup__form[name="edit-profile"]'
);
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");

const placeNameInput = document.querySelector(".popup__input_type_card-name");
const linkInput = document.querySelector(".popup__input_type_url");
const placeFormElement = document.querySelector(
  '.popup__form[name="new-place"]'
);

const formChangeAvatar = document.querySelector(
  '.popup__form[name="change-avatar"]'
);
const profileImage = document.querySelector(".profile__image");

const cardPromises = [getCards(), getUsers("/users/me")];

const profileEditButton = document.querySelector('.profile__edit-button');

const newPlaceButton = document.querySelector('.profile__add-button');

const profileImageContainer = document.querySelector('.profile__image-container');

const popups = document.querySelectorAll('.popup');


//Функция открытия попапа с картинкой

function handleImage(cardContent) {
  popupImage.setAttribute("src", cardContent.link);
  popupImage.setAttribute("alt", cardContent.name);
  popupImageCaption.textContent = cardContent.name;

  openModal(popupTypeImage);
}

//Функция подстановки данных профиля

function checkUserInfo(userInfo) {
  profileTitle.textContent = userInfo.name;
  profileDescription.textContent = userInfo.about;
  profileImage.setAttribute("src", userInfo.avatar);
}

//Функция редактирование профиля

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const button = profileFormElement.querySelector(
    formValidationConfig.submitButtonSelector
  );
  renderLoading({ buttonElement: button, isLoading: true });

  updateUserInfo(nameInput.value, jobInput.value)
    .then((newUserInfo) => {
      profileTitle.textContent = newUserInfo.name;
      profileDescription.textContent = newUserInfo.about;
      closeModal(popupProfileEdit);
    })
    .catch((err) => {
      console.log(`Не удалось обновить данные пользователя. Ошибка ${err}`);
    })
    .finally(() => {
      renderLoading({ buttonElement: button, isLoading: false });
    });
}

//Функция рендера загрузки

function renderLoading({ buttonElement, isLoading }) {
  if (isLoading) {
    buttonElement.textContent = "Сохранение...";
  } else {
    buttonElement.textContent = "Сохранить";
  }
}

//Функция закрытия и открытия попапов и очистки сообщений валидации

function handlePopup(modal, formElement){
  openModal(modal);
  clearValidation(formElement, formValidationConfig);
}

//Отображение карточек и информации профиля на странице

Promise.all(cardPromises)
  .then(([APICards, currentUser]) => {
    APICards.forEach((item) => {
      cardList.append(
        createCard(
          item,
          currentUser._id,
          handleDeleteCard,
          likeCard,
          handleImage
        )
      );
      checkUserInfo(currentUser);
    });
  })
  .catch((err) => {
    console.log(
      `Не удалось получить информацию о карточках или пользователях. Ошибка: ${err}`
    );
  });

//Обработчики открытия и закрытия попапов

profileEditButton.addEventListener('mousedown', function() {
  nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    handlePopup(popupProfileEdit, profileFormElement);
})

newPlaceButton.addEventListener('mousedown', function() {
    handlePopup(popupNewCard, placeFormElement);
})

profileImageContainer.addEventListener('mousedown', function(){
    handlePopup(popupChangeAvatar, popupChangeAvatar.querySelector('.popup__form'));
})

popups.forEach((popup) => {
  popup.addEventListener("click", closeModalByClick);
});


//Обработчик подтверждения данных об изменении профиля

profileFormElement.addEventListener("submit", handleProfileFormSubmit);

//Обработчик создания карточки пользователем

placeFormElement.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const button = placeFormElement.querySelector(
    formValidationConfig.submitButtonSelector
  );
  renderLoading({ buttonElement: button, isLoading: true });

  postNewCard(placeNameInput.value, linkInput.value)
    .then((cardContentNew) => {
      const newCard = createCard(
        cardContentNew,
        cardContentNew.owner._id,
        handleDeleteCard,
        likeCard,
        handleImage
      );
      cardList.prepend(newCard);

      closeModal(document.querySelector(".popup_is-opened"));
      placeFormElement.reset();
      disableSubmitButton(button, formValidationConfig);
    })
    .catch((err) => {
      console.log(`Не удалось создать карточку. Ошибка: ${err}`);
    })
    .finally(() => {
      renderLoading({ buttonElement: button, isLoading: false });
    });
});

//Обработчик апдейта автара

formChangeAvatar.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const button = formChangeAvatar.querySelector(
    formValidationConfig.submitButtonSelector
  );
  renderLoading({ buttonElement: button, isLoading: true });

  updateAvatar(formChangeAvatar.querySelector(".popup__input").value)
    .then((res) => {
      profileImage.setAttribute("src", res.avatar);
      closeModal(popupChangeAvatar);
      formChangeAvatar.reset();
      disableSubmitButton(
        formChangeAvatar.querySelector(
          formValidationConfig.submitButtonSelector
        ),
        formValidationConfig
      );
    })
    .catch((err) => {
      console.log(`Не удалось обновить аватар. Ошибка: ${err}`);
    })
    .finally(() => {
      renderLoading({ buttonElement: button, isLoading: false });
    });
});

//Валидация форм

enableValidation(formValidationConfig);
