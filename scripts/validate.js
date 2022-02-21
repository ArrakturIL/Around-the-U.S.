//// Form Validator////

const showInputError = (
    input,
    formElement,
    { errorClass, inputErrorClass }
) => {
    const errorElement = formElement.querySelector(`#${input.id}-error`);
    errorElement.textContent = input.validationMessage;
    input.classList.add(inputErrorClass);
    errorElement.classList.add(errorClass);
};

const hideInputError = (
    input,
    formElement,
    { errorClass, inputErrorClass }
) => {
    const errorElement = formElement.querySelector(`#${input.id}-error`);
    errorElement.textContent = "";
    input.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
};

const checkInputValidity = (input, formElement, settings) => {
    if (input.validity.valid) {
        hideInputError(input, formElement, settings);
    } else {
        showInputError(input, formElement, settings);
    }
};

const hasInvalidInput = (inputList) => {
    console.log(inputList);
    return inputList.some((input) => !input.validity.valid);
};

// inputList.every((input) => input.validity.valid === true);

const toggleButtonState = (button, inputList, settings) => {
    if (hasInvalidInput(inputList)) {
        button.removeAttribute("disabled");
        button.classList.remove(settings.inactiveButtonClass);
    } else {
        button.setAttribute("disabled", true);
        button.classList.add(settings.inactiveButtonClass);
    }
};

const setEventListeners = (formElement, settings) => {
    const inputList = formElement.querySelectorAll(settings.inputSelector);

    const button = formElement.querySelector(settings.submitButtonSelector);
    inputList.forEach((input) => {
        input.addEventListener("input", (evt) => {
            checkInputValidity(input, formElement, settings);
            toggleButtonState(button, inputList, settings);
        });
    });
};

const enableValidation = (settings) => {
    const formList = document.querySelectorAll(settings.formSelector);
    console.log(formList);
    formList.forEach((formElement) => {
        formElement.addEventListener("submit", (evt) => evt.preventDefault());
        setEventListeners(formElement, settings);
    });
};

enableValidation({
    formSelector: ".edit-form",
    inputSelector: ".edit-form__text-input",
    submitButtonSelector: ".edit-form__save",
    inactiveButtonClass: "edit-form__save_disabled",
    inputErrorClass: "edit-form__input_type_error",
    errorClass: "edit-form__error_visible",
});
