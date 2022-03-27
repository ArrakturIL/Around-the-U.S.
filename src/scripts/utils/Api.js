export default class Api {
    constructor(url, token) {
        this._url = url;
        this._token = token;
    }

    _fetch = (method, url, data) => {
        return fetch(`${this._url}${url}`, {
            method,
            headers: {
                authorization: this._token,
                "Content-Type": "application/json"
            },
            body: data && JSON.stringify(data)
        }).then(res => {
            if (res.ok) {
                return res.json();
            } else {
                return Promise.reject(`Error: ${res.status}`);
            }
        });
    }

    _handleError = err => Promise.reject(err);

    init = () => Promise.all([this._getInitialCards(), this._getUserInfo()])

    _getInitialCards = () => this._fetch("GET", "/cards")
    _getUserInfo = () => this._fetch("GET", "/users/me")
    updateUserInfo = ({name, about}) => this._fetch("PATCH", "/users/me", {name, about})
    updateUserImage = (avatar) => this._fetch("PATCH", "/users/me/avatar", {avatar})
    addCard = (name, link) => this._fetch("POST", "/cards", {name, link})
    deleteCard = (cardId) => this._fetch("DELETE", `/cards/${cardId}`)
    likeCard = (cardId) => this._fetch("PUT", `/cards/likes/${cardId}`)
    dislikeCard = (cardId) => this._fetch("DELETE", `/cards/likes/${cardId}`)
}