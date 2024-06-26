import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { Buffer } from 'buffer';
import { useRouter } from 'next/router'
import { Usofnem, UsofnemResolve } from '../config';
import UsofnemAbi from '../pages/contracts/Usofnem.json';
import UsofnemReverseAbi from '../pages/contracts/UsofnemReverse.json';
import toast, { Toaster } from 'react-hot-toast';
import {
  VerifiedOutlined
} from '@mui/icons-material';
import { networks } from '../pages/utils/networks';
import { amber, blue, purple } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import {
    Container,
    AppBar,
    Toolbar,
    Box,
    Typography,
    Chip,
    Avatar,
    Button,
    Stack
} from '@mui/material';
import Faq from '../component/Faq';
import Image from 'next/image';
import NotConnected from '../component/NotConnected';

const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(amber[500]),
    backgroundColor: amber[500],
    alignItems: 'center',
    '&:hover': {
        backgroundColor: amber[700],
    },
}));

const ColorTTF = styled(Chip)(({ theme }) => ({
    color: theme.palette.getContrastText(blue[500]),
    backgroundColor: blue[500],
    alignItems: 'center',
    '&:hover': {
        backgroundColor: blue[700],
    },
}));

const ColorInstagram = styled(Chip)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    alignItems: 'center',
    '&:hover': {
        backgroundColor: purple[700],
    },
}));

