import { initialCards } from './scripts/cards.js';
import { openPopup, closePopup, closePopupByEsc, setListeners } from './components/modal.js';
import { createCard, deleteCard, likeCard } from './components/card.js';
import { enableValidation, clearValidation } from './components/validation.js';
import { getUserInfo, getInitialCards, patchProfileData, postCardApi, deleteCardApi, changeAvatar } from './components/api.js';
import './pages/index.css';

const cardList = document.querySelector('.places__list');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupTypeAvatar = document.querySelector('.popup_type_avatar');
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');
const buttonSubmitNewCard = popupTypeNewCard.querySelector('.popup__button');
const buttonSubmitProfile = popupTypeEdit.querySelector('.popup__button');
const buttonSubmitAvatar =  popupTypeAvatar.querySelector('.popup__button');
const profileImage = document.querySelector('.profile__image-img');
const buttonAvatar = document.querySelector('.profile__image-button');
const cardImage = popupTypeImage.querySelector('.popup__image');
const cardCaption = popupTypeImage.querySelector('.popup__caption');
const profileForm = document.forms.editProfile;
const placeForm = document.forms.newPlace;
const placeName = document.forms.newPlace.placeName;
const placeLink = document.forms.newPlace.link;
const avatarForm = document.forms.newAvatar;
const avatarLink = document.forms.newAvatar.link;

const profileName = document.querySelector('.profile__title');
const profileAbout = document.querySelector('.profile__description');
const profileAvatar = document.querySelector('.profile__image-img');
const editName = document.forms.editProfile.name;
const editAbout = document.forms.editProfile.description;

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}

function addUserCard(evt) {
    buttonSubmitNewCard.textContent = 'Сохранение...';
    
    postCardApi(placeName.value, placeLink.value)
    .then((card) => {
        evt.preventDefault();
        cardList.prepend(createCard(card.link, card.name, deleteCard, likeCard, openCard, card.likes, card.owner._id, card.owner._id, card._id));
        closePopup(popupTypeNewCard);
    })
    .catch((err) => {
        console.log(err);
    })
    .finally(() => {
        buttonSubmitNewCard.textContent = 'Сохранить';
    });
}

function submitProfileForm(evt) {
    buttonSubmitProfile.textContent = 'Сохранение...';
    
    patchProfileData(profileName.textContent, profileAbout.textContent)
    .then(() => {
        evt.preventDefault();
        profileName.textContent = editName.value;
        profileAbout.textContent = editAbout.value;
        closePopup(popupTypeEdit);
    })
    .catch((err) => {
        console.log(err);
      })
    .finally(() => {
        buttonSubmitProfile.textContent = 'Сохранить';
    });
}

function fillProfileForm() {
    editName.value = profileName.textContent;
    editAbout.value = profileAbout.textContent;
}

function openCard(source, text) {
    cardImage.src = source;
    cardImage.alt = text;
    cardCaption.textContent = text;
    openPopup(popupTypeImage);
}

function openNewCardPopup() {
    placeForm.reset();
    clearValidation(placeForm, validationConfig);
    openPopup(popupTypeNewCard);
}

function openEditPopup() {
    fillProfileForm();
    clearValidation(profileForm, validationConfig);
    openPopup(popupTypeEdit);
}

function openAvatarPopup() {
    avatarForm.reset();
    clearValidation(avatarForm, validationConfig);
    openPopup(popupTypeAvatar);
}

function submitAvatarForm(evt) {
    buttonSubmitAvatar.textContent = 'Сохранение...';
    
    changeAvatar(avatarLink.value)
    .then(() => {
        evt.preventDefault();
        profileImage.src = avatarLink.value;
        closePopup(popupTypeAvatar);
    })
    .catch((err) => {
        console.log(err);
      })
    .finally(() => {
        buttonSubmitAvatar.textContent = 'Сохранить';
    });
}

buttonEdit.addEventListener('click', () => openEditPopup());
buttonAdd.addEventListener('click', () => openNewCardPopup());
buttonAvatar.addEventListener('click', () => openAvatarPopup());
profileForm.addEventListener('submit', submitProfileForm);
placeForm.addEventListener('submit', addUserCard);
avatarForm.addEventListener('submit', submitAvatarForm);

setListeners(popupTypeEdit);
setListeners(popupTypeImage);
setListeners(popupTypeNewCard);
setListeners(popupTypeAvatar);

fillProfileForm(); // задали значения форме при загрузке страницы

enableValidation(validationConfig);

Promise.all([getUserInfo(), getInitialCards()])
.then(([userData, cardsData]) => {
    profileName.textContent = userData.name;
    profileAbout.textContent = userData.about;
    profileAvatar.src = userData.avatar;
    
    cardsData.forEach((card) => {
        cardList.append(createCard(card.link, card.name, deleteCard, likeCard, openCard, card.likes, userData._id, card.owner._id, card._id));
    })
})
.catch((err) => console.log(err))