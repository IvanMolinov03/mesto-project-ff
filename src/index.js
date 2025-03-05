import { initialCards } from './scripts/cards.js';
import { openPopup, closePopup, closePopupByEsc, setListeners } from './components/modal.js';
import { createCard, deleteCard, likeCard } from './components/card.js';
import { enableValidation, clearValidation, config } from './components/validation.js';
import './pages/index.css';

const cardList = document.querySelector('.places__list');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');
const cardImage = popupTypeImage.querySelector('.popup__image');
const cardCaption = popupTypeImage.querySelector('.popup__caption');
const profileForm = document.forms.editProfile;
const placeForm = document.forms.newPlace;
const placeName = document.forms.newPlace.placeName;
const placeLink = document.forms.newPlace.link;

const profileName = document.querySelector('.profile__title');
const profileAbout = document.querySelector('.profile__description');
const editName = document.forms.editProfile.name;
const editAbout = document.forms.editProfile.description;

function addUserCard(evt) {
    evt.preventDefault();
    cardList.prepend(createCard(placeLink.value, placeName.value, deleteCard, likeCard, openCard));
    placeForm.reset();
    clearValidation(profileForm, config);
    closePopup(popupTypeNewCard);
}

function submitProfileForm(evt) {
    evt.preventDefault();
    profileName.textContent = editName.value;
    profileAbout.textContent = editAbout.value;
    closePopup(popupTypeEdit);
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

function openEditPopup() {
    fillProfileForm();
    clearValidation(profileForm, config);
    openPopup(popupTypeEdit);
}

buttonEdit.addEventListener('click', () => openEditPopup());
buttonAdd.addEventListener('click', () => openPopup(popupTypeNewCard));
profileForm.addEventListener('submit', submitProfileForm);
placeForm.addEventListener('submit', addUserCard);

setListeners(popupTypeEdit);
setListeners(popupTypeImage);
setListeners(popupTypeNewCard);

initialCards.forEach(function(card) {
    cardList.append(createCard(card.link, card.name, deleteCard, likeCard, openCard));
})

fillProfileForm(); // задали значения форме при загрузке страницы

enableValidation(config)