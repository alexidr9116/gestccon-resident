export const informativesMock = Array(5)
  .fill(null)
  .map((e) => ({
    id: Math.floor(Math.random() * 1000000),
    title: "Informativo " + Math.floor(Math.random() * 1000),
    image: "https://picsum.photos/200/150?random="+Math.floor(Math.random() * 1000),
  }));
