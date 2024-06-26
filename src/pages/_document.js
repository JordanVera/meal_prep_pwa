// src/pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="manifest" href="/manifest.json" />
          <link rel="icon" href="/favicon.ico" />
          <meta name="theme-color" content="#000000" />
          <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        </Head>
        <body>
          <Main />
          <NextScript />
          {/* <script async src="/service-worker.js"></script> */}
        </body>
      </Html>
    );
  }
}

export default MyDocument;
