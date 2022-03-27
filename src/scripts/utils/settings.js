export const formValidatorData = {
    formSelector: ".edit-form",
    inputSelector: ".edit-form__text-input",
    submitButtonSelector: ".edit-form__save",
    inactiveButtonClass: "edit-form__save_disabled",
    inputErrorClass: "edit-form__input_type_error",
    errorClass: "edit-form__error_visible",
};

export const elementsSettings = {
    mainPopupSelector: ".popup",
    cardListSelector: ".elements",
    editProfileSelector: ".popup_el_profile",
    addNewCardSelector: ".popup_el_new-place",
    cardTemplateSelector: "#card-template",
    cardSelector: ".element",
    deleteConfirmSelector: ".popup_el_delete",
    avatarEditSelector: ".popup_el_avatar",
};

export const formSettings = {
    profileNameSelector: ".profile__name",
    profileAboutSelector: ".profile__about",
    cardNameInputSelector: "#title",
    cardLinkInputSelector: "#link",
    nameInputSelector: "#name",
    aboutInputSelector: "#about",
    addFormSelector: ".edit-form_el_new-place",
    profileFormSelector: ".edit-form_el_profile",
    profileAvatarSelector: ".profile__avatar",
};
export const buttonSettings = {
    addNewCardButtonSelector: ".profile__add-button",
    editProfileButtonSelector: ".profile__edit-button",
    closeButtonSelector: ".popup__close",
};
export const popupImageSettings = {
    popupPreviewSelector: ".popup_el_preview",
    popupImageSelector: ".popup__image",
    popupImageTitleSelector: ".popup__description",
};
/* ========================================================================== */
/* =                            EXPORT VARIABLES                            = */
/* ========================================================================== */
///------------------------------BUTTONS-------------------------------------///
export const editProfileButton = document.querySelector(
    ".profile__edit-button"
);
export const openAddFormButton = document.querySelector(".profile__add-button");
export const editProfilePopup = document.querySelector(".popup_el_profile");
export const addNewCardPopup = document.querySelector(".popup_el_new-place");
export const nameInput = document.querySelector("#name");
export const aboutInput = document.querySelector("#about");
export const saveProfileButton = document.querySelector(".edit-form__save_el_profile");
export const saveNewCardButton = document.querySelector(".edit-form__save_el_new-place");
export const avatarEditButton = document.querySelector(".profile__avatar-edit");
export const avatarSubmitButton = document.querySelector(".edit-form__save_el_avatar");
export const avatarEditFormPopup = document.querySelector(".popup_el_avatar");
//==============================================================================//




