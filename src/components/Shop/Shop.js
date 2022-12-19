import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
    
    const [products, setProducts] = useState([]);
    const [count, setCount] = useState(0); // total products
    const [page, setPage] = useState(0); // In which pages customer clicked
    const [size, setSize] = useState(10); // products per page


    useEffect( () =>{
        const url = `https://ema-john-server-mocha.vercel.app/products?page=${page}&size=${size}`
        fetch(url)
        .then(res => res.json())
        .then(data =>{
            setCount(data.count);
            setProducts(data.products);
        })
    }, [page,size])

    const pages = Math.ceil(count / size);

    useEffect( () =>{
        const storedCart = getStoredCart();
        const savedCart = [];
        const ids = Object.keys(storedCart);
        console.log(ids);

        fetch(`https://ema-john-server-mocha.vercel.app/productsByIds`, {
            method:'POST',
            headers:{
                'content-type':'application/json',
            },
            body: JSON.stringify(ids)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)

            for(const id in storedCart){
                const addedProduct = data.find(product => product._id === id);
                if(addedProduct){
                    const quantity = storedCart[id];
                    addedProduct.quantity = quantity;
                    savedCart.push(addedProduct);
                }
            }
            setCart(savedCart);
        })

        

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
                <p>Currently selected page: {page + 1}, and per page: {size}</p>
                {
                    [...Array(pages).keys()].map(number => <button
                    key={number}
                    className={` beforeSelect ${page === number && 'selected'}`}
                    onClick={() => setPage(number)}
                    >
                        {number + 1}
                    </button>)
                }
                <select onChange={event => setSize(event.target.value)}>
                    <option value="5">5</option>
                    <option value="10" selected>10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                </select>
            </div>
        </div>
    );
};

export default Shop;