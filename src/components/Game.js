import React, { useState, useRef, useEffect } from "react";
import Hammer from 'hammerjs'
import ColorPicker from "./ColorPicker";
import '../style/game.css'



const Game =(props)=>{
    const contextRef = useRef(null);
    const [pickedColor,setPickedColor] = useState("#000000")
    const [isDraw,setIsDraw] = useState(false)

    const canvasRef = useRef(null)
    if(document.querySelector('.gzone')){
      const ham = document.querySelector('.gzone');
      const hamManage = new Hammer.Manager(ham)
      const Swipe = new Hammer.Swipe()
      const Tap = new Hammer.Tap()
      const Press = new Hammer.Press()
      const Pan = new Hammer.Pan()
      hamManage.add(Pan)
      hamManage.add(Press)
      hamManage.add(Tap)
      hamManage.add(Swipe)
      hamManage.on('swipe', function(e) {
        console.log('swipe',e)
        // move(e)
      });
      hamManage.on('tap',function(e){
        console.log('tap',e)
      })
      hamManage.on('pressup',function(e){
        console.log('Pressign',e)
      })

    }

    const start = ({nativeEvent}) =>{
      const { offsetX, offsetY } = nativeEvent
      const x = offsetX
      const y = offsetY
      contextRef.current.beginPath()
      contextRef.current.moveTo(x,y)
      setIsDraw(true)

    }
    const finDraw = () =>{
      contextRef.current.closePath()
      setIsDraw(false)
    }
    
    const getImage = async (btn) =>{
      const can = canvasRef.current.toDataURL('image/png')
      const blob = await (await fetch(can)).blob();
      const blobURL = URL.createObjectURL(blob)
      const link = document.createElement('a')
      console.log(can)
      link.href = blobURL
      link.download = 'coolpic.png'
      link.click()
    }
    const colorSelect =(e) =>{
      console.log(e)
      console.log(contextRef.strokeStyle)
      setPickedColor(e)


    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const draw = ({nativeEvent}) =>{
        // console.log(dxdy[0],dxdy[1])
        // console.log(playerXY[0],playerXY[1])
        if(!isDraw){
          return
        }
          const { offsetX, offsetY } = nativeEvent
          const x = offsetX
          const y = offsetY
        let ctx = contextRef.current
         ctx.strokeStyle = pickedColor
        console.log(ctx.strokeStyle)
        ctx.lineTo(x,y)
        ctx.stroke();
    }
    useEffect(() => {
      const canvas = canvasRef.current
      canvas.width = window.innerWidth*2;
      canvas.height = window.innerHeight*2;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
  
      const context = canvas.getContext("2d")
      context.scale(2, 2);
      context.lineCap = "round";
      // context.strokeStyle = "black";
      context.lineWidth = 5;
      contextRef.current = context;
    }, [])


    return(
        <div id = "game-wrap"><ColorPicker selectColor={colorSelect}>s</ColorPicker><canvas className="gzone" id="gzone" ref={canvasRef} onMouseDown={start} onMouseMove={draw} onMouseUp={finDraw}></canvas><button  onClick={getImage}> Download</button>
        </div>
    )
}
export default Game