import { UserDataProps } from "../types";
import { Link } from "react-router-dom";
import '../styles/dataDisplay.scss'

export const DataDisplay = ({userData, getUserData} : UserDataProps) => {
  return (
    <div className="container">
      {userData && 
          <div className='info'>
            <div className='wrapper-info'>
              <div className='wrapper-info-item'>
                <p className="info-name">Name:</p>
                <p> {userData.name} </p>
              </div>
              <div className="wrapper-info-item">
                <p className="info-name">Terms: </p>
                <p>{userData.term ? 'Accepted' : 'Not accepted'}</p>
              </div>
              <div className="wrapper-info-item">
                <p className="info-name">Sectors:</p>
                <div className='sectors'>
                  {userData?.sectors?.map((sector:string, i:number) => 
                    <p key={i}> <span>{i+1}.</span> {sector}</p>
                  )}
                </div>
              </div>
            </div>
            <p className='link'><Link to='/'>Go to main</Link></p>
          </div>
          }
    </div>
  );
};
