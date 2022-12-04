import { useRef } from 'react';
import * as Yup from 'yup';
import 'yup-phone';
import { Formik, Form, Field } from 'formik';
import {
  VStack,
  Flex,
  Box,
  Text,
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  Input,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Switch,
  Button,
  SimpleGrid,
} from '@chakra-ui/react';

import CreatableSelect from 'components/creatableSelect';

import countries from 'country-list';
import { timeZonesNames } from '@vvo/tzdb';

import type { FormikValues, FormikErrors } from 'formik';
import type { Certification, Skill } from 'types';

const countriesOptions = countries.map(c => c.name);
const timeZoneOptions = timeZonesNames.map(name => ({
  label: name.replace(/_/g, ' '),
  value: name,
}));

const RegistrantSchema = Yup.object().shape({
  firstName: Yup.string().required('Please fill out field'),
  lastName: Yup.string().required('Please fill out field'),
  gender: Yup.string().required('Please fill out field'),
  email: Yup.string().email('Invalid email').required('Please fill out field'),
  phoneNumber: Yup.lazy(value =>
    !value
      ? Yup.string()
      : Yup.string().phone(undefined, undefined, 'Invalid phone number')
  ),
  timeZone: Yup.string().required('Please fill out field'),
  country: Yup.string(),
  companyName: Yup.string(),
  jobTitle: Yup.string(),
  yearsOfExperience: Yup.number()
    .required('Please fill out field')
    .min(0, 'Too low')
    .max(100, 'Too high'),
  certifications: Yup.array().of(
    Yup.object().shape({
      label: Yup.string(),
      value: Yup.string(),
      isNew: Yup.boolean(),
    })
  ),
  skills: Yup.array().of(
    Yup.object().shape({
      label: Yup.string(),
      value: Yup.string(),
      isNew: Yup.boolean(),
    })
  ),
  isOpenToMultiple: Yup.boolean().required('Please fill out field'),
  otherGenderPreference: Yup.string().required('Please fill out field'),
});

const calcProgress = (
  values: FormikValues,
  errors: FormikErrors<any>
): number => {
  const totalFields = Object.keys(values).length;
  const validFields = Object.keys(values).filter(
    field =>
      !errors[field] &&
      (Boolean(values[field]) ||
        ['number', 'boolean'].includes(typeof values[field]))
  ).length;

  return Math.floor((validFields / totalFields) * 100);
};

const withoutEmptyStrings = (values: FormikValues) =>
  Object.keys(values).reduce((acc, cur) => {
    const isEmptyString = typeof values[cur] === 'string' && !values[cur];

    if (!isEmptyString) {
      acc[cur] = values[cur];
    }

    return acc;
  }, {} as { [key: string]: any });

type Props = {
  participantType: 'mentor' | 'mentee';
  certifications: Certification[];
  skills: Skill[];
  onProgressChange: Function;
  onSubmit: Function;
  isLoading: boolean;
};

