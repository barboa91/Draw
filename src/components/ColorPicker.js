import React, { useState, useRef, useEffect } from "react";
import Hammer from 'hammerjs'
import '../style/color.css'
const ColorPicker = (props) =>{
    const returnColor = (e) => {
        // props.selectColor = e.style
        let rgb2hex= c => '#'+c.match(/\d+/g).map(x=>(+x).toString(16).padStart(2,0)).join``
        console.log(e)
        let x = rgb2hex(getComputedStyle(e.target).backgroundColor)

        props.selectColor(x)
        document.getElementById('select1').style.backgroundColor = x
    }

    return (
    <div>
        <div id='colorselection'>
            Selected Color
            <div id='select1'></div>
        </div>
        <div id="colors">
            <div className ="colorGroup" id='color1' onClick={returnColor}></div>
            <div className ="colorGroup" id='color2' onClick={returnColor}></div>
            <div className ="colorGroup" id='color3' onClick={returnColor}></div>
            <div className ="colorGroup" id='color4' onClick={returnColor}></div>
            <div className ="colorGroup" id='color5' onClick={returnColor}></div>
            <div className ="colorGroup" id='color6' onClick={returnColor}></div>
            <div className ="colorGroup" id='color7' onClick={returnColor}></div>
            <div className ="colorGroup" id='color8' onClick={returnColor}></div>
            <div className ="colorGroup" id='color9' onClick={returnColor}></div>
            <div className ="colorGroup" id='color10' onClick={returnColor}></div>
            <div className ="colorGroup" id='color11' onClick={returnColor}></div>
            <div className ="colorGroup" id='color12' onClick={returnColor}></div>
            <div className ="colorGroup" id='color13' onClick={returnColor}></div>
            <div className ="colorGroup" id='color14' onClick={returnColor}></div>
            <div className ="colorGroup" id='color15' onClick={returnColor}></div>
            <div className ="colorGroup" id='color16' onClick={returnColor}></div>
        </div>
    </div>
    )
}

export default ColorPicker