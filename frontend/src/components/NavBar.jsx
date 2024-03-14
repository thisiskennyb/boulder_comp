import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon,  XMarkIcon } from '@heroicons/react/24/outline'
import horizontalLogo from "../assets/horizOption3White.png"
import { useContext } from 'react'
import UserContext from "../contexts/UserContext";
import default_img from "../assets/default_image.png"

import { Link } from 'react-router-dom'

const navigation = [
  { name: 'Home', to: '/', current: false },
  { name: 'Dashboard', to: '/dashboard', current: false },
  { name: 'Leagues', to: '/leagues-home', current: false },
  { name: 'Scoring', to: '/rules-and-scoring', current: false },
 
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


export default function NavBar() {


    // const token = localStorage.getItem('token')
    const { userDashboard, userToken, setUserToken } = useContext(UserContext)

   
    
    const handleLogout = () => {
        var keyToRemove = 'token';
        localStorage.removeItem(keyToRemove);
        setUserToken(null)
      }





  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              {userToken ? (
                  <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  {userToken && (
                    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 bg-gray-700 text-white hover:bg-gray-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                  )}
                </div>
              ):(
                <div></div>
              )}

              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="h-12 w-auto"
                    src={horizontalLogo}
                    alt="Your Company"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {/* This is to check that they are logged in, need to make buttons for Nav Bar when they are not logged in */}

                    {/* This stops the navbar from being mapped unless there is a token */}
                    {userToken && navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.to}
                        className={classNames(
                          item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-nunito'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
    
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full bg-gray-700 h-12 w-12">
                      <img
                        className="h-8 w-8 mt-1 rounded-full"
                        src={userDashboard?.avatar || default_img}
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-full bg-gray-700 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {/* Conditionally render login or logout based on if we have token */}
                      {userToken ? (
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            onClick={handleLogout}
                            to="/"
                            className={classNames(active ? 'bg-gray-600 rounded-full' : '', 'block px-4 py-2 text-lg text-center text-white font-nunito')}
                          >
                            Sign out
                          </Link>
                        )}
                      </Menu.Item>
                        )
                        :
                        (                      
                      
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            
                            to="/login"
                            className={classNames(active ? 'bg-gray-600 rounded-full' : '', 'block px-4 py-2 text-lg text-white text-center font-nunito')}
                            
                          >
                            Login
                          </Link>

                          
                        )}
                      </Menu.Item>
                        )}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
          {userToken && (
            <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {/* This stops links from being rendered unless user has logged in */}
              {/* Need to make buttons for login and sign up to show buttons in hamburger, right menu works for now */}
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as={Link}
                  to={item.to}
                  className={classNames(
                    item.current ? 'bg-white text-white' : 'text-lightgray font-nunito hover:bg-gray-700 hover:text-white text-center',
                    'block rounded-md px-3 py-2 text-base font-nunito'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>

          )}

   
        </>
      )}
    </Disclosure>
  )
}