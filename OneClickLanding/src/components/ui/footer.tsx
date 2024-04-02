import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHashtag  } from "@fortawesome/free-solid-svg-icons"
import { Button, Divider } from "@nextui-org/react"





const Footer = () => {
  return (
    <div className="dark bg-black">
       <Divider className="bg-accentColorText" />
      <div id="footer" className="py-4 flex flex-row justify-evenly bg-black dark px-28">
        <div className="flex flex-col items-center">
          <a href="#"><img src="public/zenpass-favicon-color.png"></img></a>
          <h2 className="font-bold text-gray-400 text-xl">ZenPass</h2>
        </div>
        
        <div className="flex flex-row justify-between text-gray-400 w-1/3">
          <div className="flex flex-col justify-center">
            <a href="#">Home</a>
            <a href="#features">Features</a>
            <a href="#howitworks">How it works</a>
            <a href="#faq">FAQ</a>
          </div>
          <div className="flex flex-col justify-center">
              <ul className="text-gray-500">
                <li><a href=""><FontAwesomeIcon icon={faHashtag} /></a></li>
                <li><a href=""><FontAwesomeIcon icon={faHashtag} /></a></li>
                <li><a href=""><FontAwesomeIcon icon={faHashtag} /></a></li>
              </ul>
          </div>
        </div>
        
      </div>
    </div>
    

    
  )
}

export default Footer
