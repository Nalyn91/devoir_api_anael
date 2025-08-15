const mongoose = require('mongoose');
const User = require('./models/users'); // Chemin 

require('dotenv').config();

async function main() {
  await mongoose.connect(process.env.MONGODB_URI);

  // Utilisateurs 
  const users = [
    {
      name: "Thomas Martin",
      email: "thomas.martin@gmail.com",
      password: "Martin923"
    },
    {
      name: "John Doe",
      email: "john.doe@gmail.com",
      password: "JohnDoe2!"
    }
  ];

  try {
    await User.insertMany(users);
    console.log("Utilisateurs ajoutés avec succès !");
  } catch (err) {
    console.error("Erreur lors de l'ajout :", err);
  } finally {
    mongoose.connection.close();
  }
}

main();