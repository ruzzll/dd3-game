import Head from 'next/head'
import type { AppProps } from 'next/app'

import { store } from '@/store'
import { Provider } from 'react-redux'

import '../../styles/globals.css'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <Head>
        <title>DD3-game</title>
        <meta
          name='description'
          content='DD3-game is a React app built with Tailwind CSS and TypeScript.'
        />
        <meta name='keywords' content='dd3-game, react, tailwind, typescript' />
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>
      <Component {...pageProps} />
    </Provider>

  )
}

export default App
