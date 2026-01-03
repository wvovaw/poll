export default eventHandler((event) => {
  const storage = useStorage("poll");
  // return current poll state
  return {
    lib: 10,
    fw: 12,
  };
});
