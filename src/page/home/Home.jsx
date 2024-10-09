
import React from 'react'
import Sidebar from '../../components/saidbar/Saidbar'
import Header from '../../components/header/Header'
import Details from '../../components/details/Details'
import Table from '../../components/table/Table'
import Buttons from '../../components/buttons/Buttons'

const Home = () => {
  return (
    <div className='flex h-screen overflow-hidden'>
        <div>
            <Sidebar />
        </div>
        <div className=' w-full overflow-auto'>
            <Header/>
            <Buttons/>
            <Details />
            <Table/>

        </div>
    </div>
  )
}

export default Home