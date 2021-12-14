import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/wetube", {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
});

const db = mongoose.connection;

const handleOpen = () => console.log("🎈 Connected!!");
const handleError = (error) => console.log("🎃 DB Error", error);

db.on("error", handleError); //on은 여러번 이벤트를 발생 가능
db.once("open", handleOpen); //once는 한 번만 발생
