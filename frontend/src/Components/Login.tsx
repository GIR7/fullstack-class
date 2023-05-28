import {useCallback, useState} from "react";
import {useAuth} from "../Services/Auth.tsx"

export function Login(){
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [submitFailed,setSubmitFailed] = useState(false);

    const context = useAuth();

    //won't run automatically unless it gets called
    const onSubmitLogin = useCallback(
        async ()=>{
            //make sure we have the authorization first
            if (context) {
                const loginSuccess = await context.handleLogin(email, password)
                //Login failed
                if (!loginSuccess) {
                    setSubmitFailed(true)
                }
            }else{
                console.error("We have no auth context")
            }
        },[email,password,setSubmitFailed]
    )

    return(
        <div>
            <div>
                Login
            </div>
            <div>
                {submitFailed? <p>Your email or password is incorrect! Please try again</p> : null}
            </div>

            <label htmlFor = {"email"}> Email Address: </label>
            <input
            type="text"
            id="email"
            required
            value={email}
            onChange={(ev)=>{setEmail(ev.target.value)}}
            name={"email"}
            />

            <label htmlFor = {"password"}> Password: </label>
            <input
                type="text"
                id="password"
                required
                value={password}
                onChange={(ev)=>{setPassword(ev.target.value)}}
                name={"password"}
            />
            <div>
                <button onClick={onSubmitLogin}>Submit</button>
            </div>
        </div>
    )
}
