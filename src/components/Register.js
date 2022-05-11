import { useState } from 'react'
import { CreateUser, UserSignIn } from '../services/auth'


const Register = (props) =>{

    const [formVal, setFormVal] = useState({
        username:"",
        password:"",
        passCheck:""
    })


    const handleChange = (e) =>{
        setFormVal({ ...formVal, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()

        const newU = { username:formVal.username, password:formVal.password}
        const payload = await CreateUser(newU)
        setFormVal({ username: '', password: '' })
        console.log(payload)

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
            /><br/>
            <input
            onChange={handleChange}
            name="passCheck"
            type="password"
            placeholder="password"
            value={formVal.passCheck}
            onKeyPress={handleKeypress}
            required
            />
            </div>
            <button  className= 'sign-in'
            disabled={
                !formVal.username ||
                !formVal.password                 
            }
            >Sign Up</button>
</form>


    </div>

    )
}
export default Register