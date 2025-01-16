// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const cardList = document.querySelector('.places__list');

function createCard (imgSource, imgName, removeCard)  {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');
        
    cardElement.querySelector('.card__image').src = imgSource;
    cardElement.querySelector('.card__title').textContent = imgName;
    deleteButton.addEventListener('click', () => removeCard(deleteButton));
    return cardElement;
}

function deleteCard (itemToDel) {
    itemToDel = itemToDel.closest('.card');
    itemToDel.remove();
}
     
initialCards.forEach(function(card) {
    cardList.append(createCard(card.link, card.name, deleteCard));
})