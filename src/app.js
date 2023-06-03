const express = require("express");
const cors = require("cors");
require("dotenv").config();
const fileUpload = require("express-fileupload");
const cookie = require("cookie-parser");

const routes = require("./routes")

const app = express();

app.use(express.json());
app.use(cors());
app.use(fileUpload());
app.use(cookie());


app.use("/uploads", express.static(process.cwd() + "/uploads"));

app.use("/api", routes);

app.use("/*", (_, res)=>{
    res.status(501).json({message: "Error"})
})

const PORT = process.env.PORT;
app.listen(PORT, ()=>{
    console.log(`on PORT ${PORT}`);
})