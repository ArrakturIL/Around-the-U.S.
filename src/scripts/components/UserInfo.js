import { formSettings } from "../utils/settings.js";

export default class UserInfo {
    constructor({nameSelector,aboutSelector}) {
        this._nameElement = document.querySelector(nameSelector);
        this._aboutElement = document.querySelector(aboutSelector);
    }

    getUserInfo() {
     const info = {}
        info.name = this._nameElement.textContent;
        info.about = this._aboutElement.textContent;
        return info;
    }

    setUserInfo({ name, about }) {
        this._nameElement.textContent = name;
        this._aboutElement.textContent = about;
    }
}
