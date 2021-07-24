//jshint esversion:6
const express = require("express");
const request =require("request");
const bodyParser= require ("body-parser");
const https=require("https");
const app= express();
app.use (express.static("puplic"));
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){

res.sendFile(__dirname+"/signup.html");
});
app.post("/",function(req,res){
  const firstName=req.body.First_Name;
  const secondName=req.body.Second_Name;
  const email=req.body.Email;
var data={
  members:[{
    email_address:email,
    status:"subscribed",
    merge_fields:{
      FNAME:firstName,
      LNAME:secondName,
    }

}]
};
const jsonData= JSON.stringify(data);
const url="https://us6.api.mailchimp.com/3.0/lists/b1e3f86b9f";
const options={
  method:"POST",
  auth:"Sara:2f41883836be915c6e1d1a2ebab776ed-us6"

};
const request=https.request(url,options,function(response){
  if (response.statusCode===200){
  res.sendFile(__dirname+"/success.html")  ;
  }
  else{
    res.sendFile(__dirname+"/failure.html");
  }
response.on("data",function(data){
console.log(JSON.parse(data))  ;
});
});
request.write(jsonData);
request.end();
});
app.post("/failure",function(req,res){
  res.redirect("/");
});
app.listen(process.env.POST||3000,function(){
  console.log("server is running on port 3000");
});
//API key
//2f41883836be915c6e1d1a2ebab776ed-us6
//list id
//b1e3f86b9f
