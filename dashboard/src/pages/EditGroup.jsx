import React, {useEffect, useState} from 'react'
import { Navbar, Footer, Sidebar, User} from '../components';
import { useStateContext } from '../contexts/ContextProvider';
import { useParams } from 'react-router-dom';
const EditGroup = () => {
    const { currentMode, activeMenu} = useStateContext();
    const [emails, setEmails] = useState("");
    const [message, setMessage] = useState(null);
    const [groupName, setGroupName] = useState("Group Name");
    const [group, setGroup] = useState(null);
    const [users, setUsers] = useState(null);
    let id = useParams().id

    let temp = [];
    function renderDiv(){
        users.forEach(user => {
          temp.push(
            <div key={user._id}>
                <User name={user.firstName} user={user._id} group={group._id}/>
            </div>
          )
        });        
        return(
          <div className='w-5/6'>
            {temp}
          </div>
        )
      }

    useEffect(()=>{
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
        fetch(`/api/getGroup/${id}`)
        .then(res=>{
            if(res.ok){
                let json = res.json()
                return json;
            }
        }).then(group=>{
            setUsers(group.accepted)
        })
    },[])
    
    let addUser = () =>{
        fetch('/api/addUser', {
            method: 'POST', 
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(
              { emails: emails,
                group: group._id
            })
        }).then(res=>{
            if(!res.ok){
                setMessage("There was a problem")
            }
        })
    }
    return (
    <div>
        <div className="flex relative dark:bg-main-dark-bg">
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
                : 'bg-slate-100 dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
            }
        >
        <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
            <Navbar />
        </div>

    {/* Body */}

        <div className='h-4/6 bg-slate-100'>
            <div className='justify-center w-full bg-blue-600 h-1/6'>
                <p className='text-center text-white text-5xl pt-8'>{groupName}</p>
            </div>
            {/* full width */}
            <div className='w-full h-5/6 '>
                {/* left 2/3 */}
                <div className='w-4/6 float-left bg-blue-600 h-full'>
                    {group && users?
                    <div className="flex flex-col min-h-screen pt-6 bg-slate-100 pl-12 pr-12">
                        {renderDiv()}
                    </div>
                    :
                    <div>
                    </div>
                    }
                    
                </div>
                {/* Right 1/3 */}
                <div className='w-2/6 float-right h-full'>  
                <div className='h-full w-full'>
                    <p className='text-center text-xl mr-24'>Add a new user/s:</p>
                    <p className='text-center text-xl mr-24'>Enter each email followed by a ','</p>
                    <form className='h-full w-full' onSubmit={addUser}>
                    <input
                        onChange={(e) => setEmails(e.target.value)}
                        type="text"
                        name="members"
                        required={true}
                        className="block w-5/6 mt-4 drop-shadow border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    /> 
                    <button
                        type="submit"
                        className="inline-flex items-center px-4 py-2 mt-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-blue-700 border border-transparent rounded-md active:bg-gray-900 false"
                    >
                        Add User
                    </button>                
                    </form>
                    {message ?
                    <div>There was a problem</div>
                    :
                    <div></div>
                    }
                </div>
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

export default EditGroup;

// <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <title>Edit Group</title>

//     <style>

//         .Groups{
//             position: absolute;
//             left: 850px;
//             top: 250px;
//             width: 600px;
//             height: 600px;
//             border: 2px solid black;
//             background-image:linear-gradient(to left, royalblue , dodgerblue);
//             color: white;
//             font-size: 24px;
//         }
//         .Groups h1{
//             padding-left: 130px;
//             color: white;
//         }

//         #cancel{
//             font-size: 25px;
//             position: relative;
//             left: 450px;
//             bottom: 250px;
//         }
//         #submit,#submit2,#submit3,#submit4{
//             font-size: 17px;
//             position: relative;
//         }
//         #add{
//            position: relative;
//             left: 250px;
//             bottom: 400px;
//         }
//         #email,#addbutton{
//             font-size:25px;
//         }

//     </style>
// </head>

// <body>

// <div class="Groups">

//     <h1>Group Members</h1>
//     <ul>
//         <li>User one </li> <button type="button" value="Delete" id="submit">Delete</button><br><br>
//         <li>User one </li> <button type="button" value="Delete" id="submit2">Delete</button><br><br>
//         <li>User one </li> <button type="button" value="Delete"id="submit3">Delete</button><br><br>
//         <li>User one </li> <button type="button" value="Delete"id="submit4">Delete</button><br><br>
//     </ul>
//     <input id="cancel" type="submit" value="Cancel">
//     <form id="add">
//         <label for="email">Member emails<br>(Please enter each followed by a ',') </label><br>
//         <input type="text" id="email" name="email" value="email"><br><br>
//         <input type="submit" value="Submit" id= "addbutton">
//     </form>
// </div>



// </body>
// </html>