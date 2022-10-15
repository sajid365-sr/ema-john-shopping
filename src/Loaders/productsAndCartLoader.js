import { getStoredCart } from "../utilities/fakedb";

export const productsAndCartLoader = async () =>{

    // Get products
    const productsData = await fetch('products.json');
    const products = await productsData.json();
    

    // get cart
    const savedCart = getStoredCart();
    const selectedCart = [];

    for(const id in savedCart){
        const addedProduct = products.find(product => product.id === id);
        if(addedProduct){
            addedProduct.quantity = savedCart[id];
            selectedCart.push(addedProduct);
        }
        
    }
    return {selectedCart};
    
}