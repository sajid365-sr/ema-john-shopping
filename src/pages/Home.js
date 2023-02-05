import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import ProductCard from "../components/ProductCard";


const Home = () => {
 
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("products.json")
      .then(res => res.json())
      .then(data => {
      setProducts(data);
    })
},[])

  console.log(products)

  return (
    <div>
      <h2>This is home page</h2>
      <div className="grid grid-cols-3 gap-5">
        {products.map((product) => (
          <ProductCard key={product.price} product={product}></ProductCard>
        ))}
      </div>
    </div>
  );
};

export default Home;
