import Head from 'next/head';

// -> Import do CSS
import { ImageContainer, SucessContainer } from '../styles/pages/sucess';
import Image from 'next/image';
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import { stripe } from '../lib/stripe';
import Stripe from 'stripe';

interface SucessProps {
  customerName: string;
  product: {
    name: string;
    imageURL: string;
  }
}

export default function Sucess({ customerName, product }: SucessProps) {
  return (
    <> 
      <Head>
        <title> Compra efetuada | Ignite Shope </title>
        <meta name="robots" content='noindex' />
      </Head>
    
      <SucessContainer>
        <h1> Compra efetuada com sucesso! </h1>

        <ImageContainer>
          <Image src={product.imageURL} width={220} height={200} alt=""/>
        </ImageContainer>

        <p> 
        Uhuul, <strong> {customerName} </strong>, sua <strong> {product.name} </strong> já está a caminho da sua casa. 
        </p>

        <Link href='/'>
        Voltar ao catálogo
        </Link>
      </SucessContainer>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {  
  if (!query.session_id) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }

  const sessionID = String(query.session_id);

  const session = await stripe.checkout.sessions.retrieve(sessionID, {
    expand: ['line_items', 'line_items.data.price.product']
  });

  const customerName = session.customer_details?.name;
  const product = session.line_items?.data[0].price?.product as Stripe.Product;

  console.log({ customerName });
  console.log({ product });

  return {
    props: {
      customerName,
      product: {
        name: product.name,
        imageURL: product.images[0]
      }
    }
  }; 
};
