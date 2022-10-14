export const classificatesMock = Array(5)
  .fill(null)
  .map((e) => ({
    id: Math.floor(Math.random() * 1000000),
    title: "Classificado " + Math.floor(Math.random() * 1000),
    image: "https://picsum.photos/250/200?random="+Math.floor(Math.random() * 1000),
  }));
