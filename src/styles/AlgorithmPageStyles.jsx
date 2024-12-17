import styled from 'styled-components';

export const Container = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

export const Title = styled.h2`
  color: ${props => props.theme.colors.text};
  margin-bottom: 1rem;
`;

export const LoadingSpinner = styled.div`
  text-align: center;
  padding: 2rem;
  color: ${props => props.theme.colors.text};
`;

export const ErrorMessage = styled.div`
  color: ${props => props.theme.colors.error};
  padding: 1rem;
  background: ${props => props.theme.colors.errorBackground};
  border-radius: 4px;
  margin-bottom: 1rem;
`;

