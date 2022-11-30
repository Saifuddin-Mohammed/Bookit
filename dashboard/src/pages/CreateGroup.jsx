import React, { useEffect, useState } from 'react'
import { AiOutlineUsergroupAdd } from 'react-icons/ai'
import { Navbar, Footer, Sidebar} from '../components'; 
import { useStateContext } from '../contexts/ContextProvider';
import { useNavigate } from "react-router-dom";
const CreateGroup = () => {
  const [user, setUser] = useState(null);
  let navigate = useNavigate();
  function red(){
      navigate(`/`)
  }
  const { currentMode, activeMenu} = useStateContext();
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

    let handleSubmit = (e) => {
        e.preventDefault();
        fetch('/api/newGroup', {
          method: 'POST', 
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(
            {groupName: groupName,
              emails: emails,
              description: description,
          })
        }).then(res=>{
          if(res.status !== 200){
            setMessage("There was a problem")
          } else {
            red()
          }
        })
      };
    const [groupName, setGroupName] = useState("");
    const [emails, setEmails] = useState("");
    const [description, setDescription] = useState("");
    const [message, setMessage] = useState("");

    return(
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

      {user ?
      <div>      
      <div className="flex flex-col items-center min-h-screen pt-6 justify-center sm:pt-0 bg-gray-50">
        <div>
          {/* <MdEventAvailable href='/' className='h-24 w-24'/>           */}
          </div>
            <div className="w-full px-6 py-4 mt-6 bg-gradient-to-r from-sky-500 to-indigo-500 shadow-md sm:max-w-md sm:rounded-lg h-6/8 overflow-visible ">
            <div className="items-center justify-center flex text-white"><AiOutlineUsergroupAdd href='/' className='h-24 w-24'/></div>  
            <p className='block text-sm font-bold black undefined text-center bold text-white'>Create new Group</p>
              <form onSubmit={handleSubmit}>
                {/* name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-white undefined"
                  >
                    Group Name
                  </label>
                    <div className="flex flex-col items-start">
                      <input
                        onChange={(e) => setGroupName(e.target.value)}
                        type="text"
                        name="title"
                        required="true"
                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      />
                    </div>
                  </div>
                  {/* members */}                  
                  <label
                    htmlFor="members"
                    className="block text-sm font-medium text-white undefined"
                  >
                    Member emails (Please enter each followed by a ' , ')
                  </label>
                    <div className="flex flex-col items-start">
                      <input
                        onChange={(e) => setEmails(e.target.value)}
                        type="text"
                        name="members"
                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      />
                    </div>
                    {/* description */}
                    <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-white undefined"
                  >
                    Description
                  </label>
                    <div className="flex flex-col items-start">
                      <input
                        onChange={(e) => setDescription(e.target.value)}
                        type="text"
                        name="description"
                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      />
                    </div>
                      </div>
                      {/* Submit */}
                          <div className="flex items-center justify-end mt-4">
                              <button
                                  type="submit"
                                  className="inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-blue-700 border border-transparent rounded-md active:bg-gray-900 false"
                              >
                                  Create Group
                              </button>
                          </div>
                      </form>
                      <div className="message">{message ? <p>{message}</p> : null}</div>
                  </div>
              </div>
          </div>
      :
      <div>      
      <div className="flex flex-col items-center min-h-screen pt-6 justify-center sm:pt-0 bg-gray-50">
        <div>
          {/* <MdEventAvailable href='/' className='h-24 w-24'/>           */}
          </div>
            <div className="w-full px-6 py-4 mt-6 bg-gradient-to-r from-sky-500 to-indigo-500 shadow-md sm:max-w-md sm:rounded-lg h-6/8 overflow-visible ">
              <p className='text-white'>Please login to see this page</p>
          </div>
          </div>
          </div>

      }
                    {/* footer */}
                    <Footer />
          </div>
        </div>
    </div>
    )
}

export default CreateGroup