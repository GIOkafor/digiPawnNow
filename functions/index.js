const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

/*
exports.addParticipantInfo = functions.database.ref('/all-messages/{pushId}/messages')
	.onWrite(event => {
		const message = event.data.val();

		if(message.participant)
			return

		const participant = event.params.pushId;

		console.log("Event params.pushId is: ", event.params.pushId);
		console.log("Full data being passed is: ", message);

		return event.data.ref.child('participant').set(participant);
	});
*/

exports.addParticipantInfo = functions.database.ref('/all-messages/{uId}/messages/{pushId}')
	.onWrite(event => {
		const message = event.data.val();

		if(message.username)
			return

		const userUid = message.from;

		//console.log("From UID: ", userUid);

		if(userUid !== 'admin'){
			admin.database().ref('users/' + userUid + '/userInfo')
			.once('value')
			.then(data => {
				//console.log(data.val());

				var userName = data.val().firstName + ' ' + data.val().lastName;
			
				return event.data.ref.child('username').set(userName);
			})
		}
		else return;
	});


//Set the username in the orders section
exports.addOrderInfo = functions.database.ref('/orders/{pushId}')
	.onWrite(event => {
		const order = event.data.val();

		if(order.username)
			return

		const userUid = order.uid;

		//console.log("From UID: ", userUid);

		if(userUid !== 'admin'){
			admin.database().ref('users/' + userUid + '/userInfo')
			.once('value')
			.then(data => {
				//console.log(data.val());

				var userName = data.val().firstName + ' ' + data.val().lastName;
				var email = data.val().email;
				var address = data.val().streetAddress + ' ' + data.val().state;

				//set user email in db
				event.data.ref.child('email').set(email);

				//set user streetAddess in db
				event.data.ref.child('address').set(address);
			
				return event.data.ref.child('username').set(userName);
			})
		}
		else return;
	});
