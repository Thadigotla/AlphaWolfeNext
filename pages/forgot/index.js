
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Input from '../../components/Input';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import React from "react";
import { useChangePassword } from "@nhost/react";
import { Button } from 'antd';

const ForgotPassword = () => {


const router = useRouter()

const { changePassword, isLoading, isSuccess, isError, error } = useChangePassword()

console.log( isLoading, isSuccess, isError, error )

const [newPassword, setNewPassword] = React.useState('');



 

    const handleFormSubmit = async e => {
        e.preventDefault();
    
        try {
     
            const result =   await changePassword(newPassword)

            console.log("result is", result)

    
            if(result?.isSuccess)return toast.success("Password changed!. Please login again!")
    
     
            toast("Something went wrong. Please try again!")
    
     
          
        } catch (error) {
          console.log("error is", error);
        }
    
    
      };

  return<>  <form onSubmit={handleFormSubmit} style={{minWidth:"500px", width:"50%", display:"block", textAlign:"center"}}>
    <Input
      type="password"
      label="Password"
      value={newPassword}
      onChange={e => setNewPassword(e.target.value)}
      required
    />

    <Button type="submit"  onClick={handleFormSubmit} >
    Change Password
    </Button>

  </form>
  <Button onClick={()=>router.push("/sign-in")}>Login</Button>

  </>
}



export default ForgotPassword;