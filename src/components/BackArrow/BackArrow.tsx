import "./BackArrow.scss";
//import backButton from '../../../common/assets/controls/back-btn.svg';
import { useNavigate } from "react-router-dom";

export type BackArrowProps = {
  pathName: string;
};

const BackArrow: React.FC<BackArrowProps> = ({ pathName }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(pathName);
  };
  return (
    <div>
      <button
        type="button"
        onClick={handleBack}
        className="button-back"
      ></button>
    </div>
  );
};

export default BackArrow;
