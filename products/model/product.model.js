var mongoose = require("mongoose")
var productdetailSchema = mongoose.Schema({
    image:"string",
    title:"string",
    price:"string",
    description:"string"
})
const Productdetail= mongoose.model("Productdetail",productdetailSchema)
module.exports=Productdetail;