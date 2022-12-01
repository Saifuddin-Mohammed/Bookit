import React, { useEffect, useState } from 'react'
import { Routes, Route, useParams } from 'react-router-dom';
import { Navbar, Footer, Sidebar} from '../components'; 
import { useStateContext } from '../contexts/ContextProvider';
import { useNavigate } from "react-router-dom";

const ViewGroup = () => {
    const [group, setGroup] = useState(null);
    const [user, setUser] = useState(null);
    const { currentMode, activeMenu} = useStateContext();
    let id = useParams().id
    let navigate = useNavigate();

    function navEdit(){
        navigate(`/editGroup/${id}`)
    }
    function navDelete(){
        navigate('/')
    }
    useEffect(()=>{
        console.log(`/api/getGroup/${id}`)
        fetch(`/api/getGroup/${id}`)
        .then(res=>{
            if(res.ok){
                let json = res.json()
                return json;
            }
        }).then(group=>{
            setGroup(group)
        })
    },[])

    useEffect(()=>{
        fetch('/api/user').then(res=>{
          if(res.ok){
            let json = res.json()
            return json;
          }
        }).then(data=>{
          if(data){
            setUser(data)
          }
          console.log(data)
        })
      },[])
    function renderUsers(){
        let users = group.accepted;
        let formated = [];
        console.log(users)
        users.forEach(user => {
            formated.push(
                <div>
                <p>Name: {user.lastName}, {user.firstName}</p>
                <p>Username: {user.userName}</p>
                <br></br>
                </div>
            )
        });
        return(
            <div>{formated}</div>
        )
    }

    function editGroup(){
        navEdit()
    }

    function deleteGroup(){
        fetch(`/api/deleteGroup/${id}`).then(res=>{
            if(res.ok){
                navDelete()
            }
        })
    }
  return (
<div>
    <div className="flex relative dark:bg-main-dark-bg">
      {/* <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
        
      </div> */}
      {activeMenu ? (
        <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
          <Sidebar />
        </div>
      ) : (
        <div className="w-0 dark:bg-secondary-dark-bg">
          <Sidebar />
        </div>
      )}
        <div
            className={
                activeMenu
                ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  '
                : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
            }
        >
        <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
            <Navbar />
        </div>


    <div>
        <div className="flex flex-col items-center min-h-screen pt-6 justify-center sm:pt-0 bg-gray-50 ">
          <div className="w-full px-6 py-4 mt-6 bg-gradient-to-r from-sky-500 to-indigo-500 shadow-md sm:max-w-md sm:rounded-lg h-6/8 overflow-visible ">
        {group ? 
        <div>
            <div className='text-white text-center text-xl'>{group.groupName}</div>
            <div className='text-white'>Users:
                {renderUsers()}
            </div>
            {user && (user._id == group.author)?
            <div className='flex'>
                <p className='float-right text-white m-2'>Admin Controls:</p>
                <div className='float-right'>          
                    <button type="submit" className='bg-white text-blue-700 float-right p-2 m-2' onClick={()=>deleteGroup()}>Delete Group</button>
                    <button type="submit" className='bg-white text-blue-700 float-right p-2 m-2' onClick={()=>editGroup()}>Edit Group</button>      
                </div>
            </div>
                :
                <div>
                    
                </div>
            }
        </div>
        :
            <div>Can not find a group with this ID</div>
        }
    </div>
    </div>
    </div>



              {/* footer */}
              <Footer />
          </div>
        </div>
    </div>
  )
}

export default ViewGroup