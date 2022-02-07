const editButton = document.querySelector(".profile__edit-button");

const closeButton = document.querySelector(".popup__close");

const editForm = document.querySelector(".popup");

const formElement = document.querySelector(".edit-form");

const nameInput = document.querySelector("#name");
const aboutInput = document.querySelector("#about");

let profileName = document.querySelector(".profile__name");
let profileAbout = document.querySelector(".profile__about");

function openPopup (popup) {
    popup.classList.remove("popup_hidden");
}

function closePopup (popup) {
    popup.classList.add("popup_hidden");
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
