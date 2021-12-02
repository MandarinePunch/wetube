import express from "express";

const PORT = 4000;

const app = express();

app.get("/", (req, res) => {
  return res.send("I still love you.");
});
app.get("/login", (req, res) => {
  return res.send({ message: "Login here." });
});

const handleListening = () =>
  console.log(`Server listening on port http://localhost:${PORT}`);

app.listen(PORT, handleListening); //(포트번호, 서버 시작시 작동 함수)
