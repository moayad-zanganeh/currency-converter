import React, { useState } from 'react';
import { TextField, IconButton, Box, Typography } from '@mui/material';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import Image from 'next/image';
import { conventerLocalization } from '@/constant/localization';

const Converter: React.FC = () => {
  const [usdAmount, setUsdAmount] = useState<string>('0');
  const [irrAmount, setIrrAmount] = useState<string>('');
  const [isUsdToIrr, setIsUsdToIrr] = useState<boolean>(true);
  const [textUsdToIrr, setTextUsdToIrr] = useState<string>(
    conventerLocalization.DollarsToRials
  );
  const exchangeRate = 600000;

  const formatInput = (value: string) => {
    const numericValue = value.replace(/\D/g, '');
    return new Intl.NumberFormat('en-US').format(
      parseInt(numericValue || '0', 10)
    );
  };

  const handleUsdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatInput(e.target.value);
    setUsdAmount(formattedValue);
    const irrValue = (
      parseInt(formattedValue.replace(/,/g, ''), 10) * exchangeRate
    ).toString();
    setIrrAmount(formatInput(irrValue));
  };

  const handleSwap = () => {
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
