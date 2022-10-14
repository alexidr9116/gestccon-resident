import { useNavigate } from "react-router-dom";
import { ChevronBackOutline } from 'react-ionicons'


export default function HeaderLogin(props) {
  const navigate = useNavigate()

  const handleNavigateBack = (e) => {
    e.preventDefault()
    navigate(-1)
  }

  return (
    <div className="appHeader no-border position-fixed">
      {props.withLeftSide && <div className="left">
        <a className="headerButton goBack" onClick={handleNavigateBack}>
          <ChevronBackOutline />
        </a>
      </div>}
      <div className="pageTitle">
        <img src='/assets/img/verano.png' width={100} />
      </div>
      <div className="right">
      </div>
    </div>
  )
}
