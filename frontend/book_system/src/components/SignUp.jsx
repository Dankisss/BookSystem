import React, { useState } from 'react'
import { Button, Input, Slider, SliderFilledTrack, SliderMark, SliderThumb, SliderTrack, useColorModeValue, VStack } from '@chakra-ui/react'

const SignUp = () => {
  const [sliderValue, setSliderValue] = useState(50);

  const buttonBg = useColorModeValue('buttonTheme.primary', 'buttonTheme.secondary');
  const buttonHover = useColorModeValue('buttonTheme.hoverPrimary', 'buttonTheme.hoverSecondary');
  const stackBg = useColorModeValue('#d4b17f', '#ADD8E6');
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
      <Input placeholder='Email' bgColor='white' color='black' borderColor='gray.400' focusBorderColor={focusBorderColor} _placeholder={{ color: 'gray.500' }} />
      <Input placeholder='Password' bgColor='white' color='black' borderColor='gray.400' focusBorderColor={focusBorderColor} type='password' _placeholder={{ color: 'gray.500' }} />

      <Slider mt={10} max={100} step={1} aria-label='slider-ex-6' onChange={(val) => setSliderValue(val)}>
        
      <SliderMark
          value={sliderValue}
          textAlign='center'
          bg={buttonBg}
          color='white'
          mt='-10'
          ml='-9'
          w={20}
          p={1}
          borderRadius={10}
        >
          {sliderValue} years 
        </SliderMark>
        <SliderTrack bg={useColorModeValue('#FFE4B5', '#ADD8E6')}>
          <SliderFilledTrack bg={buttonBg}/>
        </SliderTrack>
        <SliderThumb />
      </Slider>

      <Button alignSelf='flex-end' bg={buttonBg} _hover={{ bg: buttonHover }}>
        Submit
      </Button>
    </VStack>
  )
}

export default SignUp;
