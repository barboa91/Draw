import { useEffect, useState } from "react"
import { getPosts } from "../services/gets"
import { deletePost } from "../services/delete";
import Client from "../services/api";
import '../style/feed.css'




const Feed = (props) =>{
    const { user } = props
    const [pics, setPics] = useState([])
    const [cardFocus,setCardFocus] = useState([false,{}])

    const deletepic = async (picId) =>{
        let delpic = await deletePost(picId)
        console.log(delpic)
    }
    const focusCard= (post) =>{
        setCardFocus([true,post])
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
    <div className="feed">
        {cardFocus[0] ? <div className="imgTile" key  ={cardFocus[1].id} ><div>{cardFocus[1].title}</div><img className="bigImage" onClick={() => setCardFocus(...cardFocus, (cardFocus[0] = false))} alt='pic' src={cardFocus[1].url}/>{user.id === cardFocus[1].userId ? <div className="deleteButton" onClick={()=>deletepic(cardFocus[1].id)}>Delete</div>:null}<div></div></div> : pics.reverse().map( x =>(
        <div className="imgTile" key  ={x.id} ><div>{x.title}</div><img onClick={() => focusCard(x)} alt='pic' className="imgsquare" src={x.url}/>{user.id === x.userId ? <div className="deleteButton" onClick={()=>deletepic(x.id)}>Delete</div>:null}<div></div></div>
    ))}
        

    {/* {pics[0].id} */}

    </div>
    )
}
export default Feed