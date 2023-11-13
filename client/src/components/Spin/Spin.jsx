import React from 'react';
import { Spin } from 'antd';
import { Container } from '@chakra-ui/react';

function Spinner () {
    return (
        <Container textAlign={'center'} height={'60vh'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
            <Spin size="large" />
        </Container>
    );
}

export default Spinner;