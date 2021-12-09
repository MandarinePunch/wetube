import Video from "../models/Video";
// Video.find({}, (error, videos) => {});

export const home = async (req, res) => {
  const videos = await Video.find({});
  return res.render("home", { pageTitle: "Home", videos: [] }); //pug에 home파일을 받음
};
export const watch = (req, res) => {
  const id = req.params.id;

  return res.render("watch", { pageTitle: `Watching` });
};
export const getEdit = (req, res) => {
  const id = req.params.id;

  return res.render("edit", { pageTitle: `Editing` });
};
export const postEdit = (req, res) => {
  const id = req.params.id;
  const title = req.body.title;
  return res.redirect(`/videos/${id}`);
};

export const getUpLoad = (req, res) => {
  return res.render("upload", { pageTitle: "Upload Video" });
};

export const postUpLoad = (req, res) => {
  return res.redirect("/");
};
