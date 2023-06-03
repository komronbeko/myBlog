const Io = require("../../utils/Io");
const LikedPosts = new Io("database/likes.json");

const Like = require("../../models/Like&View");

const likes_put_controller = async (req, res) => {
  try {
    const { id: post_id } = req.params;
    const user_id = req.verifyUser;

    let likedPosts = await LikedPosts.read();

    const findPost = likedPosts.find(
      (el) => el.post_id === post_id && el.user_id === user_id
    );


    if (!findPost) {
      const id = (likedPosts[likedPosts.length - 1]?.id || 0) + 1;
      const newLike = new Like(id, post_id, user_id);
      likedPosts.push(newLike);
    }
     else {
      const filetered = likedPosts.filter(
        (el) =>
          el.post_id !== findPost.post_id || el.user_id !== findPost.user_id
      );
      likedPosts = filetered;
    }

    LikedPosts.write(likedPosts);

    res.status(200).json({ message: "success" });
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};

module.exports = likes_put_controller;
