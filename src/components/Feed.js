import { useEffect, useState } from "react"
import { getPosts } from "../services/gets"
import { deletePost } from "../services/delete";
import Client from "../services/api";
import '../style/feed.css'




const Feed = (props) =>{
    const { user } = props
    const [pics, setPics] = useState([])

    const deletepic = async (picId) =>{
        let delpic = await deletePost(picId)
        console.log(delpic)
    }
    console.log(user.id)
    useEffect(()=>{
        let x = async()=>{
            let b = await getPosts()
            console.log(b)
            setPics(b)
             return 
        } 
        x()
        //  setPics(x)//get all drawings
         console.log(pics)
    },[])
    if(pics)
    return (
    <div>
        
        {pics.map( x =>(
        <div key ={x.id}><div>{x.title}</div><img alt='pic' className="imgTile" src={x.url}/>{user.id === x.userId ? <div className="deleteButton" onClick={deletepic(x.id)}>Delete</div>:null}<div></div></div>
    ))}

    {/* {pics[0].id} */}

    </div>
    )
}
export default Feed