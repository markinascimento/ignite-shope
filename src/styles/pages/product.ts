import { styled } from '..';

export const ProductContainer = styled('main', {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  width: '100%',
  maxWidth: 1180,
  alignItems: 'stretch',
  gap: '3rem',
  margin: '0 auto'
});

export const ImageContainer = styled('div', {
  display: 'flex',
  width: '100%',
  maxWidth: 576,
  height: 'calc(656px - 0.5rem)',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 8,
  padding: '0.25rem',
  background: 'linear-gradient(100deg, #1ea483 0%, #7465d4 100%)',

  img: {
    objectFit: 'cover'
  }
});

export const ProductDetails = styled('div', {
  display: 'flex',
  flexDirection: 'column',

  h1: {
    fontSize: '2rem',
    color: '$gray300'
  },

  span: {
    marginTop: '1rem',
    display: 'block',
    fontSize: '1.5rem', 
    fontWeight: 'bold',
    color: '$green300'
  },

  p: {
    marginTop: '2.5rem',
    fontSize: '1.125rem',
    lineHeight: 1.6,
    color: '$gray300'
  },

  button: {
    marginTop: 'auto',
    background: '$green500',
    border: 0,
    color: '$white',
    borderRadius: 8,
    padding: '1.25rem',
    cursor: 'pointer',
    fontSize: '1.125rem',
    fontWeight: 'bold',

    '&:disabeld': {
      opacity: 0.6,
      cursor: 'not-allowed'
    },

    '&:note(:disabeld):hover': {
      background: '$green300',
      transition: 'all .2s ease-in-out'
    }
  }
});