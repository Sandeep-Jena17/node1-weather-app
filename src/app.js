const path =require("path");
const express=require("express");
const port =3001;
const app=express();
const hbs=require("hbs");
const geocode=require("./utils/geocode");
const forcast=require("./utils/forcast");

//set the path
console.log(path.join(__dirname,"../public"));
const publicDirectoryPath=path.join(__dirname,"../public");
const viewPath=path.join(__dirname,'../template/views')
const partialPath=path.join(__dirname,"../template/partials");

//set the path forstatic file
app.use(express.static(publicDirectoryPath));

hbs.registerPartials(partialPath);

app.set("view engine","hbs");
app.set("views",viewPath);
app.get("/",(req,res)=>{
    res.render("index",{
        title:"Weather App",
        name:"Sandeep Jena"
    });
})

app.get("/about",(req,res)=>{
    res.render("about",{
        title:"About Me",
        Description:"Software Developer",
        name:"Sandeep Kumar Jena"
    })

});

app.get("/help",(req,res)=>{
 res.render("help",{
     title:"Need Help",
     helpText:"This is help text.",
     name:"Sandeep Jena"
 })
})


app.get("/weather",(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'you must provide an address'
        });
    }
    geocode(req.query.address,(error,{latitude, longitude,location}={})=>{
        if(error){
            return res.send({error});
        }
        forcast(latitude,longitude,(error,forcastdata)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forcast:forcastdata,
                location,
                address:req.query.address
            })
        })
    })
    // res.send({
    //     forcast:"its snowing",
    //     location:"blore",
    //     address:req.query.address
    // })
   })
   

app.get("/help/*",(req,res)=>{
   // res.send("Help article not found");
    res.render("404",{
        title:"Help article  not found",
        name:"Sandeep Jena",
        errorMessage:"plz go to another page"
    })
})
//for 404 
app.get("*",(req,res)=>{
    //res.send("My 404 page");
    res.render("404",{
        title:"404 not found",
        name:"Sandeep Jena",
        errorMessage:"plz go to another page"
    })
})


app.listen(port,()=>{
    console.log("Server is starting on " +port);
})






























// app.get("/",(req,res)=>{
    //   res.send('<h1>Hello MotherFucker welcome to my Weather App</h1>');  
    // })
    
    // app.get("/help",(req,res)=>{
    //  res.send([{
    //     name:"Sandeep Kumar JEna",
    //     age:27
    //  },
    // {
    //     name:"JAvascript",
    //     Library:"React js ",
    //     use:"FrontEnd"
    // }]);
    
    // })
    // app.get("/about",(req,res)=>{
    // res.send("<h1>About</h1>")
    // })
    