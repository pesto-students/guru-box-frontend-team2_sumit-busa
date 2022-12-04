import { useState } from 'react';
import { useRouter } from 'next/router';
import {
  useToast,
  SlideFade,
  Container,
  Box,
  Heading,
  Text,
  Progress,
} from '@chakra-ui/react';

import CreateEventForm from 'components/createEventForm';

import strapi, { createHeaders } from 'utils/request/strapi';

import type { NextPage, NextPageContext } from 'next';
import { FormikValues } from 'formik';

type Props = {
  headers: { Authorization: string };
};

const NewEvent: NextPage<Props> = ({ headers }) => {
  const router = useRouter();
  const toast = useToast();

  const [progress, setProgress] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (values: FormikValues) => {
    try {
      setIsLoading(true);

      const {
        data: {
          data: {
            id,
            attributes: { uniqueID },
          },
        },
      } = await strapi.post(
        '/events',
        {
          data: values,
        },
        { headers }
      );

      router.push({
        pathname: '/event/success',
        query: {
          eventName: values.eventName,
          id,
          uniqueID,
        },
      });
    } catch (error) {
      setIsLoading(false);

      toast({
        title: 'Something went wrong',
        description: 'Please try again',
        position: 'top',
        status: 'error',
        variant: 'subtle',
      });
    }
  };

  return (
    <SlideFade in offsetY='100vh'>
      <Box
        position='sticky'
        top={0}
        pt={{ base: 7, lg: 20 }}
        bg='white'
        zIndex={1}
      >
        <Container maxW={{ base: '100%', lg: '2xl' }} mb={{ base: 7, lg: 10 }}>
          <Heading fontSize={{ base: 'lg', lg: '3xl' }} fontWeight='600'>
            Create Mentor-Mentee Event
          </Heading>
          <Text
            mt={3}
            color='blackAlpha.600'
            fontSize={{ base: 'sm', lg: 'md' }}
          >
            Please fill in the following application.
          </Text>
        </Container>
        <Progress
          isIndeterminate={isLoading}
          value={progress}
          size='xs'
          hasStripe
          isAnimated
          colorScheme='palBlue'
        />
      </Box>
      <Container maxW={{ base: '100%', lg: '2xl' }} py={{ base: 12, lg: 20 }}>
        <CreateEventForm
          onProgressChange={setProgress}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </Container>
    </SlideFade>
  );
};

export default NewEvent;

export const getServerSideProps = async (context: NextPageContext) => {
  const headers = createHeaders(context);
  return {
    props: { headers },
  };
};