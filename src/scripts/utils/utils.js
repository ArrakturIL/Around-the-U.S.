/* ========================================================================== */
/* =                             IMPORTS                                    = */
/* ========================================================================== */

import Card from "../Card.js";
import {
    editProfilePopup,
    nameInput,
    aboutInput,
    profileName,
    profileAbout,
    profileFormValidator,
} from "./constans.js";

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

export function openProfilePopup(evt) {
    evt.preventDefault();

    nameInput.value = profileName.textContent;
    aboutInput.value = profileAbout.textContent;
    profileFormValidator.resetValidation();
    openPopup(editProfilePopup);
}

export function handleEscKey(evt) {
    if (evt.key === "Escape") {
        closePopup(document.querySelector(".popup_open"));
    }
}

export function createCard(item) {
    const card = new Card(item, "#card-template");
    const cardElement = card.renderCard();
    return cardElement;
}
