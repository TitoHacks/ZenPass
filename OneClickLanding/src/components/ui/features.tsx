import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import FeatureCard from "./featureCard"
import { faLock,faDatabase, faArrowsRotate,faChartColumn,faChartPie,faUserCheck } from "@fortawesome/free-solid-svg-icons"





const Features = () => {
  return (
    <div id="features" className="pb-64 flex flex-col items-center bg-black">
      <h2 className="text-gray-300 font-semibold">Features</h2>
      <div className='flex flex-row flex-wrap justify-evenly dark p-4'>
       <FeatureCard featureTitle="End to end encryption "  category="Security" icon={faLock} description="ZenPass uses a military grade End to end encryption system, guaranteeing your data protection. Even if an attacker breached our sistems, it would be imposible to decrypt it."></FeatureCard>
       <FeatureCard featureTitle="Data leak monitoring sistem"  category="Security" icon={faDatabase} description="Our application implements 'Have I Been Pwned', an advanced data leak monitoring software, giving you relevant up to date security information. "></FeatureCard>
       <FeatureCard featureTitle="Password generator"  category="Security" icon={faArrowsRotate} description="Ensure your passwords are strong with our advanced easy to use password generator. Generate passwords at your will with our customization feature."></FeatureCard>
       <FeatureCard featureTitle="Security score"  category="Security" icon={faChartColumn} description="ZenPass calculates an overall security score based on your safe, weak and leaked passwords. Your objective? Keeping it high."></FeatureCard>
       <FeatureCard featureTitle="Beautifully crafted dashboard"  category="UI / UX" icon={faChartPie} description="Using modern fronted technology, our design team has been able to craft an amazingly beautiful dashboard."></FeatureCard>
       <FeatureCard featureTitle="Easy to use"  category="UI / UX" icon={faUserCheck} description="With user experience in mind, we deliberately design ZenPass to be as easy as it gets. You will never get lost."></FeatureCard>
    </div>
    </div>
    
  )
}

export default Features
