import { addDays, format, subDays } from "date-fns";
import { faker } from "@faker-js/faker";

const ambients = [
  {
    name: "Churrasqueira do Bloco 1",
    book_type: "day",
    id: 10,
    image:
      "https://s2.glbimg.com/yHwcwGJABsWOGtRpGpSSpNvHJtQ=/0x0:1800x1080/924x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2018/W/l/1ydP32SMuECxECL23oHw/village-park-churrasqueira.jpg",
  },
  {
    name: "Piscina Principal",
    book_type: "hour",
    id: 11,
    image:
      "https://mapa-da-obra-producao.s3.amazonaws.com/wp-content/uploads/2018/10/piscina-de-predio.jpg",
  },
  {
    name: "Quadra de Futsal",
    book_type: "day",
    id: 12,
    image:
      "https://backend-live.apto.vc/wp-content/uploads/2015/04/caminhos-lapa-projeto-15.jpg",
  },
  {
    name: "Quadra de Tênis",
    book_type: "hour",
    id: 13,
    image:
      "https://i.pinimg.com/originals/ad/d7/17/add717cc8b2edbea72fbf44a48833da2.png",
  },
];

// export const ambientsMock: Ambient[] = ambients.map((el, i) => ({
//   id: el.id,
//   location: el.name,
//   availableInitialHour: "09:00",
//   image: el.image,
//   availableFinalHour: "22:00",
//   cancelation: "24h",
//   capacity: "30",
//   tax: "150",
//   book_type: el.book_type as "hour" | "day",
//   reservations:
//     el.book_type === "day"
//       ? [
//           {
//             id: Math.floor(Math.random() * 5000).toString(),
//             book_date: format(addDays(new Date(), 1), "yyyy-MM-dd"),
//             initial_book_period:
//               format(addDays(new Date(), 1), "yyyy-MM-dd") + "T00:00:00",
//             final_book_period:
//               format(addDays(new Date(), 1), "yyyy-MM-dd") + "T23:59:59",
//             guests: [],
//             id_user: 398857,
//           },
//         ]
//       : [
//           {
//             id: Math.floor(Math.random() * 5000).toString(),
//             book_date: format(addDays(new Date(), 2), "yyyy-MM-dd"),
//             initial_book_period:
//               format(addDays(new Date(), 2), "yyyy-MM-dd") + "T10:00:00",
//             final_book_period:
//               format(addDays(new Date(), 2), "yyyy-MM-dd") + "T11:00:00",
//             guests: [],
//             id_user: 398857,
//           },
//           {
//             id: Math.floor(Math.random() * 5000).toString(),
//             book_date: format(addDays(new Date(), 2), "yyyy-MM-dd"),
//             initial_book_period:
//               format(addDays(new Date(), 2), "yyyy-MM-dd") + "T17:00:00",
//             final_book_period:
//               format(addDays(new Date(), 2), "yyyy-MM-dd") + "T18:00:00",
//             guests: [],
//             id_user: 398857,
//           },
//         ],
// }));

export const assemblyMock = () => {
  return [
    {
      id: Math.floor(Math.random() * 5000).toString(),
      initialDate: format(Date.now(), "yyyy-MM-dd"),
      finalDate: format(addDays(Date.now(), 2), "yyyy-MM-dd"),
      meetup_link: "",
      status: "open",
      name: "Assembléia Extraordinária",
      verification_type: "Online",
      guidelines_items: [
        {
          id: Math.floor(Math.random() * 5000).toString(),
          type: "radio",
          attachments: [],
          items: [
            {
              name: "seg0122",
              label: "SIM",
              value: "SIM",
              count: 30,
            },
            {
              name: "seg0122",
              label: "NÃO",
              value: "NAO",
              count: 70,
            },
          ],
          title: "Deseja trocar o serviço de segurança?",
        },
        {
          id: Math.floor(Math.random() * 5000).toString(),
          type: "radio",
          attachments: [],
          items: [
            {
              name: "water0238",
              label: "SIM",
              value: "SIM",
              count: 30,
            },
            {
              name: "water0238",
              label: "NÃO",
              value: "NAO",
              count: 70,
            },
          ],
          title: "Você concorda com a mudança no critério de cobrança da água?",
        },
      ],
    },
    {
      id: Math.floor(Math.random() * 5000).toString(),
      initialDate: format(subDays(Date.now(), 3), "yyyy-MM-dd"),
      finalDate: format(subDays(Date.now(), 2), "yyyy-MM-dd"),
      meetup_link: "",
      status: "closed",
      name: "Assembléia Extraordinária",
      verification_type: "Online",
      guidelines_items: [
        {
          id: Math.floor(Math.random() * 5000).toString(),
          type: "radio",
          attachments: [],
          items: [
            {
              name: "item1",
              label: "SIM",
              value: "SIM",
              count: 30,
            },
            {
              name: "item1",
              label: "NÃO",
              value: "NAO",
              count: 70,
            },
          ],
          title: "Deseja trocar o serviço de segurança?",
        },
        {
          id: Math.floor(Math.random() * 5000).toString(),
          type: "radio",
          attachments: [],
          items: [
            {
              name: "item2",
              label: "SIM",
              value: "SIM",
              count: 30,
            },
            {
              name: "item2",
              label: "NÃO",
              value: "NAO",
              count: 70,
            },
          ],
          title: "Você concorda com a mudança no critério de cobrança da água?",
        },
      ],
    },
  ];
};

export const familyMock = () => {
  return [
    {
      id: Math.floor(Math.random() * 5000).toString(),
      email: "email@email.com",
      name: "Alice",
      photo: "/assets/img/sample/photo/1.jpg",
      relationship: "Cônjuge",
    },
    {
      id: Math.floor(Math.random() * 5000).toString(),
      email: "email@email.com",
      name: "Pedro",
      photo: "/assets/img/sample/photo/1.jpg",
      relationship: "Filho",
    },
    {
      id: Math.floor(Math.random() * 5000).toString(),
      email: "email@email.com",
      name: "Bianca",
      photo: "/assets/img/sample/photo/1.jpg",
      relationship: "Filho",
    },
  ];
};

export const classificatesMock = () => {
  const titles = [""];
  faker.setLocale("pt_BR");
  return new Array(3).fill(null).map((_, i) => ({
    id: Math.floor(Math.random() * 5000).toString(),
    id_user: Math.floor(Math.random() * 5000).toString(),
    description: faker.lorem.lines(15),
    images: [faker.image.imageUrl(600, 400, undefined, true)],
    title: "Classificado " + (i + 1),
  }));
};

export const informativesMock = Array(5)
  .fill(null)
  .map((e, i) => ({
    id: i + 1,
    title: "Informativo " + Math.floor(Math.random() * 1000),
    image: "https://picsum.photos/200/150?random="+Math.floor(Math.random() * 1000),
  }));
