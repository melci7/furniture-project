import React from 'react';

export default function Spinner({ size = 'medium', color = 'primary' }) {
    const sizeClasses = {
        small: 'w-5 h-5 border-2',
        medium: 'w-8 h-8 border-4',
        large: 'w-12 h-12 border-4'
    }

    const colorClasses = {
        primary: 'border-black border-t-[#dfdfdf]',
        secondary: 'border-white border-t-transparent',
    }

    return (
        <div
            className={`inline-block rounded-full animate-spin ${sizeClasses[size]} ${colorClasses[color]}`}
            role="status"
            aria-label="Loading"
        >
            <span className="sr-only">Loading...</span>
        </div>
    )
}