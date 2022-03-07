/* ========================================================================== */
/* =                             IMPORTS                                    = */
/* ========================================================================== */

import { initialCards as items } from "./cards.js";
import * as utils from "./utils.js";

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

const popupList = document.querySelectorAll(".popup");

///--------------------------------------------------------------------------///

/* ========================================================================== */
/* =                             CARDRENDER                                 = */
/* ========================================================================== */
items.forEach((item) => {
    const cardElement = utils.createCard(item);
    cardList.append(cardElement);
});
///--------------------------------------------------------------------------///

/* ========================================================================== */
/* =                             EVENTLISTENERS                             = */
/* ========================================================================== */
editProfileForm.addEventListener("submit", utils.handleProfileFormSubmit);

editProfileButton.addEventListener(
    "click",
    utils.openProfilePopup,
);

addNewCardForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const card = utils.createCard({
        name: cardName.value,
        link: cardLink.value,
    });
    cardList.prepend(card);
    utils.closePopup(utils.addNewCardPopup);
    addNewCardForm.reset();
});

openAddFormButton.addEventListener("click", () => {
    utils.openPopup(utils.addNewCardPopup);
    utils.cardFormValidator.resetValidation();
    addNewCardForm.reset();
});

// cardPreviewClose.addEventListener("click", () => {
//     utils.closePopup(utils.cardPreview);
// });
// closeProfileFormButton.addEventListener("click", () => {
//     utils.closePopup(utils.editProfilePopup);
// });
// closeAddFormButton.addEventListener("click", () => {
//     utils.closePopup(utils.addNewCardPopup);
    
// });
///------------------------------------------------------------------------///

///--------------------------POPUP CLOSE----------------------------------///
popupList.forEach((popup) => {
    popup.addEventListener("mousedown", (evt) => {
        if (evt.target.classList.contains("popup_open")) {
            utils.closePopup(popup);
        }
        if (evt.target.classList.contains("popup__close")) {
            utils.closePopup(popup);
    }
});
});
///------------------------------------------------------------------------///

///--------------------------VALIDATION------------------------------------///
utils.profileFormValidator.enableValidation();
utils.cardFormValidator.enableValidation();

