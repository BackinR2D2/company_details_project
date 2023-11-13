import React from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Container, Heading } from '@chakra-ui/react';
import { Table } from 'antd';
import { Link } from 'react-router-dom';

function Results() {
    const location = useLocation();
    const normalizedData = (location.state.isNormalized ? location.state.data : location.state.map((company, index) => {
        return {
            key: index,
            name: company[Object.keys(company)[0]],
            address: company.address,
            website: company.website,
        };
    })); 

    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          sortDirections: ['ascend', 'descend', 'ascend'],
          defaultSortOrder: 'ascend',
          sorter: (a, b) => {
            return (a.name).localeCompare(b.name);
          },
          render: (text, element) => {
            return <Link to={{
                pathname: `/company/details/`,
                search: `?name=${element.name}&address=${element.address}&website=${element.website}`,
            }} state={{normalizedData}} >{text}</Link>
          }
        },
        {
            title: 'Address',
            dataIndex: 'address',
        },
        {
            title: 'Website',
            dataIndex: 'website',
            render: (text) => {
                return <a href={text} target={'_blank'}>{text}</a>
            },
        },
    ];

    return (
        <Container maxW={'4xl'} mt={'6em'}>
              <Heading as='h2' size='xl' m={'1em'} textAlign={'center'}>
                Your companies list
            </Heading>
            <Box as='div'>
                <Table style={{marginTop: '8vh'}} scroll={{x: 200}} bordered={true} pagination={false} columns={columns} dataSource={normalizedData} />
            </Box>
        </Container>
    );
}

export default Results;