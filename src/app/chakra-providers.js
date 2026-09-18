'use client'

import { useState, useEffect } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const theme = extendTheme({
  config: {
    // Prevents Chakra from applying its CSSReset
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  styles: {
    global: {
      // Keep Tailwind happy by NOT resetting base styles
      'html, body': {
        fontFamily: 'inherit',
        margin: 0,
        padding: 0,
      },
    },
  },
});

export default function Providers({ children }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <ChakraProvider resetCSS={false}>
      {mounted && <ToastContainer position="top-right" autoClose={4000} />}
      {children}
    </ChakraProvider>
  )
}
