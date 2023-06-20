export const homePageController = async (req, res) => {
  // console.log('homePage.js checking session: ', req.session);
  res.render('pages/home-page.ejs');
};