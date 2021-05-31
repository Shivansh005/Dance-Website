const express = require("express");
const path= require("path");
const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true, useUnifiedTopology: true});
const port= 8000;

//Define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    gender: String,
    phone: String,
    email: String,
    address: String,
    desc: String
  });

  const contact = mongoose.model('Contact', contactSchema);

//EXPRESS RELATED STUFF
app.use('/static',express.static('static'));
app.use(express.urlencoded());

//PUG SPECIFIC STUFF
app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'));

//ENDPOINTS
app.get('/home',(req,res)=>{
    const params={};
    res.status(200).render('home.pug',params);
});
app.get('/',(req,res)=>{
    const params={};
    res.status(200).render('home.pug',params);
});

app.get('/about',(req,res)=>{
    const params={};
    res.status(200).render('about.pug',params);
});

app.get('/events',(req,res)=>{
    const params={};
    res.status(200).render('events.pug',params);
});

app.get('/contact',(req,res)=>{
    const params={};
    res.status(200).render('contact.pug',params);
});

app.post('/contact',(req,res)=>{
    var myData=  new contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to database");
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database");
    });
    
});

//STARTS THE SERVER
app.listen(port,()=>{
    console.log(`The application is started successfully on  port ${port}`);
});