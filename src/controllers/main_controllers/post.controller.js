const {v4: uuid} = require("uuid");

const Io = require("../../utils/Io");
const Posts = new Io("database/posts.json");

const Post = require("../../models/Post");

const post_controller = async (req, res) => {
    try {
        const {title, text} = req.body;
        const {image} = req.files;
        const user_id = req.verifyUser;
        const id = uuid();
        const date = new Date();

        const posts = await Posts.read();


        const imageName = `${uuid()}.${image.mimetype.split("/")[1]}`;

        image.mv(`${process.cwd()}/uploads/${imageName}`);

        const newPost = new Post(id, user_id, title, text, imageName, date);

        const newPosts = posts ? [...posts, newPost] : [newPost];
        
        Posts.write(newPosts);
        res.status(201).json({message: "Success"});
    } catch (error) {
        res.status(401).json({message: "Error", data: error.message})
    }
}

module.exports = post_controller;