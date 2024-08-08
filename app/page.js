"use client";

import { Box, Button, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/navigation';


export default function Landing() {
    const { push } = useRouter();

    // redirect to login
    const handleLogin = () => {
        push('login');
    }

    // redirect to signup
    const handleSignup = () => {
        push('signup');
    }

  return (
    <Box width="100vw" height="100vh" gap={2} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
      
      <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} width="80vw" bgcolor={'#79c1f1'} borderRadius= {'60px'} p= {4} mb={'15px'}>
        <Typography variant="h1" component="h1" textAlign={'center'}>IMS-AI</Typography>
      </Box>

      <Typography variant="h3" color={'violet'} component="h3">AI-powered Inventory Management System</Typography>
      <Typography variant="h4" color={'grey'} textAlign={'center'} component="h4">Manage your inventory efficiently and get<br/> personalized recipe suggestions</Typography>
      
      <Typography variant="h5" component="h5">Get started</Typography>

      <Stack direction={'row'} spacing={2}>
        <Button variant="contained" onClick={handleSignup}>Signup</Button>
        <Button variant="outlined" onClick={handleLogin}>Login</Button>
      </Stack>

      <Typography variant="p" component="p">&copy; {new Date().getFullYear()} Tuka Alsharief. All rights reserved.</Typography>

    </Box>
  )
}
