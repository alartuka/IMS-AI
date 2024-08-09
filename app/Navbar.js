'use client';

import { AppBar, Box, Button, Container, Stack, Toolbar, Typography } from '@mui/material'
import Link from 'next/link'
import { useState, useEffect } from 'react';
import { userAuth } from './AuthContext';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export default function Navbar() {
    const { user, loading, logOut } = userAuth();
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
    <AppBar position="sticky" sx={{ bgcolor:'#1d245c' }}>
        <Container maxWidth="xs">
            <Toolbar disableGutters>
                <Stack direction={'row'} spacing={5} alignItems={'center'} justifyContent={'space-between'}>
                        <Typography variant={'h6'}  component="a" href={'/'} color={'#fdefe2'} textAlign={'center'} sx={{ '&:hover': {color: '#79c1f1'}, textDecoration: 'none', }}>
                            IMS-AI
                        </Typography>
                    {!user ? (
                        <Stack direction={'row'} spacing={2} justifyContent={'space-between'}>
                            {/* <Button variant="contained" onClick={handleSignup}>Signup</Button>
                            <Button variant="outlined" onClick={handleLogin}>Login</Button> */}
                            <Typography variant={'h6'}  component="a" href={'/signup'} color={'#fdefe2'} textAlign={'center'} sx={{ '&:hover': {color: '#79c1f1'}, textDecoration: 'none', }}>
                               Signup
                            </Typography>
                            <Typography variant={'h6'}  component="a" href={'/login'} color={'#fdefe2'} textAlign={'center'} sx={{ '&:hover': {color: '#79c1f1'}, textDecoration: 'none', }}>
                                Login
                            </Typography>
                        </Stack>
                    ) : loading ? (
                        null
                    ) : (
                        <Stack direction={'row'} spacing={3} alignItems={'center'} justifyContent={'space-between'}>
                            {/* <Button variant="contained" onClick={handleDashboard}>Dashboard</Button> */}
                            
                            <Typography variant={'h6'}  component="a" href={'/dashboard'} color={'#fdefe2'} textAlign={'center'} sx={{ '&:hover': {color: '#79c1f1'}, textDecoration: 'none', }}>
                                Dashboard
                            </Typography>
                            <Typography variant={'h6'} color={'#fdefe2'} textAlign={'center'} sx={{ '&:hover': {color: '#79c1f1'}, textDecoration: 'none', }}>
                                {user.displayName}
                            </Typography>
                            <Button variant="outlined" color="secondary" onClick={handleSignOut}>Sign out</Button>
                        </Stack>
                    )}

                </Stack>
            {/* </Box> */}
            </Toolbar>

        </Container>
    </AppBar>
  )
}
