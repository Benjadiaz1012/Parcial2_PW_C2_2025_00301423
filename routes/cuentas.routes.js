import express from "express";
import {
  getCuentas,
  getCuentaById,
  getCuentaByQuery,
  getCuentasBalance
} from "../controllers/cuentas.controller.js";

const router = express.Router();

router.get("/", getCuentas);
router.get("/search", getCuentaByQuery);
router.get("/balance", getCuentasBalance);
router.get("/:id", getCuentaById);

export default router;