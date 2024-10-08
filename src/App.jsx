
import { Route, Routes } from 'react-router-dom'
import Sidebar from './components/saidbar/Saidbar'
import Home from './page/home/Home'
import History from './page/history/History'

function App() {

  return (
    <div className='h-screen'>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/history' element={<History/>}/>
    </Routes>
    </div>
  )
}

export default App
