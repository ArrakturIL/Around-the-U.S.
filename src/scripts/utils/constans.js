/* ========================================================================== */
/* =                             IMPORTS                                    = */
/* ========================================================================== */

import FormValidator from "../components/FormValidator.js";
import Section from '../components/Section.js';

import { initialCards } from "../components/cards.js";
import { createCard } from "./utils.js";

/* ========================================================================== */
/* =                               DATA                                     = */
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

/* ========================================================================== */
/* =                            EXPORT VARIABLES                            = */
/* ========================================================================== */

///------------------------------PROFILE-------------------------------------///
export const editProfileForm = document.querySelector(".edit-form");
export const editProfileButton = document.querySelector(".profile__edit-button");
export const closeProfileFormButton = document.querySelector(".popup__close");
///--------------------------------------------------------------------------///

///-------------------------------CARDS--------------------------------------///
export const openAddFormButton = document.querySelector(".profile__add-button");
export const closeAddFormButton = document.querySelector(".popup__close_el_new-place");
export const addNewCardFormSubmit = document.querySelector(
    ".edit-form__save_el_new-place"
);
export const addNewCardForm = document.querySelector(".edit-form_el_new-place");
export const cardPreviewClose = document.querySelector(".popup__close_el_preview");
export const cardList = document.querySelector(".elements");
export const cardName = document.querySelector("#title");
export const cardLink = document.querySelector("#link");
///--------------------------------------------------------------------------///

///-------------------------------POPUP--------------------------------------///
export const popupList = document.querySelectorAll(".popup");
///--------------------------------------------------------------------------///

export const editProfilePopup = document.querySelector(".popup_el_profile");
export const addNewCardPopup = document.querySelector(".popup_el_new-place");

export const nameInput = document.querySelector("#name");
export const aboutInput = document.querySelector("#about");
export const profileName = document.querySelector(".profile__name");
export const profileAbout = document.querySelector(".profile__about");

export const cardPreview = document.querySelector(".popup_el_preview");
export const popupImage = cardPreview.querySelector(".popup__image");
export const popupTitle = cardPreview.querySelector(".popup__description");

///----------------------------EXPORT FORMVALIDATOR----------------------------///

export const profileFormValidator = new FormValidator(
    formValidatorData,
    editProfilePopup
);
export const cardFormValidator = new FormValidator(
    formValidatorData,
    addNewCardPopup
);

///----------------------------SECTION----------------------------///
const cardListSelector = ".elements";
export const cardsGallery = new Section({
    items: initialCards,
    renderer: (item) => {
        cardsGallery.addItem(createCard({
            name: item.name,
            link: item.link,
        }));
    }
}, cardListSelector);