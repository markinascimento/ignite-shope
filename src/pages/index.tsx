// -> Import do NextJS
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';

import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';

// -> Import do CSS
import { HomeContainer, Product } from '../styles/pages/home';


import { stripe } from '../lib/stripe';
import Stripe from 'stripe';
import { GetStaticPaths, GetStaticProps } from 'next';

interface HomeProps {
  products: {
    id: string;
    name: string;
    imageURL: string;
    price: string;
  }[]
}

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 2,
      spacing: 48, 
    }
  });

  return (
    <>
      <Head>
        <title> Home | Ignite Shope </title>
      </Head>

      <HomeContainer ref={sliderRef} className="keen-slider">      
        {products.map((product) => (
          <Link id={product.id} href={`/product/${product.id}`} prefetch={false}>
            <Product id={product.id} className='keen-slider__slide'>
              <Image src={product.imageURL} width={520} height={480} alt="" />
              <footer>
                <strong> {product.name} </strong>
                <span> {product.price} </span>
              </footer>
            </Product>
          </Link>
        ))}
      </HomeContainer>
    </>
  );
}

export const getStaticPahts: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { id: '' } }
    ],
    fallback: true
  };
};

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  });

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price;
    
    return {
      id: product.id,
      name: product.name,
      imageURL: product.images[0],
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(price.unit_amount! / 100)
    };    
  });
  console.log(products);
  return {
    props: {
      products
    },
    revalidate: 60 * 60 * 2 // -> 2 hours
  };
};