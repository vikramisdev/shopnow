import { Plus } from 'lucide-react'
import React, { ReactNode, useState } from 'react'

interface AccordianProps {
    title?: string;
    children?: ReactNode;
    className?: string;
}

const Accordian: React.FC<AccordianProps> = ({ title = "Details", children, className }) => {
  const [open, setState] = useState(false);

  return (
    <div className={className}>
        <div onClick={() => setState(!open)} className='flex shadow-sm justify-between py-2 cursor-pointer'>
            <h1 className='select-none text-xl font-semibold '>{title}</h1>
            <Plus className={`duration-500 ${open? "rotate-45" : "rotate-0"}`} />
        </div>

        <div onDoubleClick={() => {}} className={`px-2 overflow-hidden transition-all ${open? "h-fit duration-100 py-4" : "h-0"}`}>
            {children}
        </div>
    </div>
  )
}

export default Accordian
