//jshint esversion:6
<<<<<<< HEAD
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
const PORT = process.env.port || 3000;
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));
mongoose.connect("mongodb+srv://admin-rahul:rahul4793@cluster0.i2b3s.mongodb.net/imei",{useNewUrlParser:true});
const imeiSchema = {
    title:String,
    phone:String
};
const Imei = mongoose.model("Imei",imeiSchema); 
app.get("/",function(req,res){
    res.render("home");
});
app.post("/submit",function(req,res){
    const id = req.body.text12;
	function sumDig(id)
	{
		let a = 0;
		while (id > 0)
		{
			a = a + id % 10;
			id = parseInt(id / 10, 10);
		}
		return a;
	}
	function isValidIMEI(id)
	{
		let s = String(id);
		let len = s.length;

		if (len != 15)
			return false;

		let sum = 0;
		for(let i = len; i >= 1; i--)
		{
		let d = (id % 10);
		if (i % 2 == 0)
			d = 2 * d;
		sum += sumDig(d);
		id = parseInt(id / 10, 10);
		}

		return (sum % 10 == 0);
	}
	Imei.findOne({title:id},function(err,foundUsers){
		if(foundUsers){
			res.render("sucess");     
		}
	else 
res.render("failed");
	})
	if (isValidIMEI(id)  ){
    console.log("Valid IMEI Code and found in database"); 
    res.render('sucess'); 
	}
	return;
});

app.get("/imeis",function(req,res){
    Imei.find(function(err,foundImeis){
        if(!err){
            res.send(foundImeis)
        }else{
            res.send(err);
=======
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const app = express();


const mongooseEncrytion = require("mongoose-encryption") ;

app.use (express.static("public"));
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({
    extended:true
}));

mongoose.connect("mongodb://localhost:27017/userDB",{useNewUrlParser:true});
const userSchema = new mongoose.Schema({
    email:String,
    password:String 
}) ;

userSchema.plugin(mongooseEncrytion, {secret:process.env.SECRET,encryptedField:["password"]});


const User = new mongoose.model("User",userSchema);  
 app.get("/",function(req,res){
     res.render("home");
 });
 app.get("/login",function(req,res){
     res.render("login")
 });
 app.get("/register",function(req,res){
     res.render("register");
 });

app.post("/register",function(req,res){
    const newUser = new User({
        email: req.body.username,
        password: req.body.password
    });
    newUser.save(function(err){
        if(err){
            console.log(err);
        }else{
            res.render("secrets");
>>>>>>> 209a4a5 (Add Enviroment Variable)
        }
    });
});

<<<<<<< HEAD


app.post("/submitimei",function(req,res){
     const newimei = new Imei({
     title:req.body.text81
     });
     newimei.save();
     res.render("added");
	 
});


app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
=======
app.post("/login",function(req,res){
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({email:username},function(err,foundUser){
        if(err){
            console.log(err);
        }else{
            if(foundUser){
                 if(foundUser.password===password){
                     res.render("secrets");
                 }
            }
        }
});
});



app.listen(3000,function(){
    console.log("server has started at port 3000");
}); 
>>>>>>> 209a4a5 (Add Enviroment Variable)
