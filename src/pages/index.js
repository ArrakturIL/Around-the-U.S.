/* ========================================================================== */
/* =                             IMPORTS                                    = */
/* ========================================================================== */
import Api from "../scripts/utils/Api.js";
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
    saveProfileButton,
} from "../scripts/utils/settings.js";
import logoSRC from "../images/logo.svg";
// import avatarSRC from "../images/avatar.jpg";
import "./index.css";

/* ========================================================================== */
/* =                               API                                      = */
/* ========================================================================== */

const api = new Api(
    "https://around.nomoreparties.co/v1/group-12/",
    "32f9436c-0893-4974-9272-aec5c5f4dcc9"
);
api.init()
    .then(([cards, user]) => {
        userInfo.setUserInfo(user);
        userInfo.setUserAvatar(user);
        cardsGallery.setItems(cards);
        cardsGallery.renderItems();
    })
    .catch((err) => {
        console.log(`Error.....: ${err}`);
    });

/* ========================================================================== */
/* =                               IMAGES                                   = */
/* ========================================================================== */
const pageLogo = document.querySelector("#logo");
pageLogo.src = logoSRC;
// const pageAvatar = document.querySelector("#avatar");
// pageAvatar.src = avatarSRC;

/* ========================================================================== */
/* =                               FUNCTIONS                                = */
/* ========================================================================== */

export function fillProfileForm() {
    const { name, about } = userInfo.getUserInfo();
    nameInput.value = name;
    aboutInput.value = about;
}

///----------------------------CREATE CARD with POPUP WITH IMAGE----------------------------------///
export const createCard = ({
    name,
    link,
    id,
    isOwner,
    likeCount,
    likedByOwner,
}) => {
    const card = new Card(
        {
            name,
            link,
            id,
            isOwner,
            likeCount,
            likedByOwner,
        },
        "#card-template",
        () => {
            imagePreview.open(name, link);
        },
        ".element__like-count"
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
    avatarSelector: formSettings.profileAvatarSelector,
});
///----------------------------POPUP WITH IMAGE----------------------------///

export const imagePreview = new PopupWithImage({
    popupSelector: popupImageSettings.popupPreviewSelector,
    imageSelector: popupImageSettings.popupImageSelector,
    imageTitleSelector: popupImageSettings.popupImageTitleSelector,
});

///------------------------------SECTION------------------------------------///

const cardsGallery = new Section(
    {
        renderer: (item) => {
            cardsGallery.addItem(
                createCard({
                    name: item.name,
                    link: item.link,
                    id: item.id,
                    isOwner: item.owner._id === userInfo.getUserId(),
                    likeCount: item.likes.length,
                    likedByOwner: item.likes.some(
                        (like) => like._id === userInfo.getUserId()
                    ),
                })
            );
        },
    },
    elementsSettings.cardListSelector
);

///----------------------------POPUP FROM PROFILE----------------------------///

export const profilePopup = new PopupWithForm(
    elementsSettings.editProfileSelector,
    (evt) => {
        evt.preventDefault();
        saveProfileButton.textContent = "Saving...";
        const { name, about } = profilePopup.getInputValues();
        api.updateUserInfo({ name, about })
            .then(() => {
                userInfo.setUserInfo({ name, about });
                profilePopup.close();
            })
            .catch((err) => {
                console.log(`Error.....: ${err}`);
            })
            .finally(() => {
                saveProfileButton.textContent = "Save";
            });
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
