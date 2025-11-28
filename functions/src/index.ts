import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import express from "express";

admin.initializeApp();
const db = admin.firestore();
const app = express();

app.use(express.json());

// Add a user
app.post("/addUser", async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).send("Name and email are required");
    }
    await db.collection("users").add({ name, email, createdAt: new Date() });
    res.status(201).send("User added");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding user");
  }
});

// Get all users
app.get("/getUsers", async (req, res) => {
  const snapshot = await db.collection("users").get();
  const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  res.send(users);
});

// Export as Firebase Function
export const api = functions.https.onRequest(app);
