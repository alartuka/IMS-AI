'use client';

import { AppBar, Box, Button, Container, Stack, Toolbar } from '@mui/material'
import Link from 'next/link'
import { useState, useEffect } from 'react';
import { userAuth } from './AuthContext';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export default function Navbar() {
    const { user, logOut } = userAuth();
    const { push } = useRouter();

    const handleSignOut = async () => {
        try {
          await logOut();
          push('login');
        } catch (error) {
          console.log(error);
        }
      };

    // redirect to login
    // const handleLogin = () => {
    //     push('login');
    // }

    // redirect to signup
    // const handleSignup = () => {
    //     push('signup');
    // }

     // redirect to dashboard
    //  const handleDashboard = () => {
    //     push('dashboard');
    // }

    return (
    <AppBar position="sticky" color="inherit">
        <Container maxWidth="xs">
            <Toolbar disableGutters>
                <Stack direction={'row'} spacing={5} alignItems={'center'} justifyContent={'space-between'}>
                    <Link href={'/'}>IMS-AI</Link>
                    {!user ? (
                        <Stack direction={'row'} spacing={2} justifyContent={'space-between'}>
                            {/* <Button variant="contained" onClick={handleSignup}>Signup</Button>
                            <Button variant="outlined" onClick={handleLogin}>Login</Button> */}
                            <Link href={'/signup'}>Signup</Link>
                            <Link href={'/login'}>Login</Link>
                        </Stack>
                    ) : (

                        <Stack direction={'row'} spacing={8} alignItems={'center'} justifyContent={'space-between'}>
                            {/* <Button variant="contained" onClick={handleDashboard}>Dashboard</Button> */}
                            <Link href={'/dashboard'}>Dashboard</Link>
                            <Button variant="contained" color="secondary" onClick={handleSignOut}>Sign out</Button>
                        </Stack>
                        
                    )}

                </Stack>
            {/* </Box> */}
            </Toolbar>

        </Container>
    </AppBar>
  )
}
