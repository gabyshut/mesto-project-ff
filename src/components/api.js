const config = {
  baseUrl: "https://mesto.nomoreparties.co/v1/wff-cohort-33",
  headers: {
    authorization: "3290a9e1-f90c-4d2a-b987-c7be46e492fd",
    "Content-Type": "application/json",
  },
};

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Что-то пошло не так. Ошибка ${res.status}`);
  }
}

export function getUsers(way) {
  return fetch(`${config.baseUrl}${way}`, {
    headers: {
      authorization: config.headers.authorization,
    },
  })
    .then((res) => {
      return checkResponse(res);
    })
    .catch((err) => {
      console.log(err);
    });
}

export function getCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: {
      authorization: config.headers.authorization,
    },
  })
    .then((res) => {
      return checkResponse(res);
    })
    .catch((err) => {
      console.log(err);
    });
}

export function updateUserInfo(newName, newAbout) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      authorization: config.headers.authorization,
      "Content-Type": config.headers["Content-Type"],
    },
    body: JSON.stringify({
      name: newName,
      about: newAbout,
    }),
  })
    .then((res) => {
      return checkResponse(res);
    })
    .catch((err) => {
      console.log(`Не удалось обновить данные пользователя. Ошибка ${err}`);
    });
}

export function postNewCard(cardName, cardLink) {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: {
      authorization: config.headers.authorization,
      "Content-Type": config.headers["Content-Type"],
    },
    body: JSON.stringify({
      name: cardName,
      link: cardLink,
    }),
  })
    .then((res) => {
      return checkResponse(res);
    })
    .catch((err) => {
      console.log(err);
    });
}

export function APIDeleteCard(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: config.headers.authorization,
      "Content-Type": config.headers["Content-Type"],
    },
  })
    .then((res) => {
      return checkResponse(res);
    })
    .catch((err) => {
      console.log(err);
    });
}

export function APIHandleLikeCard(cardId, method) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: method,
    headers: {
      authorization: config.headers.authorization,
      "Content-Type": config.headers["Content-Type"],
    },
  })
    .then((res) => {
      return checkResponse(res);
    })
    .catch((err) => {
      console.log(err);
    });
}

export function updateAvatar(avatarURL) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: {
      authorization: config.headers.authorization,
      "Content-Type": config.headers["Content-Type"],
    },
    body: JSON.stringify({
      avatar: avatarURL,
    }),
  })
    .then((res) => {
      return checkResponse(res);
    })
    .catch((err) => {
      console.log(err);
    });
}
