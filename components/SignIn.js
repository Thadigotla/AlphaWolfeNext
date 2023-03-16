import styles from '../styles/components/SignIn.module.css';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Input from './Input';
import { useSignInEmailPassword, useSignUpEmailPassword } from "@nhost/nextjs";
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';


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


  const router = useRouter()

  const handleOnSubmit = async e => {
    e.preventDefault();

  

    
    try {
      if (signIn) {
 
        const result = await  signInEmailPassword(email, password)

        console.log("Sign In result", result, email, password);

        if(result?.isSuccess) return router.push("/")

        if(result?.isError)return toast(result?.error?.message)

        toast("Something went wrong. Please try again!")


      }

 
      
      if (!signIn) {
 
        const result = await signUpEmailPassword(email,password)

        console.log("Sign Up result", result);
      }
    } catch (error) {
      console.log("error is", error);
    }


  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles['logo-wrapper']}>
          <Image src="/logo.svg" alt="logo" layout="fill" objectFit="contain" />
        </div>

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
        </form>
      </div>

      <span
                style={{ cursor: "pointer", marginTop: "20px" }}
                onClick={() => SetsignIn(!signIn)}
              >
                {signIn ? "Don't have an account ?" : "Have an Account !"}
              </span>
    </div>
  );
};

export default SignIn;
