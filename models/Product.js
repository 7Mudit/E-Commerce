const mongoose=require('mongoose')

const ProductSchema=new mongoose.Schema({
    title:{type:String,required:true},
    slug:{type:String,required:true,unique:true},
    desc:{type:String,required:true},
    color:{type:String},
    img:{type:String,required:true},
    store:{type:String},
    category:{type:String,required:true},
    size:{type:String},
    price:{type:Number,required:true},
    availableQty:{type:Number,required:true}
},{timestamps:true})

// mongoose.models={}
export default mongoose.models.Product ||mongoose.model("Product",ProductSchema) 