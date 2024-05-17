import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('1 character', 0.001, 'Letter', '.arb', 'Arbitrum'),
  createData('2 character', 0.001, 'Number', '.arb', 'Arbitrum'),
  createData('3 character', 0.001, 'Emoji', '.arb', 'Arbitrum'),
  createData('4 character', 0.001, 'Kemoji', '.arb', 'Arbitrum'),
  createData('5 character', 0.007, 'Symbol', '.arb', 'Arbitrum'),
];

export default function BasicTable() {
  return (
    <TableContainer component={Paper} style={{marginTop:"30px"}}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name Length</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Types</TableCell>
            <TableCell align="right">Domain extenion</TableCell>
            <TableCell align="right">Blockchain</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
