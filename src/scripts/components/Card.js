/* ========================================================================== */
/* =                             IMPORTS                                    = */
/* ========================================================================== */


/* ========================================================================== */
/* =                             CARD CLASS                                 = */
/* ========================================================================== */

export default class Card {
    constructor(
        cardData,
        userId,
        cardSelector,
        handleCardClick,
        likeCountSelector,
        handleDeleteClick,
        handleLikeClick
    ) {
        const {name, link, likes, _id, owner,} = cardData;
        this._userId = userId;
        this._title = name;
        this._img = link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._likeCountElement = likeCountSelector;
        this._handleDeleteClick = handleDeleteClick;
        this._handleLikeClick = handleLikeClick;

        this._id = _id;
        this._isOwner = owner._id === this._userId;
        this._likeCount = likes.length;
        this._likes = likes;
        this._likedByOwner = this.isLiked();
        
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

        // if (this._likedByOwner) {
        //     this._likeButton.classList.add("element__post-like_active");
        // }
        
        this._setEventListeners();
        this._renderLikes();
        
        return this._card;
    }


    isLiked() {
        return this._likes.some((like) => like._id === this._userId);
    }

    
    _renderLikes() {
        const hasLikes = this._likeCount > 0;
        this._likeCountElement.textContent = this._likeCount;
        this._likeCountElement.style.display =  hasLikes ? "block" : "none";

        if (this.isLiked()) {
            this._likeButton.classList.add("element__post-like_active");
        } else {
            this._likeButton.classList.remove("element__post-like_active");
        }
    }

    updateLikes(likes) {
        this._likeCount = likes.length;
        this._likes = likes;
        this._renderLikes();
    }
    

    _setEventListeners() {
        this._likeButton.addEventListener("click", () => 
            this._handleLikeClick(this._id, this)
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
