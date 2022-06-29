import React from "react";
import Link from "next/link";
import Product from'../models/Product'
import mongoose from "mongoose"


const Dominos = ({products}) => {
  console.log(products)
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4 justify-center">
            {products.map((item)=>{

            return<Link passHref={true} key ={item._id}href={`/product/${item.slug}`}>
              <div className="lg:w-1/5 cursor-pointer md:w-1/2 p-4 w-full shadow-lg m-5">
                <a className="block relative h-48 rounded overflow-hidden">
                  <img
                    alt="Farmhouse"
                    className="m-auto md:m-0 h-[20vh] md:h-[25vh] block"
                    // src="https://www.dominos.co.in/files/items/Farmhouse.jpg"
                    src={item.img}
                  />
                </a>
                <div className="mt-4 text-center md:text-left">
                  <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                    {item.category}
                  </h3>
                  <h2 className="text-gray-900 title-font text-lg font-medium">
                    {item.title}
                  </h2>
                  <p className="mt-1">₹{item.price}</p>
                  <p className="mt-1 text-sm">{item.size}</p>
                </div>
              </div>
            </Link>})}

          </div>
        </div>
      </section>
    </div>
  );
};
 
export async function getServerSideProps(context){
  if(!mongoose.connections[0].readyState){
    await mongoose.connect(process.env.MONGO_URI)
}
let products=await Product.find({"category": { "$in": ["Veg Pizzas", "Non Veg Pizzas"]}})

  return{
    props:{products:JSON.parse(JSON.stringify(products))}// will be passed to page components  as props
  }
}


export default Dominos;
