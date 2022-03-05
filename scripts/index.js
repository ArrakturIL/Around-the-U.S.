/* ========================================================================== */
/* =                             IMPORTS                                    = */
/* ========================================================================== */

import { initialCards as items } from "./cards.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import * as func from "./utils.js";

/* ========================================================================== */
/* =                             VARIABLES                                  = */
/* ========================================================================== */

///------------------------------PROFILE-------------------------------------///
const editProfileForm = document.querySelector(".edit-form");
const editProfileButton = document.querySelector(".profile__edit-button");
const closeProfileFormButton = document.querySelector(".popup__close");
///--------------------------------------------------------------------------///

///-------------------------------CARDS--------------------------------------///
const openAddFormButton = document.querySelector(".profile__add-button");
const closeAddFormButton = document.querySelector(".popup__close_el_new-place");
const addNewCardPopup = document.querySelector(".popup_el_new-place");
const addNewCardFormSubmit = document.querySelector(
    ".edit-form__save_el_new-place"
);
const addNewCardForm = document.querySelector(".edit-form_el_new-place");
const cardPreviewClose = document.querySelector(".popup__close_el_preview");
const cardList = document.querySelector(".elements");
const cardName = document.querySelector("#title");
const cardLink = document.querySelector("#link");
///--------------------------------------------------------------------------///

///-------------------------------POPUP--------------------------------------///
///PopupList///
const popupList = document.querySelectorAll(".popup");
///--------------------------------------------------------------------------///

/* ========================================================================== */
/* =                             CARDRENDER                                 = */
/* ========================================================================== */
items.forEach((item) => {
    const card = new Card(item, "#card-template");
    const cardElement = card.renderCard();
    cardList.append(cardElement);
});
///--------------------------------------------------------------------------///

/* ========================================================================== */
/* =                             EVENTLISTENERS                             = */
/* ========================================================================== */
editProfileForm.addEventListener("submit", func.handleProfileFormSubmit);

editProfileButton.addEventListener(
    "click",
    func.editProfileButtonHandler,
    // func.enableValidation(editProfileForm),
);

closeProfileFormButton.addEventListener("click", () => {
    func.closePopup(func.editProfilePopup);
    func.resetFormValidation(editProfileForm);
    editProfileForm.reset();
});

addNewCardForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const newCard = new Card(
        {
            name: cardName.value,
            link: cardLink.value,
        },
        "#card-template"
    );
    const newCardElement = newCard.renderCard();
    cardList.prepend(newCardElement);
    func.closePopup(addNewCardPopup);
    addNewCardForm.reset();
});

cardPreviewClose.addEventListener("click", () => {
    func.closePopup(func.cardPreview);
});

openAddFormButton.addEventListener("click", () => {
    func.openPopup(addNewCardPopup);
    // func.enableValidation(addNewCardForm);
    addNewCardForm.reset();
});

closeAddFormButton.addEventListener("click", () => {
    func.closePopup(addNewCardPopup);
    
});
///------------------------------------------------------------------------///

///--------------------------OVERLAYCLICK----------------------------------///
popupList.forEach((popup) => {
    popup.addEventListener("click", (evt) => {
        if (evt.target.classList.contains("popup_open")) {
            func.closePopup(evt.target);
        }
    });
});
///------------------------------------------------------------------------///

