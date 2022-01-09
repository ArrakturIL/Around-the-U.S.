let editButton = document.querySelector(".profile__edit-button");

let closeButton = document.querySelector(".popup__close");

let editForm = document.querySelector(".popup");

let formElement = document.querySelector(".edit-form");

let nameInput = document.querySelector("#name");
let aboutInput = document.querySelector("#about");

let profileName = document.querySelector(".profile__name");
let profileAbout = document.querySelector(".profile__about");

function closeEditForm() {
    editForm.classList.add("popup_hidden");
}

function openEditForm() {
    editForm.classList.remove("popup_hidden");
    
    nameInput.value = profileName.textContent;
    aboutInput.value = profileAbout.textContent;
}

function handleProfileFormSubmit(evt) {
    evt.preventDefault();

    let nameValue = nameInput.value;

    profileName.textContent = nameValue;

    let aboutValue = aboutInput.value;

    profileAbout.textContent = aboutValue;

    closeEditForm();
}

formElement.addEventListener("submit", handleProfileFormSubmit);

editButton.addEventListener("click", openEditForm);

closeButton.addEventListener("click", closeEditForm);
