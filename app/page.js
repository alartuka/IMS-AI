"use client";

import { firestore } from '../firebase'
// import { fetchClassifiedData } from '@/firebase';
import { Alert, AlertTitle, Box, Button, IconButton, InputAdornment, Modal, Stack, TextField, Typography } from '@mui/material';
import { collection, doc, query, getDocs, getDoc, setDoc, deleteDoc } from 'firebase/firestore';
import React, { useEffect, useState, useRef } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  p: 4,
  gap: 3,
};

export default function Home() {
    // const session = useSession();

    const [inventory, setInventory] = useState([]);
    const [itemName, setItemName] = useState("");
    const [searchQuery, setSearchQuery] = useState(""); // State for search query
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    // const router = useRouter();
    const { push } = useRouter();

    // const [classifiedImages, setClassifiedImages] = useState([]);
    const [loading, setLoading] = useState(true);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // ====== UPDATE INVENTORY ======
    const updateInventory = async () => {
        const snapshot = query(collection(firestore, 'inventory'))
        const docs = await getDocs(snapshot)
        const inventoryList = []
        docs.forEach((doc) => {
        inventoryList.push({"name": doc.id, ...doc.data()})
        }) 
        setInventory(inventoryList)
    }

    useEffect(() => {
        updateInventory()
    }, [])

    // ====== ADD ITEM ======
    const addItem = async (item) => {
        if(item.trim()) {
            const docRef = doc(collection(firestore, 'inventory'), item)
            const docSnap = await getDoc(docRef)
            setError(false)
            if (docSnap.exists()) {
                const { quantity } = docSnap.data()
                await setDoc(docRef, {quantity: quantity + 1})
            } else {
                await setDoc(docRef, {quantity: 1})
            }
            setSuccessMsg("Item added successfully!")
            setTimeout(() => {
                setSuccessMsg('');
        }, 3000); // Hide success message after 3 seconds
        } else {
            setError(true)
            setErrorMsg("Please enter a valid item name!")
        }
        await updateInventory()
    }

    // ====== REMOVE ITEM ======
    const removeItem = async (item) => {
        const docRef = doc(collection(firestore, 'inventory'), item)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
            const {quantity} = docSnap.data()
            if (quantity > 1) {
                await setDoc(docRef, {quantity: quantity - 1})
            } else {
                await deleteDoc(docRef)
            }
        }
        await updateInventory()
    }

    // ====== SEARCH ITEMS ======  
    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    }

    // Filtered inventory items based on search query
    const filteredInventory = inventory.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Redirect to Camera page
    const handleRedirect = () => {
        push('camera');
    };

    // Redirect to Recipe Generator page
    const handleRGen = () => {
        push('rgen');
    }

    return (

        <Box
        width="100vw"
        height="100vh"
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'center'}
        alignItems={'center'}
        gap={2}
        mb={'10px'}
        >
            {/* Nav bar should be here !!!    >>>>>>>>>>>>>>>>> */}
            {/* <Stack direction={'row'} spacing={2}>
                <Typography variant="h3" component="h3">
                    Profile: {session?.data?.user?.name}
                </Typography>
                <Button variant="contained" color="secondary" onClick={() => signOut()}>Logout</Button>
            </Stack> */}

            <Typography variant="h2" component="h2">
                Inventory Management System
            </Typography>

            {/* SUCCESS MESSAGE AFTER ITEM ADDITION */}
            <Box sx={{ position: "relative" }}>
                {successMsg && 
                    <Alert severity="success">
                        <AlertTitle>success</AlertTitle>
                        {successMsg}
                    </Alert>
                }
            </Box>

            <Stack direction={'row'} spacing={2}>
                {/* ====== RECIPE GENERATOR BUTTON ====== */}
                <Button variant="contained" color="primary" onClick={handleRGen}>Generate Recipe</Button>
                {/* ====== CAMERA BUTTON ====== */}
                <Button variant="contained" color="primary" onClick={handleRedirect}>
                    {/* <CameraIcon /> */}
                    Scan Item
                </Button>

                {/* ====== ADD ITEM BUTTON ====== */}
                <Button onClick={handleOpen} variant="contained">Add New Item</Button>
            </Stack>
            {/* ====== ADD ITEM POPUP FORM ====== */}
            <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Add New Item
                    </Typography>
                    <Stack width="100%" direction={'row'} spacing={2}>
                        <Stack sx={{ width: '100%' }} spacing={2}>
                            <TextField id="outlined-basic" label="Item" 
                            variant="outlined" fullWidth 
                            value={itemName} 
                            required
                            onChange={(e) => setItemName(e.target.value)}
                            error={error}
                            />
                            {errorMsg && 
                                <Alert severity="error">
                                    <AlertTitle>Error</AlertTitle>
                                    {errorMsg}
                                </Alert>
                            }
                        </Stack>

                        <Button 
                        variant="outlined" 
                        onClick={() => {
                        addItem(itemName)
                        setItemName('')
                        {!error && handleClose()}}}
                        >
                            Add
                        </Button>
                    </Stack> 
                </Box>
            </Modal>

            <Box 
            width="800px" 
            height="100px" 
            bgcolor={'#ADD8E6'} 
            display={'flex'} 
            justifyContent={'center'} 
            alignItems={'center'}
            // mb={'10px'}
            >
                <Typography variant={'h2'} color={'#333'} textAlign={'center'}>
                    Inventory Items
                </Typography>
            </Box>

            {/* ====== SEARCH BOX ====== */}

            <TextField 
             id="input-with-icon-textfield"
            label="Search Items" 
            variant="outlined" 
            fullWidth 
            value={searchQuery} 
            onChange={handleSearch} 
            sx={{ width: '800px', marginBottom: '20px' }}
            InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />

            {/* ====== INVENTORY LIST ====== */}
            <Stack width="800px" height="300px" spacing={2} overflow={'auto'}>
                {filteredInventory.map(({name, quantity}) => (
                    <Box  
                    key={name}
                    width={"100%"}
                    minHeight={'150px'}
                    display={'flex'}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                    bgcolor={'#f0f0f0'}
                    borderRadius={4}
                    paddingX={5}
                    sx={{
                        '&:hover': {
                        bgcolor: 'pink',
                        },
                    }}
                    >
                        <Typography variant={"h3"} component="div" color={'#333'} textAlign={'start'} sx={{ flexGrow: 1 }}>
                            {name.charAt(0).toUpperCase() + name.slice(1)}
                        </Typography>

                        <Stack direction={'row'} spacing={2}>    
                            {/* ====== ADD EXISTING ITEM ====== */}
                            <IconButton aria-label="add" size="large" color="success" onClick={() => addItem(name)}>
                                <AddCircleIcon fontSize="inherit"  /> 
                            </IconButton>
                            {/* <Button variant="contained" color="primary" onClick={() => addItem(name)}>Add</Button> */}
                            
                            <Typography variant={"h6"} component="div" color={'#333'} textAlign={'right'} sx={{ flexGrow: 1 }}>
                                {quantity}
                            </Typography>
                            
                            {/* ====== REMOVE ITEM BUTTON ====== */}
                            <IconButton aria-label="delete" size="large" color="error" onClick={() => removeItem(name)}>
                                <RemoveCircleIcon fontSize="inherit"  /> 
                            </IconButton>
                            {/* <Button variant="contained" color="error" onClick={() => removeItem(name)}>Remove</Button> */}
                        </Stack>
                    </Box>
                ))}
            </Stack> 
        </Box>
    );
}
