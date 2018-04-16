const express = require('express');
const cors = require('cors')
const app = express();

const fs = require('fs');

//Menu Data Vars//
let menudata = fs.readFileSync('Json/config/mainview.json');  
let menuConfig = JSON.parse(menudata); 
//End Menu Data Vars//

//User Data Vars//
let userdata = fs.readFileSync('Json/data/users.json');  
let users = JSON.parse(userdata); 
let userconfig = fs.readFileSync('Json/config/users.json');  
let userConfig = JSON.parse(userconfig); 
//End User Data Vars//

//Product Data Vars//
let productdata = fs.readFileSync('Json/data/products.json');  
let products = JSON.parse(productdata);  
let productconfig = fs.readFileSync('Json/config/products.json');  
let productConfig = JSON.parse(productconfig); 
// End Product Data Vars//

var corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
}

app.use(cors(corsOptions))

app.listen(8000, () => {
  console.log('Server started!');
});




app.route('/api/users').get((req, res) => {
  res.send(users);
});

app.route('/api/users/config').get((req, res) => {
  res.send(userConfig);
});



app.route('/api/users/:name').get((req, res) => {
  const requestedCatName = req.params['name'];
  res.send({ name: requestedCatName });
});



const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.route('/api/users').post((req, res) => {	
   users.push(req.body);
   let data = JSON.stringify(users);  
   fs.writeFileSync('Json/data/users.json', data);  
   res.status(201).send(req.body);
});


app.route('/api/users/:name').put((req, res) => {
	
	for(var i in users){
		if(users[i].fullname==req.params['name']){
			console.log(users[i]);
			users[i] = req.body;
		}
	}
	 let data = JSON.stringify(users);  
     fs.writeFileSync('Json/data/users.json', data);  
 	res.status(201).send(req.body)
});


app.route('/api/arrange/users').put((req, res) => {	
   users = req.body; 
   let data = JSON.stringify(users);  
   console.log(data);
   fs.writeFileSync('Json/data/users.json', data);  
   res.status(201).send(req.body);
});



app.route('/api/products').get((req, res) => {
  res.send(products);
});

app.route('/api/products/config').get((req, res) => {
  res.send(productConfig);
});

app.route('/api/menu').get((req, res) => {
  res.send(menuConfig);
});