"use client";

import { signIn } from 'next-auth/react'
import { Button } from '@mui/material';

function Login() {
  return (
    <>
    <Button variant="contained" color="primary" onClick={() => signIn('google')}>Login</Button>
    </>
  )
}

export default Login