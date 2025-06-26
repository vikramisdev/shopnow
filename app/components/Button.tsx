import React, { MouseEventHandler, ReactNode } from 'react'

interface ButtonProps {
    onClick?: MouseEventHandler<HTMLDivElement>,
    children: ReactNode,
    variant?: 'default' | 'ghost' | 'outline',
    size?: 'sm' | 'md' | 'lg'
}

const Button: React.FC<ButtonProps> = ({
    onClick,
    children,
    variant = 'default',
    size = 'md'
}) => {
    const baseClasses = 'cursor-pointer rounded-full flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'

    const variantClasses = {
        default: 'bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 shadow-sm',
        ghost: 'hover:bg-gray-100',
        outline: 'border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
    }

    const sizeClasses = {
        sm: 'size-8 p-1.5',
        md: 'size-10 p-2',
        lg: 'size-12 p-3'
    }

    return (
        <div
            onClick={onClick}
            className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`}
        >
            {children}
        </div>
    )
}

export default Button
