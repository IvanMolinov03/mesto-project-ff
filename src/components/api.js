const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-33',
    headers: {
      authorization: 'f1d4d7f0-801a-41e0-ae27-1e8c877cc43b',
      'Content-Type': 'application/json'
    }
}

export const getUserInfo = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
    .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    })
}

export const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    })
    .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    })
}

export const patchProfileData = (name, about) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name,
            about
        })
    })
}

export const postCardApi = (name, link) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name,
            link
        })
    })
    .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    })
}

export const deleteCardApi = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
}

export const likeCardApi = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers
    })
    .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    })
}

export const unlikeCardApi = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
    .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    })
}

export const changeAvatar = (link) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: link
        })
    })
}