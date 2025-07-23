import { Router } from "express";

import get_personal from "../endpoints/mostrar_personal.js";//para usar el endpoint que muestra el personal especifco y general
import get_cliente from "../endpoints/mostrar_cliente.js";//para usar el endpoint que muestra el cliente especifco y general

import login from "../endpoints/login.js";//lo uso para poder hacer el login


const router= Router();

router.get("/getPersonal",get_personal);
router.get("/getPersonal/:id", get_personal); 

router.get("/getCliente", get_cliente);
router.get("/getCliente/:id", get_cliente);

router.post("/login",login);

export default router;