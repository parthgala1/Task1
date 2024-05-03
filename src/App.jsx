import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Form from './pages/Form.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='flex justify-center items-center min-h-screen bg-blue-400 p-12'>
        <Form />
      </div>
    </>
  )
}

export default App
