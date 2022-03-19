import { formSettings } from "../utils/constans.js";

export default class UserInfo {
    constructor({ name, about }) {
        this._nameSelector = name;
        this._aboutSelector = about;
        this._nameElement = document.querySelector(formSettings.profileNameSelector);
        this._aboutElement = document.querySelector(formSettings.profileAboutSelector);
    }

    getUserInfo() {
     this._info = {}
        this._info.name = this._nameElement.textContent;
        this._info.about = this._aboutElement.textContent;
        return this._info;
    }

    setUserInfo({ name, about }) {
        this._nameElement.textContent = name;
        this._aboutElement.textContent = about;
    }
}
