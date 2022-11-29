import React, { useEffect, useState } from 'react'
import { Navbar, Footer, Sidebar, Card} from '../components'; 
import { useStateContext } from '../contexts/ContextProvider';
import {RiGroup2Line} from 'react-icons/ri';
import { Link } from 'react-router-dom';

const Groups = () => {
  const { currentMode, activeMenu} = useStateContext();
  const [ groups, setGroups] = useState([]);
  const [ groupBool, setGroupBool] = useState(false);
  useEffect(()=>{
    fetch('/api/getGroups').then(res=>{
      if(res.ok){
        let json = res.json()
        return json;
      } 
    }).then(res => {
      try{
        if(res.length > 0){
          setGroupBool(true)
          setGroups(res)
        }
      } catch{

      }
    })
  },[])
    let cards = [];
    function renderDiv(){
      groups.forEach(item => {
        cards.push(
          <Link key={item._id} className='w-5/6 p-2 ' to={{pathname: `/groups/${item._id}`}}>
            <div className='w-5/6'>
              <Card name={item.groupName} members={item.accepted.length} appts={item.appointments.length} />
            </div>
          </Link>
        )
      });        
      return(
        <div className='w-5/6'>
          {cards}
        </div>
      )
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
                <Navbar/>
            </div>
            {/* Content */}
              <div className='h-5/6'>
                {groupBool ?
                <div className='flex justify-center'>{renderDiv()}</div>
                :
                <p>You are not in any groups</p>
                } 
              </div>
            {/* footer */}
          <Footer/>
          </div>
        </div>
    </div>
  )
}

export default Groups