export const theme = {
  colors: {
    background: '#FFF0DC',  // 밝은 베이지
    primary: '#F0BB78',     // 골드
    secondary: '#543A14',   // 브라운
    text: '#131010',        // 다크
    primaryLight: '#F4CC97',
    primaryDark: '#E5A55D',
    backgroundDark: '#F4E0C7',
    
    errorBackground: '#fee2e2',
    error: '#dc3545',
    success: '#28a745',
    warning: '#ffc107',

  },
  
  // 자주 사용되는 스타일 믹스인
  mixins: {
    flexCenter: `
      display: flex;
      justify-content: center;
      align-items: center;
    `,
    card: `
      background: white;
      border-radius: 10px;
      padding: 1.5rem;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    `,
  }
}; 