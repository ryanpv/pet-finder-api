import { firebaseAuth } from "../../firebase/firebase-client/firebase-init.js";
import { signInWithEmailAndPassword } from "firebase/auth";

export const loginRequest = async (req, res) => {
  try {
    const userEmailInput = req.body.userEmailInput;
    const userPasswordInput = req.body.passwordInput;
    // User sign in Request with email&password
    const userLoginRequest = await signInWithEmailAndPassword(firebaseAuth, userEmailInput, userPasswordInput);
  
    // Storing fetched user data from userLoginRequest
    const userData = userLoginRequest.user;
    const userUid = userData.uid;
    const userEmail = userData.email;
    const access_token = userData.accessToken;
    const refresh_token = userData.refreshToken;

    // Storing some user data in session
    req.session.userAuthenticated = true;
    req.session.user = userEmail;
    req.session.userId = userUid;
    req.session.access_token = access_token;
    req.session.refresh_token = refresh_token;
  
    // Storing user email in cookie for client-side to access
    res.cookie('currentUser', userEmail, { httpOnly: false, encode: String });
  
    if (req.session.userAuthenticated) {
      res.redirect('/')
    } else {
      res.status(400).send(`<p>failed to login</p> <a href='/login'>back to login</a>`);
    }
  } catch (err) {
    res.status(500).send(`<p>Failed to login, server error/user not found. ${ err.code }: ${ err.message } </p><a href='/login'>back to login</a>`);    
  }
}