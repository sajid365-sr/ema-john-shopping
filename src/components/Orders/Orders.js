
import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { deleteShoppingCart, removeFromDb } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import ReviewProduct from '../ReviewProduct/ReviewProduct';
import './Orders.css'



const Orders = () => {
    const { selectedCart} = useLoaderData();
    const [cart,setCart] = useState(selectedCart);
    

    const deleteCart = (id) =>{

         const exists = cart.filter(remainCart => remainCart._id !== id)
         setCart(exists);
         removeFromDb(id);
    }
    const clearCart = () =>{
        setCart([]);
        deleteShoppingCart();
    }

    return (
        <div className='shop-container'>
            <div className='flexCart'>
               <div>
               {
                cart.map(product => <ReviewProduct
                     key={product._id}
                     product={product}
                     deleteCart={deleteCart}
                     ></ReviewProduct>)
               }
               {
                cart.length === 0 && <h2>No Items for review. Please <Link to='/shop'>Shop more</Link></h2>
               }
               </div>
            </div>
            <div className="reviewCart">
                <Cart cart={cart} clearCart={clearCart}>
                    <Link to='/shipping'>
                        <button>Proceed Shipping</button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Orders;