import { initialCards } from './scripts/cards.js';
import { openPopup, closePopup, closePopupByEsc, setListeners } from './components/modal.js';
import { createCard, deleteCard, likeCard } from './components/card.js';
import { enableValidation, clearValidation, config as validationConfig} from './components/validation.js';
import { getUserInfo, getInitialCards, patchProfileData, postCardApi, deleteCardApi } from './components/api.js';
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
const profileAvatar = document.querySelector('.profile__image');
const editName = document.forms.editProfile.name;
const editAbout = document.forms.editProfile.description;

function addUserCard(evt) {
    evt.preventDefault();
    cardList.prepend(createCard(placeLink.value, placeName.value, deleteCard, likeCard, openCard));
    postCardApi(placeName.value, placeLink.value);
    placeForm.reset();
    clearValidation(placeForm, validationConfig);
    closePopup(popupTypeNewCard);
}

function submitProfileForm(evt) {
    evt.preventDefault();
    profileName.textContent = editName.value;
    profileAbout.textContent = editAbout.value;
    patchProfileData(profileName.textContent, profileAbout.textContent);
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
    clearValidation(profileForm, validationConfig);
    openPopup(popupTypeEdit);
}

buttonEdit.addEventListener('click', () => openEditPopup());
buttonAdd.addEventListener('click', () => openPopup(popupTypeNewCard));
profileForm.addEventListener('submit', submitProfileForm);
placeForm.addEventListener('submit', addUserCard);

setListeners(popupTypeEdit);
setListeners(popupTypeImage);
setListeners(popupTypeNewCard);

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