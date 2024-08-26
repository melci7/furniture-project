"use client"
import { useState, useEffect } from "react";

export function useShoppingCart() {
    const [cartItems, setCartItems] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem('cartItems')) || [];
        } catch (error) {
            console.error('Error reading from localStorage:', error);
            return [];
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem('cartItems', JSON.stringify(cartItems))
            window.dispatchEvent(new Event('cart-updated'))

        } catch (error) {
            console.error('Error writing to localStorage:', error)
        }
    }, [cartItems])

    const addToCart = (product) => {
        setCartItems(prevItems => {
            const existingItemIndex = prevItems.findIndex(item => item.id === product.id);
            if (existingItemIndex !== -1) {
                // Product exists, update its quantity
                return prevItems.map((item, index) =>
                    index === existingItemIndex
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                // Product doesn't exist, add it to the cart
                return [...prevItems, { ...product, quantity: 1 }];
            }
        });
    }

    const decreaseFromCart = (product) => {
        setCartItems(prevItems => {
            return prevItems.map(item =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            ).filter(item => item.quantity > 0);
        });
    }
    return { cartItems, addToCart, decreaseFromCart }
}