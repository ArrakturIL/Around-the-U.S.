import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitHandler) {
        super(popupSelector);
        this._formElement = this._popup.querySelector('.edit-form');
        this._handleSubmit = submitHandler;
        // this._inputs = Array.from(this._popup.querySelectorAll(".edit-form__text-input"));
    }

   _getInputValues() {
       const values = {};
        [...this._formElement.querySelectorAll('.edit-form__text-input')].forEach(input => {
            values[input.name] = input.value;
        });
        return values;
    }

    _handleFormSubmit(evt) {
        evt.preventDefault();
        const button = evt.target.querySelector('.edit-form__save');
        button.textContent = 'Saving...';
        this._handleSubmit(this._getInputValues(), button);
    }

    close() {
        super.close();
        this._formElement.reset();
    }

    setEventListeners() {
        super.setEventListeners();
        this._formElement.addEventListener("submit", this._handleFormSubmit);
    }

    removeEventListeners() {
        super.removeEventListeners();
        this._formElement.removeEventListener("submit", this._handleFormSubmit);
    }
}
