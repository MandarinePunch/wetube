export const trending = (req, res) => {
  res.render("home", { pageTitle: "Home" }); //pug에 home파일을 받음
};
export const see = (req, res) => {
  res.render("see", { pageTitle: "Watch" });
};
export const edit = (req, res) => {
  res.render("edit", { pageTitle: "Edit" });
};
export const search = (req, res) => res.send("Search");
export const upload = (req, res) => res.send("Upload");
export const deleteVideo = (req, res) => res.send("Delete Video");
