export function createCard (imgSource, imgName, removeCard, likeCard, openCard)  {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');
        
    cardElement.querySelector('.card__image').src = imgSource;
    cardElement.querySelector('.card__title').textContent = imgName;
    deleteButton.addEventListener('click', () => removeCard(deleteButton));
    likeButton.addEventListener('click', () => likeCard(likeButton));
    cardElement.querySelector('.card__image').addEventListener('click', () => openCard(imgSource, imgName));
    return cardElement;
}

export function deleteCard(itemToDel) {
    itemToDel = itemToDel.closest('.card');
    itemToDel.remove();
}

export function likeCard(listener) {
    listener.classList.toggle('card__like-button_is-active');
}