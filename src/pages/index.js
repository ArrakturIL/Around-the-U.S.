/* ========================================================================== */
/* =                             IMPORTS                                    = */
/* ========================================================================== */

import FormValidator from "../scripts/components/FormValidator.js";
import Section from "../scripts/components/Section.js";
import { initialCards } from "../scripts/utils/cards.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import UserInfo from "../scripts/components/UserInfo.js";
import Card from "../scripts/components/Card.js";
import {
    formValidatorData,
    elementsSettings,
    formSettings,
    popupImageSettings,
    editProfilePopup,
    addNewCardPopup,
    editProfileButton,
    openAddFormButton,
    nameInput,
    aboutInput,
} from "../scripts/utils/settings.js";
import logoSRC from "../images/logo.svg";
import avatarSRC from "../images/avatar.jpg";
import "./index.css";

/* ========================================================================== */
/* =                               IMAGES                                   = */
/* ========================================================================== */
const pageLogo = document.querySelector("#logo");
pageLogo.src = logoSRC;
const pageAvatar = document.querySelector("#avatar");
pageAvatar.src = avatarSRC;

/* ========================================================================== */
/* =                               FUNCTIONS                                = */
/* ========================================================================== */

export function fillProfileForm() {
    const { name, about } = userInfo.getUserInfo();
    nameInput.value = name;
    aboutInput.value = about;
}

///----------------------------CREATE CARD with POPUP WITH IMAGE----------------------------------///
export const createCard = ({ name, link }) => {
    const card = new Card(
        {
            name,
            link,
        },
        "#card-template",
        () => {
            imagePreview.open(name, link);
        }
    );
    const cardElement = card.generateCard();
    return cardElement;
};

/* ========================================================================== */
/* =                           CLASS INSTANCE                               = */
/* ========================================================================== */

///----------------------------FORMVALIDATOR----------------------------///

export const profileFormValidator = new FormValidator(
    formValidatorData,
    editProfilePopup
);
export const cardFormValidator = new FormValidator(
    formValidatorData,
    addNewCardPopup
);

///----------------------------USER INFO----------------------------------///
export const userInfo = new UserInfo({
    nameSelector: formSettings.profileNameSelector,
    aboutSelector: formSettings.profileAboutSelector,
});
///----------------------------POPUP WITH IMAGE----------------------------///

export const imagePreview = new PopupWithImage({
    popupSelector: popupImageSettings.popupPreviewSelector,
    imageSelector: popupImageSettings.popupImageSelector,
    imageTitleSelector: popupImageSettings.popupImageTitleSelector,
});

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
export const profilePopup = new PopupWithForm(
    elementsSettings.editProfileSelector,
    (evt) => {
        evt.preventDefault();
        const { name, about } = profilePopup.getInputValues();
        userInfo.setUserInfo({ name, about });
        profilePopup.close();
    }
);

// ///----------------------------POPUP FROM ADD NEW CARD----------------------------///
export const cardPopup = new PopupWithForm(
    elementsSettings.addNewCardSelector,
    (evt) => {
        evt.preventDefault();
        const { title, link } = cardPopup.getInputValues();
        cardsGallery.addItem(
            createCard({
                name: title,
                link,
            })
        );
        cardPopup.close();
    }
);


/* ========================================================================== */
/* =                             EVENTLISTENERS                             = */
/* ========================================================================== */

editProfileButton.addEventListener("click", () => {
    profilePopup.open();
    fillProfileForm();
    profileFormValidator.resetValidation();
});

openAddFormButton.addEventListener("click", () => {
    cardFormValidator.resetValidation();
    cardPopup.open();
});

profileFormValidator.enableValidation();
cardFormValidator.enableValidation();
