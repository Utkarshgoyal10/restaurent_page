const express = require("express");
const app = express();

const path = require("path");
// let cookieParser = require('cookie-parser');
// app.use(cookieParser()); 
const port = process.env.PORT || 3500;

const hbs = require("hbs");
const { collection} = require("./mongodb");


const tempelatePath = path.join(__dirname, '../view')

app.use(express.json())
app.set("view engine", "hbs")
app.set("views", tempelatePath)
app.use(express.urlencoded({ extended: true }))
app.use(express.static('../public'));

app.get("/", (req, res) => {
    res.render("index")
})
app.get("/Login", (req, res) => {
    res.render("Login")
})
app.get("/index", (req, res) => {
    res.render("index")
})
app.get("/Signup", (req, res) => {
    res.render("Signup")
})
app.post("/Signup", async (req, res) => {

    const data = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        cpassword: req.body.cpassword,
    }
    const a= req.body.password;
    const b= req.body.cpassword;
    const check = await collection.findOne({ email: req.body.email })
    if (check==null){

    
     if (a ===b) {

        await collection.insertMany([data])

        res.status(201).render("Login")
    }
    else{
        res.send("Password are not match")
    }
}
else{
    res.send("User already exist");
}

})
app.post("/Login", async (req, res) => {
    try {
         let check2 = await collection.findOne({ email: req.body.email })

        if (check2.password === req.body.password) {
           
                res.render("index")
            }
        else {
            res.send("wrong password")
            res.render("Login")
        }
    }
    catch {
        res.send("wrong details")
    }
})

app.listen(port, () => {
    console.log(`server is running at port no ${port}`);
})