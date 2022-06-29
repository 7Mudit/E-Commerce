import Product from '../../models/Product'
import connectDb from '../../middleware/mongoose'

const  handler=async(req,res)=>{
    let products=await Product.find()
    let nivia={}
    for(let item of products){
        if(item.title in nivia){
            if(!nivia[item.title].size.includes(item.size)&&(item.availableQty>0))
            {
                nivia[item.title].size.push(item.size)
            }
            if(!nivia[item.title].color.includes(item.color)&&(item.availableQty>0))
            {
                nivia[item.title].color.push(item.color)
            }
        }
        else{
            nivia[item.title]=JSON.parse(JSON.stringify(item))
            if(item.availableQty>0){
                nivia[item.title].color=[item.color]
                nivia[item.title].size=[item.size]
            }
        }
    }
    res.status(200).json({nivia})
} 
export default connectDb(handler) 