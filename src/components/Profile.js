import { useEffect, useState } from "react"
import '../style/profile.css'
import { addPost,changeProfile } from "../services/post"

const Profile = (props) =>{
    const { user } = props

    const [addPic,setAddPic] = useState(false)
    const [formVal,setFormVal] = useState({title:"",url:"",userId:user.id})
    const [response,setResponse] = useState({})
    const [profpic, setProfPic] = useState(user.profile)

    const handleChange = (e) =>{
        setFormVal({ ...formVal, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log('sending')
        // setFormVal({...formVal,userId:user.id})
        const payload = await addPost(formVal)
        setFormVal({ title: '', url: '' })
        if (payload){
            setResponse(payload)
        }
        console.log(response)
      }
      const handleKeypress = e => {
        // Triggers by pressing the enter key
      if (e.keyCode === 13) {
          console.log("enterpressed")
          handleSubmit()
      }   
    }
    const changePic = async ()=>{
       let x = prompt('New Picture URL')
       setProfPic(x)
       let proftoken = {
           userId:user.id,
           profile:x
       }
       let b = await changeProfile(proftoken)
       console.log(b)
    }

return (<div>
        <div className="topProfile">
            <img alt="" className="profilePic" src={profpic}></img>
            <div className="profileDetail">This is your profile page {user.username}</div>
            <button onClick={changePic}>Change Profile</button>
        </div>
        <div className="profileFeed">
            <div id="addPic" ><div onClick={()=>setAddPic(!addPic)}>+</div>
            {(addPic ? <div>
            <form onSubmit={handleSubmit}>
                <input onChange={handleChange}
                name="title"
                placeholder="title"
                value={formVal.title}
                onKeyPress={handleKeypress}
                required
                ></input>
                <input onChange={handleChange}
                name="url"
                placeholder="url to image"
                value={formVal.url}
                onKeyPress={handleKeypress}
                required></input>
            <button >SEND IT</button>

            </form> </div>: null)}
            
            
            </div>
            {/* add the map user pics here */}
        </div>
    </div>)
}
export default Profile