import {
    Box,
    Typography,
    Stack,
    Link
} from "@mui/material";
import {
    Telegram,
    Twitter,
    GitHub
} from "@mui/icons-material";
import Image from 'next/image';

export default function Footer() {
    return (
        <Box component="footer" sx={{ py: 5 }}>
            <Stack
                direction="row"
                justifyContent="center"
                spacing={4}
                sx={{ mb: 5 }}
            >
                <Link
                    sx={{ textDecoration: "none" }}
                    href="https://twitter.com/arb_direct"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Twitter fontSize="large" htmlColor="#1769aa" />
                </Link>
                <Link
                    sx={{ textDecoration: "none" }}
                    href="https://discord.gg/NkfkND4Q"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Image src='/discord.png' width={40} height={40} />
                </Link>
            </Stack>
            <Typography variant="body2" align="center">
                Build with ❤ by ARB
            </Typography>
        </Box>
    );
}