import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Card, CardHeader, CardBody} from "@nextui-org/react";

function FeatureCard(props:any){
    


  return (
    
    <Card className="my-4 py-4 mx-4 w-full lg:w-1/4 bg-backgroundColorDark hover:bg-backgroundColor">
    <CardHeader className="pb-0 pt-2 px-4 flex-row justify-start">
      <FontAwesomeIcon size="xl" icon={props.icon} className="px-2"></FontAwesomeIcon>
      <div className="flex-col items-start ml-4">
        <p className="text-tiny uppercase font-bold">{props.category}</p>
        <small className="text-default-500">Feature</small>
        <h4 className="font-bold text-large">{props.featureTitle}</h4>
      </div>
      
    </CardHeader>
    <CardBody>
      <p className="text-gray-400 px-2">{props.description}</p>
    </CardBody>
  </Card>

  )
}

export default FeatureCard
