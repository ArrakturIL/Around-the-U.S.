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
    saveProfileButton,
    saveNewCardButton,
    avatarEditButton,
    avatarSubmitButton,
    avatarEditFormPopup
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
const createCard = ({ name, link, id, isOwner, likeCount, likedByOwner }) => {
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
            cardsGallery.addItem(renderCard(card));
        },
    },
    elementsSettings.cardListSelector
);

///----------------------------POPUP FROM PROFILE----------------------------///

const profilePopup = new PopupWithForm(
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
///----------------------------POPUP FROM ADD NEW CARD----------------------------///
const cardPopup = new PopupWithForm(
    elementsSettings.addNewCardSelector,
    (evt) => {
        evt.preventDefault();
        saveNewCardButton.textContent = "Creating...";
        const { title, link } = cardPopup.getInputValues();
        api.addCard(title, link)
            .then((card) => {
                cardsGallery.addItem(renderCard(card));
                cardPopup.close();
            })
            .catch((err) => {
                console.log(`Error.....: ${err}`);
            })
            .finally(() => {
                saveNewCardButton.textContent = "Create";
            });
    }
);
///----------------------------POPUP FORM AVATAR EDIT----------------------------///
const avatarEditPopup = new PopupWithForm(
    elementsSettings.avatarEditSelector,
    (evt) => {
        evt.preventDefault();
        avatarSubmitButton.textContent = "Saving...";
        const {avatar} = avatarEditPopup.getInputValues();
        api.updateUserImage(avatar)
            .then((avatar) => {
                userInfo.setUserAvatar(avatar);
                avatarEditPopup.close();
            })
            .catch((err) => {
                console.log(`Error.....: ${err}`);
            })
            .finally(() => {
                avatarSubmitButton.textContent = "Save";
            });
    }
);

///----------------------------POPUP WITH CONFIRMATION----------------------------///

const deleteCardPopup = new PopupWithConfirmation(
    elementsSettings.deleteConfirmSelector,
    handleConfirmDeleteCard
);

/* ========================================================================== */
/* =                               FUNCTIONS                                = */
/* ========================================================================== */

function fillProfileForm() {
    const { name, about } = userInfo.getUserInfo();
    nameInput.value = name;
    aboutInput.value = about;
}

function renderCard(card) {
    const { name, link, likes, owner, _id: id } = card;
    const isOwner = owner._id === userInfo.getUserId();
    const likeCount = likes.length;
    const likedByOwner = likes.some((like) => like._id == userInfo.getUserId());
    return createCard({ name, link, isOwner, id, likeCount, likedByOwner });
}

function handleDeleteClick(cardId, cardElement) {
    deleteCardPopup.open(cardId, cardElement);
}

function handleConfirmDeleteCard(cardId, cardElement) {
    api.deleteCard(cardId)
        .then(() => {
            cardElement.remove();
        })
        .catch((err) => {
            console.log(`Error.....: ${err}`);
        });
}

function handleLikeClick(cardId, liked, cardElement) {
    const updateLikeCount = (res) =>
        cardElement.updateLikeCount(res.likes.length);
    if (liked) {
        api.likeCard(cardId)
            .then(updateLikeCount)
            .catch((err) => {
                console.log(`Error.....: ${err}`);
            });
    } else {
        api.dislikeCard(cardId)
            .then(updateLikeCount)
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
