const Button = ({ onClick, children, ...props}) => {
  return (
    <div className="relative">
      <button onClick={onClick} className="bg-orange-500 border border-orange-500 text-white rounded-lg px-4 py-2 hover:bg-transparent hover:text-orange-500 transition duration-300 ease-in-out z-10 relative">
        {children}
      </button>
      <div className="absolute inset-0 bg-orange-500 opacity-25 z-0"></div>
    </div>
  )
}

export default Button;