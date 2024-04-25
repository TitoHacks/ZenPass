import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChartColumn,faUser, faMagnifyingGlassChart, faKey } from "@fortawesome/free-solid-svg-icons"
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';




const HowItWorks = () => {
  return (
    <div id="howitworks" className="pb-64 flex flex-col items-center bg-black">
      <h2 className="text-gray-300 font-semibold">How it works</h2>
      <div className='flex flex-row flex-wrap justify-evenly dark p-4'>
        <VerticalTimeline lineColor="rgba(249, 118, 157,0.6)">
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: '#0d0e17', color: '#fff' }}
            contentArrowStyle={{ borderRight: '7px solid  #101010' }}
            iconStyle={{ background: '#94465d', color: '#fff' }}
            icon={<FontAwesomeIcon icon={faUser}></FontAwesomeIcon>}
          >
            <h3 className="font-bold vertical-timeline-element-title">Create a ZenPass account</h3>
            <p>
              Register and create a brand new ZenPass account to start using it.
            </p>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: '#0d0e17', color: '#fff' }}
            contentArrowStyle={{ borderRight: '7px solid  #101010' }}
            iconStyle={{ background: '#94465d', color: '#fff' }}
            icon={<FontAwesomeIcon icon={faKey}></FontAwesomeIcon>}
          >
            <h3 className="font-bold vertical-timeline-element-title">Add / import credentials</h3>
            <p>
              ZenPass encrypts added / imported credentials clientside, using a Password Key Derivation Function. Once encrypted, sends the resulting data to our servers, keeping your data safe.
            </p>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: '#0d0e17', color: '#fff' }}
            contentArrowStyle={{ borderRight: '7px solid  #101010' }}
            iconStyle={{ background: '#94465d', color: '#fff' }}
            icon={<FontAwesomeIcon icon={faMagnifyingGlassChart}></FontAwesomeIcon>}
          >
            <h3 className="font-bold vertical-timeline-element-title">Data breach analysis</h3>
            <p>
              Once the encrypted data is sent, ZenPass searches for publicly available leaked data, letting you know if your credentials are safe.
            </p>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: '#0d0e17', color: '#fff' }}
            contentArrowStyle={{ borderRight: '7px solid  #101010' }}
            iconStyle={{ background: '#94465d', color: '#fff' }}
            icon={<FontAwesomeIcon icon={faChartColumn}></FontAwesomeIcon>}
          >
            <h3 className="font-bold vertical-timeline-element-title">Overall security score</h3>
            <p>
              Based on your credentials status (Safe, weak and leaked), we calculate an overall security score. Make sure you keep it high enough.
            </p>
          </VerticalTimelineElement>
      
        </VerticalTimeline>
      </div>
    </div>
    
  )
}

export default HowItWorks
