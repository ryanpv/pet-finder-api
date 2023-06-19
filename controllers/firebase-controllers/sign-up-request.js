import { getAuth } from "firebase-admin/auth"
// import { firebaseAuth } from "../../firebase/firebase-client/firebase-init.js";

export const signUpRequest = async (req, res) => {
  try {
    console.log('sign up requested');
    const createUserAccount = await getAuth()
      .createUser({
        email: req.body.userEmailInput,
        password: req.body.passwordInput
      })

      const addUserRole = await getAuth()
        .setCustomUserClaims(createUserAccount.uid, { endUser: true });
      
      res.send(`<p>SUCCESS</p> <a href='/login'>Go to LOGIN</a>`);
  } catch (err) {
    console.log(err);
    res.send(`<p>SIGN UP FAILED. ${ err.code }: ${ err.message } </p><a href='/sign-up-page'>back to signup</a>`);
  }
}