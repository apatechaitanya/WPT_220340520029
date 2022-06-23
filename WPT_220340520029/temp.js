const express = require('express');
const app = express();
const cors = require('cors');

const mysql = require('mysql2');
let dbparams = {
	host: "localhost",
	user: "root",
	password: "cdac",
	database: "pleasework",
	port: 3306
};
const con = mysql.createConnection(dbparams);
app.use(cors());


const bodyParser = require('body-parser');






app.use(express.static('abc'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({
	extended: true
}));
//whether you want nested objects support  or not



var result;

app.post('/poc1', function (req, res) {

	console.log("reading input " + req.body.v1 + "  second " + req.body.v2)

	var xyz = {
		v1: 37,
		v2: 35
	};
	res.send(xyz);
});


app.get('/poc2', function (req, res) {


	console.log("reading input " + req.query.xyz);

	var xyz = {
		v1: 37,
		v2: 35
	};

	res.send(xyz);

});

app.get('/blur', (req, resp) => {
	let bookid = req.query.bookid;
	let bookstatus = {
		status: false,
		book: {
			bookid: 0,
			bookname: "",
			price: 0
		}
	};
	con.query('select bookid,bookname,price from book where bookid=?',
		[bookid],
		(err, rows) => {
			if (err) {
				console.log(err);
			} else {
				if (rows.length > 0) {
					bookstatus.status = true;
					bookstatus.book = rows[0];
				}
			}
			resp.send(bookstatus);
		})
})

//update
app.get('/update', (req, resp) => {
	let bookid = req.query.bookid;
	let price = req.query.price;
	let bookupdatestatus = {
		status: false,
		message: "not able to update"
	};
	con.query('update book set price = ? where bookid  =?',
		[price, bookid],
		(err, res1) => {
			if (err) {
				console.log(err);
			} else {
				bookupdatestatus.status = true;
				bookupdatestatus.message = "upadated";
			}
			resp.send(bookupdatestatus);
		})
})





app.listen(8081, function () {
	console.log("server listening at port 8081...");
});