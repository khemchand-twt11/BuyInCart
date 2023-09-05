const Message = ({ variant, children }) => {
  // Map React Bootstrap alert variants to Tailwind CSS classes
  const tailwindVariantClasses = {
    primary: 'bg-blue-500 text-white',
    secondary: 'bg-gray-300 text-gray-700',
    success: 'bg-green-500 text-white',
    danger: 'bg-red-500 text-white',
    warning: 'bg-yellow-500 text-white',
    info: 'bg-blue-400 text-white',
    light: 'bg-gray-100 text-gray-800',
    dark: 'bg-gray-800 text-white',
  }

  // Check if the provided variant exists in the map, if not, use 'info'
  const tailwindClass =
    tailwindVariantClasses[variant] || 'bg-blue-400 text-white'

  return (
    <div className={`px-4 py-3 rounded-md ${tailwindClass}`}>{children}</div>
  )
}

export default Message
