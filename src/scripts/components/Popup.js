
export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
        this._popup = document.querySelector(this._popupSelector);
        this._editSaveButton = this._popup.querySelector(".edit-form__save");
        
    }
    open() {
        this._popup.classList.add("popup_open");
        this.setEventListeners();
    }
    close() {
        this._popup.classList.remove("popup_open");
        this.removeEventListeners();
    }

    renderButtonText = (text) => {
        if(this._editSaveButton) this._editSaveButton.textContent = text;
    }

    _handleEscKey = (evt) => {
        if (evt.key === "Escape") {
            this.close();
        }
    }
    _handlerClickClose = (evt) => {
        if (evt.target.classList.contains("popup_open") || evt.target.classList.contains("popup__close")) {
            this.close();
        }
    }
        
    
    setEventListeners() {
        this._popup.addEventListener("mousedown", this._handlerClickClose);
        document.addEventListener("keydown", this._handleEscKey);
    }
    removeEventListeners() {
        this._popup.removeEventListener("mousedown", this._handlerClickClose);
        document.removeEventListener("keydown", this._handleEscKey);
    }
}