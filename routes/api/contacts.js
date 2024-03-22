const express = require("express");
const router = express.Router();
const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string(),
  favorite: Joi.boolean().default(false),
});
const validateContact = (req, res, next) => {
  const { error } = contactSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

const {
  listContacts,
  getContactById,
  removeContact,
  // addContact,
  // updateContact,
  updateStatusContact,
} = require("../../controllers/contacts");

router.get("/", listContacts);
router.get("/:contactId", getContactById);
router.post("/", validateContact, async (req, res, next) => {});
router.delete("/:contactId", removeContact);
router.put("/:contactId", validateContact, async (req, res, next) => {});
router.patch("/:contactId/favorite", updateStatusContact);

module.exports = router;
