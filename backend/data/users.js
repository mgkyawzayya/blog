import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin",
    email: "admin@example.com",
    password: bcrypt.hashSync("admin", 10),
    isAdmin: true,
  },
  {
    name: "Kyaw Zayya",
    email: "kyawzayya@example.com",
    password: bcrypt.hashSync("admin", 10),
    isAdmin: false,
  },
];

export default users;
