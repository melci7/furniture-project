"use client"

import { useState, useEffect } from 'react';

export function useCart() {
    const [quantity, setQuantity] = useState(0);

    useEffect(() => {
        const updateQuantityFromLocalStorage = () => {
            try {
                const storedCartItems = localStorage.getItem('cartItems');
                const cartItems = storedCartItems ? JSON.parse(storedCartItems) : [];
                setQuantity(cartItems.reduce((total, item) => total + item.quantity, 0));
            } catch (error) {
                console.error('Error reading from localStorage:', error);
                setQuantity(0);
            }
        };

        updateQuantityFromLocalStorage();

        const handleCartUpdate = () => {
            updateQuantityFromLocalStorage();
        };

        window.addEventListener('cart-updated', handleCartUpdate);

        return () => {
            window.removeEventListener('cart-updated', handleCartUpdate);
        };
    }, []);

    return quantity;
}