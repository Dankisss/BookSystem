import { HStack, Text, Box, Button, useColorMode, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { BiMoon, BiSun } from 'react-icons/bi';
import { Link, useLocation } from 'react-router-dom';

const NavBar = () => {
    const { colorMode, toggleColorMode } = useColorMode();

    const buttonBg = useColorModeValue('buttonTheme.primary', 'buttonTheme.secondary');
    const buttonHover = useColorModeValue('buttonTheme.hoverPrimary', 'buttonTheme.hoverSecondary');
    const title = useColorModeValue('linear(to-r, #8B4513, #D2B48C)', 'linear(to-r, #89CFF0, #5F9EA0)')

    const location = useLocation();

    const showButtons = ["/", "/login", "/signup"].includes(location.pathname);
    return (
        <>
            <Box
                maxWidth='1240px'  // Максимална ширина на контейнера
                margin='auto'      // Центрира контейнера по хоризонталната ос
                p={5}              // Допълнително вътрешно разстояние
            >
                <HStack justifyContent={'space-between'} alignItems='center' h={20}>
                    <Link to="/">
                        <Text
                            bgGradient={title}
                            bgClip='text'
                            fontWeight='700'
                            fontSize='3xl'
                        >
                            Book System 🕮
                        </Text>
                    </Link>

                    <HStack spacing={5}>
                        {showButtons && (
                            <HStack spacing={5}>
                            <Link to="/login">
                                <Button
                                    bg={buttonBg}
                                    color='white'
                                    _hover={{ bg: buttonHover }}
                                >
                                    Log In
                                </Button>
                            </Link>
                        

                        <Link to="/signup">
                            <Button
                                bg={buttonBg}
                                color='white'
                                _hover={{ bg: buttonHover }}    // Цвят 
                            >
                                Sign Up
                            </Button>
                        </Link>
                        </HStack>
                        )}

                        <Button onClick={toggleColorMode} bg={buttonBg} _hover={{ bg: buttonHover }}>
                            {colorMode === 'dark' ? <BiSun /> : <BiMoon />}
                        </Button>
                    </HStack>
                </HStack>
            </Box>
        </>
    );
};

export default NavBar;
