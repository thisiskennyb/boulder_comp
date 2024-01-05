import Nav from './Nav'

export default function Header () {
    return(
<div className='flex justify-center h-40'>
  <header className="bg-gray-200 sticky shadow-lg md:h-40 mt-0 m-auto p-0 flex flex-wrap w-full items-center justify-center">
    <h1 className="text-center md:hidden font-rubik ml-4">BC</h1>
    <h1 className="hidden md:block text-center font-rubik text-6xl ml-4">Boulder Comp</h1>
    <Nav />
  </header>
</div>



    )
}

