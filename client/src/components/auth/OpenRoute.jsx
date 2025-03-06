
import { Navigate } from 'react-router-dom';


const OpenRoute = ({children}) => {
  const token=null;
  if(token!=null){
    return <Navigate to="/" replace/>;
  }
  else{
     return children;
  }
}


export default OpenRoute