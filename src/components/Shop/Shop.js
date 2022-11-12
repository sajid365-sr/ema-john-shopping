import React, { useEffect, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { addToDb, deleteShoppingCart, getStoredCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';



/* 
count : done (total products)
perPage (size) : 10
No of pages = count/per page
currentPage (page)
*/






const Shop = () => {
    
    const [cart, setCart] = useState([]);
    const {products, count} = useLoaderData();
    const [page, setPage] = useState(0); // In which pages
    const [size, setSize] = useState(10); // per page

    const pages = Math.ceil(count / size);

    useEffect( () =>{
        const storedCart = getStoredCart();
        const savedCart = [];
        for(const id in storedCart){
            const addedProduct = products.find(product => product._id === id);
            if(addedProduct){
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;
                savedCart.push(addedProduct);
            }
        }
        setCart(savedCart);
    }, [products])

    const clearCart = () =>{
        setCart([]);
        deleteShoppingCart();
    }
    const handleAddToCart = (selectedProduct) =>{
        
        let newCart = [];
        const exists = cart.find(product => product._id === selectedProduct.id);
        if(!exists){
            selectedProduct.quantity = 1;
            newCart = [...cart, selectedProduct];
        }
        else{
            const rest = cart.filter(product => product._id !== selectedProduct.id);
            exists.quantity = exists.quantity + 1;
            newCart = [...rest, exists];
        }
        
        setCart(newCart);
        addToDb(selectedProduct._id);
    }

    return (
        <div className='shop-container'>
            <div className="products-container">
                {
                    products.map(product=><Product 
                        key={product._id}
                        product={product}
                        handleAddToCart={handleAddToCart}
                        ></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart} clearCart={clearCart}>
                    <Link to='/orders'>
                        <button className='clearCartBtn'>Review Order</button>
                    </Link>
                </Cart>
            </div>
            <div className="pagination">
                <p>Currently selected page: {page}</p>
                {
                    [...Array(pages).keys()].map(number => <button
                    key={number}
                    className={` beforeSelect ${page === number && 'selected'}`}
                    onClick={() => setPage(number)}
                    >
                        {number}
                    </button>)
                }
            </div>
        </div>
    );
};

export default Shop;