/* ========================================================================== */
/* =                             IMPORTS                                    = */
/* ========================================================================== */

import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import { initialCards } from "../components/cards.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Card from "../components/Card.js";
import {
    formValidatorData,
    elementsSettings,
    formSettings,
    popupImageSettings,
    editProfilePopup,
    addNewCardPopup,
} from "../utils/settings.js";
import logoSRC from "../../images/logo.svg";
import avatarSRC from "../../images/avatar.jpg";



/* ========================================================================== */
/* =                               IMAGES                                   = */
/* ========================================================================== */
const pageLogo = document.querySelector("#logo");
pageLogo.src = logoSRC;
const pageAvatar = document.querySelector("#avatar");
pageAvatar.src = avatarSRC;
/* ========================================================================== */
/* =                               SETTINGS                                 = */
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
