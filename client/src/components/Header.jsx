import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaAngleDown } from 'react-icons/fa'
import {
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from 'react-icons/ai'
import { useSelector } from 'react-redux'
import { RxHamburgerMenu, RxCross2 } from 'react-icons/rx'

import { useLogoutMutation } from '../slice/userApiSlice'
import { logout } from '../slice/authSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { BiSearch } from 'react-icons/bi'
export default function Header() {
  const [isClose, setIsClose] = useState(true)
  const { cartItems } = useSelector((state) => state.cart)
  const [isOpen, setIsOpen] = useState(false)
  const { userInfo } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [logoutApiCall] = useLogoutMutation()
  // console.log(cartItems)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }
  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap()
      dispatch(logout())
      navigate('/login')
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <>
      <nav className='md:px-4 py-4'>
        <div className='flex flex-col md:flex-row justify-between items-center mx-4 lg:mx-16'>
          <div className='flex md:block w-full md:w-auto justify-between'>
            <Link to='/'>
              <div className='text-2xl font-bold tracking-wider mb-8 md:mb-0'>
                BuyInCart
              </div>
            </Link>

            <div className='md:hidden cursor-pointer mt-2 text-xl'>
              {isClose ? (
                <RxHamburgerMenu onClick={() => setIsClose(!isClose)} />
              ) : (
                <RxCross2 onClick={() => setIsClose(!isClose)} />
              )}
            </div>
          </div>

          <div
            className={`w-3/2 md:w-5/12 border-2 px-2 py-2 lg:py-1 rounded-md flex justify-around space-x-1 items-center mb-8 md:mb-0 ${
              isClose ? 'hidden' : 'block'
            } ${isClose && 'md:flex'}`}
          >
            <BiSearch className='text-2xl text-gray-500' />
            <input
              className='w-full outline-none text-gray-500 pl-2'
              type='text'
              placeholder='Search For Products....'
            />
            <button className='bg-gray-200 px-4 py-2 rounded-md text-sm hidden lg:block '>
              Search
            </button>
          </div>
          <div
            className={`space-x-6 ${isClose ? 'hidden' : 'block'} ${
              isClose && 'md:block'
            } `}
          >
            <ul className='flex justify-around space-x-12 lg:space-x-8'>
              <Link to='/favourites'>
                <li className='flex items-center flex-col'>
                  <AiOutlineHeart className='text-xl' />
                  <span className='text-sm'>Favourite</span>
                </li>
              </Link>

              <Link to='/cart'>
                <li className='flex items-center flex-col relative'>
                  {cartItems.length > 0 && (
                    <div className='t-0 absolute left-4 -top-3'>
                      <p className='flex h-2 w-2 items-center justify-center rounded-full bg-black p-3 text-xs text-white font-medium'>
                        {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                      </p>
                    </div>
                  )}

                  <AiOutlineShoppingCart className='text-xl' />
                  <span className='text-sm'>Cart</span>
                </li>
              </Link>

              {userInfo ? (
                <div className='relative inline-block text-left'>
                  <button
                    onClick={toggleDropdown}
                    className='inline-flex items-center p-2 text-gray-700 hover:text-gray-900 focus:outline-none rounded-md font-medium'
                    id='options-menu'
                    aria-expanded={isOpen}
                    aria-haspopup='true'
                  >
                    Hi, {userInfo.name}
                    <FaAngleDown
                      className={`w-5 h-5 ml-2 transition-transform transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <li>
                      <div className='absolute right-0 mt-2 w-40 bg-white border border-gray-300 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 divide-y divide-gray-100'>
                        <Link
                          to='/profile'
                          className='block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                        >
                          Profile
                        </Link>
                        <button
                          onClick={logoutHandler}
                          className='block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring focus:ring-gray-300'
                        >
                          Logout
                        </button>
                      </div>
                    </li>
                  )}
                </div>
              ) : (
                <Link to='login'>
                  <li className='flex items-center flex-col'>
                    <AiOutlineUser className='text-xl' />
                    <span className='text-sm'>Sign in</span>
                  </li>
                </Link>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}
