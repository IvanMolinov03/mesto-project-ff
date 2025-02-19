const profileName = document.querySelector('.profile__title');
const profileAbout = document.querySelector('.profile__description');
const editName = document.forms.editProfile.name;
const editAbout = document.forms.editProfile.description;

export function openPopup(popup) {
    const closeButton = popup.querySelector('.popup__close');
    popup.classList.add('popup_is-opened');
    // повесил слушателя на кнопку закрытия, оверлей и ESC
    closeButton.addEventListener('click', closePopup);
    document.addEventListener('click', closePopupByOverlay);
    document.addEventListener('keydown', closePopupByEsc);
}

export function closePopup(popupToClose) {
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

export function closePopupByEsc(evt) {
    if (evt.key === 'Escape') {
        closePopup();
    }
}

export function closePopupByOverlay(evt) {
    if (evt.target.classList.contains('popup')) {
        closePopup();
    }
}

export function openCard(source, text) {
    const popupTypeImage = document.querySelector('.popup_type_image');
    const cardImage = popupTypeImage.querySelector('.popup__image');
    const cardCaption = popupTypeImage.querySelector('.popup__caption');
    cardImage.src = source;
    cardCaption.textContent = text;
    openPopup(popupTypeImage);
}

export function handleFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = editName.value;
    profileAbout.textContent = editAbout.value;
    closePopup();
}

export function resetProfileForm() {
    editName.value = profileName.textContent;
    editAbout.value = profileAbout.textContent;
}