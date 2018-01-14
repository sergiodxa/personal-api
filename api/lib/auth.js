const uuid = require("uuid/v4");

class Auth {
  constructor() {
    this.token = null;
    this.pending = null;
    this.callback = null;
  }

  attempt(callback) {
    if (typeof callback !== "function") {
      throw new TypeError("The callback argument must be a function.");
    }
    this.pending = uuid();
    this.callback = callback;
    return this.pending;
  }

  approve(token) {
    if (this.pending === token) {
      this.token = token;
      this.pending = null;
      if (typeof this.callback === "function") {
        this.callback(null, token);
        this.callback = null;
      }
      return true;
    }
    if (typeof this.callback === "function") {
      this.callback(new ReferenceError("The token is invalid."));
      this.callback = null;
    }
    return false;
  }

  logout(token) {
    if (token !== this.token) {
      return true;
    }
    this.token = null;
    return true;
  }
}

module.exports = new Auth();
