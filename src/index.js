import { initialCards } from './scripts/cards.js';
import { openPopup, closePopup, closePopupByEsc, closePopupByOverlay, openCard, handleFormSubmit, resetProfileForm } from './components/modal.js';
import { createCard, deleteCard, likeCard } from './components/card.js';
import './pages/index.css';

const cardList = document.querySelector('.places__list');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');
const profileForm = document.forms.editProfile;
const placeForm = document.forms.newPlace;
const placeName = document.forms.newPlace.placeName;
const placeLink = document.forms.newPlace.link;

initialCards.forEach(function(card) {
    cardList.append(createCard(card.link, card.name, deleteCard, likeCard, openCard));
})

function addUserCard(evt) {
    evt.preventDefault();
    cardList.prepend(createCard(placeLink.value, placeName.value, deleteCard, likeCard, openCard));
    placeForm.reset();
    closePopup();
}

buttonEdit.addEventListener('click', () => openPopup(popupTypeEdit));
buttonAdd.addEventListener('click', () => openPopup(popupTypeNewCard));

resetProfileForm(); // задали значения форме при загрузке страницы

profileForm.addEventListener('submit', handleFormSubmit);
placeForm.addEventListener('submit', addUserCard);