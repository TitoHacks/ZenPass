import { WavyBackground } from '../components/ui/wavy-background'
import CustomNavbar from '../components/ui/custom-navbar'
import HeaderContent from '../components/ui/header-content'
import Features from '@/components/ui/features'
import HowItWorks from '@/components/ui/howItWorks'
import Faq from '@/components/ui/faq'
import Footer from '@/components/ui/footer'


function App() {

  return (
    <>
        <CustomNavbar></CustomNavbar>
        <WavyBackground className="max-w-4xl mx-auto pb-40" colors={["#f9769d","#171821","#21222d"]} waveOpacity={0.6}  blur={10}>
            <HeaderContent></HeaderContent>
        </WavyBackground>
        <div className='w-full'>
          <Features></Features>
          <HowItWorks></HowItWorks>
          <Faq></Faq>
          <Footer></Footer>
        </div>
        
      
      
    </>
  )
}

export default App
