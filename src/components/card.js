export function createCard (imgSource, imgName, removeCard, likeCard, openCard)  {
    const cardElement = document.querySelector('#card-template').content.querySelector('.card').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');
    const cardImage = cardElement.querySelector('.card__image');

    cardImage.src = imgSource;
    cardImage.alt = imgName;
    cardElement.querySelector('.card__title').textContent = imgName;
    deleteButton.addEventListener('click', () => removeCard(cardElement));
    likeButton.addEventListener('click', () => likeCard(likeButton));
    cardImage.addEventListener('click', () => openCard(imgSource, imgName));
    return cardElement;
}

export function deleteCard(card) {
    card.remove();
}

export function likeCard(listener) {
    listener.classList.toggle('card__like-button_is-active');
}