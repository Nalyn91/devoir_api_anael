require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const Catway = require('./models/catway');
const Reservation = require('./models/reservation');
const User = require('./models/users');

const app = express();
app.use(express.static(__dirname));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("Connecté à MongoDB"))
  .catch((err) => console.error("Erreur MongoDB :", err));

// Route 
app.get("/", (req, res) => res.send("Bienvenue dans mon API Express + MongoDB"));

const PORT = 3000;
app.listen(PORT, () => console.log(`Serveur démarré sur http://localhost:${PORT}`));

app.get("/catways", async (req, res) => {
  try {
    const catways = await Catway.find();
    res.json(catways);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la récupération des catways", error: err });
  }
});
app.post('/reservations', async (req, res) => {
  try {
    const nouvelleReservation = new Reservation({
      nom: req.body.nom,
      date: req.body.date,
      nombrePersonnes: req.body.nombrePersonnes
    });

    const saved = await nouvelleReservation.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
app.get('/reservations', async (req, res) => {
  try {
    const query = {};
    if (req.query.date) {
      query.date = new Date(req.query.date);
    }

    const reservations = await Reservation.find(query);
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    // utilisateur
    const user = await User.findOne({ 
      $or: [{ email: username }, { name: username }]
    });
    if (!user) {
      return res.status(401).json({ success: false, message: "Utilisateur inconnu." });
    }
    if (user.password !== password) {
      return res.status(401).json({ success: false, message: "Mot de passe incorrect." });
    }
    // Succès
    res.json({ 
      success: true, 
      message: "Connexion réussie.",
      user: { name: user.name, email: user.email }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Erreur serveur.", error: err });
  }
});

