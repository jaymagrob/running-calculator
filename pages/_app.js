import Layout from '../components/layout'
import TagManager from "react-gtm-module"
import { useEffect } from 'react'
import '../styles/globals.scss'

export default function App({ Component, pageProps }) {
  useEffect(() => {
    TagManager.initialize({id: 'GTM-5D3WFXG'})
  });

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}