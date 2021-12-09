import express from "express";
import {
  watch,
  getEdit,
  postEdit,
  getUpLoad,
  postUpLoad,
} from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.get("/:id(\\d+)", watch);
videoRouter.route("/:id(\\d+)/edit").get(getEdit).post(postEdit);
// route를 지정해주고 get req가 올 때와 post req가 올 때를 지정
videoRouter.route("/upload").get(getUpLoad).post(postUpLoad);

export default videoRouter;
