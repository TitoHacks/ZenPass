import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLock,faDatabase, faArrowsRotate,faChartColumn,faChartPie,faUserCheck, faCircleQuestion } from "@fortawesome/free-solid-svg-icons"
import {Accordion, AccordionItem} from "@nextui-org/react";
import {Code} from "@nextui-org/react";




const Faq = () => {
  return (
    <div id="faq" className="py-4 flex flex-col items-center bg-black dark px-28">
      <h2 className="text-gray-300 font-semibold">Frequently Asked Questions</h2>

      <Accordion>
      <AccordionItem key="1" aria-label="Accordion 1" title="What is a password manager?" startContent={<FontAwesomeIcon className="text-white" icon={faCircleQuestion} />}>
          <div className="dark">
            <p className="text-white">A password manager is specialized software designed to securely store all your passwords in a single, centralized location. Typically, these managers offer a suite of essential features: </p>
            <ul className="p-4 text-white">
              <li>Data encription</li>
              <li>Password autofill</li>
              <li>Password generation</li>
              <li>Leak detection</li>
            </ul>
            <p></p>
          </div>
          
        </AccordionItem>
        <AccordionItem key="2" aria-label="Accordion 2" title="Is my data safe?" startContent={<FontAwesomeIcon className="text-white" icon={faCircleQuestion} />}>
          <div className="dark">
            <p className="text-white">
              Before any of your data is transmitted to the server, it undergoes a process known as encryption, where it is transformed into a complex and unreadable format. This encryption occurs on your device, meaning that even before it leaves your device, your data is already secure. Once this encrypted data reaches the server, it is stored in its encrypted form, ensuring that it remains incomprehensible to anyone who might try to access it without authorization.</p>
            <br/>
            <p className="text-white">For instance, let's consider the scenario where you wish to add a new credential, such as</p>
            <Code>CatsAreCute@</Code>
            <p className="text-white">This credential is immediately encrypted on your device, resulting in a scrambled and highly secure string of characters, such as </p>
            <Code>298377cd97c315c45d0f92a4dc21e3aa7124087ecfa49d3394e1a8ee</Code>
            <p className="text-white">This encrypted credential is then sent to the server for storage. As the server only stores encrypted data, even if someone were to gain access to this stored information, they would be unable to decipher it without the proper decryption key. This robust encryption process ensures the confidentiality and security of your sensitive information throughout its journey from your device to the server and back.</p>
          </div>
          
        </AccordionItem>
        <AccordionItem key="3" aria-label="Accordion 3" title="How does encryption work" startContent={<FontAwesomeIcon className="text-white" icon={faCircleQuestion} />}>
          <p className="text-white">ZenPass uses a military grade AES encryption algorithm. It works as follows:</p>
          <br/>
          <p className="text-white">Upon successful login, your password undergoes a process called hashing, where it is transformed using a Password Key Derivation Function (PBKDF2) with a minimum of 100,000 iterations. This hashed password serves as your master password, providing a strong foundation for accessing your encrypted data.</p>
          <p className="text-white">Later on, when adding or importing a credential into ZenPass, the system generates a unique key. This key, combined with a randomly generated Initialization Vector (IV), is used to encrypt your credential using the AES encryption algorithm mentioned earlier. This ensures that your sensitive information is securely protected.</p>
          <p className="text-white">When you need to retrieve your stored credentials, the encrypted data is fetched from the server and sent to you. Additionally, the Initialization Vector associated with each encrypted credential is provided, enabling you to decrypt and access your information securely.</p>
        </AccordionItem>
      </Accordion>
    </div>

    
  )
}

export default Faq
