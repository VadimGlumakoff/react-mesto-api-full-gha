const options = {
  baseUrl: "http://domainglumakoff.students.nomoredomainsrocks.ru/api",
  headers: {
    "Content-Type": "application/json",
  }
}

// "https://mesto.nomoreparties.co/v1/cohort-63"

class Api {
  constructor(options) {
    this.url = options.baseUrl;
    this.headers = options.headers;
  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(res.status);
  }

  getInitialCards() {
    return fetch(`${this.url}/cards`, {
      method: "GET",
      credentials: "include",
      headers: this.headers,
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  addCard(data) {
    return fetch(`${this.url}/cards`, {
      method: "POST",
      credentials: "include",
      headers: this.headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  getUserInfo() {
    return fetch(`${this.url}/users/me`, {
      method: "GET",
      credentials: "include",
      headers: this.headers,
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  editUserInfo(data) {
    return fetch(`${this.url}/users/me`, {
      method: "PATCH",
      credentials: "include",
      headers: this.headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  changeLikeCardStatus(cardId, status) {
    console.log(status, cardId)
    if (status) {
      return fetch(`${this.url}/cards/${cardId}/likes`, {
        method: "PUT",
        credentials: "include",
        headers: this.headers,
      }).then((res) => {
        return this._checkResponse(res);
      });
    } else {
      return fetch(`${this.url}/cards/${cardId}/likes`, {
        method: "DELETE",
        credentials: "include",
        headers: this.headers,
      }).then((res) => {
        return this._checkResponse(res);
      });
    }
  }

  addLike(cardId) {
    return fetch(`${this.url}/cards/${cardId}/likes`, {
      method: "PUT",
      credentials: "include",
      headers: this.headers,
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  removeLike(cardId) {
    return fetch(`${this.url}/cards/${cardId}/likes`, {
      method: "DELETE",
      credentials: "include",
      headers: this.headers,
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  editAvatar(url) {
    return fetch(`${this.url}/users/me/avatar`, {
      method: "PATCH",
      credentials: "include",
      headers: this.headers,
      body: JSON.stringify({
        avatar: url,
      }),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  removeCard(cardId) {
    return fetch(`${this.url}/cards/${cardId}`, {
      method: "DELETE",
      credentials: "include",
      headers: this.headers,
    }).then((res) => {
      return this._checkResponse(res);
    });
  }


}

const api = new Api(options)

export default api