///Profile Edit///

const editProfileButton = document.querySelector(".profile__edit-button");

const closeProfileFormButton = document.querySelector(".popup__close");

const editProfilePopup = document.querySelector(".popup_el_profile");

const editProfileForm = document.querySelector(".edit-form");

const nameInput = document.querySelector("#name");
const aboutInput = document.querySelector("#about");

const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");

function openPopup(popup) {
    popup.classList.add("popup_open");
    document.addEventListener("keydown", handleEscKey);
}

function closePopup(popup) {
    popup.classList.remove("popup_open");
    document.removeEventListener("keydown", handleEscKey);
}

function handleProfileFormSubmit(evt) {
    evt.preventDefault();

    const nameValue = nameInput.value;

    profileName.textContent = nameValue;

    const aboutValue = aboutInput.value;

    profileAbout.textContent = aboutValue;

    closePopup(editProfilePopup);
}

function editProfileButtonHandler(evt) {
    evt.preventDefault();

    nameInput.value = profileName.textContent;
    aboutInput.value = profileAbout.textContent;
    openPopup(editProfilePopup);
    editProfileForm.reset();
}
editProfileForm.addEventListener("submit", handleProfileFormSubmit);

editProfileButton.addEventListener("click", editProfileButtonHandler);

closeProfileFormButton.addEventListener("click", () => {
    closePopup(editProfilePopup);
});

///PopupList///
const popupList = document.querySelectorAll(".popup");

///closing  popup esc key function///
function handleEscKey(evt) {
    if (evt.key === "Escape") {
        closePopup(document.querySelector(".popup_open"));
    }
};
///closing popup overlay click///
popupList.forEach((popup) => {
    popup.addEventListener("click", (evt) => {
        if (evt.target.classList.contains("popup_open")) {
            closePopup(evt.target);
        }
    });
});

///initial cards///

const initialCards = [
    {
        name: "Yosemite Valley",
        link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
    },
    {
        name: "Lake Louise",
        link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
    },
    {
        name: "Bald Mountains",
        link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
    },
    {
        name: "Latemar",
        link: "https://code.s3.yandex.net/web-code/latemar.jpg",
    },
    {
        name: "Vanoise National Park",
        link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
    },
    {
        name: "Lago di Braies",
        link: "https://code.s3.yandex.net/web-code/lago.jpg",
    },
];

///cards///
const openAddFormButton = document.querySelector(".profile__add-button");
const closeAddFormButton = document.querySelector(".popup__close_el_new-place");
const addNewCardPopup = document.querySelector(".popup_el_new-place");
const addNewCardFormSubmit = document.querySelector(
    ".edit-form__save_el_new-place"
);
const addNewCardForm = document.querySelector(".edit-form_el_new-place");
const cardTemplate = document.querySelector("#card-template").content;
const cardPreview = document.querySelector(".popup_el_preview");
const cardPreviewClose = document.querySelector(".popup__close_el_preview");
const cardName = document.querySelector("#title");
const cardLink = document.querySelector("#link");

///Cards container///
const cardList = document.querySelector(".elements");

//function for creating new card//

function createCardElement(card) {
    const cardElement = cardTemplate.cloneNode(true);
    const cardImage = cardElement.querySelector(".element__post-img");
    const cardTitle = cardElement.querySelector(".element__post-name");
    const cardDelete = cardElement.querySelector(".element__delete");
    const cardLike = cardElement.querySelector(".element__post-like");

    const { name, link } = card;
    cardImage.src = card.link;
    cardImage.alt = card.name;
    cardTitle.textContent = card.name;

    cardImage.addEventListener("click", () => {
        openImagePreview(card);
    });

    cardLike.addEventListener("click", () => {
        cardLike.classList.toggle("element__post-like_active");
    });

    cardDelete.addEventListener("click", (evt) => {
        evt.target.closest(".element").remove();
    });

    return cardElement;
}

///render cards///

function renderCard(card) {
    cardList.prepend(createCardElement(card));
}
///initial cards render///

initialCards.forEach((crad) => {
    renderCard(crad);
});

addNewCardForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const card = {
        name: cardName.value,
        link: cardLink.value,
    };
    renderCard(card);
    closePopup(addNewCardPopup);
    addNewCardForm.reset();
});

const openImagePreview = (card) => {
    openPopup(cardPreview);
    const popupImage = cardPreview.querySelector(".popup__image");
    const popupTitle = cardPreview.querySelector(".popup__description");
    popupImage.src = card.link;
    popupTitle.textContent = card.name;
    popupImage.alt = card.name;
};

cardPreviewClose.addEventListener("click", () => {
    closePopup(cardPreview);
});

openAddFormButton.addEventListener("click", () => {
    openPopup(addNewCardPopup);
    addNewCardForm.reset();
});

closeAddFormButton.addEventListener("click", () => {
    closePopup(addNewCardPopup);
});
