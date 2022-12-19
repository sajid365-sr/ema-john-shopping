import { getStoredCart } from "../utilities/fakedb";

export const productsAndCartLoader = async () =>{

    // Get products
    const productsData = await fetch('https://ema-john-server-mocha.vercel.app/products');
    const {products} = await productsData.json();
    

    // get cart
    const savedCart = getStoredCart();
    const selectedCart = [];

    for(const id in savedCart){
        const addedProduct = products.find(product => product._id === id);
        if(addedProduct){
            addedProduct.quantity = savedCart[id];
            selectedCart.push(addedProduct);
        }
        
    }
    return {selectedCart};
    
}