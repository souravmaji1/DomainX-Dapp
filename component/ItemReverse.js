import React from 'react';
import {
    Box,
    Container,
    Typography
} from '@mui/material';

export default function ItemReverse() {
    return (
        <Box sx={{ pb: 6 }}>
            <Container maxWidth="sm">
                <Typography variant="body1" align="center" color="text.secondary" paragraph>
                Transform your wallet address into your Minted ARB domain name very easily
                </Typography>
            </Container>
        </Box>
    );
}