/* ========================================================================== */
/* =                             IMPORTS                                    = */
/* ========================================================================== */

import {
//     profileFormValidator,
//     cardFormValidator,
    cardsGallery,
    userInfo,
    editProfileButton,
    openAddFormButton,
    addNewCardForm,
    addNewCard,
    nameInput,
    aboutInput,
    editProfile,
} from "../scripts/utils/constans.js";




/* ========================================================================== */
/* =                             EVENTLISTENERS                             = */
/* ========================================================================== */

editProfileButton.addEventListener("click", () => {
    editProfile.open();
    nameInput.value = userInfo.getUserInfo().name;
    aboutInput.value = userInfo.getUserInfo().about;
});


openAddFormButton.addEventListener("click", () => {
    addNewCard.open();
});

editProfile.setEventListeners();
addNewCard.setEventListeners();

// profileFormValidator.enableValidation();
// cardFormValidator.enableValidation();

///--------------------------POPUP CLOSE----------------------------------///
// popupList.forEach((popup) => {
//     popup.addEventListener("mousedown", (evt) => {
//         if (evt.target.classList.contains("popup_open")) {
//             utils.closePopup(popup);
//         }
//         if (evt.target.classList.contains("popup__close")) {
//             utils.closePopup(popup);
//     }
// });
// });
///------------------------------------------------------------------------///