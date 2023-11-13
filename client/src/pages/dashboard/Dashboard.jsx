import React from 'react';
import { Container, Box, Heading, Card, CardHeader, CardBody, CardFooter, Text, Button } from '@chakra-ui/react';
import { NotAllowedIcon, DeleteIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import { message } from 'antd';
import './dashboard.css';

function Dashboard() {

  if(!localStorage.getItem('list')) {
    return (
        <Box as='div' className='noElementsFoundContainer'>
            <Heading>
                <NotAllowedIcon/> No Company Details Found
            </Heading>
        </Box>
    );
  }

  const defaultList = (JSON.parse(localStorage.getItem('list')));
  const [itemList, setItemList] = React.useState(defaultList);
 
  const handleElementDelete = (item) => {
    setItemList((prevState) => prevState.filter(element => element.name !== item.name));
    const filteredList = defaultList.filter((element) => element.name !== item.name);
    localStorage.setItem('list', JSON.stringify(filteredList));
    message.success(`${item.name} has been deleted from the list`);
  };

  return (
    <Container maxW={'5xl'}>
      <Box as='div' className='heading'>
        <Heading as='h2' size='xl' textAlign={'center'} m={'2em'} fontWeight={'100'}>
          Dashboard
        </Heading>
      </Box>
      <Box as='div' className={itemList.length > 0 ? 'container' : ''} mt={'6em'}>
          {
            itemList.length > 0 ?
              <>
                {itemList.map(item => (
                  <Card width={'16em'} key={item.name}>
                      <CardHeader>
                        <Heading size='md'>
                          <Link to={`/${item.link}`} state={{fromDashboard: true}} style={{color: 'blue', textDecoration: 'underline'}}>{item.name}</Link>
                        </Heading>
                        </CardHeader>
                        <CardBody>
                          <Text noOfLines={[1,2,3]}>{item.description}</Text>
                        </CardBody>
                        <CardFooter>
                          <Button rightIcon={<DeleteIcon/>} colorScheme='red' onClick={() => handleElementDelete(item)}>Delete</Button>
                        </CardFooter>
                    </Card>
                ))}
              </>
              :
              <Box as='div' className='noElementsFoundContainer'>
                  <Heading>
                      <NotAllowedIcon/> No Company Details Found
                  </Heading>
              </Box>
          }
      </Box>
    </Container>
  );
}

export default Dashboard;