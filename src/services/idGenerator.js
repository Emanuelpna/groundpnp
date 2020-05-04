const idGenerator = (() => {
  let id = 1;

  return {
    newID: () => id++,
  };
})();
