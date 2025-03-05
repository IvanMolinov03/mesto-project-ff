export function openPopup(popup) {
    popup.classList.add('popup_is-opened');
    // повесил слушателя на ESC. Слушатель закрытия по кнопке и оверлею теперь в отдельной функции addListener
    document.addEventListener('keydown', closePopupByEsc);
}

export function closePopup(popupToClose) {
    popupToClose.classList.remove('popup_is-opened');
    // удаляем обработчик события после закрытия попапа
    document.removeEventListener('keydown', closePopupByEsc);
}

export function closePopupByEsc(evt) {
    if (evt.key === 'Escape') {
        const activePopup = document.querySelector('.popup_is-opened');
        closePopup(activePopup);
    }
}

export function setListeners(popup) {
    const closeButton = popup.querySelector('.popup__close');
    closeButton.addEventListener("click", () => { closePopup(popup) });
    popup.addEventListener("mousedown", (evt) => {
        if (evt.target.classList.contains('popup')) {
            closePopup(popup);
        }
    });
   }