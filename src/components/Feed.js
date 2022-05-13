import { useEffect, useState } from "react"
import { getPosts } from "../services/gets"
import Client from "../services/api";
import '../style/feed.css'




const Feed = () =>{

    const [pics, setPics] = useState([])

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
        <div key ={x.id}><div>{x.title}</div><img alt='pic' className="imgTile" src={x.url}/><div></div></div>
    ))}

    {/* {pics[0].id} */}

    </div>
    )
}
export default Feed