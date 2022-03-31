
import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitHandler,) {
        super(popupSelector);
        this._formElement = this._popup.querySelector(".edit-form");
        this._handleSubmit = submitHandler;
        // this._inputs = Array.from(
        //     this._popup.querySelectorAll(".edit-form__text-input")
        // );
        
    }

    _getInputValues() {
        const inputs = [...this._formElement.querySelectorAll(".edit-form__text-input")];
        const values = {};

       inputs.forEach((input) => {
            values[input.name] = input.value;
        });
        
        return values;
    }

    close() {
        super.close();
        this._formElement.reset();
    }

    _handleSubmitForm = (evt) => {
        evt.preventDefault();
        this._handleSubmit(this._getInputValues());
    }


    setEventListeners() {
        super.setEventListeners();
        this._formElement.addEventListener("submit", this._handleSubmitForm);
    }

    removeEventListeners() {
        super.removeEventListeners();
        this._formElement.removeEventListener("submit", this._handleSubmitForm);
    }
}
