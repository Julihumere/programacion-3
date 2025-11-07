/**
 * @swagger
 * tags:
 *   name: Informes
 *   description: Endpoints para generar informes y reportes
 */

/**
 * @swagger
 * /informes/reservas:
 *   get:
 *     summary: Obtener informe completo de reservas
 *     description: Genera un informe detallado de reservas con información de salones, turnos, clientes y servicios contratados. Solo accesible para empleados y administradores.
 *     tags: [Informes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: salon_id
 *         schema:
 *           type: integer
 *         required: false
 *         description: ID del salón para filtrar el informe (opcional)
 *         example: 1
 *       - in: query
 *         name: usuario_id
 *         schema:
 *           type: integer
 *         required: false
 *         description: ID del usuario/cliente para filtrar el informe (opcional)
 *         example: 5
 *     responses:
 *       200:
 *         description: Informe generado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 estado:
 *                   type: string
 *                   example: success
 *                 total_registros:
 *                   type: integer
 *                   description: Cantidad total de reservas en el informe
 *                   example: 15
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       reserva_id:
 *                         type: integer
 *                         example: 1
 *                       fecha_reserva:
 *                         type: string
 *                         format: date
 *                         example: "2025-12-25"
 *                       tematica:
 *                         type: string
 *                         example: "Superhéroes"
 *                       foto_cumpleaniero:
 *                         type: string
 *                         nullable: true
 *                         example: null
 *                       reserva_activa:
 *                         type: integer
 *                         example: 1
 *                       fecha_creacion_reserva:
 *                         type: string
 *                         format: date-time
 *                       salon_nombre:
 *                         type: string
 *                         example: "Salón Principal"
 *                       salon_direccion:
 *                         type: string
 *                         example: "Av. San Martín 1234"
 *                       salon_capacidad:
 *                         type: integer
 *                         example: 100
 *                       salon_latitud:
 *                         type: number
 *                         nullable: true
 *                         example: -31.7333
 *                       salon_longitud:
 *                         type: number
 *                         nullable: true
 *                         example: -60.5167
 *                       turno_orden:
 *                         type: integer
 *                         example: 2
 *                       turno_hora_inicio:
 *                         type: string
 *                         format: time
 *                         example: "14:00:00"
 *                       turno_hora_fin:
 *                         type: string
 *                         format: time
 *                         example: "16:00:00"
 *                       cliente_nombre_completo:
 *                         type: string
 *                         example: "Juan Pérez"
 *                       cliente_email:
 *                         type: string
 *                         example: "juan@email.com"
 *                       cliente_telefono:
 *                         type: string
 *                         example: "3434123456"
 *                       servicios_contratados:
 *                         type: string
 *                         description: Lista de servicios concatenados con sus precios
 *                         nullable: true
 *                         example: "Decoración Temática ($5,000.00), Animador ($7,000.00)"
 *                       cantidad_servicios:
 *                         type: integer
 *                         description: Cantidad de servicios adicionales contratados
 *                         example: 2
 *                       total_servicios:
 *                         type: number
 *                         description: Suma total de los servicios adicionales
 *                         example: 12000.00
 *                       salon_precio_base:
 *                         type: number
 *                         description: Precio base del salón en el catálogo
 *                         example: 25000.00
 *                       importe_salon:
 *                         type: number
 *                         description: Importe del salón al momento de la reserva
 *                         example: 25000.00
 *                       importe_total:
 *                         type: number
 *                         description: Importe total de la reserva (salón + servicios)
 *                         example: 37000.00
 *       401:
 *         description: No autenticado - Token inválido o expirado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: No autorizado - Solo empleados y administradores pueden acceder
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: No se encontraron reservas para generar el informe
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /informes/descargar:
 *   get:
 *     summary: Descargar informe de reservas en formato CSV
 *     description: Genera y descarga un archivo CSV con el informe detallado de reservas. El CSV incluye todas las columnas con los datos completos de las reservas filtradas y totales calculados. Compatible con Excel y otras hojas de cálculo. Solo accesible para administradores.
 *     tags: [Informes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: salon_id
 *         schema:
 *           type: integer
 *         required: false
 *         description: ID del salón para filtrar el informe (opcional)
 *         example: 1
 *       - in: query
 *         name: usuario_id
 *         schema:
 *           type: integer
 *         required: false
 *         description: ID del usuario/cliente para filtrar el informe (opcional)
 *         example: 5
 *     responses:
 *       200:
 *         description: CSV generado y listo para descargar
 *         content:
 *           text/csv:
 *             schema:
 *               type: string
 *               format: binary
 *         headers:
 *           Content-Disposition:
 *             description: Nombre del archivo a descargar
 *             schema:
 *               type: string
 *               example: 'attachment; filename="informe_reservas_2025-01-15.csv"'
 *           Content-Type:
 *             description: Tipo MIME del archivo
 *             schema:
 *               type: string
 *               example: text/csv; charset=utf-8
 *       401:
 *         description: No autenticado - Token inválido o expirado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: No autorizado - Solo administradores pueden descargar informes
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: No se encontraron reservas para generar el informe
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error interno del servidor al generar el CSV
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

