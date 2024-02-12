const History = {
    navigate: null,
    push: (page, ...rest) => History.navigate(page, ...rest),
    back: () => History.navigate(-1),
    reset: () => window.location.reload(),
  };
  
  export default History;