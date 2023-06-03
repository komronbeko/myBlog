const Io = require("../../utils/Io");
const Posts = new Io("database/posts.json");

const adminController = async(req, res)=>{
    try {
        const {id} = req.params;
        const posts = await Posts.read();

        posts.forEach(el=>{
            if(el.id === id){
                el.isVerified = true;
                return el
            }
        })

        Posts.write(posts)
        res.status(200).json({message: "success"})
    } catch (error) {
        console.log(error.message);
    }
}
module.exports = {adminController}