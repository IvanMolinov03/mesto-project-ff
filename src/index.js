import { initialCards } from './scripts/cards.js';
import { openPopup, closePopup, closePopupByEsc, setListeners } from './components/modal.js';
import { createCard, deleteCard, likeCard } from './components/card.js';
import { enableValidation, clearValidation, config as validationConfig} from './components/validation.js';
import { getUserInfo, getInitialCards, patchProfileData, postCardApi, deleteCardApi, changeAvatar } from './components/api.js';
import './pages/index.css';

const cardList = document.querySelector('.places__list');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupTypeAvatar = document.querySelector('.popup_type_avatar');
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');
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

function addUserCard(evt) {
    evt.preventDefault();
    
    postCardApi(placeName.value, placeLink.value)
    .then((card) => {
        popupTypeNewCard.querySelector('.popup__button').textContent = 'Сохранение...';
        return card
    })
    .then((card) => cardList.prepend(createCard(card.link, card.name, deleteCard, likeCard, openCard, card.likes, card.owner._id, card.owner._id, card._id)))
    .catch((err) => {
        console.log(err);
      })
    .finally(() => {
        popupTypeNewCard.querySelector('.popup__button').textContent = 'Сохранить';
    });
   
    placeForm.reset();
    clearValidation(placeForm, validationConfig);
    closePopup(popupTypeNewCard);
}

function submitProfileForm(evt) {
    evt.preventDefault();
    profileName.textContent = editName.value;
    profileAbout.textContent = editAbout.value;
    
    patchProfileData(profileName.textContent, profileAbout.textContent)
    .then((data) => {
        popupTypeEdit.querySelector('.popup__button').textContent = 'Сохранение...';
        return data
    })
    .catch((err) => {
        console.log(err);
      })
    .finally(() => {
        popupTypeEdit.querySelector('.popup__button').textContent = 'Сохранить';
    });

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

function openAvatarPopup() {
    clearValidation(avatarForm, validationConfig);
    openPopup(popupTypeAvatar);
}

function submitAvatarForm(evt) {
    evt.preventDefault();
    profileImage.src = avatarLink.value;
    
    changeAvatar(avatarLink.value)
    .then((data) => {
        popupTypeAvatar.querySelector('.popup__button').textContent = 'Сохранение...';
        return data
    })
    .catch((err) => {
        console.log(err);
      })
    .finally(() => {
        popupTypeAvatar.querySelector('.popup__button').textContent = 'Сохранить';
    });
    
    closePopup(popupTypeAvatar);
}

buttonEdit.addEventListener('click', () => openEditPopup());
buttonAdd.addEventListener('click', () => openPopup(popupTypeNewCard));
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