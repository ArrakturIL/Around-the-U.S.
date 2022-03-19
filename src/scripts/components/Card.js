/* ========================================================================== */
/* =                             IMPORTS                                    = */
/* ========================================================================== */

/* ========================================================================== */
/* =                             CARD CLASS                                 = */
/* ========================================================================== */

export default class Card {
    constructor({name, link}, cardSelector, handleCardClick) {
        this._title = name;
        this._img = link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
    }
    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content.querySelector(".element")
            .cloneNode(true);
        return cardElement;
    }
    generateCard() {
        this._card = this._getTemplate();
        this._cardTitle = this._card.querySelector(".element__post-name");
        this._cardImg = this._card.querySelector(".element__post-img");
        this._deleteButton = this._card.querySelector(".element__delete");
        this._likeButton = this._card.querySelector(".element__post-like");

        this._cardTitle.textContent = this._title;
        this._cardImg.src = this._img;
        this._cardImg.alt = this._title;
        this._setEventListeners();

        return this._card;
    }
    _deleteCard() {
        this._card.remove();
        this._card = null;
    }

    _likeCard() {
        this._likeButton.classList.toggle("element__post-like_active");
    }

    _setEventListeners() {
        this._deleteButton.addEventListener("click", () => {
            this._deleteCard();
        });
        this._likeButton.addEventListener("click", () => {
            this._likeCard();
        });
        this._cardImg.addEventListener("click", () => {
            this._handleCardClick();
        });
    }
}
