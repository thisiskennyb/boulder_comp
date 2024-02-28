import Nav from './Nav'
import boulderCompNav from '../assets/boulderCompNav.png'


export default function Header () {
    return(
<div className='flex justify-center h-48 bg-linen'>
  <header className="sticky shadow-lg md:h-40 mt-0 m-auto p-0 flex flex-wrap w-full items-center justify-center">
    <h1 className="text-center md:hidden font-rubik ml-4">BC</h1>
    {/* <h1 className="hidden md:block text-center font-rubik text-6xl ml-4">Boulder Comp</h1>
     */}
     <img src={boulderCompNav} alt="Boulder Comp Logo" className="hidden md:block w-1/3 h-auto ml-4"/>
      <Nav />
  </header>
</div>



    )
}

