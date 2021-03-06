/* ========================================================================== */
/* =                             IMPORTS                                    = */
/* ========================================================================== */

export default class FormValidator {
    constructor(data, formElement) {
        this._formElement = formElement;
        this._formSelector = data.formSelector;
        this._inputSelector = data.inputSelector;
        this._submitButtonSelector = data.submitButtonSelector;
        this._inactiveButtonClass = data.inactiveButtonClass;
        this._inputErrorClass = data.inputErrorClass;
        this._errorClass = data.errorClass;

        this._inputList = Array.from([
            ...this._formElement.querySelectorAll(this._inputSelector),
        ]);

        this._button = this._formElement.querySelector(
            this._submitButtonSelector
        );
    }
    //Private methods
    _showInputError(input) {
        this._errorElement = this._formElement.querySelector(
            `#${input.id}-error`
        );
        this._errorElement.textContent = input.validationMessage;
        input.classList.add(this._inputErrorClass);
        this._errorElement.classList.add(this._errorClass);
    }
    _hideInputError(input) {
        this._errorElement = this._formElement.querySelector(
            `#${input.id}-error`
        );
        this._errorElement.textContent = "";
        input.classList.remove(this._inputErrorClass);
        this._errorElement.classList.remove(this._errorClass);
    }
    _checkInputValidity(input) {
        if (input.validity.valid) {
            this._hideInputError(input);
        } else {
            this._showInputError(input);
        }
    }
    _hasInvalidInput() {
        return this._inputList.some((input) => !input.validity.valid);
    }
    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this._button.setAttribute("disabled", true);
            this._button.classList.add(this._inactiveButtonClass);
        } else {
            this._button.removeAttribute("disabled");
            this._button.classList.remove(this._inactiveButtonClass);
        }
    }
    _setEventListeners() {
        this._toggleButtonState();

        this._inputList.forEach((input) => {
            input.addEventListener("input", () => {
                this._checkInputValidity(input);
                this._toggleButtonState();
            });
        });
    }

    //Public methods
    enableValidation() {
        this._setEventListeners();
        this._toggleButtonState();
    }

    resetValidation() {
        this._toggleButtonState();

        this._inputList.forEach((input) => {
            this._hideInputError(input);
        });
    }
}
