import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from 'react-icons/ai'

import { RxHamburgerMenu, RxCross2 } from 'react-icons/rx'

import { BiSearch } from 'react-icons/bi'
export default function Header() {
  const [isClose, setIsClose] = useState(true)

  return (
    <>
      <nav className='py-4'>
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
                <li className='flex items-center flex-col'>
                  <AiOutlineShoppingCart className='text-xl' />
                  <span className='text-sm'>Cart</span>
                </li>
              </Link>

              <Link to='signin'>
                <li className='flex items-center flex-col'>
                  <AiOutlineUser className='text-xl' />
                  <span className='text-sm'>Sign in</span>
                </li>
              </Link>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}
