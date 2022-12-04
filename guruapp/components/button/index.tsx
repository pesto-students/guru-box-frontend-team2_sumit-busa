import { Button as ChakraButton } from "@chakra-ui/react";

import type {
  ReactNode,
  ReactElement,
  JSXElementConstructor,
  MouseEventHandler,
} from 'react';

type Props = {
  children: ReactNode;
  size?: 'lg' | 'md' | 'sm' | 'xs';
  outline?: boolean;
  icon?: ReactElement<any, string | JSXElementConstructor<any>> | undefined;
  type?: 'button' | 'submit' | 'reset' | undefined;
  isLoading?: boolean;
  loadingText?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  sx?: any;
};

const Button = ({
  children,
  size = 'sm',
  outline = false,
  icon,
  type = 'button',
  isLoading,
  loadingText,
  onClick = () => {},
  sx,
}: Props) => (
  <ChakraButton
    size={size}
    leftIcon={icon}
    type={type}
    isLoading={isLoading}
    loadingText={loadingText}
    onClick={onClick}
    sx={sx}
    colorScheme={outline ? 'blackAlpha' : 'palBlue'}
    variant={outline ? 'outline' : 'solid'}
    _hover={outline ? { color: 'palBlue.500' } : undefined}
    _focus={outline ? { color: 'palBlue.500' } : undefined}
  >
    {children}
  </ChakraButton>
);

export default Button;