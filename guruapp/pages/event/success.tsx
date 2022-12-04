import { useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  useToast,
  ScaleFade,
  Container,
  Flex,
  Box,
  Heading,
  Text,
} from '@chakra-ui/react';
import { CopyIcon } from '@chakra-ui/icons';
import Lottie from 'lottie-react';

import ButtonLink from 'components/buttonLink';
import Button from 'components/button';

import jumpingSuccess from 'assets/jumpingSuccess.json';
import groupChat from 'assets/groupChat.json';

import type { NextPage } from 'next';
import type { ToastId } from '@chakra-ui/react';

const containerStyle = {
  fontSize: 'sm',
  fontWeight: 300,
};

const EventSuccess: NextPage = () => {
  const router = useRouter();
  const toast = useToast();

  const { eventName, participantName, id, uniqueID } = router.query || {};
  const isAdmin = Boolean(eventName);
  const uniqueLink = isAdmin
    ? '/coming-soon'
    : `/event/status/${id}/${uniqueID}`;

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(`${window.location.origin}${uniqueLink}`)
      .then(() => {
        toast({
          title: 'Link copied successfully',
          position: 'bottom',
          status: 'info',
          variant: 'subtle',
          duration: 1000,
          containerStyle,
        });
      });
  };

  useEffect(() => {
    if (!router.isReady) return;

    if (!id || !uniqueID) {
      router.push('/');
      return;
    }

    let toastId: ToastId;

    if (eventName) {
      toastId = toast({
        title: `"${eventName}" created`,
        position: 'top',
        status: 'success',
        variant: 'subtle',
        duration: null,
        containerStyle,
      });
    } else if (participantName) {
      toastId = toast({
        title: `"${participantName}" registered`,
        position: 'top',
        status: 'success',
        variant: 'subtle',
        duration: null,
        containerStyle,
      });
    }
    return () => toast.close(toastId);
  }, [router.isReady, id, uniqueID, eventName, participantName]);

  return (
    <ScaleFade in initialScale={0.7}>
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
            <Heading as='h1' size='2xl' mb={4}>
              {isAdmin
                ? 'Event created successfully'
                : 'Looking for your match now!'}
            </Heading>
            <Text mb={3}>
              {isAdmin
                ? 'All participants are now being sent emails to register as a mentor or mentee.'
                : 'You will receive an email from us when your match has been found.'}
            </Text>
            <Text mb={7}>
              {isAdmin
                ? 'In the meantime, please visit and save this unique URL to track and manage your event:'
                : 'Or you can keep track of your match by visiting or saving this unique URL we generated for you.'}
            </Text>
            <ButtonLink to={uniqueLink} sx={{ mr: 3, mt: 3 }}>
              {isAdmin ? 'Manage event' : 'Track match'}
            </ButtonLink>
            <Button
              icon={<CopyIcon />}
              outline
              sx={{ mt: 3 }}
              onClick={copyToClipboard}
            >
              Copy unique link
            </Button>
          </Box>
          <Box w={{ base: '100%', lg: '60%' }} pl={{ lg: 16 }}>
            <Lottie animationData={isAdmin ? jumpingSuccess : groupChat} loop />
          </Box>
        </Flex>
      </Container>
    </ScaleFade>
  );
};

export default EventSuccess;