import React from 'react';
import { CssBaseline, Paper, Box, BottomNavigation, BottomNavigationAction } from '@mui/material';
import { ShoppingCartOutlined, SettingsOutlined, HouseOutlined, AttachMoney } from '@mui/icons-material';

export default function Navigation() {

    return (
        <Box sx={{ pb: 7 }}>
            <CssBaseline />
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                <BottomNavigation showLabels={true}>
                    <BottomNavigationAction
                        label="Home"
                        href="/"
                        icon={<HouseOutlined />}
                    />
                    <BottomNavigationAction
                        label="Domains"
                        href="/claimed"
                        icon={<ShoppingCartOutlined />}
                    />
                    <BottomNavigationAction
                        label="Send"
                        href="/send"
                        icon={<AttachMoney />}
                    />
                 {/*   <BottomNavigationAction
                        label="Record"
                        href="/record"
                        icon={<GraphicEqOutlined />}
    /> */}
                    <BottomNavigationAction label="Setting" href="/reverse" icon={<SettingsOutlined />} />
                </BottomNavigation>
            </Paper>
        </Box>
    );
}