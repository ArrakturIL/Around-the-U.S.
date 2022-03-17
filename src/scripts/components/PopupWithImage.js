import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor({popupSelector, imageSelector, titleSelector}) {
        super(popupSelector);
        this._imageSelector = imageSelector;
        this._titleSelector = titleSelector;
        this._popupImage = this._popup.querySelector(this._imageSelector);
        this._popupTitle = this._popup.querySelector(this._titleSelector);
    }
    
   _populateInfo() {
       this._popupImage.src = this._link;
        this._popupTitle.textContent = this._title;
        this._popupImage.alt = this._title;
    }

    open(link, title) {
        this._link = link;
        this._title = title;
        super.open();
        this._populateInfo();
    }
}