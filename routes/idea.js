const express = require("express");
const router = express.Router();
const ideaController = require("../controllers/idea");

router.post("/", ideaController.requireAuth, ideaController.create);
router.get("/new", ideaController.requireAuth, ideaController.new);
router.get("/:id", ideaController.show);
router.put("/:id", ideaController.requireAuth, ideaController.update);
router.delete("/:id", ideaController.requireAuth, ideaController.delete)


// router.post("/", ideaController.create);
// router.get("/new", ideaController.new);
// router.get("/:id", ideaController.show);
// router.put("/:id", ideaController.update);
// router.delete("/:id", ideaController.delete);

module.exports = router;