const Io = require("../../utils/Io");
const LikedPosts = new Io("database/likes.json");

const likes_get_controller = async(req, res)=>{
    try {
        const {id} = req.params;
        const likedPosts = await LikedPosts.read();

        const exactPost = likedPosts.filter(el=> el.post_id === id)
        res.status(200).json(exactPost);
    } catch (error) {
        res.status(403).json({message: error.message})
    }
}

module.exports = likes_get_controller;