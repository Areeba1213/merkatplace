// import React, {useState , useEffect} from "react";
// import  SanityClient  from "@sanity/client";
// import Image from "next/image";

// const sanity = SanityClient({
//     projectId:"djhtxcf1",
//     dataset:"production",
//     apiVersion:"2023-01-01",
//     useCdn:true,

// }),

// interface Product {
//     _id: string;
//      title: string;
//      price: string;
//      description: string;
//      discountPercentage: number;
//      ProductImage: {
//         assets:{
//             _ref : string;
//         };
//      };
//      tags: string[];
    
// }
// "use client";
// import React, { useState, useEffect } from "react";
// import { createClient } from "@sanity/client";
// import Image from "next/image";
// import { truncate } from "fs";

// const sanity = createClient({
//     projectId: "djhtxcf1",
//     dataset: "production",
//     apiVersion: "2023-01-01",
//     useCdn: true,
// });

// interface Product {
//     imageUrl: string ;
//     _id: string;
//     title: string;  // Fixed typo
//     price: string;
//     description: string;
//     discountPercentage: number;
//     ProductImage: {
//         asset: {  // Fixed incorrect field
//             _ref: string;
//         };
//     };
//     tags: string[];
// }

//  const ProductCards: React.FC = () =>{
//     const [products,setProducts] = useState<Product[]>([]);
//     const [cart,setCart] = useState<Product[]>([]);

//     const fetchProducts = async ()=>{
//         try{
//             const query = `
//              *[type == "Product"]{
//                _id,
//                title,
//                description,
//                discountPercentage,
//                "ImageUrl": ProductImage.asset->url,
//                tags,
//              }
//                `;

//                const data = await sanity.fetch(query);
//                setProducts(data);
//         } catch (error){
//             console.error("Error Fetching Products:",error);
//         }
//     };

//     const addTocart = (product: Product) => {
//       setCart((prevCart) => [...prevCart,product]);
//       alert(`${product.title}has been added to your cart!`);
//     };

//     useEffect(() => {
//         fetchProducts();
//     },[]);

//      function truncateDescription(description: string): React.ReactNode | Iterable<React.ReactNode> {
//          throw new Error("Function not implemented.");
//      }

//     return(
//         <div className="p-4">
//             <h2 className="text-color bg-slate-800 mt-4 mb-4">Products from APIs Data</h2>
//             <div className="grid-grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//                 {products.map((product) => (
//                   <div
//                    key={product._id}
//                    className="g-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300">
//                       <Image
//                     src={product.imageUrl}
//                     alt={product.title}
//                      width={300}
//                      height={300}
//                       className="w-full h-48 object-cover rounded-md"/>

//                       <div className="mt-4">
//                         <h2 className="text-lg font-semibold">{product.title}</h2>
//                         <p className="text-slate-800 mt-2 text-sm">{truncateDescription(product.description)}</p>
//                         <div className="flex justify-between items-center mt-4">
//                             <div>
//                                 <p className="text-slate-600 font-bold">{product.price}</p>
//                                 {product.discountPercentage > 0 && (
//                                   <p className="text-sm text-green-600">
//                                     {product.discountPercentage}% OFF
//                                   </p>


//                                 )}
//                             </div>

//                         </div>

//                          <div className="mt-2 flex flex-wrap gap-2">
//                             {product.tags.map}((tags,index) =>(
//                                 <span
//                                  key={index}
//                                  className="text-xl bg-slate-400 text-black rounded-full x-2 py-1" >
//                                     {tag}
//                                 </span>
//                             ))

//                          </div>
//                          {/* add to cart funtionality*/}

//                          <button
//                           className="mt-4 w-full bg-blue-600 text-white py-full rounded-md hover:bg-blue-700"
//                            onClick={() => addTocart(product)}>
//                               Add To Cart
//                          </button>
//                       </div>
//                   </div>
//                 )

                

//                 )}

