import React from 'react';
import Upload from '../../components/Upload/Upload';
import { Box, Container } from '@chakra-ui/react';

function Homepage() {
  return (
    <Container>
        <Box as={'div'} height={'80vh'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
            <Upload />
        </Box>
    </Container>
  );
}

export default Homepage;