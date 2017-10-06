const functions = require('firebase-functions');
const admin = require('firebase-admin');

//initiaize app with firebase config info
admin.initializeApp(functions.config().firebase);

// Set your secret key: remember to change this to your live secret key in production
//initialize stripe var with stripe api key we set in config var earlier via terminal cmd
const stripe = require('stripe')(functions.config().stripe.testkey);

//charge function to be exported
//function is called on db write event
exports.stripeCharge = functions.database
								.ref('/payments/{userId}/{paymentId}')
								.onWrite(event => {

	const payment = event.data.val();
	const userId = event.params.userId;
	const paymentId = event.params.paymentId;

	//checks if payment exists or if it has already been charged
	if(!payment || payment.charge) return;

	return admin.database()
		.ref(`/users/${userId}`)
		.once('value')
		.then(snapshot =>{
			return snapshot.val();
		})

		.then(customer => {

			const amount = payment.amount;
			const idempotency_key = paymentId;
			const source = payment.token.id;
			const currency = 'usd';
			const charge = {amount, currency, source};


			return stripe.charges.create(charge, { idempotency_key });

		})

		.then(charge => {
			admin.database()
				.ref(`/payments/${userId}/${paymentId}/charge`)
				.set(charge)
		})

});

/*
//function to create payout to user account
exports.stripePayout = functions.database
								.ref('/payments/{userId}/{paymentId}')
								.onWrite(event => {

	const payment = event.data.val();
	const userId = event.params.userId;
	const paymentId = event.params.paymentId;

	//checks if payment exists or if it has already been charged
	if(!payment || payment.charge) return;

	return admin.database()
		.ref(`/users/${userId}`)
		.once('value')
		.then(snapshot =>{
			return snapshot.val();
		})

		.then(customer => {

			const amount = payment.amount;
			const idempotency_key = paymentId;
			const source = payment.token.id;
			const currency = 'usd';
			const charge = {amount, currency, source};


			return stripe.payouts.create(charge, { idempotency_key });

		})

		.then(charge => {
			admin.database()
				.ref(`/payments/${userId}/${paymentId}/charge`)
				.set(charge)
		})

});
*/