/* ========================================================================== */
/* =                             IMPORTS                                    = */
/* ========================================================================== */

import Card from "../components/Card.js";
// import {
//     formSettings,
//     buttonSettings,
//     popupImageSettings,
//     profileFormValidator,
//     elementsSettings,
// } from "./constans.js";
// import { userInfo } from "./constans.js";
// import Popup from "../components/Popup.js";
// import PopupWithForm from "../components/PopupWithForm.js";
/* ========================================================================== */
/* =                             FUNCTIONS                                  = */
/* ========================================================================== */

// export function openPopup(popup) {
//     popup.classList.add("popup_open");
//     document.addEventListener("keydown", handleEscKey);
// }

// export function closePopup(popup) {
//     popup.classList.remove("popup_open");
//     document.removeEventListener("keydown", handleEscKey);
// }


// export function handleEscKey(evt) {
//     if (evt.key === "Escape") {
//         closePopup(document.querySelector(".popup_open"));
//     }
// }

export function createCard(item) {
    const card = new Card(item, "#card-template");
    const cardElement = card.renderCard();
    return cardElement;
}



