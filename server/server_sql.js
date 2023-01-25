// 모듈을 추출합니다.
var express = require("express");
var bodyParser = require("body-parser");
var mysql = require("mysql");

// 데이터베이스와 연결합니다.
var client = mysql.createConnection({
	user: "root",
	password: "pw",
	database: "Company",
});

// 웹 서버를 생성합니다.
var app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/products", function (request, response) {
	// 데이터베이스 요청을 수행합니다.
	client.query("SELECT * FROM products", function (error, data) {
		response.send(data);
	});
});
app.get("/products/:id", function (request, response) {
	// 변수를 선언합니다.
	var id = Number(requst.params.id);

	// 데이터베이스 요청을 수행합니다.
	client.query(
		"SELECT * FROM products WHERE id=?",
		[id],
		function (error, data) {
			response.send(data);
		}
	);
});
app.post("/products", function (request, response) {
	// 변수를 선언합니다.
	var name = request.body.name;
	var modelnumber = request.body.modelnumber;
	var series = request.body.series;

	// 데이터베이스 요청을 수행합니다.
	client.query(
		"INSERT INTO products(name, modelnumber, series) VALUES(?,?,?)",
		[name, modelnumber, series],
		function (error, data) {
			response.send(data);
		}
	);
});
app.put("/products/:id", function (request, response) {
	// 변수를 선언합니다.
	var id = Number(request.params.id);
	var name = request.body.name;
	var modelnumber = request.body.modelnumber;
	var series = request.body.series;
	var query = "UPDATE products SET";

	// 쿼리를 생성합니다.
	if (name) query += 'name= "' + name + '"';
	if (modelnumber) query += 'modelnumber= "' + modelnumber + '"';
	if (series) query += 'series= "' + series + '"';
	query = "WHERE id =" + id;

	// 데이터베이스 요청을 수행합니다.
	client.query(query, function (erroe, data) {
		response.send(data);
	});
});
app.delete("/products/:id", function (request, response) {
	// 변수를 선언합니다.
	var id = Number(request.params.id);

	// 데이터베이스 요청을 수행합니다.
	client.query("DELETE FROM products WHERE id=?", [id], function (error, data) {
		response.send(data);
	});
});

app.listen(57778, function () {
	console.log("Server Running at http://127.0.0.1:57778");
});
