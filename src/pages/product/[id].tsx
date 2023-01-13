// -> Import do NextJS
import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import Head from 'next/head';

// -> Import da lib exeterna do Stripe
import Stripe from 'stripe';
import { stripe } from '../../lib/stripe';

// -> Import do CSS
import { ProductContainer, ImageContainer, ProductDetails } from '../../styles/pages/product';
import axios from 'axios';
import { useState } from 'react';

interface ProductProps {
  product: {
    id: string;
    name: string;
    imageURL: string;
    price: string;
    description: string;
    defaultPriceID: string;
  }
}

export default function Product({ product }: ProductProps) {
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false);

  async function handleByProduct() {
    setIsCreatingCheckoutSession(true);

    try {
      const response = await axios.post('/api/checkout', {
        priceID: product.defaultPriceID
      });
      
      const { checkoutURL } = response.data;

      window.location.href = checkoutURL;
    
    } catch (error) {
      setIsCreatingCheckoutSession(false);
      alert('Falha ao redirecionar ao checkout');
    }
  }

  return (
    <>
      <Head>
        <title> {product.name} | Ignite Shope </title>
      </Head>
    
      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageURL} width={520} height={480} alt=''/>
        </ImageContainer>

        <ProductDetails>
          <h1> {product.name} </h1>
          <span> {product.price} </span>
          <p> {product.description} </p>
          <button type='button' onClick={handleByProduct} disabled={isCreatingCheckoutSession}> 
          Comprar agora
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
    
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { id: '' } }
    ],
    fallback: 'blocking'
  };
};

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }: any) => {
  const productID = params.id;  

  const product = await stripe.products.retrieve(productID, {
    expand: ['default_price']
  });
  
  const price = product.default_price as Stripe.Price;

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageURL: product.images[0],
        price: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format(price.unit_amount! / 100),
        description: product.description,
        defaultPriceID: price.id
      }
    },
    revalidate: 60 * 60 * 2 // 2 hours
  };
};