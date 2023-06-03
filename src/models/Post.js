class Post{
    constructor(id, user_id, title, text, image, date, views = [], isVerified = false){
        this.id = id;
        this.user_id = user_id;
        this.title = title;
        this.text = text;
        this.image = image;
        this.date = date;
        this.views = views;
        this.isVerified = isVerified;
    }
}

module.exports = Post;