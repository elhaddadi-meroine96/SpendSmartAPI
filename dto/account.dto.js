const userDTO = require("./user.dto")


class accountDTO{
    constructor({id, name, email, balance, User}){
        this.id = id,
        this.name = name,
        this.email = email,
        this.balance = balance
        this.User = User?.map(u => new userDTO(u))
    }
}

module.exports = accountDTO