import React from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Heading } from '@chakra-ui/react';
import {WarningTwoIcon} from '@chakra-ui/icons';
import { Link } from 'react-router-dom';

function Error() {
  const location = useLocation();

  return (
    <Box as='div' className='noElementsFoundContainer'>
        <Heading as='h3' fontWeight={'100'}>
            <WarningTwoIcon color={'red.400'} /> Route <b>{location.pathname}</b> not found. Try <Link to="/" style={{color: 'blue', textDecoration: 'underline'}}>here</Link>
        </Heading>
    </Box>
  );
}

export default Error;