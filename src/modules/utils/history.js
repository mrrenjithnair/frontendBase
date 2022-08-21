const History = {
    navigate: null,
    push: (page, ...rest) => History.navigate(page, ...rest),
    back: null,
  };
  
  export default History;