import { useEffect, useState } from "react"
import '../style/profile.css'
import { addPost,changeProfile } from "../services/post"
import { getUserPosts } from "../services/gets"
import { deletePost } from "../services/delete"
import '../style/feed.css'

const Profile = (props) =>{
    const { user } = props

    const [addPic,setAddPic] = useState(false)
    const [formVal,setFormVal] = useState({title:"",url:"",userId:user.id})
    const [response,setResponse] = useState({})
    const [profpic, setProfPic] = useState(user.profile)
    const [pics, setPics] = useState([])
    const [cardFocus,setCardFocus] = useState([false,{}])

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
    const focusCard= (post) =>{
        setCardFocus([true,post])
      }
    const changePic = async ()=>{
       let x = prompt('New Picture URL')
       if (x===null){
           return
       }
       console.log(x,'picture here')
       setProfPic(x)
       let proftoken = {
           userId:user.id,
           profile:x
       }
       let b = await changeProfile(proftoken)
       console.log(b)
    }
    const deletepic = async (picId) =>{
        let delpic = await deletePost(picId)
        console.log(delpic)
    }
    useEffect(()=>{
        let x = async()=>{
            if(isNaN(user.id))
            {return}
            let b = await getUserPosts(user.id)
            console.log(b)
            setPics(b)
             return 
        } 
        x()
        //  setPics(x)//get all drawings
         console.log(pics)
    },[])

return (<div>
        <div className="topProfile">
            <img alt="" className="profilePic" src={profpic}></img>
            <div className="change-pic-button" onClick={changePic}>Click here to change {user.username}'s profile picture</div>
            <div id="addPic" ><div className="clickPic" onClick={()=>setAddPic(!addPic)}>Click here to add picture</div>            {(addPic ? <div>
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

            </form> </div>: null)}</div>


        </div>
        <div className="profileFeed">
            {cardFocus[0] ? <div className="imgTile" key  ={cardFocus[1].id} ><div>{cardFocus[1].title}</div><img onClick={() => setCardFocus(...cardFocus, (cardFocus[0] = false))} alt='pic' className="bigImage" src={cardFocus[1].url}/>{user.id === cardFocus[1].userId ? <div className="deleteButton" onClick={()=>deletepic(cardFocus[1].id)}>Delete</div>:null}<div></div></div> : pics.reverse().map( x =>(
        <div className="imgTile" key  ={x.id} ><div>{x.title}</div><img onClick={() => focusCard(x)} alt='pic' className="imgsquare" src={x.url}/>{user.id === x.userId ? <div className="deleteButton" onClick={()=>deletepic(x.id)}>Delete</div>:null}<div></div></div>
    ))}
        </div>
    </div>)
}
export default Profile