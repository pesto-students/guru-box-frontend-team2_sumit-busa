import { Button as ChakraButton } from '@chakra-ui/react';
import NextLink from 'next/link';

import type { ReactNode, ReactElement, JSXElementConstructor } from 'react';

type Props = {
  children: ReactNode;
  to: string;
  size?: 'lg' | 'md' | 'sm' | 'xs';
  outline?: boolean;
  icon?: ReactElement<any, string | JSXElementConstructor<any>> | undefined;
  sx?: any;
};

const ButtonLink = ({
  children,
  to,
  size = 'sm',
  outline = false,
  icon,
  sx,
}: Props) => (
  <NextLink href={to} passHref>
    <ChakraButton
      as='a'
      size={size}
      leftIcon={icon}
      sx={{
        ':hover': {
          color: outline ? 'blackAlpha' : 'white',
        },
        ...sx,
      }}
      colorScheme={outline ? 'blackAlpha' : 'palBlue'}
      variant={outline ? 'outline' : 'solid'}
      _hover={outline ? { color: 'palBlue.500' } : undefined}
      _focus={outline ? { color: 'palBlue.500' } : undefined}
    >
      {children}
    </ChakraButton>
  </NextLink>
);

export default ButtonLink;