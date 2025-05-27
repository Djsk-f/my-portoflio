'use client';

import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { ReactNode } from "react";

const theme = extendTheme({
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
});

type Props = {
  children: ReactNode;
};

export default function ProviderChakra({ children }: Props) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}