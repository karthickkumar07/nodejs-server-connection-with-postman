var express =require("express");
var app = express();
const bodyParser=require("body-parser");
const db = require('./dbcode');
const index = require ('./index');


app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/',index.home);
app.post('/login', db.login);
app.get('/userDetails/:name' , db.getUserDetails);
app.get('/showDestinations' , db.showDestinations);

app.post('/bookTravel', db.bookTravel);
app.delete('/cancelTravel/:travel_id', db.cancelTravel);
app.get('/Api',index.show_Destinations);
app.get('/showDestinations/:id',db.showDestId);
app.get('/showDestinations/:type' , db.showDestType);
app.post('/feedback07',db.givefeedback);
app.put('/editbooking/:travel_id',db.editbooking);
app.get('/mostvisit',db.mostvisit);
app.listen(3020);
console.log("Server started");