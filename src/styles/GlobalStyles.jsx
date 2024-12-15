import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
    font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif;
    line-height: 1.5;
  }

  h1, h2, h3, h4, h5, h6 {
    color: ${props => props.theme.colors.text};
    margin-bottom: 1rem;
  }

  a {
    color: ${props => props.theme.colors.secondary};
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }

  button {
    cursor: pointer;
    font-family: inherit;
  }

  input, textarea, select {
    font-family: inherit;
    font-size: 1rem;
    padding: 0.5rem;
    border: 1px solid ${props => props.theme.colors.gray300};
    border-radius: 4px;
    
    &:focus {
      outline: none;
      border-color: ${props => props.theme.colors.primary};
    }
  }

  ::placeholder {
    color: ${props => props.theme.colors.gray500};
  }

  // 스크롤바 스타일링
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${props => props.theme.colors.background};
  }

  ::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.primary};
    border-radius: 4px;
  }
`;