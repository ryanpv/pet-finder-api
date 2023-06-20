import { getAuth } from "firebase-admin/auth"

export const signUpRequest = async (req, res) => {
  try {
    console.log('sign up requested');
    const createUserAccount = await getAuth()
      .createUser({
        email: req.body.userEmailInput,
        password: req.body.passwordInput
      })

    await getAuth()
      .setCustomUserClaims(createUserAccount.uid, { admin: true });
      
      res.send(`<p>SUCCESS</p> <a href='/login'>Go to LOGIN</a>`);
  } catch (err) {
    console.log(err);
    res.send(`<p>SIGN UP FAILED. ${ err.code }: ${ err.message } </p><a href='/sign-up-page'>back to signup</a>`);
  }
}