const UserClaimed = () => {

    const [currentAccount, setCurrentAccount] = useState('');
    // Add some state data propertie
    const [network, setNetwork] = useState('');
    const [users, setUsers] = useState('');
    const [avatars, setImage] = useState('');
    const [desc, setDesc] = useState('');
    const [socmed, setSocmed] = useState('');
    const [resolved, setResolved] = useState('');
    const [expiresAt, setExpiresAt] = useState();
    const router = useRouter();
    const { userId } = router.query;


    const extendExpiration = async () => {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(Usofnem, UsofnemAbi.abi, signer);
        toast('Extending your Domain:',
        {
            icon: '👏',
            style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
            },
        }
    );
        const tx = await contract.extendExpiration(userId, {value: ethers.utils.parseEther('0.0031')});
        await tx.wait();
        toast('Successfully extended your Domain:',
        {
            icon: '👏',
            style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
            },
        }
    );
        fetchUsers(); // refresh data
      }

    // Implement your connectWallet method here
    async function connectWallet() {
        try {
            const { ethereum } = window;

            if (!ethereum) {
                alert("Get MetaMask -> https://metamask.io/");
                return;
            }

            // Fancy method to request access to account.
            const accounts = await ethereum.request({ method: "eth_requestAccounts" });

            // Boom! This should print out public address once we authorize Metamask.
            console.log("Connected", accounts[0]);
            toast('Connected!',
                {
                    icon: '👏',
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                }
            );
            setCurrentAccount(accounts[0]);
        } catch (error) {
            console.log(error);
            toast('NotConnected!',
                {
                    icon: '❌',
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                }
            );
        }
    }

    const switchToMumbai = async () => {
		if (window.ethereum) {
			try {
				// Try to switch to the Polygon Chain
				await window.ethereum.request({
					method: 'wallet_switchEthereumChain',
					params: [{ chainId: '0x13881' }], // Check networks.js for hexadecimal network ids
				});
			} catch (error) {
				// This error code means that the chain we want has not been added to MetaMask
				// In this case we ask the user to add it to their MetaMask
				if (error.code === 4902) {
					try {
						await window.ethereum.request({
							method: 'wallet_addEthereumChain',
							params: [
								{
									chainId: '0x13881',
									chainName: 'Mumbai',
									rpcUrls: ['https://polygon-mumbai.infura.io/v3/4458cf4d1689497b9a38b1d6bbf05e78'],
									nativeCurrency: {
										name: "Mumbai",
										symbol: "MATIC",
										decimals: 18
									},
									blockExplorerUrls: ["https://mumbai.polygonscan.com"]
								},
							],
						});
					} catch (error) {
						console.log(error);
					}
				}
				console.log(error);
			}
		} else {
			// If window.ethereum is not found then MetaMask is not installed
			alert('MetaMask is not installed. Please install it to use this app: https://metamask.io/download.html');
		}
	}

    const switchToBnbTestnet = async () => {
		if (window.ethereum) {
			try {
				// Try to switch to the Polygon Chain
				await window.ethereum.request({
					method: 'wallet_switchEthereumChain',
					params: [{ chainId: '0x61' }], // Check networks.js for hexadecimal network ids
				});
			} catch (error) {
				// This error code means that the chain we want has not been added to MetaMask
				// In this case we ask the user to add it to their MetaMask
				if (error.code === 4902) {
					try {
						await window.ethereum.request({
							method: 'wallet_addEthereumChain',
							params: [
								{
									chainId: '0x61',
									chainName: 'BSC Testnet',
									rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545'],
									nativeCurrency: {
										name: "BNB",
										symbol: "BNB",
										decimals: 18
									},
									blockExplorerUrls: ["https://testnet.bscscan.com"]
								},
							],
						});
					} catch (error) {
						console.log(error);
					}
				}
				console.log(error);
			}
		} else {
			// If window.ethereum is not found then MetaMask is not installed
			alert('MetaMask is not installed. Please install it to use this app: https://metamask.io/download.html');
		}
	}



    const getResolve = async () => {
        if (!currentAccount || !network) { return }

        try {

            const { ethereum } = window;
            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const contractReverse = new ethers.Contract(UsofnemResolve, UsofnemReverseAbi.abi, signer);
                const contractUsofnem = new ethers.Contract(Usofnem, UsofnemAbi.abi, signer);

                const resolve = await contractReverse.resolve(currentAccount);
                const withtld = await contractUsofnem.getRecord(resolve, 0);
                console.log(resolve + withtld)

                setResolved(resolve + withtld);

            }


        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (currentAccount || network) {
            getResolve();
        }
    }, [currentAccount, network]);

    const checkIfWalletIsConnected = async () => {
        const { ethereum } = window;

        if (!ethereum) {
            console.log('Make sure you have metamask!');
            return;
        } else {
            console.log('We have the ethereum object', ethereum);
        }

        const accounts = await ethereum.request({ method: 'eth_accounts' });

        if (accounts.length !== 0) {
            const account = accounts[0];
            console.log('Found an authorized account:', account);
            toast('Found an authorized account:', account,
                {
                    icon: '👏',
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                }
            );
            setCurrentAccount(account);
        } else {
            console.log('No authorized account found');
            toast('No authorized account found',
                {
                    icon: '❌',
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                }
            );
        }

        // This is the new part, we check the user's network chain ID
        const chainId = await ethereum.request({ method: 'eth_chainId' });
        setNetwork(networks[chainId]);

        ethereum.on('chainChanged', handleChainChanged);

        // Reload the page when they change networks
        function handleChainChanged(_chainId) {
            window.location.reload();
        }
    };

    // Add this function anywhere in your component (maybe after the mint function)
    const fetchUsers = async () => {
        try {
            const { ethereum } = window;
            if (ethereum) {
                // You know all this
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const contract = new ethers.Contract(Usofnem, UsofnemAbi.abi, signer);


                const soc = await contract.getRecord(userId, 4);
                // Get all the names from our contract
                const getId = await contract.getNameID(userId);
                const record = await contract.tokenURI(getId);
                const data = Buffer.from(record.substring(29), 'base64');
				const result = JSON.parse(data.toString());
				console.log(result);

                setUsers(result.name);
                setImage(result.image);
                setDesc(result.description);
                setSocmed(soc);

            }

        } catch (error) {
            console.log(error);
        }
    }

    // This will run any time currentAccount or network are changed
    useEffect(() => {
        if (network !== 'BSC Mainnet' && network !== 'BSC Testnet' && network !== 'Polygon' && network !== 'Ethereum' && network !== 'Mumbai' && network !== 'Arbitrum') {
            fetchUsers();
        }
    }, [currentAccount, network]);

    // Render Methods
    const renderNotConnectedContainer = () => (
        <NotConnected>
            <ColorButton align="center" sx={{ width: '70%', mt: 4, mb: 4 }} variant="contained" onClick={connectWallet}>
                Connect Wallet
            </ColorButton>
        </NotConnected>
    );

    // Add this render function next to your other render functions
    const renderUsers = () => {
        // If not on BSC Mainnet, Ethereum or Polygon, render "Please connect to BSC Mainnet, Ethereum or Polygon"
        if (network !== 'BSC Mainnet' && network !== 'BSC Testnet' && network !== 'Polygon' && network !== 'Ethereum' && network !== 'Mumbai' && network !== 'Arbitrum') {
            return (
                <Box sx={{ pt: 8, pb: 6 }}>
                    <Container maxWidth="sm">
                    <Typography variant="body1" align="center" color="text.secondary" paragraph>
						Please Login to BNBCHAIN, ETHEREUM, Mumbai or POLYGON Network if you want to claim or view claimed domain on this platform.
						</Typography>
						<Stack sx={{ pt: 4 }} direction="row" spacing={2} justifyContent="center">
						
                        <ColorButton align="center" variant="contained" onClick={switchToBnbTestnet}>
							Login With BSCTest
						</ColorButton>
                        
						</Stack>
                    </Container>
                </Box>
            );
        }
        return (
            <>
                <Box sx={{ pb: 6 }}>
                    <Container maxWidth="sm" align="center">
                        <Typography sx={{ mb: 2 }}
                            component="img"
                            src={avatars}
                            alt={users}
                            width="350"
                            align="center"
                            circular="true"
                            style={{width:"inherit",borderRadius:"20px"}}
                        />
                        <Typography sx={{ py: 2 }}
                            component="h2"
                            variant="h4"
                            align="center"
                            color="text.primary"
                        >
                            {users} <VerifiedOutlined color="primary" />
                        </Typography>
                        <Typography sx={{ py: 2 }}
                            variant="body1"
                            align="center"
                            color="text.secondary"
                            paragraph
                        >
                            {desc}
                        </Typography>
                       
                     {/*   <Button style={{fontFamily: "Unbounded, cursive",color:"black",background:"yellow"}} className='ttt'   onClick={extendExpiration}>
                            Extend Domain Expiry for 0.0031 MATIC
        </Button> */}
                    </Container>
                </Box>
            </>
        );
    };

    useEffect(() => {
        checkIfWalletIsConnected();
    }, []);

    return (
        <>
            <AppBar position="static">
                <Toolbar>
					<Typography variant="body1" sx={{ flexGrow: 1, mt: 1 }} style={{ fontFamily: "Unbounded, cursive",fontSize:"18px"}}>
					<Image width={135} height={35} src="/logos.png" alt="Usofnem Registrar" />
					</Typography>
					<Chip
							avatar={<Avatar alt="Network logo" src={network.includes("BSC Mainnet") ? '/bsc-logo.svg' : network.includes("Polygon") ? '/polygon-logo.svg' : network.includes("BSC Testnet") ? '/bsc-logo.svg' : network.includes("Arbitrum") ? '/arbitrum-logo.png'   :  network.includes("Mumbai") ? '/polygon-logo.svg' : network.includes("Ethereum") ? '/ethlogo.png' : '/ethlogo.png'} />}
						label={currentAccount ? (<Typography variant="body1"> {resolved ? (<>{resolved}</>
						) : (<> {currentAccount.slice(0, 6)}...{currentAccount.slice(-4)} </>)} {' '} </Typography>) : (<Typography variant="body1"> Not connected </Typography>)}
						variant="outlined"
					/>
				</Toolbar>
            </AppBar>
            <Container sx={{ mt: 5 }}  >
                {!currentAccount && renderNotConnectedContainer()}
            </Container>
            <Container sx={{ mt: 3 }}>
                {currentAccount && renderUsers()}
            </Container>
            <Toaster />
            <Container sx={{ mt: 3, mb: 5 }}>
                <Faq />
            </Container>
        </>
    );
}

export default UserClaimed;