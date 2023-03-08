const express = require("express");
const session = require("express-session");
const router = express.Router();
router.get("/", (req, res) => {
	//verifie si l utilisateur et deja en authentifier au non

	if (req.session.userId) {
		res.status(200).json({ loggedIn: true });
	} else {
		res.status(401).json({ loggedIn: false });
	}
});
module.exports = router;
