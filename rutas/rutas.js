import { Router } from "express";

import get_personal from "../endpoints/personal/mostrar_personal.js";//para usar el endpoint que muestra el personal especifco y general
import get_cliente from "../endpoints/cliente/mostrar_cliente.js";//para usar el endpoint que muestra el cliente especifco y general
import get_citas_peluqueria from "../endpoints/citasPeluquerias/mostrar_citasPeluquerias.js"; //para usar el endpoint que muestra las citas especifco y general

import post_crear_cliente from "../endpoints/cliente/crear_cliente.js";//para usar el endpoint en donde se crea un cliente desde 0
import post_crear_personal from "../endpoints/citasPeluquerias/crear_citasPeluqeria.js"; //para usar el endpoint en donde se crea un personal desde 0
import post_crear_cita_peluqueria from "../endpoints/citasPeluquerias/crear_citasPeluqeria.js"; //para usar el endpoint en donde se crea una cita de peluqueria desde 0
import post_actividad_gimnasio from "../endpoints/gimnasio/crear_actividad_gimnasio.js"; //para usar el endpoint encargado insertar un usuario a la hora de entrar al gimansio

import delete_eliminar_cliente from "../endpoints/cliente/eliminar_cliente.js";//para usar el endpoint en donde se elimina de MANERA LOGICA el cliente, por ende es un update 
import delete_eliminar_personal from "../endpoints/personal/eliminar_personal.js"; //para usar el endpoint en donde se elimina de MANERA LOGICA el personal, por ende es un update 

import put_actualizar_cliente from "../endpoints/cliente/actualizar_cliente.js"; //para usar el endpoint en donde se edita un cliente 
import put_pago_cliente from "../endpoints/cliente/actualizar_pago_cliente.js"; //para usar el endpoint en donde se edita, registra, actualiza el pago del cliente
import login from "../endpoints/login.js";//lo uso para poder hacer el login


const router= Router();
                        //GET
router.get("/getPersonal",get_personal);
router.get("/getPersonal/:id", get_personal); 

router.get("/getCitas_peluqueria", get_citas_peluqueria);
router.get("/getCitas_peluqueria/:nombre", get_citas_peluqueria);

router.get("/getCliente", get_cliente);
router.get("/getCliente/:id", get_cliente);



                        //post
router.post("/crear_cliente", post_crear_cliente);
router.post("/crear_personal", post_crear_personal);
router.post("/crear_cita_peluqueria", post_crear_cita_peluqueria);
router.post("/crear_actividad_gimnasio", post_actividad_gimnasio);

                        //DELETE
router.put("/eliminar_cliente/:id", delete_eliminar_cliente); //se usa put(actualizar) debido que es un borrado logico 
router.put("/eliminar_personal/:id", delete_eliminar_personal)  //se usa put(actualizar) debido que es un borrado logico


                        //Update
router.put("/actualizar_cliente/:id", put_actualizar_cliente);                        
router.put("/actualizar_pago_cliente/:cedula", put_pago_cliente);


router.post("/login",login);

export default router;