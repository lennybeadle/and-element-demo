import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloud, faCloudRain, faCloudShowersHeavy, faSnowflake, faSun, faSmog } from '@fortawesome/free-solid-svg-icons';

export const getWeatherIcon = (code) => {
  switch (code) {
    case 1000:
      return <FontAwesomeIcon icon={faSun} />;
    case 1003:
      return <FontAwesomeIcon icon={faCloud} />;
    case 1006:
    case 1009:
      return <FontAwesomeIcon icon={faCloudShowersHeavy} />;
    case 1030:
      return <FontAwesomeIcon icon={faSmog} />;
    case 1063:
    case 1180:
    case 1183:
    case 1186:
    case 1189:
    case 1192:
    case 1195:
    case 1198:
    case 1201:
    case 1240:
    case 1243:
      return <FontAwesomeIcon icon={faCloudRain} />;
    case 1066:
    case 1069:
    case 1114:
    case 1117:
    case 1210:
    case 1213:
    case 1216:
    case 1219:
    case 1222:
    case 1225:
    case 1237:
      return <FontAwesomeIcon icon={faSnowflake} />;
    default:
      return null;
  }
};
