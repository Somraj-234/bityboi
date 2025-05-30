import { useState } from 'react'
import './App.css'
import Routing from './utils/routing'
function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='w-full h-screen from-[#0A0A0B] to-[#141415]'> 
        <Routing/>
    </div>
  )
}

export default App
