/* ========================================================================== */
/* =                             IMPORTS                                    = */
/* ========================================================================== */

import {formValidatorData as data} from "./utils.js";

/* ========================================================================== */
/* =                             IMPORTS                                    = */
/* ========================================================================== */

//Create the FormValidator class, which sets settings for validating form fields according to the following requirements:
//Its constructor has two parameters. The first parameter is a settings object that stores selectors and form classes, and the second one takes a form element to be validated.
//It has private methods for processing the form, which include: checking the field's validity, changing the state of the Submit button, and adding all the needed handlers.
//It has a public method enableValidation(), which enables form validation.

    export default class FormValidator {
        constructor(data, formElement, handleFormSubmit) {
            this._formElement = formElement;
            this._handleFormSubmit = handleFormSubmit;
            this._formSelector = data.formSelector;
            this._inputSelector = data.inputSelector;
            this._submitButtonSelector = data.submitButtonSelector;
            this._inactiveButtonClass = data.inactiveButtonClass;
            this._inputErrorClass = data.inputErrorClass;
            this._errorClass = data.errorClass;
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
            return inputList.some((input) => !input.validity.valid);
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
            this._inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
            this._button = formElement.querySelector(this._submitButtonSelector);
            this._inputList.forEach((input) => {
                input.addEventListener("input", () => {
                    this._checkInputValidity(input, formElement);
                    this._toggleButtonState(this._button, this._inputList);
                });
            });
        }
        //Public methods
        enableValidation() {
            this._formList = document.querySelectorAll(this._formSelector);
            this._formList.forEach((formElement) => {
                formElement.addEventListener("submit", (evt) => evt.preventDefault());
                this._setEventListeners(formElement);
            });
        }
 //       resetValidation() {
 //           this._formList = document.querySelectorAll(this._formSelector);
 //           this._formList.forEach((formElement) => {
  //              this._inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
  //              this._inputList.forEach((input) => {
   //                 this._hideInputError(input, formElement);
  //              });
   //             this._toggleButtonState(this._button, this._inputList);
   //         });
   //     }
    }

