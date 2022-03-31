/* ========================================================================== */
/* =                             IMPORTS                                    = */
/* ========================================================================== */
import Api from "../scripts/utils/Api.js";
import FormValidator from "../scripts/components/FormValidator.js";
import Section from "../scripts/components/Section.js";
// import { initialCards } from "../scripts/utils/cards.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import UserInfo from "../scripts/components/UserInfo.js";
import Card from "../scripts/components/Card.js";
import PopupWithConfirmation from "../scripts/components/PopupWithConfirmation.js";
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
    avatarEditButton,
    avatarEditFormPopup,
} from "../scripts/utils/settings.js";
import logoSRC from "../images/logo.svg";
import "./index.css";

/* ========================================================================== */
/* =                               API                                      = */
/* ========================================================================== */

const api = new Api(
    "https://around.nomoreparties.co/v1/group-12/",
    "32f9436c-0893-4974-9272-aec5c5f4dcc9"
);
///---------------------------INITIAL DATA-----------------------------------///
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

///----------------------------CREATE CARD + PREVIEW POPUP WITH IMAGE----------------------------------///
const createCard = (cardData) => {
    const card = new Card(
        cardData,
        userInfo.getUserId(),
        "#card-template",
        () => {
            imagePreview.open(cardData);
        },
        ".element__like-count",
        handleDeleteClick,
        handleLikeClick
    );
    const cardElement = card.generateCard();
    return cardElement;
};

/* ========================================================================== */
/* =                           CLASS INSTANCE                               = */
/* ========================================================================== */

///----------------------------FORMVALIDATOR----------------------------///

const profileFormValidator = new FormValidator(
    formValidatorData,
    editProfilePopup
);
const cardFormValidator = new FormValidator(formValidatorData, addNewCardPopup);

const avatarFormValidator = new FormValidator(
    formValidatorData,
    avatarEditFormPopup
);

///----------------------------USER INFO----------------------------------///
const userInfo = new UserInfo({
    nameSelector: formSettings.profileNameSelector,
    aboutSelector: formSettings.profileAboutSelector,
    avatarSelector: formSettings.profileAvatarSelector,
});
///----------------------------POPUP WITH IMAGE----------------------------///

const imagePreview = new PopupWithImage({
    popupSelector: popupImageSettings.popupPreviewSelector,
    imageSelector: popupImageSettings.popupImageSelector,
    imageTitleSelector: popupImageSettings.popupImageTitleSelector,
});

///------------------------------SECTION------------------------------------///

const cardsGallery = new Section(
    {
        renderer: (card) => {
            cardsGallery.addItem(createCard(card));
        },
    },
    elementsSettings.cardListSelector
);

///----------------------------POPUP FROM PROFILE----------------------------///

const profilePopup = new PopupWithForm(
    elementsSettings.editProfileSelector,
    ({ name, about }) => {
        profilePopup.renderButtonText("Saving...");

        api.updateUserInfo({ name, about })
            .then(() => {
                userInfo.setUserInfo({ name, about });
                profilePopup.close();
            })
            .catch((err) => {
                console.log(`Error.....: ${err}`);
            })
            .finally(() => {
                profilePopup.renderButtonText("Save");
            });
    }
);
///----------------------------POPUP FROM ADD NEW CARD----------------------------///
const cardPopup = new PopupWithForm(
    elementsSettings.addNewCardSelector,
    ({ title: name, link }) => {
        cardPopup.renderButtonText("Creating...");

        api.addCard(name, link)
            .then((card) => {
                cardsGallery.addItem(createCard(card));
                cardPopup.close();
            })
            .catch((err) => {
                console.log(`Error.....: ${err}`);
            })
            .finally(() => {
                cardPopup.renderButtonText("Create");
            });
    }
);

///----------------------------POPUP FORM AVATAR EDIT----------------------------///
const avatarEditPopup = new PopupWithForm(
    elementsSettings.avatarEditSelector,
    ({ avatar }) => {
        avatarEditPopup.renderButtonText("Saving...");
        api.updateUserImage(avatar)
            .then((avatar) => {
                userInfo.setUserAvatar(avatar);
                avatarEditPopup.close();
            })
            .catch((err) => {
                console.log(`Error.....: ${err}`);
            })
            .finally(() => {
                avatarEditPopup.renderButtonText("Save");
            });
    }
);

///----------------------------POPUP WITH CONFIRMATION----------------------------///

const deleteCardPopup = new PopupWithConfirmation(
    elementsSettings.deleteConfirmSelector,
    (cardId, cardElement) => {
        deleteCardPopup.renderButtonText("Deliting...");
        api.deleteCard(cardId)
            .then(() => {
                cardElement.remove();
            })
            .catch((err) => {
                console.log(`Error.....: ${err}`);
            })
            .finally(() => {
                deleteCardPopup.renderButtonText("Delete");
            });
    }
);

/* ========================================================================== */
/* =                               FUNCTIONS                                = */
/* ========================================================================== */

function fillProfileForm() {
    const { name, about } = userInfo.getUserInfo();
    nameInput.value = name;
    aboutInput.value = about;
}

function handleDeleteClick(cardId, cardElement) {
    deleteCardPopup.open(cardId, cardElement);
}

function handleLikeClick(cardId, cardElement) {
    const updateLikeCounts = (res) => cardElement.updateLikes(res.likes);
    if (cardElement.isLiked()) {
        api.dislikeCard(cardId)
            .then(updateLikeCounts)
            .catch((err) => {
                console.log(`Error.....: ${err}`);
            });
    } else {
        api.likeCard(cardId)
            .then(updateLikeCounts)
            .catch((err) => {
                console.log(`Error.....: ${err}`);
            });
    }
}

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

avatarEditButton.addEventListener("click", () => {
    avatarFormValidator.resetValidation();
    avatarEditPopup.open();
});

profileFormValidator.enableValidation();
cardFormValidator.enableValidation();
avatarFormValidator.enableValidation();
