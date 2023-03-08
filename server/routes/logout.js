const express = require("express");
const router = express.Router();
router.post("/", (req, res) => {
	// destroy user session and logout
	req.session.destroy((err) => {
		if (err) {
			console.log(err);
		} else {
			res.send("Logout successful!");
		}
	});
});
module.exports = router;
