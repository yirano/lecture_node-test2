const express = require("express")
const Hobbits = require("./hobbits-model")

const router = express.Router()

router.get("/", async (req, res, next) => {
	try {
		res.json(await Hobbits.getAll())
	} catch(err) {
		next(err)
	}
})

module.exports = router