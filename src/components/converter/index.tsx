import React, { useState } from 'react';
import { TextField, IconButton, Box, Typography } from '@mui/material';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import Image from 'next/image';
import { conventerLocalization } from '@/constant/localization';
import { ConverterState } from '@/types/types';

const Converter: React.FC = () => {
  const [usdAmount, setUsdAmount] = useState<ConverterState['usdAmount']>('0');
  const [irrAmount, setIrrAmount] = useState<ConverterState['irrAmount']>('');
  const [isUsdToIrr, setIsUsdToIrr] =
    useState<ConverterState['isUsdToIrr']>(true);
  const [textUsdToIrr, setTextUsdToIrr] = useState<
    ConverterState['textUsdToIrr']
  >(conventerLocalization.DollarsToRials);

  const exchangeRate = 600000;

  // Helper function to format input
  const formatInput = (value: string): string => {
    const numericValue = value.replace(/\D/g, '');
    return new Intl.NumberFormat('en-US').format(
      parseInt(numericValue || '0', 10)
    );
  };

  // Function to handle changes in USD input field
  const handleUsdChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const formattedValue = formatInput(e.target.value);
    setUsdAmount(formattedValue);
    const irrValue = (
      parseInt(formattedValue.replace(/,/g, ''), 10) * exchangeRate
    ).toString();
    setIrrAmount(formatInput(irrValue));
  };

  // Function to swap between USD and IRR
  const handleSwap = (): void => {
    setIsUsdToIrr(!isUsdToIrr);
    setUsdAmount(irrAmount);
    setIrrAmount(usdAmount);
    setTextUsdToIrr(
      isUsdToIrr
        ? conventerLocalization.RialsToDollars
        : conventerLocalization.DollarsToRials
    );
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={2}
      p={2}
    >
      <Typography sx={{ fontSize: '22px', fontWeight: 900 }}>
        {textUsdToIrr}
      </Typography>

      <Box display="flex" alignItems="center" gap={1}>
        <Image
          src={isUsdToIrr ? '/images/USD.png' : '/images/IRAN.png'}
          alt={isUsdToIrr ? 'USD' : 'IRR'}
          width={30}
          height={20}
        />
        <TextField
          label={isUsdToIrr ? 'USD' : 'IRR'}
          value={usdAmount}
          onChange={handleUsdChange}
          inputProps={{
            inputMode: 'numeric',
          }}
        />
      </Box>

      <IconButton onClick={handleSwap}>
        <SwapHorizIcon />
      </IconButton>

      <Box display="flex" alignItems="center" gap={1}>
        <Image
          src={isUsdToIrr ? '/images/IRAN.png' : '/images/USD.png'}
          alt={isUsdToIrr ? 'IRR' : 'USD'}
          width={30}
          height={20}
        />
        <TextField
          label={isUsdToIrr ? 'IRR' : 'USD'}
          value={irrAmount}
          disabled
          inputProps={{
            inputMode: 'numeric',
          }}
        />
      </Box>
    </Box>
  );
};

export default Converter;
