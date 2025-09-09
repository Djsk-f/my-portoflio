"use client"

import type { TextProps } from "@chakra-ui/react"
import { Text, Button, Select, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react"
import { ThemeProvider, useTheme } from "next-themes"
import type { ThemeProviderProps } from "next-themes"
import * as React from "react"
import { LuMoon, LuSun } from "react-icons/lu"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

// ---------------- PROVIDER ----------------
export interface ColorModeProviderProps extends ThemeProviderProps { }

export function ColorModeProvider(props: ColorModeProviderProps) {
  return (
    <ThemeProvider attribute="class" disableTransitionOnChange {...props} />
  )
}

// ---------------- HOOKS ----------------
export type ColorMode = "light" | "dark"

export interface UseColorModeReturn {
  colorMode: ColorMode
  setColorMode: (colorMode: ColorMode) => void
  toggleColorMode: () => void
}

export function useColorMode(): UseColorModeReturn {
  const { resolvedTheme, setTheme } = useTheme()
  const toggleColorMode = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }
  return {
    colorMode: resolvedTheme as ColorMode,
    setColorMode: setTheme,
    toggleColorMode,
  }
}

export function useColorModeValue<T>(light: T, dark: T) {
  const { colorMode } = useColorMode()
  return colorMode === "dark" ? dark : light
}

// ---------------- ICON ----------------
export function ColorModeIcon() {
  const { colorMode } = useColorMode()
  return colorMode === "dark" ? <LuMoon /> : <LuSun />
}

// ---------------- SELECT (DARK/LIGHT) ----------------
const MotionSelect = motion(Select)

export function ThemeToggleSelect({ isScrolled }: { isScrolled: boolean }) {
  const { colorMode, setColorMode } = useColorMode()

  return (
    <ClientOnly>
      <Menu>
        <MenuButton as={Button} 
        variant="outline"
        border={"none"}
        >
          {colorMode === "light" ? <LuSun color="white" /> : <LuMoon color="white" />}
        </MenuButton>
        <MenuList>
          <MenuItem color="black" icon={<LuSun />} onClick={() => setColorMode("light")}>
            Light
          </MenuItem>
          <MenuItem color="black" icon={<LuMoon />} onClick={() => setColorMode("dark")}>
            Dark
          </MenuItem>
        </MenuList>
      </Menu>
    </ClientOnly>
  )
}

// ---------------- LIGHT/DARK WRAPPERS ----------------
export const LightMode = React.forwardRef<HTMLElement, TextProps>(
  function LightMode(props, ref) {
    return (
      <Text
        color="fg"
        display="contents"
        className="chakra-theme light"
        colorPalette="gray"
        colorScheme="light"
        ref={ref}
        {...props}
      />
    )
  },
)

export const DarkMode = React.forwardRef<HTMLElement, TextProps>(
  function DarkMode(props, ref) {
    return (
      <Text
        color="fg"
        display="contents"
        className="chakra-theme dark"
        colorPalette="gray"
        colorScheme="dark"
        ref={ref}
        {...props}
      />
    )
  },
)

// ---------------- CLIENT ONLY ----------------
export default function ClientOnly({
  children,
  fallback = null,
}: {
  children: React.ReactNode
  fallback?: React.ReactNode
}) {
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) return <>{fallback}</>

  return <>{children}</>
}
