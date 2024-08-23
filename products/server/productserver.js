var express = require("express")
var app= express();

var mongoose=require("mongoose");
app.set("view engine","pug")

var bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

var productdetail = require("./model/product.model")

app.get("/",(req,res)=>{
    mongoose.connect("mongodb://localhost:27017/").then(()=>{
        productdetail.find({}).then((pdata)=>{
            console.log(pdata)
            res.render("products.pug",{productdetails:pdata})
        })
    })
})




// add products via form

app.get("/add",(req,res)=>{
    res.sendFile(__dirname+"/public/pdetail.html")
})

app.post("/add",(req,res)=>{
    mongoose.connect("mongodb://localhost:27017/").then(()=>{
        var newproductdetail= new productdetail(req.body)
        newproductdetail.save().then(()=>{
            res.redirect("/")
        })
    })
})

//delete product

app.get("/delete/:pid",(req,res)=>{
    mongoose.connect("mongodb://localhost:27017/").then(()=>{
        productdetail.findByIdAndDelete(req.params.pid).then((dlt)=>{
            // console.log(dlt)
            res.redirect("/")
        })
    })
})

//buy the product

app.get("/buy/:prid",(req,res)=>{
    mongoose.connect("mongodb://localhost:27017/").then(()=>{
        productdetail.findById(req.params.prid).then((bdata)=>{
            // console.log(bdata)
            res.render("sub.pug",{products:bdata})
        })
    })
})

//Edit product details

app.get("/update/:upid",(req,res)=>{
       productdetail.findById(req.params.upid).then((product)=>{
          res.render("updateform.pug",{product})
      })
        })

         app.post("/update/:upid",(req,res)=>{
            mongoose.connect("mongodb://localhost:27017/").then(()=>{
                productdetail.findByIdAndUpdate(req.params.upid,req.body,{new:true}).then((product)=>{
                    // console.log(product)
                    res.redirect("/")
                })
            })
            
        })

        app.listen(8991,()=>{
            console.log("server is running on 8991")

        })