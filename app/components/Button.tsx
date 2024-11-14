import React, { MouseEventHandler, ReactNode } from 'react'

interface ButtonProps {
    onClick?: MouseEventHandler<HTMLDivElement>,
    children: ReactNode
}

const Button: React.FC<ButtonProps> = ({ onClick, children}) => {
  return (
    <div onClick={onClick} className='cursor-pointer rounded-full border-2 border-neutral-200 size-10 flex items-center justify-center p-2'>
        {children}
    </div>
  )
}

export default Button
