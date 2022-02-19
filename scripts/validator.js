//// Form Validator////

const enableValidation = (settings) => {
    const formList = document.querySelectorAll(settings.formSelector);
    console.log(formList);
    formList.forEach((formElement) => {
        formElement.addEventListener("submit", (evt) => evt.preventDefault());
        setEventListeners(formElement, settings);
    });
};

const showInputError = (
    input,
    formElement,
    { errorClass, inputErrorClass }
) => {
    const errorElement = formElement.querySelector("#" + input.id + "-error");
    console.log(input.validationMessage)
    errorElement.textContent = input.validationMessage;
    input.classList.add("edit-form__text-input_type_error");
    errorElement.classList.add("edit-form__error_visible");
};

const hideInputError = (
    input,
    formElement,
    { errorClass, inputErrorClass }
) => {
    const errorElement = formElement.querySelector("#" + input.id + "-error");
    errorElement.textContent = "";
    errorElement.classList.remove(inputErrorClass);
    input.classList.remove(errorClass);
};

const checkInputValidity = (input, formElement, settings) => {
    if (input.validity.valid) {
        hideInputError(input, formElement, settings);
    } else {
        showInputError(input, formElement, settings);
    }
};

const hasValidInput = (inputList) =>
    inputList.every((input) => input.validity.valid === true);

const toggleButtonState = (button, inputList, settings) => {
    if (hasValidInput(inputList)) {
        button.removeAttribute("disabled");
        button.classList.remove(settings.buttonDisabledClass);
    } else {
        button.setAttribute("disabled", true);
        button.classList.add(settings.buttonDisabledClass);
    }
};

const setEventListeners = (formElement, settings) => {
    const inputList = Array.from(
        formElement.querySelectorAll(settings.inputSelector)
    );
    const button = formElement.querySelector(settings.submitButtonSelector);
    inputList.forEach((input) => {
        input.addEventListener("input", () => {
            checkInputValidity(input, formElement, settings);
            toggleButtonState(button, inputList, settings);
        });
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
