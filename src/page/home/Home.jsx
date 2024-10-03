
import React from 'react'
import Sidebar from '../../components/saidbar/Saidbar'
import Header from '../../components/header/Header'
import Details from '../../components/details/Details'

const Home = () => {
  return (
    <div className='flex'>
        <div>
            <Sidebar />
        </div>
        <div className=' w-full '>
            <Header/>
            <Details/>

        </div>
    </div>
  )
}

export default Home