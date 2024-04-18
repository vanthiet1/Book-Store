import { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();

export const UseCart = () => useContext(CartContext);

const DataCart = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const storedCart = localStorage.getItem('cart');
        return storedCart ? JSON.parse(storedCart) : [];
    });
 
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const updateCartLocalStorage = (updatedCart) => {
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };
    const addToCart = (product) => {
        setCart(prevCart => {
            const existingProductIndex = prevCart.findIndex(item => item.productId === product.productId);
            if (existingProductIndex !== -1) {
                const updatedCart = [...prevCart];
                updatedCart[existingProductIndex] = {
                    ...updatedCart[existingProductIndex],
                    quantity: updatedCart[existingProductIndex].quantity + product.quantity,
                };
                updateCartLocalStorage(updatedCart);
                return updatedCart;
            } else {
                const updatedCart = [...prevCart, product];
                updateCartLocalStorage(updatedCart);
                return updatedCart;
            }
            
        });
    
    };

    const removeFromCart = (productId) => {
        setCart(prevCart => {
            const updatedCart = prevCart.filter(item => item.productId !== productId);
            updateCartLocalStorage(updatedCart);
            return updatedCart;
        });
    };

    return (
        <CartContext.Provider value={{addToCart , cart, removeFromCart}}>
            {children}
        </CartContext.Provider>
    );
};

export default DataCart;
