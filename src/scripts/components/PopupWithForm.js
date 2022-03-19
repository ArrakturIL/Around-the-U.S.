import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitHandler) {
        super(popupSelector);
        this._formElement = this._popup.querySelector(".edit-form");
        this._handleSubmit = submitHandler;
        this._inputs = Array.from(
            this._popup.querySelectorAll(".edit-form__text-input")
        );
    }

    getInputValues() {
        const values = {};
        this._inputs.forEach((input) => {
            values[input.name] = input.value;
        });
        return values;
    }

    close() {
        super.close();
        this._formElement.reset();
    }

    setEventListeners() {
        super.setEventListeners();
        this._formElement.addEventListener("submit", this._handleSubmit);
    }

    removeEventListeners() {
        super.removeEventListeners();
        this._formElement.removeEventListener("submit", this._handleSubmit);
    }
}
