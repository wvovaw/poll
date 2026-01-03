export default defineEventHandler(async (event) => {
  const storage = useStorage("poll");
  let poll = await storage.getItem("poll");
  if (!poll) {
    poll = { lib: 0, fw: 0 };
    await storage.setItem("poll", poll);
  }
  return poll;
});
