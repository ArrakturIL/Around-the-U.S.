/* ========================================================================== */
/* =                             IMPORTS                                    = */
/* ========================================================================== */

import { formValidatorData as data } from "./utils.js";

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
        // this._button = data.submitButtonSelector;
    }
    //Private methods
    _showInputError(input, formElement) {
        this._errorElement = formElement.querySelector(`#${input.id}-error`);
        this._errorElement.textContent = input.validationMessage;
        input.classList.add(this._inputErrorClass);
        this._errorElement.classList.add(this._errorClass);
    }
    _hideInputError(input, formElement) {
        this._errorElement = formElement.querySelector(`#${input.id}-error`);
        this._errorElement.textContent = "";
        input.classList.remove(this._inputErrorClass);
        this._errorElement.classList.remove(this._errorClass);
    }
    _checkInputValidity(input, formElement) {
        if (input.validity.valid) {
            this._hideInputError(input, formElement);
        } else {
            this._showInputError(input, formElement);
        }
    }
    _hasInvalidInput(inputList) {
        return inputList.some((input) => {
            return !input.validity.valid;
        });
    }
    _toggleButtonState(button, inputList) {
        if (this._hasInvalidInput(inputList)) {
            button.setAttribute("disabled", true);
            button.classList.add(this._inactiveButtonClass);
        } else {
            button.removeAttribute("disabled");
            button.classList.remove(this._inactiveButtonClass);
        }
    }
    _setEventListeners(formElement) {
        const inputList = Array.from(
            formElement.querySelectorAll(this._inputSelector)
        );
        const button = 
            formElement.querySelector(this._submitButtonSelector);

        this._toggleButtonState(button, inputList);

        inputList.forEach((input) => {
            input.addEventListener("input", () => {
                this._checkInputValidity(input, formElement);
                this._toggleButtonState(button, inputList);
            });
        });
    }
    //Public methods
    enableValidation() {
        this._formList = document.querySelectorAll(this._formSelector);
        this._formList.forEach((formElement) => {
            this._setEventListeners(formElement);
        });
    }
    resetValidation() {
        this._formList = document.querySelectorAll(this._formSelector);
        this._formList.forEach((formElement) => {
            this.inputList = Array.from(
                formElement.querySelectorAll(this._inputSelector)
            );
            this.inputList.forEach((input) => {
                this._hideInputError(input, formElement);
            });
        });
    }
}
