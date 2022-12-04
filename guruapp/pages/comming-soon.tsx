import { useRouter } from 'next/router';
import { Container, Box, Heading } from '@chakra-ui/react';
import Lottie from 'lottie-react';

import ButtonLink from 'components/buttonLink';
import Button from 'components/button';

import comingSoonConstruction from 'assets/ComingSoonConstuction.json';

import type { NextPage } from 'next';

const ComingSoon: NextPage = () => {
  const router = useRouter();

  return (
    <Container
      py={{ base: 7, lg: 20 }}
      w={{ base: '100%', lg: '85%' }}
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      minHeight='100vh'
    >
      <Heading as='h1' size='2xl' textAlign='center'>
        Coming soon!
      </Heading>
      <Box w='full' mt={12} mb={24}>
        <Lottie animationData={comingSoonConstruction} loop />
      </Box>
      <Box>
        <ButtonLink to='/' sx={{ mr: 3, mt: 3 }}>
          Go Home
        </ButtonLink>
        <Button onClick={router.back} outline sx={{ mt: 3 }}>
          Go Back
        </Button>
      </Box>
    </Container>
  );
};

export default ComingSoon;