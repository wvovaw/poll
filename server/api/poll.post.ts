export default eventHandler((event) => {
  const vote = Math.random() > 0.5 ? "fw" : "lib";
  const storage = useStorage("poll");
  // increment fw or lib in storage
  return;
});
