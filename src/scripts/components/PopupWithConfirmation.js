import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
    constructor(popupSelector, handleConfirm) {
        super(popupSelector);
        this._popupSelector = popupSelector;
        this._popup = document.querySelector(this._popupSelector);
        this._handleConfirm = handleConfirm;
        this._submitButton = this._popup.querySelector(".edit-form__save_el_delete");
    }

    open(cardId, card) {
        this._cardId = cardId;
        this._card = card;
        super.open();
    }

    // toggleLoading(isLoading) {
    //     if (isLoading) {
    //         this._submitButton.textContent = "Deliting...";
    //     } else {
    //         this._submitButton.textContent = "Delete";
    //     }
    // }

    _handleConfirmClick = (evt) => {
        evt.preventDefault();
        this._handleConfirm(this._cardId, this._card);
        this.close();
    }

    setEventListeners() {
        super.setEventListeners();
        this._submitButton.addEventListener("click", this._handleConfirmClick, console.log("delete"));
    }

    close() {
        super.close();
        this._submitButton.removeEventListener("click", this._handleConfirmClick);
    }
}
   