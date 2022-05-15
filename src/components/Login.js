import { useState } from 'react'
import { UserSignIn } from '../services/auth'
import { useNavigate } from 'react-router-dom'


const Login = (props) =>{

    const navigate = useNavigate()
    const [formVal, setFormVal] = useState({
        username:"",
        password:""
    })

    const [logStatus, setLogStatus] = useState("")

    const handleChange = (e) =>{
        setFormVal({ ...formVal, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const payload = await UserSignIn(formVal)
        setFormVal({ username: '', password: '' })
        props.setUser(payload)
        if (payload){
            props.toggleAuthenticated(true)
            navigate('/profile')
        }else{
            setLogStatus("Bad")
            alert("badd")
            props.toggleAuthenticated(false)
        }
      }
      const handleKeypress = e => {
        // Triggers by pressing the enter key
      if (e.keyCode === 13) {
          handleSubmit()
      }   
    }


    return(
        <div className='input-page'>
            <form onSubmit={handleSubmit} >
            <div className="input-wrap-register">
            <input
            onChange={handleChange}
            name="username"
            type="text"
            placeholder="username"
            value={formVal.username}
            required
            />
            </div>
            <div className="input-wrap-register">
            <input
            onChange={handleChange}
            name="password"
            type="password"
            placeholder="password"
            value={formVal.password}
            onKeyPress={handleKeypress}
            required
            />
            </div>
            {logStatus === "Bad" ? <div>incorrect login</div> : null}
            <button  className= 'sign-in'
            disabled={
                !formVal.username ||
                !formVal.password                 
            }
            > Sign In</button>
</form>


    </div>

    )
}
export default Login