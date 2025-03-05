export const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

const showInputError = (formElement, inputElement, errorMessage, {inputErrorClass, errorClass, ...otherSettings}) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(`${inputErrorClass}`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(`${errorClass}`);
}

const hideInputError = (formElement, inputElement, {inputErrorClass, errorClass, ...otherSettings}) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(`${inputErrorClass}`);
  errorElement.classList.remove(`${errorClass}`);
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

export const disableSubmitButton = (buttonElement, {inactiveButtonClass, ...otherSettings}) => {
  buttonElement.classList.add(`${inactiveButtonClass}`);
  buttonElement.setAttribute('disabled', 'true');
}

const enableSubmitButton = (buttonElement, {inactiveButtonClass, ...otherSettings}) => {
  buttonElement.classList.remove(`${inactiveButtonClass}`);
  buttonElement.removeAttribute('disabled');
}

const toggleButtonState = (inputList, buttonElement, {inactiveButtonClass, ...otherSettings}) => {
  if (hasInvalidInput(inputList)) {
    disableSubmitButton(buttonElement, {inactiveButtonClass, ...otherSettings});
  } else {
    enableSubmitButton(buttonElement, {inactiveButtonClass, ...otherSettings});
  }
}

const setEventListeners = (formElement, {inputSelector, submitButtonSelector, ...otherSettings}) => {
  const inputList = Array.from(formElement.querySelectorAll(`${inputSelector}`));
  const buttonElement = formElement.querySelector(`${submitButtonSelector}`);
  toggleButtonState(inputList, buttonElement, config);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    })
  })
}

export const enableValidation = ({ formSelector, ...otherSettings }) => {
  // 1. Найти все формы по селектору config.formSelector
  const formList = Array.from(document.querySelectorAll(`${formSelector}`));
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