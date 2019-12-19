const functions = require('firebase-functions');
const admin = require('firebase-admin');
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

admin.initializeApp();
exports.userSignUp = functions.auth.user().onCreate((user)=>{
    if (user.email &&
        user.email == 'binhdq@fpt.edu.vn' &&
        user.emailVerified) {
        const customClaims = {
            admin: true,
            accessLevel: 9
        };
        return admin.auth().setCustomUserClaims(user.uid, customClaims)
        .catch(error => {
            console.log(error);
          });
    }else
    {
        console.warn('not logged1');
        console.warn(user.email);
        console.warn(user.emailVerified);
    }
})