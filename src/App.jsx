import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Layout from './components/Layout.jsx'

function App() {
  const [currentScore, setCurrentScore] = useState(0)
  const [highScore, setHighScore] = useState(0)

  return (
    <>
        <Layout/>
    </>
  )
}

export default App
