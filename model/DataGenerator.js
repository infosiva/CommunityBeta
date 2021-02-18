const data = [
  {
    name: "Howard Turner",
    designation: "Acting Chairman",
    email: "admin1@testing.com",
    phone: "+44 (000) 000-0000"
  },
  {
    name: "Charlie Ritchie",
    designation: "Councillor",
    email: "admin2@testing.com",
    phone: "+44 (000) 000-0000"
  },
  {
    name: "Eileen Card",
    designation: "Councillor",
    email: "admin3@testing.com",
    phone: "+44 (000) 000-0000"
  },
  {
    name: "Mira Patel",
    designation: "Councillor",
    email: "admin4@testing.com",
    phone: "+44 (000) 000-0000"
  },
  {
    name: "Mynhardt Kitshoff",
    designation: "Councillor",
    email: "admin5@testing.com",
    phone: "+44 (000) 000-0000"
  },
  {
    name: "Scott Dalziel",
    designation: "Councillor",
    email: "admin6@testing.com",
    phone: "+44 (000) 000-0000"
  },
  {
    name: "Varma Kanumuri",
    designation: "Councillor",
    email: "admin7@testing.com",
    phone: "+44 (000) 000-0000"
  }
];
export default function(page) {
  let startIndex = (page - 1) * 10;
  return data.slice(startIndex, startIndex + 10);
}
