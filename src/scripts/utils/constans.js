/* ========================================================================== */
/* =                             IMPORTS                                    = */
/* ========================================================================== */

// import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import { initialCards } from "../components/cards.js";
// import { createCard } from "./utils.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Card from "../components/Card.js";
/* ========================================================================== */
/* =                               settings                                 = */
/* ========================================================================== */

export const formValidatorData = {
    formSelector: ".edit-form",
    inputSelector: ".edit-form__text-input",
    submitButtonSelector: ".edit-form__save",
    inactiveButtonClass: "edit-form__save_disabled",
    inputErrorClass: "edit-form__input_type_error",
    errorClass: "edit-form__error_visible",
};

export const elementsSettings = {
    mainPopupSelector: ".popup",
    cardListSelector: ".elements",
    editProfileSelector: ".popup_el_profile",
    addNewCardSelector: ".popup_el_new-place",
    cardTemplateSelector: "#card-template",
    cardSelector: ".element",
};

export const formSettings = {
    profileNameSelector: ".profile__name",
    profileAboutSelector: ".profile__about",
    cardNameInputSelector: "#title",
    cardLinkInputSelector: "#link",
    nameInputSelector: "#name",
    aboutInputSelector: "#about",
    addFormSelector: ".edit-form_el_new-place",
    profileFormSelector: ".edit-form_el_profile",
};
export const buttonSettings = {
    addNewCardButtonSelector: ".profile__add-button",
    editProfileButtonSelector: ".profile__edit-button",
    closeButtonSelector: ".popup__close",
};
export const popupImageSettings = {
    popupPreviewSelector: ".popup_el_preview",
    popupImageSelector: ".popup__image",
    popupImageTitleSelector: ".popup__description",
};
/* ========================================================================== */
/* =                            EXPORT VARIABLES                            = */
/* ========================================================================== */
///------------------------------BUTTONS-------------------------------------///
export const editProfileButton = document.querySelector(
    ".profile__edit-button"
);
export const closeProfileFormButton = document.querySelector(".popup__close");
export const openAddFormButton = document.querySelector(".profile__add-button");
export const closeAddFormButton = document.querySelector(
    ".popup__close_el_new-place"
);
export const addNewCardFormSubmit = document.querySelector(
    ".edit-form__save_el_new-place"
);
export const editformSubmit = document.querySelector(
    ".edit-form__save_el_profile"
);
export const cardPreviewClose = document.querySelector(
    ".popup__close_el_preview"
);
export const closeButton = ".popup__close";
export const editForm = document.querySelector(".edit-form");
///------------------------------PROFILE-------------------------------------///
export const editProfileForm = document.querySelector(".edit-form_el_profile");
// ///--------------------------------------------------------------------------///

// ///-------------------------------CARDS--------------------------------------///
export const addNewCardForm = document.querySelector(".edit-form_el_new-place");
export const cardList = document.querySelector(".elements");
export const cardName = document.querySelector("#title");
export const cardLink = document.querySelector("#link");
// ///--------------------------------------------------------------------------///

// ///-------------------------------POPUP--------------------------------------///
export const popupList = document.querySelectorAll(".popup");
// ///--------------------------------------------------------------------------///

export const editProfilePopup = document.querySelector(".popup_el_profile");
export const addNewCardPopup = document.querySelector(".popup_el_new-place");

export const nameInput = document.querySelector("#name");
export const aboutInput = document.querySelector("#about");
export const profileName = document.querySelector(".profile__name");
export const profileAbout = document.querySelector(".profile__about");

export const cardPreview = document.querySelector(".popup_el_preview");
export const popupImage = cardPreview.querySelector(".popup__image");
export const popupTitle = cardPreview.querySelector(".popup__description");

//==============================================================================//

///----------------------------EXPORT FORMVALIDATOR----------------------------///

// export const profileFormValidator = new FormValidator(
//     editProfilePopup,
//     formValidatorData,

// );
// export const cardFormValidator = new FormValidator(
//     addNewCardPopup,
//     formValidatorData,

// );

///----------------------------USER INFO----------------------------------///
export const userInfo = new UserInfo({
    nameSelector: ".profile__name",
    aboutSelector: ".profile__about",
});
///----------------------------POPUP WITH IMAGE----------------------------///

export const imagePreview = new PopupWithImage({
    popupSelector: ".popup_el_preview",
    imageSelector: ".popup__image",
    imageTitleSelector: ".popup__description",
});
///----------------------------CREATE CARD with POPUP WITH IMAGE----------------------------------///
export const createCard = ({name, link}) => {
    const card = new Card({
        name,
        link
    }, '#card-template', () => {
        imagePreview.open(name ,link);
    });
    const cardElement = card.generateCard();
    return cardElement;
};



///------------------------------SECTION------------------------------------///

export const cardsGallery = new Section(
    {
        items: initialCards,
        renderer: (item) => {
            cardsGallery.addItem(
                createCard({
                    name: item.name,
                    link: item.link,
                })
            );
        },
    },
    elementsSettings.cardListSelector
);
cardsGallery.renderItems();

///----------------------------POPUP FROM PROFILE----------------------------///
export const editProfile = new PopupWithForm(
    elementsSettings.editProfileSelector,
    (evt) => {
        evt.preventDefault();
        const { name, about } = editProfile.getInputValues();
        userInfo.setUserInfo({ name, about });
        editProfile.close();
    }
);

// ///----------------------------POPUP FROM ADD NEW CARD----------------------------///
export const addNewCard = new PopupWithForm(
    elementsSettings.addNewCardSelector,
    (evt) => {
        evt.preventDefault();
        const { title, link } = addNewCard.getInputValues();
        cardsGallery.addItem(
            createCard({
                name: title,
                link,
            })
        );
        addNewCard.close();
    }
);
