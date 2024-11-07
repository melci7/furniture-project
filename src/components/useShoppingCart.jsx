"use client";
import { useState, useEffect } from "react";

export function useShoppingCart() {
    // Initialize with empty array for SSR consistency
    const [cartItems, setCartItems] = useState([]);

    // Load cart items from localStorage on mount
    useEffect(() => {
        if (typeof window !== 'undefined') {
            try {
                const savedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
                setCartItems(savedCart);
            } catch (error) {
                console.error('Error reading from localStorage:', error);
            }
        }
    }, []);

    // Function to save cart items to localStorage
    const saveToLocalStorage = (items) => {
        if (typeof window !== 'undefined') {
            try {
                localStorage.setItem('cartItems', JSON.stringify(items));
                window.dispatchEvent(new Event('cart-updated'));
            } catch (error) {
                console.error('Error writing to localStorage:', error);
            }
        }
    };

    const addToCart = (product) => {
        setCartItems(prevItems => {
            const existingItemIndex = prevItems.findIndex(item => item.id === product.id);
            let newItems;

            if (existingItemIndex !== -1) {
                newItems = prevItems.map((item, index) =>
                    index === existingItemIndex
                        ? { ...item, quantity: Math.min(item.quantity + 1, 99) }
                        : item
                );
            } else {
                newItems = [...prevItems, { ...product, quantity: 1 }];
            }

            saveToLocalStorage(newItems);
            return newItems;
        });
    };

    const decreaseFromCart = (product) => {
        setCartItems(prevItems => {
            const newItems = prevItems.map(item =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            ).filter(item => item.quantity > 0);

            saveToLocalStorage(newItems);
            return newItems;
        });
    };

    const removeFromCart = (product) => {
        setCartItems(prevItems => {
            const newItems = prevItems.filter(item => item.id !== product.id);
            saveToLocalStorage(newItems);
            return newItems;
        });
    };

    return { cartItems, addToCart, decreaseFromCart, removeFromCart };
}