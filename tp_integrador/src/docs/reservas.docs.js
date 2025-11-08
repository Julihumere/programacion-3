/**
 * @swagger
 * tags:
 *   name: Reservas
 *   description: Endpoints para gestionar reservas de salones
 */

/**
 * @swagger
 * /reservas:
 *   get:
 *     summary: Listar todas las reservas (Solo Empleados y Administradores)
 *     tags: [Reservas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de todas las reservas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 estado:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Reserva'
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado (solo empleados y administradores)
 */

/**
 * @swagger
 * /reservas/mis-reservas:
 *   get:
 *     summary: Listar mis reservas (usuario autenticado)
 *     tags: [Reservas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de reservas del usuario autenticado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 estado:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Reserva'
 *       401:
 *         description: No autenticado
 */

/**
 * @swagger
 * /reservas/{id}:
 *   get:
 *     summary: Obtener una reserva por ID (Solo Empleados y Administradores)
 *     tags: [Reservas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la reserva
 *     responses:
 *       200:
 *         description: Datos de la reserva
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 estado:
 *                   type: string
 *                   example: success
 *                 data:
 *                   $ref: '#/components/schemas/Reserva'
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado (solo empleados y administradores)
 *       404:
 *         description: Reserva no encontrada
 */

/**
 * @swagger
 * /reservas:
 *   post:
 *     summary: Crear una nueva reserva (Administradores y Clientes)
 *     tags: [Reservas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: ["fecha_reserva", "salon_id", "turno_id", "usuario_id"]
 *             properties:
 *               fecha_reserva:
 *                 type: string
 *                 format: date
 *                 description: Fecha de la reserva (YYYY-MM-DD)
 *                 example: "2025-12-25"
 *               salon_id:
 *                 type: integer
 *                 minimum: 1
 *                 description: ID del salón a reservar
 *                 example: 1
 *               turno_id:
 *                 type: integer
 *                 minimum: 1
 *                 description: ID del turno a reservar
 *                 example: 2
 *               usuario_id:
 *                 type: integer
 *                 minimum: 1
 *                 description: ID del usuario que hace la reserva (requerido)
 *                 example: 3
 *               tematica:
 *                 type: string
 *                 description: Temática de la fiesta (opcional)
 *                 example: "Superhéroes"
 *               servicios:
 *                 type: array
 *                 description: Array de IDs de servicios adicionales (opcional)
 *                 items:
 *                   type: integer
 *                 example: [1, 2]
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: ["fecha_reserva", "salon_id", "turno_id", "usuario_id"]
 *             properties:
 *               fecha_reserva:
 *                 type: string
 *                 format: date
 *                 description: Fecha de la reserva (YYYY-MM-DD)
 *                 example: "2025-12-25"
 *               salon_id:
 *                 type: integer
 *                 minimum: 1
 *                 description: ID del salón a reservar
 *                 example: 1
 *               turno_id:
 *                 type: integer
 *                 minimum: 1
 *                 description: ID del turno a reservar
 *                 example: 2
 *               usuario_id:
 *                 type: integer
 *                 minimum: 1
 *                 description: ID del usuario que hace la reserva (requerido)
 *                 example: 3
 *               tematica:
 *                 type: string
 *                 description: Temática de la fiesta (opcional)
 *                 example: "Superhéroes"
 *               foto_cumpleaniero:
 *                 type: string
 *                 format: binary
 *                 description: Foto del cumpleañero (opcional, solo con multipart/form-data)
 *               servicios:
 *                 type: string
 *                 description: Array de IDs de servicios en formato JSON string (opcional)
 *                 example: "[1, 2]"
 *     responses:
 *       201:
 *         description: Reserva creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 estado:
 *                   type: string
 *                   example: success
 *                 mensaje:
 *                   type: string
 *                   example: Reserva creada correctamente
 *                 data:
 *                   $ref: '#/components/schemas/Reserva'
 *       400:
 *         description: Datos inválidos o turno no disponible
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado
 */

/**
 * @swagger
 * /reservas/{id}:
 *   patch:
 *     summary: Actualizar una reserva (Solo Administradores)
 *     tags: [Reservas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la reserva
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tematica:
 *                 type: string
 *                 example: Superhéroes
 *               foto_cumpleaniero:
 *                 type: string
 *                 example: https://example.com/foto.jpg
 *               activo:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Reserva actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado (solo administradores)
 *       404:
 *         description: Reserva no encontrada
 */

/**
 * @swagger
 * /reservas/{id}:
 *   delete:
 *     summary: Eliminar una reserva (Solo Administradores)
 *     tags: [Reservas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la reserva
 *     responses:
 *       200:
 *         description: Reserva eliminada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado (solo administradores)
 *       404:
 *         description: Reserva no encontrada
 */

/**
 * @swagger
 * /reservas/{id}/servicios:
 *   get:
 *     summary: Obtener servicios de una reserva (Solo Empleados y Administradores)
 *     tags: [Reservas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la reserva
 *     responses:
 *       200:
 *         description: Lista de servicios de la reserva
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 estado:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       reserva_servicio_id:
 *                         type: integer
 *                       servicio_id:
 *                         type: integer
 *                       importe:
 *                         type: number
 *                       servicio_descripcion:
 *                         type: string
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado (solo empleados y administradores)
 *       404:
 *         description: Reserva no encontrada
 */

/**
 * @swagger
 * /reservas/{id}/servicios:
 *   post:
 *     summary: Agregar un servicio a una reserva (Solo Administradores y Empleados)
 *     tags: [Reservas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la reserva
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AgregarServicioReserva'
 *     responses:
 *       201:
 *         description: Servicio agregado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 estado:
 *                   type: string
 *                   example: success
 *                 mensaje:
 *                   type: string
 *                   example: Servicio agregado a la reserva
 *       400:
 *         description: Servicio ya existe en la reserva
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado (solo administradores y empleados)
 *       404:
 *         description: Reserva o servicio no encontrado
 */

/**
 * @swagger
 * /reservas/{reserva_id}/servicios/{servicio_id}:
 *   delete:
 *     summary: Eliminar un servicio de una reserva (Solo Administradores y Empleados)
 *     tags: [Reservas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: reserva_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la reserva
 *       - in: path
 *         name: servicio_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del servicio a eliminar
 *     responses:
 *       200:
 *         description: Servicio eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado (solo administradores y empleados)
 *       404:
 *         description: Servicio no encontrado en la reserva
 */

