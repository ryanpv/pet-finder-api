export const homePageController = async (req, res) => {
  res.render('pages/home-page.ejs', {
    reqUrl: req.originalUrl
  });
};