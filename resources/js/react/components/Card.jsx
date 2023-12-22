/* eslint-disable react/prop-types */
export default function Card({ children }) {
    return (
        <div className="bg-slate-700 w-auto h-auto rounded-xl px-3 py-2">
            {children}
        </div>
    )
}