import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';

export default function Faq() {
  return (
    <div style={{marginTop:"30px"}}>
      <Accordion>
        <AccordionSummary
        style={{width:"100%"}}
          expandIcon={<ExpandMore />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>What is arb.direct? </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2">
          arb.direct, is a Name Service built on Arbitrum to replace wallet addresses to a more easy to read name.Since .arb Name Service is built upon Arbitrum network, a layer-2 solution for the Ethereum blockchain, it inherits many of its advantages over the traditional DNS systems:
.arb Name Service will become an essential piece in the Web3 realm on considerably the most EVM-compatible chain.
.arb Name Service will soon be integrated into every corner of the powerful Arbitrum ecosystem.
          </Typography>
        
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
         style={{width:"100%"}}
          expandIcon={<ExpandMore />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>How does it work in simple terms? </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2">
          Each .arb name you purchase will be delivered to you as an NFT. Whatever wallet holds that NFT is where payments can be routed by using the .arb name instead of the addess.
          </Typography>
          
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
         style={{width:"100%"}}
          expandIcon={<ExpandMore />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography>What network do you support? </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2">
          We currently support Arbitrum, but we do plan on adding other networks to our platform.
          </Typography>
         
        </AccordionDetails>
      </Accordion>
      
    </div>
  );
}
