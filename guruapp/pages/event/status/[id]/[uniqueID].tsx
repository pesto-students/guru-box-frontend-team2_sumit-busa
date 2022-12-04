import {
    ScaleFade,
    Container,
    Flex,
    Box,
    SimpleGrid,
    Divider,
    Heading,
    Text,
    Badge,
  } from '@chakra-ui/react';
  import { EmailIcon, PhoneIcon, LinkIcon } from '@chakra-ui/icons';
  import Lottie from 'lottie-react';
  
  import ButtonLink from 'components/buttonLink';
  
  import humanMorph from 'assets/humanMorph.json';
  
  import strapi, { createHeaders } from 'utils/request/strapi';
  
  import type { NextPage, NextPageContext } from 'next';
  
  type Props = {
    bestMatch: {
      firstName: string;
      lastName: string;
      gender: string;
      email: string;
      phoneNumber?: string;
      timeZone: string;
      country?: string;
      companyName?: string;
      jobTitle?: string;
      yearsOfExperience: number;
      certifications: string[];
      skills: string[];
    };
  };
  
  const cardTopGradient =
    'linear-gradient(156deg, rgba(227,247,253,1) 0%, rgba(255,245,219,1) 35%, rgba(227,247,253,1) 85%, rgba(255,245,219,1) 100%)';
  
  const colorSchemes = [
    'red',
    'linkedin',
    'yellow',
    'green',
    'teal',
    'blue',
    'cyan',
    'purple',
    'twitter',
    'pink',
    'facebook',
    'orange',
    'messenger',
    'whatsapp',
    'telegram',
  ];
  
  const getCircularColorScheme = (i: number) => {
    const circularIndex =
      i >= 0
        ? i % colorSchemes.length
        : colorSchemes.length - (Math.abs(i) % colorSchemes.length);
    return colorSchemes[circularIndex];
  };
  
  const MatchStatus: NextPage<Props> = ({ bestMatch }) => {
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      timeZone,
      country,
      companyName,
      jobTitle,
      yearsOfExperience,
      certifications,
      skills,
    } = bestMatch;
  
    return (
      <ScaleFade in initialScale={0.7}>
        <Container
          py={{ base: 12, lg: 20 }}
          maxW={{ base: '100%', lg: '2xl' }}
          minHeight='100vh'
        >
          <Heading as='p'>
            Congrats!
            <br />
            Meet your new mentor:
          </Heading>
          <Divider my={8} />
          <Box>
            <Box
              height={{ base: '8rem', lg: '10rem' }}
              borderTopLeftRadius='3rem'
              bg={cardTopGradient}
            />
            <Flex
              flexDirection={{ base: 'column', lg: 'row' }}
              textAlign={{ base: 'center', lg: 'left' }}
              alignItems={{ base: 'center', lg: 'start' }}
            >
              <Box
                ml={{ base: 0, lg: 7 }}
                w='8rem'
                sx={{
                  bg: 'white',
                  borderRadius: '50%',
                  borderWidth: 4,
                  borderStyle: 'solid',
                  borderColor: 'white',
                  boxShadow: '0 0.2rem 0.5rem 0.05rem #eee',
                  position: 'relative',
                  top: -8,
                }}
              >
                <Lottie animationData={humanMorph} loop />
              </Box>
              <Box ml={{ base: 0, lg: 4 }} mt={{ base: 0, lg: 6 }}>
                <Heading as='p' fontSize='2xl' fontWeight={600}>
                  Hi, my name is {firstName} {lastName}
                </Heading>
                {jobTitle || companyName ? (
                  <Text mt={1} color='blackAlpha.700'>
                    {jobTitle || ''}
                    {jobTitle && companyName ? ' at ' : null}
                    {companyName || ''}
                  </Text>
                ) : null}
              </Box>
            </Flex>
  
            <Text color='blackAlpha.700' mt={{ base: 14, lg: 0 }} mb={6}>
              You can contact me by:
            </Text>
            <SimpleGrid columns={{ base: 1, lg: 2 }} gap={4}>
              <Text fontWeight={600}>Email</Text>
              <ButtonLink
                to={`mailto:${email}`}
                icon={<EmailIcon fontSize='xl' />}
              >
                {email}
              </ButtonLink>
            </SimpleGrid>
            <Divider my={4} />
            <SimpleGrid columns={{ base: 1, lg: 2 }} gap={4}>
              <Text fontWeight={600}>Google Meet</Text>
              <ButtonLink
                to={`"https://meet.google.com/uxo-bkxp-ymx"`}
                icon={<LinkIcon fontSize='xl' />}
              >
              </ButtonLink>
            </SimpleGrid>
            <Divider my={4} />
            {phoneNumber ? (
              <>
                <SimpleGrid columns={{ base: 1, lg: 2 }} gap={4}>
                  <Text fontWeight={600}>Phone</Text>
                  <ButtonLink
                    to={`tel:${phoneNumber}`}
                    icon={<PhoneIcon fontSize='xl' />}
                  >
                    {phoneNumber}
                  </ButtonLink>
                </SimpleGrid>
                <Divider my={4} />
              </>
            ) : null}
  
            <Text color='blackAlpha.700' mt={{ base: 14, lg: 16 }} mb={6}>
              Where I call home:
            </Text>
            {country ? (
              <>
                <SimpleGrid columns={{ base: 1, lg: 2 }} gap={4}>
                  <Text fontWeight={600}>Country</Text>
                  <Text fontSize='sm'>{country}</Text>
                </SimpleGrid>
                <Divider my={4} />
              </>
            ) : null}
            <SimpleGrid columns={{ base: 1, lg: 2 }} gap={4}>
              <Text fontWeight={600}>Time Zone</Text>
              <Text fontSize='sm'>{timeZone.replace(/_/g, ' ')}</Text>
            </SimpleGrid>
            <Divider my={4} />
  
            <Text color='blackAlpha.700' mt={{ base: 14, lg: 16 }} mb={6}>
              A bit about me:
            </Text>
            <SimpleGrid columns={{ base: 1, lg: 2 }} gap={4}>
              <Text fontWeight={600}>Years of Experience</Text>
              <Text fontSize='sm'>
                {yearsOfExperience} year{yearsOfExperience !== 1 ? 's' : ''} in
                the industry
              </Text>
            </SimpleGrid>
            <Divider my={4} />
            {certifications.length ? (
              <>
                <SimpleGrid columns={{ base: 1, lg: 2 }} gap={4}>
                  <Text fontWeight={600}>Certifications</Text>
                  <Text>
                    {certifications.map((c, i) => (
                      <Badge
                        key={c}
                        colorScheme={getCircularColorScheme(i)}
                        ml={i !== 0 ? 2 : 0}
                        textTransform='none'
                      >
                        {c}
                      </Badge>
                    ))}
                  </Text>
                </SimpleGrid>
                <Divider my={4} />
              </>
            ) : null}
            {skills.length ? (
              <>
                <SimpleGrid columns={{ base: 1, lg: 2 }} gap={4}>
                  <Text fontWeight={600}>Skills</Text>
                  <Text>
                    {skills.map((c, i) => (
                      <Badge
                        key={c}
                        colorScheme={getCircularColorScheme(-1 - i)}
                        ml={i !== 0 ? 2 : 0}
                        textTransform='none'
                      >
                        {c}
                      </Badge>
                    ))}
                  </Text>
                </SimpleGrid>
                <Divider my={4} />
              </>
            ) : null}
          </Box>
        </Container>
      </ScaleFade>
    );
  };
  
  export default MatchStatus;
  
  export const getServerSideProps = async (context: NextPageContext) => {
    const { id, uniqueID } = context.query;
    const headers = createHeaders(context);
  
    try {
      const {
        data: { data: matchData },
      } = await strapi.get('/top-results', {
        headers,
        data: {
          data: {
            id,
            uniqueID,
          },
        },
      });
  
      if (matchData?.length) {
        const bestMatchId = matchData[0].attributes.matches[0]?.mentorID;
        const {
          data: {
            data: { attributes: bestMatchData },
          },
        } = await strapi.get(
          `/members/${bestMatchId}?populate[0]=emails&populate[1]=certifications&populate[2]=skills`,
          {
            headers,
          }
        );
        const bestMatch = {
          ...bestMatchData,
          email: bestMatchData.emails.data[0]?.attributes.value,
          certifications: bestMatchData.certifications.data.map(
            (c: any) => c.attributes.name
          ),
          skills: bestMatchData.skills.data.map((s: any) => s.attributes.name),
        };
  
        return { props: { bestMatch } };
      }
    } catch (error) {
      console.log(error); // for tracking issues
    }
  
    // Something went wrong during data fetching, and the data is needed, so redirect to home page
    return {
      redirect: {
        destination: '/',
      },
    };
  };