export const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(`${config.inputErrorClass}`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(`${config.errorClass}`);
}

const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(`${config.inputErrorClass}`);
  errorElement.classList.remove(`${config.errorClass}`);
  errorElement.textContent = '';
}

const checkInputValidity = (formElement, inputElement, config) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity('');
}

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(formElement, inputElement, config);
  }
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return inputElement.validity.valid === false;
  })
}

export const disableSubmitButton = (buttonElement, config) => {
  buttonElement.classList.add(`${config.inactiveButtonClass}`);
  buttonElement.setAttribute('disabled', 'true');
}

const enableSubmitButton = (buttonElement, config) => {
  buttonElement.classList.remove(`${config.inactiveButtonClass}`);
  buttonElement.removeAttribute('disabled');
}

const toggleButtonState = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList)) {
    disableSubmitButton(buttonElement, config);
  } else {
    enableSubmitButton(buttonElement, config);
  }
}

const setEventListeners = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(`${config.inputSelector}`));
  const buttonElement = formElement.querySelector(`${config.submitButtonSelector}`);
  toggleButtonState(inputList, buttonElement, config);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    })
  })
}

export const enableValidation = (config) => {
  // 1. Найти все формы по селектору config.formSelector
  const formList = Array.from(document.querySelectorAll(`${config.formSelector}`));
  // 2. Перебрать найденные формы
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    })
  // 3. Для каждой формы вызвать setEventListeners(formElement, config)
    setEventListeners(formElement, config);
  })
}

export const clearValidation = (formElement, config) => {
  // очистили текст ошибок
  const errorMessages = Array.from(formElement.querySelectorAll(`.${config.errorClass}`));
  errorMessages.forEach((message) => {
    message.textContent = '';
  })
  // выключили стилизацию ошибок инпутов
  const formInputs = Array.from(formElement.querySelectorAll(`.${config.inputErrorClass}`));
  formInputs.forEach((input) => {
    input.classList.remove(`${config.inputErrorClass}`);
  })
  // делаем кнопку неактивной
  const submitButton = formElement.querySelector(`${config.submitButtonSelector}`);
  disableSubmitButton(submitButton, config);
}