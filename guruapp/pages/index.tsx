import { Container, Flex, Box, Heading, Text } from '@chakra-ui/react';
import NextImage from 'next/image';
import Lottie from 'lottie-react';

import ButtonLink from 'components/buttonLink';

import helloGroup from 'assets/helloGroup.json';

import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <Container
      py={{ base: 7, lg: 20 }}
      maxW={{ base: '100%', lg: '85%' }}
      display='flex'
      alignItems='center'
      minHeight='100vh'
    >
      <Flex
        w='full'
        flexDirection={{ base: 'column-reverse', lg: 'row' }}
        justifyContent='space-between'
        alignItems='center'
      >
        <Box
          w={{ base: '100%', lg: '40%' }}
          textAlign={{ base: 'center', lg: 'left' }}
          mt={{ base: 7, lg: 0 }}
        >
          <Box ml={{ base: 0, lg: -6 }}>
            <NextImage
                          src='/guruapp-transparent.png'
                          width={200}
                          height={200} alt={'Guruapp picture'}            />
          </Box>
          <Heading as='h1' size='2xl' mt={6} mb={4}>
            Match mentees with mentors
          </Heading>
          <Text mb={7}>
            Help professionals and students connect with others around the world
          </Text>
          <ButtonLink to='/event/register' sx={{ mr: 3, mt: 3 }}>
            Find a match
          </ButtonLink>
          <ButtonLink to='/event/new' outline sx={{ mt: 3 }}>
            Help others find a match
          </ButtonLink>
        </Box>
        <Box w={{ base: '100%', lg: '60%' }} pl={{ lg: 8 }}>
          <Lottie animationData={helloGroup} loop />
        </Box>
      </Flex>
    </Container>
  );
};

export default Home;