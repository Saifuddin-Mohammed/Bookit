import React from 'react';
import {FaUserAlt} from 'react-icons/fa';
import { useNavigate } from "react-router-dom";

const User = ({name, group, user}) => {
    let navigate = useNavigate();
    function delRed(){
        navigate(`/editgroup/${group}`)
    }
    let deleteUser = (group, user) =>{
      fetch('/api/deleteUser', {
        method: 'POST', 
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(
          { user: user,
            group: group
        })
      }).then(delRed())
    }
    return(
    <div className="mb-10 w-5/6 h-20 bg-white drop-shadow">
      {/* Icon */}
      <div className='h-full float-left w-1/12 '>
          <FaUserAlt className='text-black w-16 h-16 pt-4 pl-4'/>
      </div>
      {/* Info */}
      <div className='float-left w-7/12  h-20'>
          <p className='p-4'>{name}</p>
      </div>
      {/* Form */}
      <div className='float-left h-20 w-4/12'>
          <button onClick={()=>{deleteUser(group,user)}} className='float-right p-2 mt-5 bg-slate-200 mr-5'>Remove User</button>
      </div>
    </div>
    );
  };

export default User;