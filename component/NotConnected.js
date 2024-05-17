import React from 'react';
import {
    Box,
    Container,
    Typography,
    Stack
} from '@mui/material';

export default function NotConnected({ children }) {
    return (
        <Box sx={{ pt: 8, pb: 6 }} style={{filter: "drop-shadow(2px 4px 6px black)"}}> 
            <Container maxWidth="sm"  >
                <Typography
                    component="h1"
                    variant="h2"
                    align="center"
                    color="text.primary"
                    style={{fontFamily: "Unbounded, cursive"}}
                    id='front'
                    gutterBottom
                >
                    ARB DOMAINS
                </Typography>
                <Typography variant="body1" align="center" color="text.secondary" paragraph>
                    Readable decentralized Arbitrum wallet addresses
                </Typography>
                <Stack
                    sx={{ pt: 4 }}
                    direction="row"
                    spacing={2}
                    justifyContent="center"
                >
                    {children}
                </Stack>
            </Container>
        </Box>
    );
}