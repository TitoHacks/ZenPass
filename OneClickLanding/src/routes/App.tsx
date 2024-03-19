import { useState } from 'react'
import { WavyBackground } from '../components/ui/wavy-background'
import CustomNavbar from '../components/ui/custom-navbar'
import HeaderContent from '../components/ui/header-content'



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <CustomNavbar></CustomNavbar>
        <WavyBackground className="max-w-4xl mx-auto pb-40" colors={["#f9769d","#171821","#21222d"]} waveOpacity={0.6} blur={20}>
            <HeaderContent></HeaderContent>
        </WavyBackground>
      
      
    </>
  )
}

export default App
