import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head title='CodesWear - Wear the Code'>
        <meta name='description' content='CodesWear.com Wear the Code' />
        <meta property='og:title' name='CodesWear- Wear the Code' content='CodesWear.com Wear the Code' />
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
