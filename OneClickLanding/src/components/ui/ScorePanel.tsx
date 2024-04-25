import { getStatusCount } from "@/utils/utils";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Badge} from "@nextui-org/react";
import PasswordComponent from "./password-component";

//Funcion que calcula la puntuacion total de seguridad.
function calculateScore(statusData: any): number {
  let overallScore = 0;
  const safePoints = 4;
  const weakPoints = 2;
  const reusedPoints = -3;
  const leakedPoints = -5;

  let idilicSafeCount = statusData.safeCount + statusData.weakCount + statusData.reusedCount + statusData.leakedCount;
  let idilicScore = idilicSafeCount * safePoints;
  let currentScore = statusData.safeCount * safePoints + statusData.weakCount * weakPoints + statusData.reusedCount * reusedPoints + statusData.leakedCount * leakedPoints;
  overallScore = (currentScore * 100) / idilicScore;
  if (isNaN(overallScore)) {
    overallScore = 100;
  }
  if (overallScore >= 0) {
    return Math.floor(overallScore);
  }
  return 0;
}

//Fucnion que, segun el score obtenido al calcularlo, devuelve un objeto con un texto y color, mostrando si la puntuacion obtenida es
//baja, media o alta
function getScoreText(score: number): any {
  let text = "";
  let color = "";

  if (score >= 0 && score <= 49) {
    text = "Low";
    color = "danger";
  } else if (score >= 50 && score <= 74) {
    text = "Medium";
    color = "warning";
  } else if (score >= 75 && score <= 100) {
    text = "High";
    color = "success";
  }

  let dataObj = {
    text: text,
    color: color,
  };
  return dataObj;
}

function ScorePanel(props: any) {
  let passwordEntries: any[] = props.passwordEntries;
  let statusData = getStatusCount(passwordEntries);

  let score = calculateScore(statusData);
  let scoreData = getScoreText(score);
  let passwordComponents: JSX.Element[] = [];
  passwordEntries.forEach((entry) => {
    passwordComponents.push(
      <PasswordComponent
        favicon={entry.favicon}
        title={entry.title}
        url={entry.url}
      ></PasswordComponent>
    );
  });

  return (
    <div className=" absolute top-0 right-0 h-full flex flex-col w-3/12 justify-start items-start bg-backgroundColor p-4">
      <h2 className="text-white font-bold text-2xl p-4">
        Overall Security Score
      </h2>

      <div className="bg-backgroundSecondary rounded-2xl p-4 self-center w-10/12 h-2/5 flex flex-col justify-center items-center">
        <Badge
          content={scoreData.text}
          color={scoreData.color}
          variant="flat"
          showOutline={false}
          placement="bottom-right"
        >
          <div className=" h-full w-full rounded-full flex flex-row justify-center items-center">
            <CircularProgressbar
              value={score}
              text={score.toString() + "%" }
              strokeWidth={7}
              styles={buildStyles({
                textSize: "16",
                textColor: "rgb(156,163,175) ",
                pathColor: "#f9769d",
                trailColor: "#171821",
              })}
            ></CircularProgressbar>
          </div>
        </Badge>
      </div>
    </div>
  );
}

export default ScorePanel;
