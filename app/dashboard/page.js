"use client";

import { firestore } from '../../firebase'
import { Box, Button, Grid, IconButton, InputAdornment, Modal, Stack, TextField, Typography } from '@mui/material';
import { collection, doc, query, getDocs, getDoc, setDoc, deleteDoc } from 'firebase/firestore';
import React, { useEffect, useState, useRef } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from 'next/navigation';
import InventList from './InventList';
import AlertMsg from './AlertMsg';
import { AuthContextProvider } from '../AuthContext';
// import { userAuth } from '../AuthContext';


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
    const [inventory, setInventory] = useState([]);
    const [itemName, setItemName] = useState("");
    const [searchQuery, setSearchQuery] = useState(""); 
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const { push } = useRouter();
    // const { user } = userAuth();

    // useEffect(() => {
    //     {!user ? push('/') : ""}
    // }, [])

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

    // ====== GENERATE RECIPES WITH ITEMS ======     
    const [recipes, setRecipes] = useState(null);
    const [recipesLoading, setRecipesLoading] = useState(false);
    const [recipesError, setRecipesError] = useState(null);
    const [recipeOpen, setRecipeOpen] = useState(false);

    const handleGenerateRecipes = async () => {    
        setRecipesLoading(true);
        setRecipesError(null);  

        const ingredients = inventory.map(item => item.name).join(', ');  

        try {
            const response = await fetch('/api/generateRecipe', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ ingredients }),
            });

            const data = await response.json();
            console.log('API Response:', data);
            setRecipes(data.recipes);
            // Navigate to recipe page
            // push('/recipesGen', { recipes: JSON.stringify(data.recipes) });
            setRecipeOpen(true);
          } catch (err) {
            console.error('Error fetching recipe:', error);
            setRecipesError('Error generating recipes');
            setTimeout(() => {
                setRecipesError('');
            }, 3000); // Hide success message after 3 seconds
          } finally {
            setRecipesLoading(false);
        }
    };


    return (

        <Box
        width="100vw"
        height="100vh"
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'center'}
        alignItems={'center'}
        gap={2}
        // mb={'10px'}
        mt={'20px'}
        >
            <Stack direction={'row'} spacing={1}>
                <Box width="800px" height="100px" bgcolor={'#79c1f1'} display={'flex'} justifyContent={'center'} alignItems={'center'} borderRadius={'50px'}>
                    <Typography variant={'h3'} color={'#fdefe2'} textAlign={'center'}>Inventory Items</Typography>
                </Box>

                <Box sx={{ position: "sticky" }}>
                    {/* ====== ERROR MESSAGE AFTER RECIPES GENERATION ====== */}
                    <AlertMsg msg={recipesError} type={'error'} />
                
                    {/* ====== SUCCESS MESSAGE AFTER ITEM ADDITION ====== */}
                    <AlertMsg msg={successMsg} type={'success'} />
                </Box>
            </Stack>
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

            <Stack direction={'row'} spacing={2}>

                {/* ====== RECIPE GENERATOR BUTTON ====== */}
                <Button variant="contained" color="primary" onClick={handleGenerateRecipes} disabled={recipesLoading}>{recipesLoading ? 'Generating...' : 'Generate Recipes'}</Button>
                
                {/* ====== CAMERA BUTTON ====== */}
                <Button variant="contained" color="primary" onClick={handleRedirect}>
                    {/* <CameraIcon /> */}
                    Scan Item
                </Button>

                {/* ====== ADD ITEM BUTTON ====== */}
                <Button onClick={handleOpen} variant="contained">Add Item</Button>
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
                            <AlertMsg msg={errorMsg} type={'error'} />
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

            {/* ====== GENERATED RECIPE POPUP FORM ====== */}
            <Modal
            open={recipeOpen}
            onClose={() => setRecipeOpen(false)}
            >
                <Box
                position="absolute" top="50%" left="50%"
                sx={{ transform: "translate(-50%,-50%)" }}
                width={1000}
                bgcolor="white"
                border="2px solid #000"
                boxShadow={24}
                p={4}
                display="flex"
                flexDirection="column"
                gap={3}
                height= {600}
                >
                    <Typography variant="h5">Generated Recipe</Typography>
                    <Box
                    style={{ 
                    overflowY: 'auto', // Enable vertical scrolling
                    maxHeight: 'calc(100% - 100px)' // Ensure space for other elements
                    }}
                    border='1px solid #DC5F00'
                    borderRadius={2}
                    p={2}
                    >
                        <Typography variant="body1" style={{ whiteSpace: 'pre-line' }}>
                            {recipes}
                        </Typography>
                    </Box>
                    <Button
                    variant="contained"
                    onClick={() => setRecipeOpen(false)}
                    >
                        Close
                    </Button>
                </Box>
            </Modal>

            {/* ====== INVENTORY LIST ====== */}
                <Stack width="800px" height="800px" spacing={2} overflow={'auto'}>
                    {filteredInventory.map(({ name, quantity }) => (
                            <InventList name={name} quantity={quantity} addItem={addItem} removeItem={removeItem} />
                    ))}
                </Stack>
        </Box>

    );
}
