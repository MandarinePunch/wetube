import mongoose from "mongoose";

mongoose.connect(process.env.DB_URL, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
});

const db = mongoose.connection;

const handleOpen = () => console.log("๐ Connected!!");
const handleError = (error) => console.log("๐ DB Error", error);

db.on("error", handleError); //on์ ์ฌ๋ฌ๋ฒ ์ด๋ฒคํธ๋ฅผ ๋ฐ์ ๊ฐ๋ฅ
db.once("open", handleOpen); //once๋ ํ ๋ฒ๋ง ๋ฐ์
