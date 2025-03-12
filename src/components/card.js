import { deleteCardApi, likeCardApi, unlikeCardApi } from "./api";

export function createCard (imgSource, imgName, removeCard, likeCard, openCard, cardLikes, userId, ownerId, cardId)  {
    const cardElement = document.querySelector('#card-template').content.querySelector('.card').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');
    const cardImage = cardElement.querySelector('.card__image');
    const cardLikesCount = cardElement.querySelector('.card__like-count');

    cardImage.src = imgSource;
    cardImage.alt = imgName;
    cardElement.querySelector('.card__title').textContent = imgName;
    
    likeButton.addEventListener('click', () => likeCard(likeButton, cardId)
    .then((card) => {
        cardLikesCount.textContent = card.likes.length;
    })
    .catch((err) => {
        console.log(err);
    }));

    cardImage.addEventListener('click', () => openCard(imgSource, imgName));
    
    if (userId !== ownerId) {
        deleteButton.remove()
    } else {
        deleteButton.addEventListener('click', () => {
            removeCard(cardElement, cardId);
        })
    }

    if (cardLikes.some((like) => {
        return like._id === userId
    })) {
        likeButton.classList.add('card__like-button_is-active');
    }

    cardLikesCount.textContent = cardLikes.length;
    return cardElement;
}

export function deleteCard(card, cardId) {
    deleteCardApi(cardId)
    .then(() => {
        card.remove();
    })
    .catch((err) => {
        console.log(err);
    })
}

export function likeCard(listener, cardId) {
    if (!listener.classList.contains('card__like-button_is-active')) {
        return likeCardApi(cardId)
            .then((card) => {
                listener.classList.toggle('card__like-button_is-active');
                return card
            })
            .catch((err) => {
                console.log(err);
            })
    } else {
        return unlikeCardApi(cardId)
            .then((card) => {
                listener.classList.toggle('card__like-button_is-active');
                return card
            })
            .catch((err) => {
                console.log(err);
            })
    }
}