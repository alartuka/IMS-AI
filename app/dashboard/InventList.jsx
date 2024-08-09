import React from 'react'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Box, IconButton, Stack, Typography } from '@mui/material';

export default function InventList({id, name, quantity, addItem, removeItem }) {
    return (
        <Box  
            key={id}
            width={"100%"}
            minHeight={'100px'}
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
            bgcolor={'#fdefe2'}
            borderRadius={4}
            paddingX={5}
            sx={{
                '&:hover': {
                bgcolor: '#79c1f1',
                },
            }}
        >
            <Typography variant={"h5"} component="div" color={'#333'} textAlign={'start'} sx={{ flexGrow: 1 }}>
                {name.charAt(0).toUpperCase() + name.slice(1)}
            </Typography>

            <Stack direction={'row'} spacing={2}>    
                {/* ====== ADD EXISTING ITEM ====== */}
                <IconButton aria-label="add" size="large" color="success" onClick={() => addItem(name)}>
                    <AddCircleIcon fontSize="inherit"  /> 
                </IconButton>
                
                {/* ====== QUANTITY HOLDER ====== */}
                <Typography variant={"p"} component="div" color={'#333'} textAlign={'right'} sx={{ flexGrow: 1 }}>
                    {quantity}
                </Typography>
                
                {/* ====== REMOVE ITEM BUTTON ====== */}
                <IconButton aria-label="delete" size="large" color="error" onClick={() => removeItem(name)}>
                    <RemoveCircleIcon fontSize="inherit"  /> 
                </IconButton>
            </Stack>
        </Box>
    )
}
