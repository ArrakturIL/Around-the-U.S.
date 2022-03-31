import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor({ popupSelector, imageSelector, imageTitleSelector }) {
        super(popupSelector);
        this._imageSelector = imageSelector;
        this._imageElement = this._popup.querySelector(this._imageSelector);
        this._titleElement = this._popup.querySelector( imageTitleSelector);
    }

    open({name, link}) {
        this._imageElement.src = link;
        this._titleElement.textContent = name;
        super.open();
    }
}
