/* ========================================================================== */
/* =                             IMPORTS                                    = */
/* ========================================================================== */

import * as utils from "../scripts/utils/utils.js";
import {
    formSettings,
    cardFormValidator,
    cardsGallery,
    profileFormValidator,
    buttonSettings,
    popupImageSettings,
    editProfilePopup,
    addNewCardPopup,
    userInfo,
} from "../scripts/utils/constans.js";

/* ========================================================================== */
/* =                             CARDRENDER                                 = */
/* ========================================================================== */

cardsGallery.renderItems();

///--------------------------------------------------------------------------///

/* ========================================================================== */
/* =                             EVENTLISTENERS                             = */
/* ========================================================================== */
editProfilePopup.setEventListeners();
addNewCardPopup.setEventListeners();

buttonSettings.editProfileButtonSelector.addEventListener("click", () => {
    editProfilePopup.open();
    const{name, about} = userInfo.getUserInfo();
    formSettings.profileForm.name.value = name;
    formSettings.profileForm.about.value = about;
    profileFormValidator.enableValidation();
});

buttonSettings.addNewCardButtonSelector.addEventListener("click", () => {
    addNewCardPopup.open();
    cardFormValidator.enableValidation();
});

