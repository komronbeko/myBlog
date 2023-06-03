const fs = require('fs').promises;

const Io = require("../../utils/Io");
const Posts = new Io("database/posts.json");


const delete_controller = async (req, res) => {
  try {
    const post_id = req.params.id;

    const posts = await Posts.read();

    const findPost = posts.find(el=>el.id === post_id);

    if(!findPost){
        throw new Error("Book with this id is not detected");
    }
    
    posts.map(el =>{
        if (el.id === post_id) {
           fs.unlink(`${process.cwd()}/uploads/${el.image}`);
        }
    });


    const filteredPosts = posts.filter(el=>{
        if(el.id !== post_id){
            return el;
        }
    });

    Posts.write(filteredPosts);
    res.status(201).json({ message: "Success" });
  } catch (error) {
    res.status(401).json({ message: "Error", data: error.message });
  }
};

module.exports = delete_controller;
