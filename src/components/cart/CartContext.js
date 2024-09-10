import { createContext, useContext, useState, useEffect } from 'react';
import {
    getCart,
    cartCreate,
    cartLinesAdd,
    cartLinesRemove,
    cartLinesUpdate,
} from '../../utils/shopify';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(null);
    const [cartId, setCartId] = useState(null);

    const localStorageKey = 'cartId';

    useEffect(() => {
        // sessionStorage.removeItem(localStorageKey);

        const storedCartId = sessionStorage.getItem(localStorageKey);

        if (storedCartId) {
            setCartId(storedCartId);
            getCart(storedCartId).then((cartData) => setCart(cartData));
        }

        console.log({ cart: cart, checkoutUrl: cart?.checkoutUrl });
    }, []);

    const cartAddItem = async (productId, quantity = 1) => {
        try {
            if (!cartId) {
                const newCart = await cartCreate();
                setCartId(newCart.id);
                sessionStorage.setItem(localStorageKey, newCart.id);

                const updatedCart = await cartLinesAdd(newCart.id, productId, quantity);
                setCart(updatedCart);
            } else {
                const updatedCart = await cartLinesAdd(cartId, productId, quantity);
                setCart(updatedCart);
            }
        } catch (error) {
            console.error('Error adding items to cart:', error);
        }
    };

    const cartRemoveItem = async (lineItemId) => {
        try {
            const updatedCart = await cartLinesRemove(cartId, lineItemId);
            setCart(updatedCart);

            if (!updatedCart.lines.edges.length) {
                setCartId(null);
                sessionStorage.removeItem(localStorageKey);

                console.log('Cart emptied and Session storage cleared');
            }
        } catch (error) {
            console.error('Error removing from cart:', error);
        }
    };

    const cartUpdateQuantity = async (lineItemId, quantity) => {
        // if (quantity < 1) {
        //     cartRemoveItem(lineItemId);
        //     return;
        // }

        try {
            const updatedCart = await cartLinesUpdate(cartId, lineItemId, quantity);
            setCart(updatedCart);

            if (updatedCart) {
                // Cart updated successfully
                console.log('Cart updated:', updatedCart);
            }
        } catch (error) {
            console.error('Error updating quantity:', error);
        }
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                cartAddItem,
                cartRemoveItem,
                cartUpdateQuantity,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
