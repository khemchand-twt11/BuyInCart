export default function FormComponent({ children }) {
  return (
    <div>
      <div className='flex min-h-[80vh] md:justify-center md:items-center mb-10'>
        {children}
      </div>
    </div>
  )
}
