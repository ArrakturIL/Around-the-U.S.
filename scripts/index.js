///Profile Edit///

const editButton = document.querySelector(".profile__edit-button");

const closeButton = document.querySelector(".popup__close");

const editForm = document.querySelector(".popup");

const formElement = document.querySelector(".edit-form");

const nameInput = document.querySelector("#name");
const aboutInput = document.querySelector("#about");

let profileName = document.querySelector(".profile__name");
let profileAbout = document.querySelector(".profile__about");

function openPopup(popup) {
    popup.classList.add("popup_open");
}

function closePopup(popup) {
    popup.classList.remove("popup_open");
}

function handleProfileFormSubmit(evt) {
    evt.preventDefault();

    let nameValue = nameInput.value;

    profileName.textContent = nameValue;

    let aboutValue = aboutInput.value;

    profileAbout.textContent = aboutValue;

    closePopup(editForm);
}

formElement.addEventListener("submit", handleProfileFormSubmit);

editButton.addEventListener("click", () => {
    openPopup(editForm);
    nameInput.value = profileName.textContent;
    aboutInput.value = profileAbout.textContent;
});

closeButton.addEventListener("click", () => {
    closePopup(editForm);
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
const openAddForm = document.querySelector(".profile__add-button");
const formNewCardClose = document.querySelector(".popup__close_el_new-place");
const addNewCard = document.querySelector(".popup_el_new-place");
const formNewCardSubmit = document.querySelector(
    ".edit-form__save_el_new-place"
);
const formNewCard = document.querySelector(".edit-form_el_new-place");
const cardTemplate = document.querySelector("#card-template").content;
const cardPreview = document.querySelector(".popup_el_preview");
const cardPreviewClose = document.querySelector(".popup__close_el_preview");
let cardName = document.querySelector("#title");
let cardLink = document.querySelector("#link");

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

//function formNewCardSubmitHandler(evt) {
//    evt.preventDefault();
//
//   const card = {
//        name: cardName.value,
//        link: cardLink.value,
 //   };
//    formNewCard.reset();
//    renderCard(card);
 //   closePopup(addNewCard);
//}

formNewCard.addEventListener("submit", (evt) => {
    const card = {
        name: cardName.value,
        link: cardLink.value,
    };
    renderCard(card);
    evt.preventDefault();
    closePopup(addNewCard);
    formNewCard.reset();
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

openAddForm.addEventListener("click", () => {
    openPopup(addNewCard);
});

formNewCardClose.addEventListener("click", () => {
    closePopup(addNewCard);
});

//formNewCardSubmit.addEventListener("submit", formNewCardSubmitHandler);

