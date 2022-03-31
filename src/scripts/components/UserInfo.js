
export default class UserInfo {
    constructor({ nameSelector, aboutSelector, avatarSelector }) {
        this._nameElement = document.querySelector(nameSelector);
        this._aboutElement = document.querySelector(aboutSelector);
        this._avatarElement = document.querySelector(avatarSelector);
    }

    getUserInfo() {
        const info = {};
        info.name = this._nameElement.textContent;
        info.about = this._aboutElement.textContent;
        return info;
    }

    setUserInfo({ name, about, _id }) {
        this._nameElement.textContent = name;
        this._aboutElement.textContent = about;
        this._userId = _id;
    }
    getUserId = () => this._userId;

    setUserAvatar({ avatar }) {
        this._avatarElement.style.backgroundImage = `url(${avatar})`;
    }
}