//             </div>
//             {/* cart summery*/} 
//             <div className="mt-8 bg-slate-100 p-6 rounded-lg shadow-md">
//                 <h2 className="text-lg font-black text-red-800">Cart Summary</h2>
//                 {cart.length > 0 ?(
//                     <ul className="space-y-4">
//                     {cart.map((item, index) =>(
//                         <li 
//                          key={index}
//                          className="flex justify-between items-center bg-white shadow-sm p-4 rounded-md">
//                           <div>
//                             <p className="font-medium text-slate-900">{item.title}</p>
//                             <p className="text-sm text-blue-600">${item.price.toFixed(2)}</p>
//                           </div>
//                           <Image
//                            src={item.imageUrl}
//                             alt={item.title}
//                              height={50}
//                             width={50}
//                              className="rounded-md"></Image>
//                         </li>

//                     ))}    

//                     </ul>
//                 ) :(
//                     <p className="text-black text-center">Your cart is empty plz add product</p>

//                 )}


//             </div>








//         </div>
//     );

    
//  };
//  export default ProductCards;
"use client";
import React, { useState, useEffect } from "react";
import { createClient } from "@sanity/client";
import Image from "next/image";

const sanity = createClient({
  projectId: "djhtxcf1",
  dataset: "production",
  apiVersion: "2023-01-01",
  useCdn: true,
});

interface Product {
  imageUrl: string;
  _id: string;
  title: string;
  price: string;
  description: string;
  discountPercentage: number;
  ProductImage: {
    asset: {
      _ref: string;
    };
  };
  tags: string[];
}

const ProductCards: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);

  const fetchProducts = async () => {
    try {
      const query = `
      *[_type == "product"]{
        _id,
        title,
        description,
        price,
        discountPercentage,
        "imageUrl": ProductImage.asset->url,
        tags
      }`;

      const data = await sanity.fetch(query);
      setProducts(data);
    } catch (error) {
      console.error("Error Fetching Products:", error);
    }
  };

  const addTocart = (product: Product) => {
    setCart((prevCart) => [...prevCart, product]);
    alert(`${product.title} has been added to your cart!`);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const truncateDescription = (description: string, length: number = 100) => {
    return description.length > length ? description.substring(0, length) + "..." : description;
  };

  return (
    <div className="p-4">
      <h2 className="text-white bg-slate-800 mt-4 mb-4 p-2">Products from API</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300"
          >
            <Image
              src={product.imageUrl}
              alt={product.title}
              width={300}
              height={300}
              className="w-full h-48 object-cover rounded-md"
            />

            <div className="mt-4">
              <h2 className="text-lg font-semibold">{product.title}</h2>
              <p className="text-slate-800 mt-2 text-sm">{truncateDescription(product.description)}</p>

              <div className="flex justify-between items-center mt-4">
                <div>
                  <p className="text-slate-600 font-bold">${product.price}</p>
                  {product.discountPercentage > 0 && (
                    <p className="text-sm text-green-600">{product.discountPercentage}% OFF</p>
                  )}
                </div>
              </div>

              <div className="mt-2 flex flex-wrap gap-2">
                {product.tags.map((tag, index) => (
                  <span key={index} className="text-xl bg-slate-400 text-black rounded-full px-2 py-1">
                    {tag}
                  </span>
                ))}
              </div>

              <button
                className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                onClick={() => addTocart(product)}
              >
                Add To Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Summary */}
      <div className="mt-8 bg-slate-100 p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-black text-red-800">Cart Summary</h2>
        {cart.length > 0 ? (
          <ul className="space-y-4">
            {cart.map((item, index) => (
              <li key={index} className="flex justify-between items-center bg-white shadow-sm p-4 rounded-md">
                <div>
                  <p className="font-medium text-slate-900">{item.title}</p>
                  <p className="text-sm text-blue-600">${Number(item.price).toFixed(2)}</p>
                </div>
                <Image src={item.imageUrl} alt={item.title} height={50} width={50} className="rounded-md" />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-black text-center">Your cart is empty, please add a product.</p>
        )}
      </div>
    </div>
  );
};

export default ProductCards;
