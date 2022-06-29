export default function handler(req,res){
    // Update status  into Orders table after checking the transaction status
    // Initiate the shipping
    // Redirect user to order confirmation page 
    res.status(200).json({body:req.body})
}