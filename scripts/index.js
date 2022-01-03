let editButton = document.querySelector(".profile__edit-button");

let closeButton = document.querySelector(".popup__close");

let editForm = document.querySelector(".popup");

function openEditForm() {
    editForm.classList.remove("popup_hidden");
}

editButton.addEventListener("click", openEditForm);

function closeEditForm() {
    editForm.classList.add("popup_hidden");
}

closeButton.addEventListener("click", closeEditForm);


let formElement = document.querySelector(".edit-form");

let nameInput = document.querySelector("#name");
let aboutInput = document.querySelector("#about");

nameInput.value = 'Jacques Cousteau'
aboutInput.value = 'Explorer'



function handleProfileFormSubmit(evt) {
   
    evt.preventDefault();
    
    let nameValue = nameInput.value
    let profileName = document.querySelector('.profile__name')
    profileName.textContent = nameValue
   
    let aboutValue = aboutInput.value
    let profileAbout = document.querySelector('.profile__about')
    profileAbout.textContent = aboutValue

    closeEditForm();
}


formElement.addEventListener("submit", handleProfileFormSubmit);

let likeButton = document.querySelectorAll('.element__post-like')
for (let i = 0; i < likeButton.length; i++) {
    likeButton[i].addEventListener('click', function () {
        likeButton[i].classList.toggle('element__post-like')
    }) 
}