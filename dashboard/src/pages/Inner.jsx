import React , {useEffect} from 'react'
import { useNavigate } from "react-router-dom";

const Groups = () => {
    let navigate = useNavigate();
    let rerender = false;
    function loginRed(){
        navigate(`/login`)
    }
    useEffect(()=>{
        if(!rerender){
            rerender = true
            this.forceUpdate();
        }else {
            loginRed()
        }        
    }, [])
  return (
    <div>Groups</div>
  )
}

export default Groups