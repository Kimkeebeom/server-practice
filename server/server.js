// 모듈 추출
var express = require("express");
var bodyParser = require("body-parser");
const { send } = require("process");

const items = [
	{
		name: "우유",
		price: "2000",
	},
	{
		name: "홍차",
		price: "5000",
	},
	{
		name: "커피",
		price: "5000",
	},
];

// 웹서버를 생성합니다
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

// 라우트
app.all("/data.html", function (request, response) {
	var output = "";
	output += "<!DOCTYPE html>";
	output += "<html>";
	output += "<head>";
	output += "     <title>Data HTML</title>";
	output += "</head>";
	output += "<body>";
	items.forEach(function (item) {
		output += "<div>";
		output += "     <h1>" + item.name + "</h1>";
		output += "     <h2>" + item.price + "</h2>";
		output += "</div>";
	});
	output += "</body>";
	output += "</html>";
	response.send(output);
});
app.all("/data.json", function (request, response) {
	response.send(items);
});
app.all("/data.xml", function (request, response) {
	var output = "";
	output += '<?xml version="1.0" encoding="UTF-8" ?>';
	output += "<products>";
	items.forEach(function (item) {
		output += "<product>";
		output += "     <name>" + item.name + "</name>";
		output += "     <price>" + item.price + "</price>";
		output += "</product>";
	});
	output += "</products>";
	response.type("text/xml");
	response.send(output);
});
app.all("parameter", function (request, response) {
	var name = request.params.name;
	var region = request.params.region;

	response.send("<h1>" + name + ":" + region + "</h1>");
});

// get, post, put, delete 라우트
app.get("/products", function (request, response) {
	response.send(items);
});
app.get("/products/:id", function (request, response) {
	var id = Number(request.params.id);

	if (isNaN(id)) {
		response.send({
			error: "숫자를 입력하세요",
		});
	} else if (items[id]) {
		response.send(items[id]);
	} else {
		response.send({
			error: "존재하지 않는 데이터입니다!",
		});
	}
});
app.post("/products", function (request, response) {
	var name = request.body.name;
	var price = request.body.price;
	var item = {
		name,
		price,
	};
	if (name !== "" && price !== "") {
		response.send({
			message: "데이터를 추가했습니다",
			data: item,
		});
	} else if (name === "" || price === "") {
		response.send({
			error: "정보가 입력되지 않았습니다.",
		});
	}
	items.push(item);
});
app.put("/products/:id", function (request, response) {
	var id = Number(request.params.id);
	var name = request.body.name;
	var price = request.body.price;
	if (items[id]) {
		if (name) {
			items[id].name = name;
		}
		if (price) {
			items[id].price = price;
		}

		response.send({
			message: "데이터를 수정했습니다",
			data: items[id],
		});
	} else {
		response.send({
			error: "존재하지 않는 데이터입니다.",
		});
	}
});
app.delete("/products/:id", function (request, response) {
	var id = Number(request.params.id);
	if (isNaN(id)) {
		response.send({
			error: "숫자를 입력해주세요",
		});
	} else if (items[id]) {
		items.splice(id, 1);
		response.send({
			message: "데이터를 삭제했습니다",
		});
	} else {
		response.send({
			erroe: "존재하지 않는 데이터입니다.",
		});
	}
});

// 웹서버를 실행합니다
app.listen(57778, function () {
	console.log("Server Running at http://127.0.0.1:57778");
});
