class User{
    constructor(id, username, password, image, role){
        this.id = id;
        this.username = username;
        this.password = password;
        this.image = image;
        this.role = role
    }
}

module.exports = User;