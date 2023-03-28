import styles from '../styles/components/SignIn.module.css';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Input from './Input';
import { useResetPassword, useSendVerificationEmail, useSignInEmailPassword, useSignUpEmailPassword } from "@nhost/nextjs";
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import React from "react";
import { Navbar } from './Navbar';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signIn, SetsignIn] = useState(true);

  const {
    signInEmailPassword,
    needsEmailVerification:ver,
    isLoading:load,
    isSuccess: suc,
    isError:er,
    error:err
  } = useSignInEmailPassword()

  const {
    signUpEmailPassword,
    needsEmailVerification,
    isLoading:s,
    isSuccess,
    isError,
    error
  } = useSignUpEmailPassword()


  
  const { sendEmail, isLoading, isSent:eSent, isError:isEmailError, error:eError } = useSendVerificationEmail();

  const { resetPassword, isLoading:fIsLoading, isSent, isError:fIsError, error:fError } = useResetPassword()


  const [forgotPassword, setForgotPassword] = React.useState(false)

  const router = useRouter()

  const handleOnSubmit = async e => {
    e.preventDefault();

  

    
    try {
      if (signIn&&!forgotPassword) {
 
        const result = await  signInEmailPassword(email, password)

        console.log("Sign In result", result, email, password);

        if(result?.isSuccess){

          toast.success("Sucessfully Signed In")
          
          return router.push("/")}

        if(result?.isError)return toast.error(result?.error?.message)

        if(result?.needsEmailVerification)return toast.success("Please active your account by verifying your email")


        toast("Something went wrong. Please try again!")


      }

 
      
      if (!signIn&&!forgotPassword) {
 
        const result = await signUpEmailPassword(email,password)

        const results = await sendEmail({ [email]: email })

        console.log("Sign Up result", result,results,eSent,eError);

        if(result?.isError) return toast.error(result?.error?.message)

        if(result?.needsEmailVerification) return toast.error("Verify Your Email")

        
       }

       console.log("calling")


      if(forgotPassword){
      const result =  await resetPassword(email, {
          redirectTo: "/forgot"
          // redirectTo: 'https://alpha-wolfe-next-git-master-thadigotla.vercel.app/forgot'
          // redirectTo: 'https://alpha-wolfe-next-git-master-thadigotla.vercel.app/forgot'
          // redirectTo: 'http:localhost:3000/forgot'Sreekanthsreekanth970@gmail.com
          // redirectTo: 'http:localhost:3000/forgot'
          // redirectTo: 'https://alpha-wolfe-next.vercel.app/forgot'
        })

        console.log("result is",result)

        if(result?.isSent)return toast.success('Check your email to change your password')

        toast.error("Something went wrong")
      }
    } catch (error) {
      console.log("error is", error);
    }


  };

  return (<>
     <Navbar/> 
    <div className='singin_image' style={{display:"flex", justifyContent:"space-around", alignItems:"center",marginTop:"5%", width:"100%"}}>
      <div  className='singin_image_left' style={{position:"relative", height:"100vh", width:"55%", }}>
      <Image
        src="/images/loginimage.svg"
        alt="A description of the image"
        style={{height:"100%", width:"100%"}}
        layout='fill'
        objectFit='contain'
      />
    
    </div>
    <div className={styles.container} style={{  width:"40%", height:"100%",padding:"2%", }}>
      <div >
        <div className={styles['logo-wrapper']}>
          <Image src={"https://uploads-ssl.webflow.com/63f7267539759cafd312faae/63f733050ef63f2e151dc369_AW-logo-p-500.webp"} layout="fill" alt="logo"   objectFit="contain" />
        </div>

     { !forgotPassword ?   
       <form onSubmit={handleOnSubmit} className={styles.form}>
          <Input
            type="email"
            label="Email address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            label="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />

          <button type="submit" className={styles.button}>
          {signIn ? "Sign In" : "Sign Up"}
          </button>
        </form> :null}
    { forgotPassword ?   
       <form onSubmit={handleOnSubmit} className={styles.form}>
          <Input
            type="email"
            label="Email address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
 
          <button type="submit" className={styles.button}>
          Reset Password
          </button>
        </form> :null}
 
      </div>

<br/>
              <span
                style={{ cursor: "pointer", marginTop: "20px" }}
                onClick={() => SetsignIn(!signIn)}
              >
                {signIn ? "Don't have an account ?" : "Have an Account !"}
              </span>

              <br/>
              <br/>

              <span
                style={{ cursor: "pointer", marginTop: "20px" }}
                onClick={() => setForgotPassword(!forgotPassword)}
              >
                Forgot Password ?
              </span>

    </div>
    </div>
    </>
  );
};

export default SignIn;
