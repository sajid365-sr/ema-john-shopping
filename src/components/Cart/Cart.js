import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './Cart.css';

const Cart = (props) => {
    const { cart, clearCart, children} = props;
    
    let total = 0;
    let shipping = 0;
    let quantity = 0;
    for(const product of cart){
        quantity = quantity + product.quantity;
        total = total + product.price * product.quantity;
        shipping = shipping + product.shipping;
    }
    const tax = parseFloat((total * 0.1).toFixed(2));
    const grandTotal = total + shipping + tax;
    return (
        <div className='cart'>
            <h4>Order Summary</h4>
            <p>Selected Items: {quantity}</p>
            <p>Total price: ${total}</p>
            <p>Total Shipping: ${shipping}</p>
            <p>Tax: {tax}</p>
            <p className='grandTotal'>Grand Total: {grandTotal.toFixed(2)}</p>
            <button className='clearCartBtn' onClick={() => clearCart()}>
                <span>Clear Cart</span>
                <FontAwesomeIcon icon={faTrashCan}></FontAwesomeIcon>
            </button>
            {children}
        </div>
    );
};

export default Cart;