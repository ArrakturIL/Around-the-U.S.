/* ========================================================================== */
/* =                             IMPORTS                                    = */
/* ========================================================================== */
import {
    userInfo,
    profileFormValidator,
    cardFormValidator,
    addNewCard,
    editProfile,
} from "../scripts/utils/constans.js";
import {
    editProfileButton,
    openAddFormButton,
    nameInput,
    aboutInput,
} from "../scripts/utils/settings.js";
import "./index.css";


/* ========================================================================== */
/* =                             EVENTLISTENERS                             = */
/* ========================================================================== */

editProfileButton.addEventListener("click", () => {
    editProfile.open();
    nameInput.value = userInfo.getUserInfo().name;
    aboutInput.value = userInfo.getUserInfo().about;
    profileFormValidator.resetValidation();
});

openAddFormButton.addEventListener("click", () => {
    cardFormValidator.resetValidation();
    addNewCard.open();
});


profileFormValidator.enableValidation();
cardFormValidator.enableValidation();
