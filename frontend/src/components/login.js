import React,{useState} from 'react';
import * as Components from './login_com';
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    //useStates and connecting backend for signup
    const [Sname, setSname] = useState("");
    const [Semail, setSemail]= useState("");
    const [Spass, setSpass]= useState("");

    const handle_sign_up=async(e)=>{
        e.preventDefault();
        const response=await fetch('http://localhost:5000/auth/signup',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name:Sname,email:Semail, password:Spass }),
        });
        const data=await response.json();
        if(data.ok){
            console.log(data.token);
            localStorage.setItem('authToken', data.token);
            navigate('/');
            window.location.reload();
        }
    }
    //useStates and connecting backend for Login
    const [lEmail, setLemail]= useState("");
    const [lPass, setLpass]= useState("");

    const handle_login=async(e)=>{
        e.preventDefault();
        const response=await fetch('http://localhost:5000/auth/login',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email:lEmail, password:lPass }),
        });
        const data=await response.json();
        if(data.ok){
            console.log(data.token);
            localStorage.setItem('authToken', data.token);
            navigate('/');
            window.location.reload();
        }
    }


    const [signIn, toggle] = React.useState(true);
     return(
        <div className="d-flex justify-content-center align-items-center" style={{marginTop:"100px"}}>
         <Components.Container>
             <Components.SignUpContainer signinIn={signIn}>
                 <Components.Form>
                     <Components.Title>Create Account</Components.Title>
                     <Components.Input type='text' placeholder='Name' required onChange={(e)=>{setSname(e.target.value)}}/>
                     <Components.Input type='email' placeholder='Email' required onChange={(e)=>{setSemail(e.target.value)}}/>
                     <Components.Input type='password' placeholder='Password' required onChange={(e)=>{setSpass(e.target.value)}}/>
                      <Components.Button onClick={handle_sign_up}>Sign Up</Components.Button>
                 </Components.Form>
             </Components.SignUpContainer>

             <Components.SignInContainer signinIn={signIn}>
                  <Components.Form>
                      <Components.Title>Login</Components.Title>
                      <Components.Input type='email' placeholder='Email' required onChange={(e)=>{setLemail(e.target.value)}}/>
                      <Components.Input type='password' placeholder='Password' required onChange={(e)=>{setLpass(e.target.value)}}/>
                      <Components.Anchor href='#'>Forgot your password?</Components.Anchor>
                      <Components.Button onClick={handle_login}>Login</Components.Button>
                  </Components.Form>
             </Components.SignInContainer>

             <Components.OverlayContainer signinIn={signIn}>
                 <Components.Overlay signinIn={signIn}>

                 <Components.LeftOverlayPanel signinIn={signIn}>
                     <Components.Title>Welcome Back!</Components.Title>
                     <Components.Paragraph>
                         To keep connected with us please login with your personal info
                     </Components.Paragraph>
                     <Components.GhostButton onClick={() => toggle(true)}>
                         Login
                     </Components.GhostButton>
                     </Components.LeftOverlayPanel>

                     <Components.RightOverlayPanel signinIn={signIn}>
                       <Components.Title>Hello, Friend!</Components.Title>
                       <Components.Paragraph>
                           Enter Your personal details and start journey with us
                       </Components.Paragraph>
                           <Components.GhostButton onClick={() => toggle(false)}>
                               Sigin Up
                           </Components.GhostButton> 
                     </Components.RightOverlayPanel>
 
                 </Components.Overlay>
             </Components.OverlayContainer>
         </Components.Container>
         </div>
     )
}

export default Login;