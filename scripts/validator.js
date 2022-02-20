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
    console.log(input.validationMessage);
    errorElement.textContent = input.validationMessage;
    input.classList.add(inputErrorClass);
    errorElement.classList.add(errorClass);
};

const hideInputError = (
    input,
    formElement,
    { errorClass, inputErrorClass }
) => {
    const errorElement = formElement.querySelector("#" + input.id + "-error");
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

const hasValidInput = (inputList) =>
    inputList.every((input) => input.validity.valid === true);

const toggleButtonState = (button, inputList, settings) => {
    if (hasValidInput(inputList)) {
        button.removeAttribute("disabled");
        button.classList.remove(settings.inactiveButtonClass);
    } else {
        button.setAttribute("disabled", true);
        button.classList.add(settings.inactiveButtonClass);
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

///reset validation/////

///function resetValidation(formElement, settings) {
//   const inputList = Array.from(
//      formElement.querySelectorAll(settings.inputSelector)
//);
//    inputList.forEach((input) => {
//        input.classList.remove(settings.inputErrorClass);
//        const errorElement = formElement.querySelector(
//            "#" + input.id + "-error"
//       );
//        errorElement.textContent = "";
//        errorElement.classList.remove(settings.errorClass);
//    });
//    const button = formElement.querySelector(settings.submitButtonSelector);
//    button.removeAttribute("disabled");
//    button.classList.remove(settings.inactiveButtonClass);
//}

enableValidation({
    formSelector: ".edit-form",
    inputSelector: ".edit-form__text-input",
    submitButtonSelector: ".edit-form__save",
    inactiveButtonClass: "edit-form__save_disabled",
    inputErrorClass: "edit-form__input_type_error",
    errorClass: "edit-form__error_visible",
});
