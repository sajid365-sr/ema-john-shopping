import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./reviewProduct.css";

const ReviewProduct = ({ product,deleteCart }) => {
  const { name, price, quantity, img,id } = product;
 

  return (
    <div className="reviewProduct">
      <div className="reviewImg">
        <img src={img} alt="" />
      </div>
      <div className="reviewDetailsContainer">
        <div className="reviewDetails">
          <p>{name}</p>
          <p>
            <small>Price: <span className="priceQuantity">${price}</span></small>
          </p>
          <p>
            <small>Quantity: <span className="priceQuantity">{quantity}</span></small>
          </p>
        </div>

        <div className="deleteContainer">
          <button onClick={() =>{deleteCart(id)}}>
            <FontAwesomeIcon
              className="deleteIcon"
              icon={faTrashCan}
            ></FontAwesomeIcon>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewProduct;
