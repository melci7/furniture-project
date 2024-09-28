"use client";
import { useState, useEffect } from "react";

export function useShoppingCart() {
    const [cartItems, setCartItems] = useState(() => {
        if (typeof window !== 'undefined') { // Ensure we're in the browser
            try {
                return JSON.parse(localStorage.getItem('cartItems')) || [];
            } catch (error) {
                console.error('Error reading from localStorage:', error);
                return [];
            }
        } else {
            return []; // Return empty array during SSR
        }
    });

    useEffect(() => {
        if (typeof window !== 'undefined') { // Ensure this runs only on the client
            try {
                localStorage.setItem('cartItems', JSON.stringify(cartItems));
                window.dispatchEvent(new Event('cart-updated'));
            } catch (error) {
                console.error('Error writing to localStorage:', error);
            }
        }
    }, [cartItems]);

    const addToCart = (product) => {
        setCartItems(prevItems => {
            const existingItemIndex = prevItems.findIndex(item => item.id === product.id);
            if (existingItemIndex !== -1) {
                // Product exists, update its quantity
                return prevItems.map((item, index) =>
                    index === existingItemIndex
                        ? { ...item, quantity: Math.min(item.quantity + 1, 99) }
                        : item
                );
            } else {
                // Product doesn't exist, add it to the cart
                return [...prevItems, { ...product, quantity: 1 }];
            }
        });
    };

    const decreaseFromCart = (product) => {
        setCartItems(prevItems => {
            return prevItems.map(item =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            ).filter(item => item.quantity > 0);
        });
    };

    const removeFromCart = (product) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== product.id))
    }

    return { cartItems, addToCart, decreaseFromCart, removeFromCart };
}
