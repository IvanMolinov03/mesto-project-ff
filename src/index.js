import { initialCards } from './scripts/cards.js';
import './pages/index.css';

const cardList = document.querySelector('.places__list');

function createCard (imgSource, imgName, removeCard, likeCard, openCard)  {
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

function deleteCard (itemToDel) {
    itemToDel = itemToDel.closest('.card');
    itemToDel.remove();
}
     
initialCards.forEach(function(card) {
    cardList.append(createCard(card.link, card.name, deleteCard, likeCard, openCard));
})

// 6 спринт

const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');

const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');

const profileForm = document.forms.editProfile;

function openPopup(popup) {
    const closeButton = popup.querySelector('.popup__close');
    popup.classList.add('popup_is-opened');
    // повесил слушателя на кнопку закрытия, оверлей и ESC
    closeButton.addEventListener('click', closePopup);
    document.addEventListener('click', closePopupByOverlay);
    document.addEventListener('keydown', closePopupByEsc);
}

function closePopup(popupToClose) {
    popupToClose = document.querySelector('.popup_is-opened');
    popupToClose.classList.remove('popup_is-opened');
    // удаляем обработчики событий после закрытия попапа
    document.removeEventListener('click', closePopupByOverlay);
    document.removeEventListener('keydown', closePopupByEsc);
    // возвращаем форме значения профиля
    if (popupToClose.classList.contains('popup_type_edit')) {
        resetProfileForm();
    }
}

function closePopupByEsc(evt) {
    if (evt.key === 'Escape') {
        closePopup();
    }
}

function closePopupByOverlay(evt) {
    if (evt.target.classList.contains('popup')) {
        closePopup();
    }
}

buttonEdit.addEventListener('click', () => openPopup(popupTypeEdit));

buttonAdd.addEventListener('click', () => openPopup(popupTypeNewCard));

// работаем над именем профиля и описанием

const profileName = document.querySelector('.profile__title');
const profileAbout = document.querySelector('.profile__description');

const editName = document.forms.editProfile.name;
const editAbout = document.forms.editProfile.description;

resetProfileForm(); // задали значения форме при загрузке страницы

function resetProfileForm() {
    editName.value = profileName.textContent;
    editAbout.value = profileAbout.textContent;
}

// реализуем функцию обновления информации на странице по кнопке "сохранить"

function handleFormSubmit(evt) {
    evt.preventDefault();

    profileName.textContent = editName.value;
    profileAbout.textContent = editAbout.value;

    closePopup();
}

profileForm.addEventListener('submit', handleFormSubmit);

// добавление карточки на страницу

const placeForm = document.forms.newPlace;

function addUserCard(evt) {
    evt.preventDefault();
    const placeName = document.forms.newPlace.placeName;
    const placeLink = document.forms.newPlace.link;
    cardList.prepend(createCard(placeLink.value, placeName.value, deleteCard, likeCard, openCard));
    placeForm.reset();
    closePopup();
}

placeForm.addEventListener('submit', addUserCard);

// лайк

function likeCard(listener) {
    listener.classList.toggle('card__like-button_is-active');
}

// попап с картинкой

function openCard(source, text) {
    const cardImage = popupTypeImage.querySelector('.popup__image');
    const cardCaption = popupTypeImage.querySelector('.popup__caption');
    cardImage.src = source;
    cardCaption.textContent = text;
    openPopup(popupTypeImage);
}