import {
  Box,
  Flex,
  Text,
  Button,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  HStack,
  useBreakpointValue,
  IconButton,
} from '@chakra-ui/react'
import { MoonIcon, SunIcon, HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import { NavLink } from "react-router-dom";

const links = [{path: '/', title: 'Homepage'}, {path: '/dashboard', title: 'Dashboard'}];

const Link = (props) => {
   const {title, path} = props;

   return (
    <Box
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
      }}
      >
        <NavLink
            to={path}
            >
            {title}
        </NavLink>
    </Box>
  )
}

function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode()
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems={'center'}>
            <Text
                textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
                fontFamily={'heading'}
                as='b'
                fontSize={'larger'}
                >
                Company Details Tool
            </Text>
            <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
              {links.map((link, index) => (
                <Link key={index} title={link.title} path={link.path}>{link.title}</Link>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>
            </Stack>
          </Flex>
        </Flex>
        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
                {links.map((link, index) => (
                    <Link key={index} title={link.title} path={link.path}>{link.title}</Link>
                ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  )
}

export default Navbar;