const RegisterEventForm = ({
  participantType,
  certifications,
  skills,
  onProgressChange,
  onSubmit,
  isLoading,
}: Props) => {
  const progressRef = useRef(0);

  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        gender: '',
        email: '',
        phoneNumber: '',
        timeZone: '',
        country: '',
        companyName: '',
        jobTitle: '',
        yearsOfExperience: 0,
        certifications: [],
        skills: [],
        isOpenToMultiple: false,
        otherGenderPreference: '',
      }}
      onSubmit={values => onSubmit(withoutEmptyStrings(values))}
      validationSchema={RegistrantSchema}
    >
      {({ handleSubmit, values, errors, touched }) => {
        const newProgress = calcProgress(values, errors);
        if (progressRef.current !== newProgress) {
          onProgressChange(newProgress);
          progressRef.current = newProgress;
        }

        return (
          <Form onSubmit={handleSubmit} noValidate>
            <VStack spacing={{ base: 8, lg: 8 }} alignItems='start'>
              {/*  PERSONAL INFORMATION SECTION */}
              <Text fontSize='lg' color='blackAlpha.600'>
                1. Personal Information
              </Text>
              <SimpleGrid
                w='full'
                columns={{ base: 1, lg: 2 }}
                gap={{ base: 8, lg: 4 }}
              >
                <FormControl
                  isRequired
                  isInvalid={!!errors.firstName && touched.firstName}
                >
                  <FormLabel htmlFor='firstName' fontSize='sm' mb={1}>
                    First name
                  </FormLabel>
                  <Field
                    as={Input}
                    id='firstName'
                    name='firstName'
                    type='text'
                    fontSize='sm'
                  />
                  <FormErrorMessage>{errors.firstName}</FormErrorMessage>
                </FormControl>
                <FormControl
                  isRequired
                  isInvalid={!!errors.lastName && touched.lastName}
                >
                  <FormLabel htmlFor='lastName' fontSize='sm' mb={1}>
                    Last name
                  </FormLabel>
                  <Field
                    as={Input}
                    id='lastName'
                    name='lastName'
                    type='text'
                    fontSize='sm'
                  />
                  <FormErrorMessage>{errors.lastName}</FormErrorMessage>
                </FormControl>
              </SimpleGrid>
              <FormControl
                isRequired
                isInvalid={!!errors.gender && touched.gender}
              >
                <Flex
                  mt={{ base: 0, lg: 2 }}
                  flexDirection={{ base: 'column', lg: 'row' }}
                >
                  <FormLabel
                    htmlFor='gender'
                    fontSize='sm'
                    mt={{ base: 0, lg: 2 }}
                    mb={1}
                    sx={{ whiteSpace: 'nowrap' }}
                  >
                    Gender
                  </FormLabel>
                  <Box w='full'>
                    <Field
                      as={Select}
                      id='gender'
                      name='gender'
                      placeholder='Select option'
                      fontSize='sm'
                    >
                      <option value='woman'>Woman</option>
                      <option value='man'>Man</option>
                      <option value='anotherGender'>
                        Another gender identity (e.g. non-binary, gender fluid,
                        two-spirit)
                      </option>
                    </Field>
                    <FormErrorMessage>{errors.gender}</FormErrorMessage>
                  </Box>
                </Flex>
              </FormControl>

              {/*  CONTACT INFORMATION SECTION */}
              <Text
                fontSize='lg'
                color='blackAlpha.600'
                pt={{ base: 12, lg: 8 }}
              >
                2. Contact Information
              </Text>
              <SimpleGrid
                w='full'
                columns={{ base: 1, lg: 2 }}
                gap={{ base: 8, lg: 4 }}
              >
                <FormControl
                  isRequired
                  isInvalid={!!errors.email && touched.email}
                >
                  <FormLabel htmlFor='email' fontSize='sm' mb={1}>
                    Email
                  </FormLabel>
                  <Field
                    as={Input}
                    id='email'
                    name='email'
                    type='text'
                    placeholder='human@email.com'
                    fontSize='sm'
                  />
                  <FormErrorMessage>{errors.email}</FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={!!errors.phoneNumber && touched.phoneNumber}
                >
                  <FormLabel htmlFor='phoneNumber' fontSize='sm' mb={1}>
                    Phone number
                  </FormLabel>
                  <Field
                    as={Input}
                    id='phoneNumber'
                    name='phoneNumber'
                    type='tel'
                    placeholder='(123) 456-7890'
                    fontSize='sm'
                  />
                  <FormErrorMessage>{errors.phoneNumber}</FormErrorMessage>
                </FormControl>
              </SimpleGrid>
              <SimpleGrid
                w='full'
                columns={{ base: 1, lg: 2 }}
                gap={{ base: 8, lg: 4 }}
              >
                <FormControl isInvalid={!!errors.country && touched.country}>
                  <FormLabel htmlFor='country' fontSize='sm' mb={1}>
                    Country
                  </FormLabel>
                  <Field
                    as={Select}
                    id='country'
                    name='country'
                    placeholder='Where are you?'
                    fontSize='sm'
                  >
                    {countriesOptions.map(option => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </Field>
                  <FormErrorMessage>{errors.country}</FormErrorMessage>
                </FormControl>
                <FormControl
                  isRequired
                  isInvalid={!!errors.timeZone && touched.timeZone}
                >
                  <FormLabel htmlFor='timeZone' fontSize='sm' mb={1}>
                    Time zone
                  </FormLabel>
                  <Field
                    as={Select}
                    id='timeZone'
                    name='timeZone'
                    placeholder='What time is it?'
                    fontSize='sm'
                  >
                    {timeZoneOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Field>
                  <FormErrorMessage>{errors.timeZone}</FormErrorMessage>
                </FormControl>
              </SimpleGrid>

              {/* EXPERIENCE SECTION */}
              <Text
                fontSize='lg'
                color='blackAlpha.600'
                pt={{ base: 12, lg: 8 }}
              >
                3. Experience
              </Text>
              <SimpleGrid
                w='full'
                columns={{ base: 1, lg: 2 }}
                gap={{ base: 8, lg: 4 }}
              >
                <FormControl
                  isInvalid={!!errors.companyName && touched.companyName}
                >
                  <FormLabel htmlFor='companyName' fontSize='sm' mb={1}>
                    Company name
                  </FormLabel>
                  <Field
                    as={Input}
                    id='companyName'
                    name='companyName'
                    type='text'
                    placeholder='Work, Inc.'
                    fontSize='sm'
                  />
                  <FormErrorMessage>{errors.companyName}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.jobTitle && touched.jobTitle}>
                  <FormLabel htmlFor='jobTitle' fontSize='sm' mb={1}>
                    Job title
                  </FormLabel>
                  <Field
                    as={Input}
                    id='jobTitle'
                    name='jobTitle'
                    type='text'
                    placeholder='What do you do?'
                    fontSize='sm'
                  />
                  <FormErrorMessage>{errors.jobTitle}</FormErrorMessage>
                </FormControl>
              </SimpleGrid>
              <FormControl
                isRequired
                isInvalid={
                  !!errors.yearsOfExperience && touched.yearsOfExperience
                }
              >
                <Flex mt={2}>
                  <FormLabel
                    htmlFor='yearsOfExperience'
                    fontSize='sm'
                    mt={2}
                    sx={{ whiteSpace: 'nowrap' }}
                  >
                    Years of experience
                  </FormLabel>
                  <Box w={{ base: 'full', lg: 'auto' }}>
                    <Field id='yearsOfExperience' name='yearsOfExperience'>
                      {/*  @ts-ignore */}
                      {({ field, form }) => (
                        <NumberInput
                          {...field}
                          onChange={years =>
                            form.setFieldValue(
                              field.name,
                              parseInt(years) >= 0 ? parseInt(years) : 0
                            )
                          }
                          min={0}
                          max={100}
                        >
                          <NumberInputField />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                      )}
                    </Field>
                    <FormErrorMessage>
                      {errors.yearsOfExperience}
                    </FormErrorMessage>
                  </Box>
                </Flex>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor='certifications' fontSize='sm' mb={1}>
                  Certifications
                </FormLabel>
                <Field id='certifications' name='certifications'>
                  {/*  @ts-ignore */}
                  {({ field, form }) => (
                    <CreatableSelect
                      {...field}
                      options={certifications.map(c => ({
                        label: c.attributes.name,
                        value: c.attributes.name,
                      }))}
                      onChange={(options: any) =>
                        form.setFieldValue(field.name, options)
                      }
                    />
                  )}
                </Field>
                <FormErrorMessage>{errors.certifications}</FormErrorMessage>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor='skills' fontSize='sm' mb={1}>
                  Skills
                </FormLabel>
                <Field id='skills' name='skills'>
                  {/*  @ts-ignore */}
                  {({ field, form }) => (
                    <CreatableSelect
                      {...field}
                      options={skills.map(s => ({
                        label: s.attributes.name,
                        value: s.attributes.name,
                      }))}
                      onChange={(options: any) =>
                        form.setFieldValue(field.name, options)
                      }
                    />
                  )}
                </Field>
                <FormErrorMessage>{errors.skills}</FormErrorMessage>
              </FormControl>

              {/* MENTEE/MENTOR PREFERENCES SECTION */}
              <Text
                fontSize='lg'
                color='blackAlpha.600'
                pt={{ base: 12, lg: 8 }}
              >
                4. {participantType === 'mentor' ? 'Mentee' : 'Mentor'}{' '}
                Preferences
              </Text>
              <FormControl
                isRequired
                isInvalid={
                  !!errors.isOpenToMultiple && touched.isOpenToMultiple
                }
                display='flex'
                flexDirection={{ base: 'column', lg: 'row' }}
                alignItems={{ base: 'start', lg: 'center' }}
              >
                <FormLabel htmlFor='isOpenToMultiple' fontSize='sm' mt={2}>
                  Open to multiple{' '}
                  {participantType === 'mentor' ? 'mentees' : 'mentors'}?
                </FormLabel>
                <Field
                  as={Switch}
                  id='isOpenToMultiple'
                  name='isOpenToMultiple'
                  colorScheme='palBlue'
                  size='lg'
                />
              </FormControl>
              <FormControl
                isRequired
                isInvalid={
                  !!errors.otherGenderPreference &&
                  touched.otherGenderPreference
                }
                pb={8}
              >
                <Flex
                  mt={{ base: 0, lg: 2 }}
                  flexDirection={{ base: 'column', lg: 'row' }}
                >
                  <FormLabel
                    htmlFor='otherGenderPreference'
                    fontSize='sm'
                    mt={{ base: 0, lg: 2 }}
                    mb={1}
                    sx={{ whiteSpace: 'nowrap' }}
                  >
                    Gender preference of{' '}
                    {participantType === 'mentor' ? 'mentee' : 'mentor'}?
                  </FormLabel>
                  <Box w='full'>
                    <Field
                      as={Select}
                      id='otherGenderPreference'
                      name='otherGenderPreference'
                      placeholder='Select option'
                      fontSize='sm'
                    >
                      <option value='any'>No preference</option>
                      <option value='woman'>Woman</option>
                      <option value='man'>Man</option>
                      <option value='anotherGender'>
                        Another gender identity (e.g. non-binary, gender fluid,
                        two-spirit)
                      </option>
                    </Field>
                    <FormErrorMessage>
                      {errors.otherGenderPreference}
                    </FormErrorMessage>
                  </Box>
                </Flex>
              </FormControl>

              <Button
                type='submit'
                isLoading={isLoading}
                loadingText='Submitting'
                colorScheme='palBlue'
              >
                Submit application
              </Button>
            </VStack>
          </Form>
        );
      }}
    </Formik>
  );
};

export default RegisterEventForm;