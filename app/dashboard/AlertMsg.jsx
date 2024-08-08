import React from 'react'
import { Alert, AlertTitle, Box} from '@mui/material';

export default function AlertMsg({ msg, type}) {
  return (
    <Box sx={{ position: "fixed" }}>
        {msg && 
            <Alert severity={type}>
                <AlertTitle>{(type).toUpperCase()}</AlertTitle>
                {msg}
            </Alert>
        }
    </Box>
  )
}
