const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();

router.post("/", async (req, res) => {
	const { name, email, password, age, functionality } = req.body;
	// on verifie si l email nest pas deja utiliser
	req.db.get(
		"SELECT * FROM users WHERE email = ?",
		email,
		async (err, row) => {
			if (err) {
				console.error(err.message);
				return res.status(500).send("Internal server error");
			}

			if (row) {
				return res.status(401).send("Email already used");
			}
			if (!row) {
				// si email no utiliser on hash le password et le sauvegarde dans la db avec la creation de l utilisatuer
				const hashPass = await bcrypt.hash(password, 10);
				const result = await req.db.run(
					"INSERT INTO users (name, email, password, age, functionality) VALUES (?, ?, ?, ?, ?)",
					[name, email, hashPass, age, functionality]
				);

				const userId = result.lastID;
				req.session.userId = userId;
				req.session.loggedIn = true;

				res.json({
					success: true,
					message: "User signed up successfully.",
				});
			}
		}
	);
});
module.exports = router;
