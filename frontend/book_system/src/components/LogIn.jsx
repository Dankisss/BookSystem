import { Button, Input, useColorModeValue, VStack } from '@chakra-ui/react';
import React from 'react';

const LogIn = () => {

  const buttonBg = useColorModeValue('buttonTheme.primary', 'buttonTheme.secondary');
  const buttonHover = useColorModeValue('buttonTheme.prime', 'buttonTheme.hoverSecondary');
  const stackBg = useColorModeValue('beige', '#ADD8E6');
  const focusBorderColor = useColorModeValue('buttonTheme.primary', 'buttonTheme.secondary');
  return (
    <VStack
      maxW='container.sm'
      margin='auto'
      gap={5}
      alignItems='center'
      bgColor='#e4d5b7'
      borderRadius={7}
      p={10}
      pb={6}
      mt={30}
      boxShadow='lg'
      bg={stackBg}
    >
      <Input placeholder='Username' bgColor='white' color='black' borderColor='gray.400' focusBorderColor={focusBorderColor} _placeholder={{ color: 'gray.500' }} />
      <Input placeholder='Password' bgColor='white' color='black' borderColor='gray.400' focusBorderColor={focusBorderColor} type='password' _placeholder={{ color: 'gray.500' }} />
      <Button alignSelf='flex-end' bg={buttonBg} _hover={{ bg: buttonHover }}>
        Submit
      </Button>
    </VStack>
  );
};

export default LogIn;
