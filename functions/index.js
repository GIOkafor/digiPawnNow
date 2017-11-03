const functions = require('firebase-functions');

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