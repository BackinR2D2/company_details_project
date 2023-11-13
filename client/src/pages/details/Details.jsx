import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { message } from 'antd';
import Spinner from '../../components/Spin/Spin';
import { Container, Box, Heading, Text, Tag, Link, Highlight, Button } from '@chakra-ui/react';
import { ExternalLinkIcon, AddIcon, NotAllowedIcon } from '@chakra-ui/icons';
import './details.css';
import axios from 'axios';

function Details() {
    const [searchParams] = useSearchParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [company, setCompany] = useState({});

    const companyData = {
        name: searchParams.get('name'),
        address: searchParams.get('address'),
        website: searchParams.get('website'),
    }

    if(!companyData.name || !companyData.address || !companyData.website) {
        return (
            <Box as='div' className='noElementsFoundContainer'>
                <Heading>
                    <NotAllowedIcon/> No Company Details Found
                </Heading>
            </Box>
        );
    }

    const loadCompanyInformation = async () => {
        try {
            setIsLoading(true);
            const { data } = await axios.get(`http://localhost:5000/api/v1/company/details/?name=${companyData.name}&address=${companyData.address}&website=${companyData.website}`);
            setCompany(data);
            setIsLoading(false);
        } catch (error) {
            message.error(`Some error occured, try again later please`);
        }
    }

    useEffect(() => {
        loadCompanyInformation();
    }, [companyData.name, companyData.address, companyData.website]);

    const handleRedirect = () => {
        navigate('/results', {state: {data: location.state.normalizedData, isNormalized: true}});
    };

    const handleAddToDashboard = (company) => {
        const storedData = {
            link: `company/details/?name=${companyData.name}&address=${companyData.address}&website=${companyData.website}`,
            name: company.data.company_name,
            description: company.data.short_description || company.data.long_description,
        };
        if(!localStorage.getItem('list')) {
            const list = [];
            list.push(storedData);
            localStorage.setItem('list', JSON.stringify(list));
            message.success(`${company.data.company_name} has been added to the list`);
        } else {
            const newList = JSON.parse(localStorage.getItem('list'));
            const existingElement = newList.some(element => element.name === company.data.company_name);
            newList.push(storedData);
            if(!existingElement) {
                localStorage.setItem('list', JSON.stringify(newList));
                message.success(`${company.data.company_name} has been added to the list`);
            } else {
                message.error(`${company.data.company_name} is already in the list`);
            }
        }
    };

    return (
        <Container maxW={'5xl'}>
            {
                isLoading ?
                    <Spinner />
                :
                <Box as='div' m={'1em'} mt={'4em'}>
                     <Heading as='h2' size='xl' fontWeight={'100'} textAlign={'center'} mb={'12px'}>
                        {company.data.company_name} <Tag>{company.data.main_business_category}</Tag>
                    </Heading>
                    <Box as='div' className='company_metadata'>
                        {
                            company.data.employee_count ?
                                <Text noOfLines={1}>
                                    Employees: <b>{company.data.employee_count}</b> 
                                </Text>
                                :
                                <Text noOfLines={1}>
                                    Company Type: <b>{company.data.company_type}</b>
                                </Text>
                        }
                        <Text noOfLines={1}>
                            Number of locations: <b>{company.data.num_locations}</b>
                        </Text>
                    </Box>
                    <Box as='div' className='company_metadata'>
                        <Link href={company.data.website_url} isExternal color='blue.500'>
                            {company.data.website_url} <ExternalLinkIcon mx='2px' />
                        </Link>
                        <Text noOfLines={1}>
                            Founded in <b>{company.data.year_founded}</b>
                        </Text>
                    </Box>
                    
                    <Box as='div' className='company_description'>
                        <Text fontSize={'18px'}>
                            <Highlight
                                query={company.data.company_name}
                                styles={{ px: '2', py: '1', rounded: 'full', bg: 'green.100' }}
                            >
                                {company.data.long_description}
                            </Highlight>
                        </Text>
                    </Box>

                    <Box as='div' className='company_summary'>
                        <Heading as='h5' size='md'>
                            {company.data.company_name} Summary
                        </Heading>
                        <Text m={'14px 0 14px 0'} fontSize={'18px'}>
                            <Highlight
                                query={company.data.company_name}
                                styles={{ px: '2', py: '1', rounded: 'full', bg: 'red.100' }}
                            >
                                {(company.data.summary[0].message.content).trim()}
                            </Highlight>
                        </Text>
                    </Box>

                    {
                        !location.state?.fromDashboard ?
                        <Box as='div' className='options'>
                            {
                                !location.state?.normalizedData ?
                                    <></>
                                    :
                                    <Button className='redirectBtn' colorScheme='teal' onClick={handleRedirect}>Go back to the list</Button>
                            }
                            <Button className='addToDashboardBtn' colorScheme='green' rightIcon={<AddIcon />} onClick={() => handleAddToDashboard(company)}>Add to dashboard</Button>
                        </Box>
                        :
                        <></>
                    }
                </Box>
            }
        </Container>
    )
}

export default Details;