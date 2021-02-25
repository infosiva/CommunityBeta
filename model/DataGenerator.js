const data = [
  {
    name: "Member 1",
    designation: "Acting Chairman",
    email: "admin1@testing.com",
    phone: "+44 (000) 000-0000"
  },
  {
    name: "Member 2",
    designation: "Councillor",
    email: "admin2@testing.com",
    phone: "+44 (000) 000-0000"
  },
  {
    name: "Member 3",
    designation: "Councillor",
    email: "admin3@testing.com",
    phone: "+44 (000) 000-0000"
  },
  {
    name: "Member 4",
    designation: "Councillor",
    email: "admin4@testing.com",
    phone: "+44 (000) 000-0000"
  },
  {
    name: "Member 5",
    designation: "Councillor",
    email: "admin5@testing.com",
    phone: "+44 (000) 000-0000"
  },
  {
    name: "Member 6",
    designation: "Councillor",
    email: "admin6@testing.com",
    phone: "+44 (000) 000-0000"
  },
  {
    name: "Member 7",
    designation: "Councillor",
    email: "admin7@testing.com",
    phone: "+44 (000) 000-0000"
  }
];
export default function(page) {
  let startIndex = (page - 1) * 10;
  return data.slice(startIndex, startIndex + 10);
}
