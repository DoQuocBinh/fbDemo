const functions = require('firebase-functions');
const admin = require('firebase-admin');

const express = require('express');
const engines = require('consolidate');
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

//To install handlebars: 
//npm i handlebars consolidate --save

admin.initializeApp();

const app = express();
app.engine('hbs',engines.handlebars);
app.set('views','./views');
app.set('view engine','hbs');
exports.app = functions.https.onRequest(app);

app.get('/',(request,response) =>{
	const ref = admin.database().ref('facts');
	var facts =[];
	ref.once('value').then(snap=> {
		snap.forEach(function (child){
			var fact = {
				key : child.key,
				text : child.child('/fact').val()
			}
			var l = facts.push(fact);
		})
		response.render('index',{facts});
	}
	).catch(error =>{
		response.redirect("/");
	})
});

exports.bigben = functions.https.onRequest((req,res)=>{
    const hours = (new Date().getHours() % 12) + 1  // London is UTC + 1hr;
    res.status(200).send(`<!doctype html>
    <head>
      <title>Time</title>
    </head>
    <body>
      ${'BONG '.repeat(hours)}
    </body>
  </html>`);

})
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