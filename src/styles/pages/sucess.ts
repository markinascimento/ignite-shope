import { styled } from '..';

export const SucessContainer = styled('main', {
  display: 'flex',
  flexDirection: 'column',
  height: 656,
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto',
  
  h1: {
    fontSize: '2rem',
    color: '$gray300',
    marginBottom: '1rem'
  },

  p: {
    fontSize: '1.125rem',
    color: '$gray100',
    maxWidth: 480,
    textAlign: 'center',
    marginTop: '2rem'
  },

  a: {
    display: 'block',
    marginTop: '5rem',
    color: '$green500',
    fontSize: '1.125rem',
    lineHeight: 1.6,
    
    '&:hover': {
      color: '$green300',
      transition: 'all .2s ease-in-out'
    }
  },
});

export const ImageContainer = styled('div', {
  width: '100%',
  maxWidth: 210,
  height: 230,
  background: 'linear-gradient(100deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,
  padding: '0.25rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'cente',

  img: {
    objectFit: 'cover',
  }
});