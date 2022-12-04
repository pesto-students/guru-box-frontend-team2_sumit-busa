import { useRef } from 'react';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import {
  VStack,
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  Input,
  Textarea,
} from '@chakra-ui/react';

import Button from 'components/button';

import type { FormikValues, FormikErrors } from 'formik';

const CreateEventSchema = Yup.object().shape({
  eventName: Yup.string().required('Please fill out field'),
  closingDate: Yup.string().required('Please fill out field'),
  emails: Yup.string().required('Please fill out field'),
});

const calcProgress = (
  values: FormikValues,
  errors: FormikErrors<any>,
  hasValidEmail: boolean
): number => {
  const totalFields = Object.keys(values).length;
  const validFields = Object.keys(values).filter(
    field =>
      !errors[field] &&
      Boolean(values[field]) &&
      (field !== 'emails' || hasValidEmail)
  ).length;

  return Math.floor((validFields / totalFields) * 100);
};

const validateEmails = (emailsStr: string): string[] => {
  const potentialEmails = emailsStr.split(/[\s,]+/);
  return potentialEmails.filter(
    email => Boolean(email) && /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)
  );
};

type Props = {
  onProgressChange: Function;
  onSubmit: Function;
  isLoading: boolean;
};

const CreateEventForm = ({ onProgressChange, onSubmit, isLoading }: Props) => {
  const progressRef = useRef(0);

  return (
    <Formik
      initialValues={{
        eventName: '',
        closingDate: '',
        emails: '',
      }}
      onSubmit={(values, { setFieldError }) => {
        const validEmails = validateEmails(values.emails);
        if (validEmails.length >= 2) {
          onSubmit({ ...values, emails: validateEmails(values.emails) });
        } else {
          setFieldError('emails', 'You need at least 2 participants');
        }
      }}
      validationSchema={CreateEventSchema}
    >
      {({ handleSubmit, values, errors, touched }) => {
        const validEmails = validateEmails(values.emails);

        const newProgress = calcProgress(
          values,
          errors,
          Boolean(validEmails.length)
        );
        if (progressRef.current !== newProgress) {
          onProgressChange(newProgress);
          progressRef.current = newProgress;
        }

        return (
          <Form onSubmit={handleSubmit} noValidate>
            <VStack spacing={{ base: 16, lg: 20 }} alignItems='start'>
              <FormControl
                isRequired
                isInvalid={!!errors.eventName && touched.eventName}
              >
                <FormLabel htmlFor='eventName' fontSize='sm' mb={5}>
                  What do you want to name your matching event?
                </FormLabel>
                <Field
                  as={Input}
                  id='eventName'
                  name='eventName'
                  type='text'
                  placeholder='Enter event name'
                  fontSize='sm'
                />
                <FormErrorMessage>{errors.closingDate}</FormErrorMessage>
              </FormControl>

              <FormControl
                isRequired
                isInvalid={!!errors.closingDate && touched.closingDate}
              >
                <FormLabel htmlFor='closingDate' fontSize='sm' mb={5}>
                  When do you want registration to end?
                </FormLabel>
                <Field
                  as={Input}
                  id='closingDate'
                  name='closingDate'
                  type='date'
                  placeholder='Enter date'
                  fontSize='sm'
                />
                <FormHelperText>
                  Participants are matched after this date
                </FormHelperText>
                <FormErrorMessage>{errors.closingDate}</FormErrorMessage>
              </FormControl>

              <FormControl
                isRequired
                isInvalid={!!errors.emails && touched.emails}
              >
                <FormLabel htmlFor='emails' fontSize='sm' mb={5}>
                  Email addresses of participants
                </FormLabel>
                <Field
                  as={Textarea}
                  id='emails'
                  name='emails'
                  type='textarea'
                  placeholder='Copy-paste email addresses here'
                  fontSize='sm'
                  height='3xs'
                />
                {validEmails.length || touched.emails ? (
                  <FormHelperText>
                    {validEmails.length} email(s) found
                  </FormHelperText>
                ) : null}
                <FormErrorMessage>{errors.emails}</FormErrorMessage>
              </FormControl>

              <Button
                type='submit'
                isLoading={isLoading}
                loadingText='Creating'
                size='md'
              >
                Create event
              </Button>
            </VStack>
          </Form>
        );
      }}
    </Formik>
  );
};

export default CreateEventForm;