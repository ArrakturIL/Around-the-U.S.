/* ========================================================================== */
/* =                             IMPORTS                                    = */
/* ========================================================================== */

/* ========================================================================== */
/* =                             CARD CLASS                                 = */
/* ========================================================================== */

export default class Card {
    constructor(
        { name, link, id, isOwner, likeCount = 0, likedByOwner = false },
        cardSelector,
        handleCardClick,
        likeCountSelector,
        handleDeleteClick,
        handleLikeClick
    ) {
        this._title = name;
        this._img = link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._likeCountElement = likeCountSelector;
        this._handleDeleteClick = handleDeleteClick;
        this._handleLikeClick = handleLikeClick;

        this._id = id;
        this._isOwner = isOwner;
        this._likeCount = likeCount;
        this._likedByOwner = likedByOwner;
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
        const cardTitle = this._card.querySelector(".element__post-name");
        this._cardImg = this._card.querySelector(".element__post-img");
        this._deleteButton = this._card.querySelector(".element__delete");
        this._likeButton = this._card.querySelector(".element__post-like");
        this._likeCountElement = this._card.querySelector(".element__like-count");

        

        cardTitle.textContent = this._title;
        this._cardImg.src = this._img;
        this._cardImg.alt = this._title;

        if (!this._isOwner) {
            this._deleteButton.remove();
        }

        if (this._likedByOwner) {
            this._likeButton.classList.add("element__post-like_active");
        }
        
        this._setEventListeners();
        this._renderLikes();
        
        return this._card;
    }

    _renderLikes() {
        const hasLikes = this._likeCount > 0;
        this._likeCountElement.textContent = this._likeCount;
        this._likeCountElement.style.display = hasLikes ? "block" : "none";
    }

    updateLikeCount(likes) {
        this._likeCount = likes;
        this._renderLikes();
    }

    _setEventListeners() {
        this._likeButton.addEventListener("click", () => 
            this._handleLikeClick(this._id, this._likeButton.classList.toggle("element__post-like_active"), this)
        );

        if (this._isOwner) {
            this._deleteButton.addEventListener("click", (evt) =>
                this._handleDeleteClick(this._id, this._card));
        }

        this._cardImg.addEventListener("click", () => {
            this._handleCardClick();
        });
    }
}
