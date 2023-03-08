const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();

router.post("/", (req, res) => {
	const { email, password } = req.body;

	req.db.get(
		"SELECT * FROM users WHERE email = ?",
		email,
		async (err, row) => {
			if (err) {
				console.error(err.message);
				return res.status(500).send("Internal server error");
			}

			if (!row) {
				return res.status(401).json({
					success: false,
					message: "Invalid email or password",
				});
			}
			//verifier que le password hasher et le meme que le password donner
			const isMatch = await bcrypt.compare(password, row.password);
			if (!isMatch) {
				return res.status(401).json({
					success: false,
					message: "Invalid email or password",
				});
			}

			req.session.userId = row.id;
			res.send("Logged in successfully");
		}
	);
});
module.exports = router;
