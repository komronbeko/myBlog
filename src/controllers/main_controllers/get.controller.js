const Io = require("../../utils/Io");
const Posts = new Io("database/posts.json");

const get_controller = async (_, res) => {
  const posts = await Posts.read();
  const verifiedPosts = posts.filter(el=>el.isVerified === true);

  res.status(200).json(verifiedPosts);
};

const get_specific_controllers = async (req, res) => {
    try {
        const { id: post_id } = req.params;
        const verifyUser = req.verifyUser;
      
        const posts = await Posts.read();
      
        posts.forEach((el) => {
          if (el.id === post_id) {
            if (!el.views.includes(verifyUser)) {
              el.views.push(verifyUser);
              return el;
            }
          }
        });
      
        Posts.write(posts);
      
        const findPost = posts.find((el) => el.id === post_id);
        console.log(findPost);
      
        res.status(200).json(findPost);
        
    } catch (error) {
        res.status(403).json({message: error.message})
    }
};

module.exports = { get_controller, get_specific_controllers };
