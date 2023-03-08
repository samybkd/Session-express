//import necessaire
const express = require("express");
const session = require("express-session");
const cors = require("cors");
const crypto = require("crypto");
const sqlite3 = require("sqlite3").verbose(); //database sqllite

const bodyParser = require("body-parser");

//imported routes
const login = require("./routes/login");
const profile = require("./routes/profile");
const logout = require("./routes/logout");
const logCheck = require("./routes/loginCheck");
const signup = require("./routes/signup");

const app = express();
//body parser pour parser les donner directement en object js
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//inisialisation de la database
const db = new sqlite3.Database("users.db", (err) => {
	if (err) {
		console.error(err.message);
	}
	console.log("Connected to the users database.");
});

app.use((req, res, next) => {
	req.db = db; //donner acess a la database via req
	next();
});
//creation de la table users si elle n existe pas deja
db.serialize(() => {
	db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      age TEXT NOT NULL,
      functionality TEXT NOT NULL
    )
  `);
});
// utlisation de cors pour donner acces au api seulement au origin que l'on veut dans notre cas
// localhost:5173 qui est notre frontend
app.use(
	cors({
		origin: "http://localhost:5173",
		credentials: true,
	})
);
//crypter la cle secret utilise pour generer le id de session
const secretKey = crypto.randomBytes(8).toString("hex");

app.use(
	session({
		secret: secretKey,
		resave: false,
		saveUninitialized: false,
		cookie: { secure: false }, // si on utiliser https(prod) on devrait rendre ca vrai
	})
);
app.use("/login", login);
app.use("/logout", logout);
app.use("/loginCheck", logCheck); //verifie si l'utilisateur et deja logged in
app.use("/profile", profile);
app.use("/signup", signup);

app.listen(4000, () => {
	console.log("Server started on port 4000");
});
