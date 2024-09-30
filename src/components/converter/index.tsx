import React, { useState, useEffect } from 'react';
import { TextField, IconButton, Box, Typography } from '@mui/material';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import Image from 'next/image';
import { conventerLocalization } from '@/constant/localization';
import { getLatestExchangeRate } from '@/api/currencyAPI';
import { ConverterState } from '@/types/types';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  gradientBackground: {
    width: '100%',
    height: '97vh',
    background: 'linear-gradient(45deg, #ebedff, #f3f2f8, #dbf8ff)',
    backgroundSize: '200% 200%',
    animation: '$gradientAnimation 10s ease infinite',
    filter: 'brightness(1.2)',
  },
  '@keyframes gradientAnimation': {
    '0%': { backgroundPosition: '0% 50%' },
    '50%': { backgroundPosition: '100% 50%' },
    '100%': { backgroundPosition: '0% 50%' },
  },
});

const Converter: React.FC<ConverterState> = () => {
  const classes = useStyles();
  const [usdAmount, setUsdAmount] = useState('0');
  const [irrAmount, setIrrAmount] = useState('');
  const [isUsdToIrr, setIsUsdToIrr] = useState(true);
  const [textUsdToIrr, setTextUsdToIrr] = useState(
    conventerLocalization.DollarsToRials
  );
  const [exchangeRate, setExchangeRate] = useState<number>(600000);

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const data = await getLatestExchangeRate();
        const latestRate = parseInt(data.harat_naghdi_sell.value, 10) * 10;
        setExchangeRate(latestRate);
      } catch (error) {
        console.error('Error fetching exchange rate:', error);
      }
    };

    fetchExchangeRate();
  }, []);

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
    <Box className={classes.gradientBackground}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={2}
        p={2}
        sx={{}}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            m: 'auto',
            backgroundColor: 'white',
            p: 7,
            borderRadius: '15px',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.8)',
          }}
        >
          <Typography
            sx={{
              fontSize: '18px',
              fontWeight: 900,
              mb: 3,
              fontFamily: 'Iransans',
            }}
          >
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
      </Box>
    </Box>
  );
};

export default Converter;
