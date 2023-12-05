const data = require("../user.json");
class Validate {
  static emailExist(email) {
    const user = data.find((val) => val.email === email);
    if (user) {
      return true;
    } else {
      return false;
    }
  }
}

module.exports = Validate;
