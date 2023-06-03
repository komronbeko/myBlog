const fs = require("fs").promises;
const { v4: uuid } = require("uuid");

const Io = require("../../utils/Io");
const Posts = new Io("database/posts.json");


const put_controller = async (req, res) => {
  try {
    const { title, text} = req.body;
    const { image } = req.files;

    const post_id = req.params.id;
    const date = new Date();

    const posts = await Posts.read();

    const findPost = posts.find(el=>el.id === post_id);

    if(!findPost){
        throw new Error("Book with this id is not detected");
    }

    const imageName = `${uuid()}.${image.mimetype.split("/")[1]}`;

    image.mv(`${process.cwd()}/uploads/${imageName}`);

    posts.forEach((el) => {
      if (el.id === post_id) {
        fs.unlink(`${process.cwd()}/uploads/${el.image}`);
        el.title = title;
        el.text = text;
        el.image = imageName;
        el.date = date;
        return el;
      }
    });

    Posts.write(posts);
    res.status(201).json({ message: "Success" });
  } catch (error) {
    res.status(401).json({ message: "Error", data: error.message });
  }
};

module.exports = put_controller;
