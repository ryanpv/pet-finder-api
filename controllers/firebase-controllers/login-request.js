import { firebaseAuth } from "../../firebase/firebase-client/firebase-init.js";
import { signInWithEmailAndPassword } from "firebase/auth";

export const loginRequest = async (req, res) => {
  const userEmailInput = req.body.userEmailInput;
  const userPasswordInput = req.body.passwordInput;
  // User sign in Request with email&password
  const userLoginRequest = await signInWithEmailAndPassword(firebaseAuth, userEmailInput, userPasswordInput);

  // Storing fetched user data from userLoginRequest
  const userData = userLoginRequest.user;
  const userUid = userData.uid;
  const userEmail = userData.email;
  const access_token = userData.user.accessToken;
  const refresh_token = userData.user.refreshToken;

  // Storing some user data in session
  req.session.isAuthenticated = true;
  req.session.user = userEmail;
  req.session.userId = userUid;
  req.session.access_token = access_token;
  req.session.refresh_token = refresh_token;

  // Storing user email in cookie for client-side to access
  res.cookie('currentUser', userEmail, { httpOnly: false, encode: String });

  if (req.session.isAuthenticated) {
    res.redirect('/')
  } else {
    res.send(`<p>failed to login</p> <a href='/login'>back to login</a>`);
  }

}