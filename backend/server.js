const { response } = require("express");
const express = require("express");
const fileUpload = require('express-fileupload');
const app = express();
const port = 3000;

const path = require("path");

const fs = require('fs');
const { request } = require("http");
const { dirname } = require("path");

//endpoint ez is, kotelezo megadni a json formatumot, ez a script.js-ben is igy van hozza kell igazitani
app.use(express.json())
app.use(fileUpload())

app.get("/", (req, res) => {
    res.sendFile(path.join(`${__dirname}/../frontend/index.html`));
});

app.get("/public", (req, res) => {
    res.sendFile(path.join(`${__dirname}/../frontend/public`));
});

app.use('/public', express.static(`${__dirname}/../frontend/public`));


app.post('/upload', (request, response) => {
	console.log(request.body);
	fs.writeFile(`${__dirname}/data/userdata.json`, JSON.stringify(request.body, null, 4), (error) => {
		if (error){
			console.log(error);
			response.status(500).send(error);
		} else {response.status(200).send('ok')}
	});
})

app.post('/upload-image', (request, response) => {
	if (!request.files) {
		return response.status(400).send('No files were uploaded')
	}
	const picture = request.files.file
	const picName = request.body.fileName
	console.log(picName);
	picture.mv(`${__dirname}/data/${picName}.jpg`, (error) => {
		if (error) {
			console.log(error);
			return response.status(500).send(error);
		} else {
			response.status(200).send('Image ok')
		}
	})
});
// app.get("/style.css", (req, res) => {
//     res.sendFile(path.join(`${__dirname}/../frontend/style.css`));
// });

// app.get("/script.js", (req, res) => {
//     res.sendFile(path.join(`${__dirname}/../frontend/script.js`));
// });

app.listen(port, () => {
    console.log(`Server is running at @: http://127.0.0.1:${port}`);
});
