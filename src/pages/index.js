/* ========================================================================== */
/* =                             IMPORTS                                    = */
/* ========================================================================== */

import { initialCards as items } from "../scripts/cards.js";
import * as utils from "../scripts/utils/utils.js";
import {
    editProfileForm,
    editProfileButton,
    openAddFormButton,
    addNewCardForm,
    cardList,
    cardName,
    cardLink,
    popupList,
    profileFormValidator,
    cardFormValidator,
    addNewCardPopup
} from "../scripts/utils/constans.js";

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

editProfileButton.addEventListener("click", utils.openProfilePopup);

addNewCardForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const card = utils.createCard({
        name: cardName.value,
        link: cardLink.value,
    });
    cardList.prepend(card);
    utils.closePopup(addNewCardPopup);
    addNewCardForm.reset();
});

openAddFormButton.addEventListener("click", () => {
    utils.openPopup(addNewCardPopup);
    cardFormValidator.resetValidation();
    addNewCardForm.reset();
});
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
profileFormValidator.enableValidation();
cardFormValidator.enableValidation();
