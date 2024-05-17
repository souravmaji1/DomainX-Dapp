'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import { ethers } from "ethers";
import { Usofnem, UsofnemResolve } from '../config';
import UsofnemAbi from '../pages/contracts/Usofnem.json';
import UsofnemReverseAbi from '../pages/contracts/UsofnemReverse.json';
import Image from 'next/image';
import toast, { Toaster } from 'react-hot-toast';
import { networks } from '../pages/utils/networks';
import { amber } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import {
	Button,
	Container,
	AppBar,
	Toolbar,
	Box,
	Typography,
	Chip,
	Avatar,
	TextField,
	Stack,
	MenuItem,
	Select,
	FormControl,
	FormHelperText
} from '@mui/material';
import NotConnected from '../component/NotConnected';
import Tss from "../component/Table";
import Footer from "../component/Footer";
import USDCContractAbi from '../pages/contracts/USDCContract.json';
import { CrossmintPayButton } from '@crossmint/client-sdk-react-ui';




const ColorButton = styled(Button)(({ theme }) => ({
	color: theme.palette.getContrastText(amber[500]),
	backgroundColor: amber[500],
	alignItems: 'center',
	'&:hover': {
		backgroundColor: amber[700],
	},
}));

const Home = () => {

	const [currentAccount, setCurrentAccount] = useState('');
	const [showSuccessGif, setShowSuccessGif] = useState(false);
	
    const [usdcContract, setUsdcContract] = useState(null);
	// Add some state data propertie
	const [name, setName] = useState('');
	const [category, setCategory] = useState('');
	const [network, setNetwork] = useState('');
	const [resolved, setResolved] = useState('');
	const router = useRouter();

	useEffect(() => {
		window.addEventListener('message', (event) => {
			console.log(`Received message: ${event.data}`);
		
			if (event.data === 'closeWinterCheckoutModal') {
			  setShowWinter(false);
			}
		  });
	}, []);
	
	
	 

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

	const switchToArbitrum = async () => {
		if (window.ethereum) {
		  try {
			// Try to switch to the Arbitrum Chain
			await window.ethereum.request({
			  method: 'wallet_switchEthereumChain',
			  params: [{ chainId: '0xa4b1' }], // Arbitrum Mainnet chainId
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
					  chainId: '0xa4b1',
					  chainName: 'Arbitrum Mainnet',
					  rpcUrls: ['https://arb1.arbitrum.io/rpc'],
					  nativeCurrency: {
						name: 'Ether',
						symbol: 'ETH',
						decimals: 18,
					  },
					  blockExplorerUrls: ['https://explorer.arbitrum.io/'],
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
	  };
	  



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
									rpcUrls: ['https://rpc-mumbai.maticvigil.com'],
									nativeCurrency: {
										name: "MATIC",
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

        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
      
        // Initialize the USDC contract instance
        const usdcContractAddress = '0xe6b8a5CF854791412c1f6EFC7CAf629f5Df1c747'; // Replace with your USDC contract address
        const usdcContractInstance = new ethers.Contract(usdcContractAddress, USDCContractAbi.abi, signer);
        setUsdcContract(usdcContractInstance);
	};

	const userBNBRegister = async () => {
		// Don't run if the field is empty
		if (!name, !category) { return }
		// Alert the user if the domain is too short
		if (name.length < 1) {
			alert('Domain must be at least 1 characters long');
			toast('Domain must be at least 1 characters long',
				{
					icon: '👏',
					style: {
						borderRadius: '10px',
						background: '#333',
						color: '#fff',
					},
				}
			);
			return;
		}
		// Calculate price based on length of name (change this to match your contract)
		const price = name.length === 1 ? '0.01' : name.length === 2 ? '0.01' : name.length === 3 ? '0.01' : name.length === 4 ? '0.01' : name.length === 5 ? '0.007' : name.length === 6 ? '0.007' : name.length === 7 ? '0.007' : name.length === 8 ? '0.005' : '0.003';
		console.log("Minting domain", name, "with price", price);
		try {
			const { ethereum } = window;
			if (ethereum) {
				const provider = new ethers.providers.Web3Provider(ethereum);
				const signer = provider.getSigner();
				const contract = new ethers.Contract(Usofnem, UsofnemAbi.abi, signer);

				console.log("Checking Domain Names ...")
				toast('Checking Domain Names ...',
					{
						icon: '☕',
						style: {
							borderRadius: '10px',
							background: '#333',
							color: '#fff',
						},
					}
				);

				let tx = await contract.register(name, category, { value: ethers.utils.parseEther(price) });
				// Wait for the transaction to be mined
				const receipt = await tx.wait();

				// Check if the transaction was successfully completed
				if (receipt.status === 1) {
					console.log("Domain minted! https://bscscan.com/tx/" + tx.hash);
					toast('Success! Please wait ...!',
						{
							icon: '👏',
							style: {
								borderRadius: '10px',
								background: '#333',
								color: '#fff',
							},
						}
					);

					// Open Claimed page after 2 seconds
					setTimeout(() => {
						router.push('/claimed');
					}, 2000);

					setName('');
					setCategory('');
				}
				else {
					alert("Transaction failed! Please try again");
					toast('Transaction failed! Please try again',
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
		}
		catch (error) {
			console.log(error);
			toast('Oh no! Domain already taken.',
				{
					icon: '🤬',
					style: {
						borderRadius: '10px',
						background: '#333',
						color: 'red',
					},
				}
			);
		}
	}

	const userMumbaiRegister = async () => {
		// Don't run if the field is empty
		if (!name, !category) { return }
		// Alert the user if the domain is too short
		if (name.length < 1) {
			alert('Domain must be at least 1 characters long');
			toast('Domain must be at least 1 characters long',
				{
					icon: '👏',
					style: {
						borderRadius: '10px',
						background: '#333',
						color: '#fff',
					},
				}
			);
			return;
		}
		// Calculate price based on length of name (change this to match your contract)
		const price = name.length === 1 ? '0.0031' : name.length === 2 ? '0.0031' : name.length === 3 ? '0.0031' : name.length === 4 ? '0.0031' : name.length === 5 ? '0.0031' : name.length === 6 ? '0.0031' : name.length === 7 ? '0.0031' : name.length === 8 ? '0.0031' : '0.0031';
		console.log("Minting domain", name, "with price", price);
		try {
			const { ethereum } = window;
			if (ethereum) {
				const provider = new ethers.providers.Web3Provider(ethereum);
				const signer = provider.getSigner();
				const contract = new ethers.Contract(Usofnem, UsofnemAbi.abi, signer);

				console.log("Checking Domain Names ...")
				toast('Checking Domain Names ...',
					{
						icon: '☕',
						style: {
							borderRadius: '10px',
							background: '#333',
							color: '#fff',
						},
					}
				);

				const userAddress = currentAccount;

				let tx = await contract.register(name, category,userAddress, { value: ethers.utils.parseEther(price) });
				// Wait for the transaction to be mined
				const receipt = await tx.wait();

				// Check if the transaction was successfully completed
				if (receipt.status === 1) {
					console.log("Domain minted! https://mumbai.polygonscan.com/tx/" + tx.hash);
					toast('Success! Please wait ...!',
						{
							icon: '👏',
							style: {
								borderRadius: '10px',
								background: '#333',
								color: '#fff',
							},
						}
					);

					setShowSuccessGif(true);

					// Open Claimed page after 2 seconds
					setTimeout(() => {
						router.push('/claimed');
					}, 3400);

					setTimeout(() => {
						setShowSuccessGif(false);
					}, 3400);

					setName('');
					setCategory('');
				}
				else {
					alert("Transaction failed! Please try again");
					toast('Transaction failed! Please try again',
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
		}
		catch (error) {
			console.log(error);
			toast('Oh no! Domain already taken.',
				{
					icon: '🤬',
					style: {
						borderRadius: '10px',
						background: '#333',
						color: 'red',
					},
				}
			);
		}
	}


	const userBNBTestRegister = async () => {
		// Don't run if the field is empty
		if (!name, !category) { return }
		// Alert the user if the domain is too short
		if (name.length < 1) {
			alert('Domain must be at least 1 characters long');
			toast('Domain must be at least 1 characters long',
				{
					icon: '👏',
					style: {
						borderRadius: '10px',
						background: '#333',
						color: '#fff',
					},
				}
			);
			return;
		}
		// Calculate price based on length of name (change this to match your contract)
		const price = name.length === 1 ? '0.0031' : name.length === 2 ? '0.0031' : name.length === 3 ? '0.0031' : name.length === 4 ? '0.0031' : name.length === 5 ? '0.0031' : name.length === 6 ? '0.0031' : name.length === 7 ? '0.0031' : name.length === 8 ? '0.0031' : '0.0031';
		console.log("Minting domain", name, "with price", price);
		try {
			const { ethereum } = window;
			if (ethereum) {
				const provider = new ethers.providers.Web3Provider(ethereum);
				const signer = provider.getSigner();
				const contract = new ethers.Contract(Usofnem, UsofnemAbi.abi, signer);

				console.log("Checking Domain Names ...")
				toast('Checking Domain Names ...',
					{
						icon: '☕',
						style: {
							borderRadius: '10px',
							background: '#333',
							color: '#fff',
						},
					}
				);

				const userAddress = currentAccount;

				let tx = await contract.register(name, category,userAddress, { value: ethers.utils.parseEther(price) });
				// Wait for the transaction to be mined
				const receipt = await tx.wait();

				// Check if the transaction was successfully completed
				if (receipt.status === 1) {
					console.log("Domain minted! https://testnet.bscscan.com/tx/" + tx.hash);
					toast('Success! Please wait ...!',
						{
							icon: '👏',
							style: {
								borderRadius: '10px',
								background: '#333',
								color: '#fff',
							},
						}
					);

					// Open Claimed page after 2 seconds
					setTimeout(() => {
						router.push('/claimed');
					}, 2000);

					setName('');
					setCategory('');
				}
				else {
					alert("Transaction failed! Please try again");
					toast('Transaction failed! Please try again',
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
		}
		catch (error) {
			console.log(error);
			toast('Oh no! Domain already taken.',
				{
					icon: '🤬',
					style: {
						borderRadius: '10px',
						background: '#333',
						color: 'red',
					},
				}
			);
		}
	}

	const userPolygonRegister = async () => {
		// Don't run if the field is empty
		if (!name, !category) { return }
		// Alert the user if the domain is too short
		if (name.length < 1) {
			alert('Domain must be at least 1 characters long');
			toast('Domain must be at least 1 characters long',
				{
					icon: '👏',
					style: {
						borderRadius: '10px',
						background: '#333',
						color: '#fff',
					},
				}
			);
			return;
		}
		// Calculate price based on length of name (change this to match your contract)
		const price = name.length === 1 ? '2.5' : name.length === 2 ? '2.5' : name.length === 3 ? '2.5' : name.length === 4 ? '2.5' : name.length === 5 ? '2' : name.length === 6 ? '2' : name.length === 7 ? '2' : name.length === 8 ? '1.5' : '1';
		console.log("Minting domain", name, "with price", price);
		try {
			const { ethereum } = window;
			if (ethereum) {
				const provider = new ethers.providers.Web3Provider(ethereum);
				const signer = provider.getSigner();
				const contract = new ethers.Contract(Usofnem, UsofnemAbi.abi, signer);

				console.log("Checking Domain Names ...")
				toast('Checking Domain Names ...',
					{
						icon: '☕',
						style: {
							borderRadius: '10px',
							background: '#333',
							color: '#fff',
						},
					}
				);

				let tx = await contract.register(name, category, { value: ethers.utils.parseEther(price) });
				// Wait for the transaction to be mined
				const receipt = await tx.wait();

				// Check if the transaction was successfully completed
				if (receipt.status === 1) {
					console.log("Domain minted! https://polygonscan.com/tx/" + tx.hash);
					toast('Success! Please wait ...!',
						{
							icon: '👏',
							style: {
								borderRadius: '10px',
								background: '#333',
								color: '#fff',
							},
						}
					);

					// Open Claimed page after 2 seconds
					setTimeout(() => {
						router.push('/claimed');
					}, 2000);

					setName('');
					setCategory('');
				}
				else {
					alert("Transaction failed! Please try again");
					toast('Transaction failed! Please try again',
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
		}
		catch (error) {
			console.log(error);
			toast('Oh no! Domain already taken.',
				{
					icon: '🤬',
					style: {
						borderRadius: '10px',
						background: '#333',
						color: 'red',
					},
				}
			);
		}
	}

    	const userUsdcRegister = async () => {
        if (!name || !category) {
          return;
        }
      
        try {
          // Check if usdcContract is initialized
          if (!usdcContract) {
            console.error('USDC contract is not initialized.');
            return;
          }
      
          // Calculate price based on length of name (change this to match your contract)
          const price = 5 * 10**6;
      
          // Get the user's address
          const userAddress = currentAccount;
      
          // Call the approve function first
          const approveTx = await usdcContract.approve(Usofnem, price);
      
          // Wait for the approval transaction to be mined
          await approveTx.wait();

		  const provider = new ethers.providers.Web3Provider(ethereum);
		  const signer = provider.getSigner();
      
          // Call the registerusdc function
          const contract = new ethers.Contract(Usofnem, UsofnemAbi.abi, signer);
          console.log('Checking Domain Names ...');
          toast('Checking Domain Names ...', /* ... */);
          let tx = await contract.registerUsdc(name, category);
      
          // Wait for the transaction to be mined
          const receipt = await tx.wait();
      
          // Check if the transaction was successfully completed
          if (receipt.status === 1) {
            console.log('Domain minted! https://bscscan.com/tx/' + tx.hash);
            toast('Success! Please wait ...!', /* ... */);
            // Open Claimed page after 2 seconds
            setTimeout(() => {
              router.push('/claimed');
            }, 2000);
            setName('');
            setCategory('');
          } else {
            alert('Transaction failed! Please try again');
            toast('Transaction failed! Please try again', /* ... */);
          }
        } catch (error) {
          console.error(error);
          toast('Oh no! Domain already taken.', /* ... */);
        }
      };



	const userETHRegister = async () => {
		// Don't run if the field is empty
		if (!name, !category) { return }
		// Alert the user if the domain is too short
		if (name.length < 1) {
			alert('Domain must be at least 1 characters long');
			toast('Domain must be at least 1 characters long',
				{
					icon: '👏',
					style: {
						borderRadius: '10px',
						background: '#333',
						color: '#fff',
					},
				}
			);
			return;
		}
		// Calculate price based on length of name (change this to match your contract)
		const price = name.length === 1 ? '0.0031' : name.length === 2 ? '0.0031' : name.length === 3 ? '0.0031' : name.length === 4 ? '0.0031' : name.length === 5 ? '0.0031' : name.length === 6 ? '0.0031' : name.length === 7 ? '0.0031' : name.length === 8 ? '0.0031' : '0.0031';
		console.log("Minting domain", name, "with price", price);
		try {
			const { ethereum } = window;
			if (ethereum) {
				const provider = new ethers.providers.Web3Provider(ethereum);
				const signer = provider.getSigner();
				const contract = new ethers.Contract(Usofnem, UsofnemAbi.abi, signer);

				console.log("Checking Domain Names ...")
				toast('Checking Domain Names ...',
					{
						icon: '☕',
						style: {
							borderRadius: '10px',
							background: '#333',
							color: '#fff',
						},
					}
				);

				let tx = await contract.register(name, category, { value: ethers.utils.parseEther(price) });
				// Wait for the transaction to be mined
				const receipt = await tx.wait();

				// Check if the transaction was successfully completed
				if (receipt.status === 1) {
					console.log("Domain minted! https://etherscan.io/tx/" + tx.hash);
					toast('Success! Please wait ...!',
						{
							icon: '👏',
							style: {
								borderRadius: '10px',
								background: '#333',
								color: '#fff',
							},
						}
					);

					// Open Claimed page after 2 seconds
					setTimeout(() => {
						router.push('/claimed');
					}, 2000);

					setName('');
					setCategory('');
				}
				else {
					alert("Transaction failed! Please try again");
					toast('Transaction failed! Please try again',
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
		}
		catch (error) {
			console.log(error);
			toast('Oh no! Domain already taken.',
				{
					icon: '🤬',
					style: {
						borderRadius: '10px',
						background: '#333',
						color: 'red',
					},
				}
			);
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

	// Render Methods
	const renderNotConnectedContainer = () => (
		<NotConnected>
			<ColorButton style={{ fontFamily: "Unbounded, cursive"}} align="center" sx={{ width: '70%', mt: 4, mb: 4 }} variant="contained" onClick={connectWallet}>
				Connect Wallet
			</ColorButton>
		</NotConnected>
	);

	// Form to enter name and data
	const renderRegisterForm = () => {
		// If not on BSC Mainnet, Ethereum or Polygon, render "Please connect to BSC Mainnet, Ethereum or Polygon"
		if (network !== 'BSC Mainnet' && network !== 'BSC Testnet' && network !== 'Polygon' && network !== 'Ethereum' && network !== 'Mumbai' && network !== 'Arbitrum') {
            return (
                <>
				    <NotConnected>
						<ColorButton align="center" variant="contained" onClick={switchToBnbTestnet}  style={{ fontFamily: "Unbounded, cursive",width:"auto"}}>
							Login With Binance
						</ColorButton>
				    </NotConnected>
                </>
            );
        }

		

		// The rest of the function remains the same
		return (

			<Box sx={{ width: '100%' }}>
				<Image width={100} height={10} layout="responsive" src="/domainx.png" alt="CZ Friends" />
				<Box sx={{ display: 'inline', alignItems: 'center', '& > :not(style)': { p: 1}, }}>
					<TextField 
						value={name}
						helperText="Just write name! without .arb"
						onChange={e => setName(e.target.value)}
					/>
					<FormControl fullWidth>
						<Select
							value={category}
							onChange={e => setCategory(e.target.value)}
						>
							<MenuItem value={'Letter'} style={{width:"100%"}}>Letter</MenuItem>
							<MenuItem value={'Number'}  style={{width:"100%"}}>Number</MenuItem>
							<MenuItem value={'Emoji'} style={{width:"100%"}}>Emoji</MenuItem>
							<MenuItem value={'Kaomoji'}  style={{width:"100%"}}>Kaomoji</MenuItem>
							<MenuItem value={'Symbol'} style={{width:"100%"}}>Symbol</MenuItem>
							<MenuItem value={'Special Character'} style={{width:"100%"}}>Special Character</MenuItem>
						</Select>
						<FormHelperText>Choose Your category of name! </FormHelperText>
					</FormControl>

					{(
						<Stack spacing={2} direction="row">
						<ColorButton style={{ fontFamily: "Unbounded, cursive",margin:"auto",width:"auto"}}    sx={{ width: '100%', mt: 4, mb: 4 }} variant="contained" onClick={network.includes("BSC Mainnet") ? userBNBRegister : network.includes("Ethereum") ? userETHRegister : network.includes("Mumbai") ? userMumbaiRegister : network.includes("BSC Testnet") ? userBNBTestRegister : userPolygonRegister}>
								Register using BNB
							</ColorButton>
							
						</Stack>
					)}
         {showSuccessGif && (
                <Box sx={{ textAlign: 'center' }}>
                    <Image src="/success.gif" alt="Success GIF" layout='fill'  />
                </Box>
	)}
				</Box>
			{/*	<h1 style={{textAlign:"center",fontSize:"18px"}}>Or</h1>
				<Stack spacing={2} direction="row">
				<ColorButton style={{ fontFamily: "Unbounded, cursive",margin:"auto",width:"auto"}}    sx={{ width: '100%', mt: 4, mb: 4 }} variant="contained" onClick={userUsdcRegister}>
								Register using USDC
							</ColorButton>
							
</Stack> */}
			<h1 style={{textAlign:"center",fontSize:"18px"}}>Or</h1> 
				<Stack spacing={2} direction='row' display="flex" alignItems="center" justifyContent="center" mt="10px">
				<CrossmintPayButton
               collectionId="954238a3-3c4d-4f4f-a01c-019abef3634b"
			   projectId="b473b8a1-7bac-4a18-8732-01d5ecd0e193"
                mintConfig={{"totalPrice":"0.0031","name":name,"category":category,"walletaddress":currentAccount}}
                environment="staging"
				checkoutProps={{"paymentMethods":["fiat"]}}
		 />	
							</Stack>
				<Tss />
			</Box>

		);
	}

	useEffect(() => {
		checkIfWalletIsConnected();
	}, []);

	return (
		<>
			<AppBar position="static">
                <Toolbar>
					<Typography variant="body1" sx={{ flexGrow: 1, mt: 1 }} >
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
			<Container sx={{ mt: 5 }}    >
				{!currentAccount && renderNotConnectedContainer()}
			</Container>
			<Container sx={{ mt: 3 }} >
				{currentAccount && renderRegisterForm()}
			</Container>
			<Toaster />
			<Footer />
		</>
	);
}

export default Home;
