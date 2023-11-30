
import './globals.css'

import { ThemeProvider } from 'next-themes';
import { Component } from 'react'
export default function MyApp({Component, pageProps}) {
  return (
    <ThemeProvider enableSystem={true} attribute="class">
      <Component { ... pageProps} />
    </ThemeProvider>
  )
}
