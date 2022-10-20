import { Store } from "pullstate";

import {
  assemblyMock,
  classificatesMock,
  familyMock,
  informativesMock,
} from "../app/data/mocks";

export const store = new Store({
  ui: {
    home: { activeMenuIndex: 0 },
    notificationBar: {},
    toast: { variant: "default", message: "" },
  },
  user: {
    id: 123456,
    name: "Marco Aurélio",
    email: 'email@email.com',
    phone: '(81) 9 9458-2566'

  },
  visitors: [],
  ambients: [],
  classificates: classificatesMock(),
  animals: [],
  family: familyMock(),
  occurences: [],
  assemblies: assemblyMock(),
  informatives: informativesMock,
  environment: {
    id:0,
    name:'',
    bookedDate:'',
    cost:0,
    periodDate:'',
  }

});

/* store.subscribe(
  (s) => s,
  (userStore) => {
    console.log("state changed");
    sessionStorage.setItem("@gestConn-data", JSON.stringify(userStore));
  }
);
 */

store.subscribe(
  (s) => s,
  (userStore) => {
    console.log({ userStore });
  }
);
