import React from "react"

export function SubmitButton({ 
    children
}: {
   children: React.ReactNode
}) {
    return (
        <button 
            className="mt-6.5 px-12.5 py-3 rounded-xl cursor-pointer text-xl 
            bg-black text-white"
            type="submit"
        >
            {children}
        </button>
    )
}