// -> Import do NextJS
import type { AppProps } from 'next/app';

// -> Import do CSS Global
import { globalStyles } from '../styles/global';

// -> Import do CSS
import { Container, Header } from '../styles/pages/app';

// -> Import das images
import logoImg from '../assets/logo.svg';

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header>
        <img src={logoImg.src} alt="" />
      </Header>

      <Component {...pageProps} />
    </Container> 
  );
}
