import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope  } from "@fortawesome/free-solid-svg-icons"
import { Divider } from "@nextui-org/react"





const Footer = () => {
  return (
    <div className="dark bg-black">
       <Divider className="bg-accentColorText" />
      <div id="footer" className="py-4 flex flex-row justify-between bg-black dark px-28">
        <div className="flex flex-col justify-start items-center">
          <a href="#"><img src="zenpass-favicon-color.png"></img></a>
          <h2 className="font-bold text-gray-400 text-xl">ZenPass</h2>
        </div>
        
        <div className=" ml-8 flex flex-row justify-evenly text-gray-400 w-full">
          <div className="flex flex-col justify-start w-1/4">
              <h2 className="text-lg text-gray-200">Sections</h2>
              <a href="#">Home</a>
              <a href="#features">Features</a>
              <a href="#howitworks">How it works</a>
              <a href="#faq">FAQ</a>
            
          </div>
          <div className="flex flex-col justify-start w-1/4">
              <h2 className="text-lg text-gray-200">Legal</h2>
              <a href="#">Privacy policy</a>
              <a href="#features">Terms of use</a>
            
          </div>
          <div className="flex flex-col justify-start w-1/4">
              <h2 className="text-lg text-gray-200">Contact us</h2>
              <a href="mailto:zenpassmail@gmail.com"><FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon> zenpassmail@gmail.com</a>
          </div>
        </div>
        
      </div>
    </div>
    

    
  )
}

export default Footer
