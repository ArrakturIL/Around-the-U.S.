import Card from "./Card.js";

const nameInput = document.querySelector("#name");
const aboutInput = document.querySelector("#about");
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");

export const cardPreview = document.querySelector(".popup_el_preview");
export const popupImage = cardPreview.querySelector(".popup__image");
export const popupTitle = cardPreview.querySelector(".popup__description");
export const editProfilePopup = document.querySelector(".popup_el_profile");


export function openPopup(popup) {
    popup.classList.add("popup_open");
    document.addEventListener("keydown", handleEscKey);
}

export function closePopup(popup) {
    popup.classList.remove("popup_open");
    document.removeEventListener("keydown", handleEscKey);
}

export function handleProfileFormSubmit(evt) {
    evt.preventDefault();

    const nameValue = nameInput.value;

    profileName.textContent = nameValue;

    const aboutValue = aboutInput.value;

    profileAbout.textContent = aboutValue;

    closePopup(editProfilePopup);
}

export function editProfileButtonHandler(evt) {
    evt.preventDefault();

    nameInput.value = profileName.textContent;
    aboutInput.value = profileAbout.textContent;
    openPopup(editProfilePopup);
}

 ///closing  popup esc key function///
export function handleEscKey(evt) {
    if (evt.key === "Escape") {
        closePopup(document.querySelector(".popup_open"));
    }
}


//const openImagePreview = (card) => {
//    openPopup(cardPreview);
//    const popupImage = cardPreview.querySelector(".popup__image");
//    const popupTitle = cardPreview.querySelector(".popup__description");
//    popupImage.src = card.link;
//    popupTitle.textContent = card.name;
//    popupImage.alt = card.name;
//};