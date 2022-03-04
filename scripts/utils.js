/* ========================================================================== */
/* =                             IMPORTS                                    = */
/* ========================================================================== */

import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
/* ========================================================================== */
/* =                             VARIABLES                                  = */
/* ========================================================================== */
///------------------------------EXPORT VAR-------------------------------------///

export const nameInput = document.querySelector("#name");
export const aboutInput = document.querySelector("#about");
export const profileName = document.querySelector(".profile__name");
export const profileAbout = document.querySelector(".profile__about");

export const cardPreview = document.querySelector(".popup_el_preview");
export const popupImage = cardPreview.querySelector(".popup__image");
export const popupTitle = cardPreview.querySelector(".popup__description");
export const editProfilePopup = document.querySelector(".popup_el_profile");

/* ========================================================================== */
/* =                             FUNCTIONS                                  = */
/* ========================================================================== */

export function openPopup(popup) {
    popup.classList.add("popup_open");
    document.addEventListener("keydown", handleEscKey);
}

export function closePopup(popup) {
    popup.classList.remove("popup_open");
    document.removeEventListener("keydown", handleEscKey);
}

export function handleProfileFormSubmit(evt) {
    evt.preventDefault();

    const aboutValue = aboutInput.value;
    const nameValue = nameInput.value;

    profileName.textContent = nameValue;
    profileAbout.textContent = aboutValue;

    closePopup(editProfilePopup);
}

export function editProfileButtonHandler(evt) {
    evt.preventDefault();
    
    nameInput.value = profileName.textContent;
    aboutInput.value = profileAbout.textContent;
    openPopup(editProfilePopup);
}

export function handleEscKey(evt) {
    if (evt.key === "Escape") {
        closePopup(document.querySelector(".popup_open"));
    }
}

//enableValidation on all forms function
export function enableValidation(formElement) {
    new FormValidator(formValidatorData, formElement).enableValidation();
}

//resetValidation on all forms function
export function resetValidation(formElement) {
    new FormValidator(formValidatorData, formElement).resetValidation();
}

/* ========================================================================== */
/* =                             DATA                                       = */
/* ========================================================================== */

///------------------------------VALIDATOR-----------------------------------///

export const formValidatorData = {
    formSelector: ".edit-form",
    inputSelector: ".edit-form__text-input",
    submitButtonSelector: ".edit-form__save",
    inactiveButtonClass: "edit-form__save_disabled",
    inputErrorClass: "edit-form__input_type_error",
    errorClass: "edit-form__error_visible",
};
