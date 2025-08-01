import { Router } from "express";

import get_personal from "../endpoints/personal/mostrar_personal.js";//para usar el endpoint que muestra el personal especifco y general
import get_cliente from "../endpoints/cliente/mostrar_cliente.js";//para usar el endpoint que muestra el cliente especifco y general
import get_horario_citas_peluqueria from "../endpoints/gimnasio/mostrar_horario_citas_peluqueria.js"; //para usar el endpoint que muestra las citas especifco y general
import get_actividad_cliente from "../endpoints/gimnasio/mostrar_actividiad_gimnasio.js";//para usar el endpoint donde muestro la cantidad de personas activas en el gimnasio
import get_citas_peluquerias from "../endpoints/citasPeluquerias/mostrar_citas_peluquerias.js";

import post_crear_cliente from "../endpoints/cliente/crear_cliente.js";//para usar el endpoint en donde se crea un cliente desde 0
import post_crear_personal from "../endpoints/personal/crear_personal.js"//para usar el endpoint en donde se crea un personal desde 0
import post_crear_horario_peluqueria from "../endpoints/gimnasio/crear_horario_citas_peluqueria.js"; //para usar el endpoint en donde se crea una cita de peluqueria desde 0
import post_actividad_gimnasio from "../endpoints/gimnasio/crear_actividad_gimnasio.js"; //para usar el endpoint encargado insertar un usuario a la hora de entrar al gimansio
import post_cita_peluqueria from "../endpoints/citasPeluquerias/crear_cita_peluqueria.js"; //para usar el endpont encargado de crear una reserva en la peluqueria

import delete_eliminar_cliente from "../endpoints/cliente/eliminar_cliente.js";//para usar el endpoint en donde se elimina de MANERA LOGICA el cliente, por ende es un update 
import delete_eliminar_personal from "../endpoints/personal/eliminar_personal.js"; //para usar el endpoint en donde se elimina de MANERA LOGICA el personal, por ende es un update 

import put_actualizar_cliente from "../endpoints/cliente/actualizar_cliente.js"; //para usar el endpoint en donde se edita un cliente 
import put_pago_cliente from "../endpoints/cliente/actualizar_pago_cliente.js"; //para usar el endpoint en donde se edita, registra, actualiza el pago del cliente
import put_citas_peluquerias from "../endpoints/citasPeluquerias/eliminar_citas_peluqeria.js"; //para usar le endpoint en donde el cliente podra modifcar el estado de su cita (podra canelarla)
import put_horario_cita from "../endpoints/gimnasio/actualizar_horario_citas.js"; //para usarl endpoint en donde se actualizara o modificara un horario previamente creado

import login from "../endpoints/login.js";//lo uso para poder hacer el login



const router= Router();
                        //GET
router.get("/getPersonal",get_personal);
router.get("/getPersonal/:id", get_personal); 

router.get("/get_horario_citas_peluqueria", get_horario_citas_peluqueria);
router.get("/get_horario_citas_peluqueria/:nombre", get_horario_citas_peluqueria);

router.get("/getCliente", get_cliente);
router.get("/getCliente/:id", get_cliente);

router.get("/get_citas_peluqueria", get_citas_peluquerias)
router.get("/get_citas_peluqueria/:id_cliente", get_citas_peluquerias); //solo se le debe mostrar a los clientes cada uno de SUS citas

router.get("/getActividad_gimnasio", get_actividad_cliente);


                        //post
router.post("/crear_cliente", post_crear_cliente);
router.post("/crear_personal", post_crear_personal);
router.post("/crear_horario_cita_peluqueria", post_crear_horario_peluqueria);
router.post("/crear_actividad_gimnasio", post_actividad_gimnasio);
router.post("/crear_citas_peluqueria", post_cita_peluqueria)
                        //DELETE
router.put("/eliminar_cliente/:id", delete_eliminar_cliente); //se usa put(actualizar) debido que es un borrado logico 
router.put("/eliminar_personal/:id", delete_eliminar_personal)  //se usa put(actualizar) debido que es un borrado logico


                        //Update
router.put("/actualizar_cliente/:id", put_actualizar_cliente);                        
router.put("/actualizar_pago_cliente/:cedula", put_pago_cliente);
router.put("/actualizar_cita_peluqueria/:id_cita", put_citas_peluquerias);
router.put("/actualizar_horario_citas/id_horario", put_horario_cita);

router.post("/login",login);

export default router;