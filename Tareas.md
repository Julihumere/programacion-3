# TODO - Trabajo Final Integrador

_Sistema de Reservas de Salones_

## 🚀 CONFIGURACIÓN INICIAL

### Dependencias Core

- [x] Instalar Express.js y configuración básica
- [x] Instalar y configurar MySQL2 para conexión a base de datos
- [x] Instalar jsonwebtoken para manejo de JWT
- [x] Instalar bcrypt para encriptación de contraseñas
- [x] Instalar dotenv para variables de entorno

### Dependencias de Validación y Seguridad

- [ ] Instalar express-validator para validaciones
- [ ] Instalar cors para manejo de CORS
- [ ] Instalar helmet para seguridad HTTP

### Dependencias de Documentación

- [ ] Instalar swagger-ui-express
- [ ] Instalar swagger-jsdoc para generar documentación

### Dependencias de Reportes

- [ ] Instalar puppeteer para generación de PDFs
- [ ] Instalar csv-writer para generación de archivos CSV

### Configuración del Proyecto

- [x] Crear archivo .env con variables de configuración
- [x] Configurar scripts en package.json (start, dev, test)
- [x] Configurar estructura de carpetas para el proyecto

## 🔐 AUTENTICACIÓN Y AUTORIZACIÓN

### Sistema JWT

- [x] Crear funciones para generar tokens JWT
- [x] Crear funciones para verificar tokens JWT
- [x] Configurar tiempo de expiración de tokens
- [ ] Implementar refresh tokens (opcional)

### Sistema de Login

- [x] Crear endpoint POST /usuarios/iniciar_sesion
- [x] Validar credenciales contra base de datos
- [x] Hashear contraseñas con bcrypt en registro
- [x] Verificar contraseñas hasheadas en login
- [x] Retornar token JWT válido tras login exitoso

### Middleware de Sesión

- [x] Actualizar validarSesion.js para JWT
- [x] Verificar token en header Authorization
- [x] Extraer datos de usuario del token
- [x] Manejar tokens expirados o inválidos

### Middleware de Autorización por Roles

- [ ] Crear middleware para rol Cliente
- [ ] Crear middleware para rol Empleado
- [x] Crear middleware para rol Administrador (esAdmin.js)
- [ ] Crear middleware combinado para múltiples roles

## 👤 FUNCIONALIDADES POR ROL

### 📱 ROL: CLIENTE

#### Autenticación Cliente

- [x] Implementar login específico para clientes (endpoint genérico)
- [ ] Validar que el usuario sea tipo 'cliente'
- [x] Generar token JWT con rol cliente

#### Gestión de Reservas - Cliente

- [ ] Endpoint POST /api/reservas - Crear nueva reserva
- [ ] Validar datos de reserva (fecha, turno, salón)
- [ ] Verificar disponibilidad de salón y turno
- [ ] Calcular importe total (salón + servicios)
- [ ] Endpoint GET /api/reservas/mis-reservas - Listar reservas propias
- [ ] Filtrar reservas solo del cliente autenticado

#### Consultas de Lectura - Cliente

- [x] Endpoint GET /salones - Listado de salones disponibles
- [ ] Filtrar solo salones activos
- [ ] Endpoint GET /api/servicios - Listado de servicios disponibles
- [ ] Filtrar solo servicios activos
- [ ] Endpoint GET /api/turnos - Listado de turnos disponibles
- [ ] Filtrar solo turnos activos

#### Notificaciones - Cliente

- [x] Configurar envío de notificación al crear reserva
- [x] Crear template de email para cliente (plantillaSalon.hbs)
- [x] Integrar con servicio de notificaciones (nodemailer)

### 👷 ROL: EMPLEADO

#### Autenticación Empleado

- [x] Implementar login específico para empleados (endpoint genérico)
- [ ] Validar que el usuario sea tipo 'empleado'
- [x] Generar token JWT con rol empleado

#### Consultas - Empleado

- [ ] Endpoint GET /api/reservas/todas - Listado de todas las reservas
- [ ] Incluir datos de cliente, salón, servicios
- [x] Endpoint GET /usuarios/ver_usuarios - Listado de clientes
- [ ] Filtrar solo usuarios tipo 'cliente'

#### BREAD Salones - Empleado

- [x] GET /salones - Browse (listar todos los salones)
- [x] GET /salones/:id - Read (obtener salón específico)
- [x] POST /salones - Add (crear nuevo salón)
- [ ] PUT /salones/:id - Edit (modificar salón existente)
- [ ] DELETE /salones/:id - Delete (soft delete de salón)

#### BREAD Servicios - Empleado

- [ ] GET /api/servicios - Browse (listar todos los servicios)
- [ ] GET /api/servicios/:id - Read (obtener servicio específico)
- [ ] POST /api/servicios - Add (crear nuevo servicio)
- [ ] PUT /api/servicios/:id - Edit (modificar servicio existente)
- [ ] DELETE /api/servicios/:id - Delete (soft delete de servicio)

#### BREAD Turnos - Empleado

- [ ] GET /api/turnos - Browse (listar todos los turnos)
- [ ] GET /api/turnos/:id - Read (obtener turno específico)
- [ ] POST /api/turnos - Add (crear nuevo turno)
- [ ] PUT /api/turnos/:id - Edit (modificar turno existente)
- [ ] DELETE /api/turnos/:id - Delete (soft delete de turno)

### 👨‍💼 ROL: ADMINISTRADOR

#### Autenticación Administrador

- [x] Implementar login específico para administradores (endpoint genérico)
- [x] Validar que el usuario sea tipo 'admin' (esAdmin middleware)
- [x] Generar token JWT con rol administrador

#### BREAD Reservas - Administrador (ÚNICO QUE PUEDE MODIFICAR)

- [ ] GET /api/reservas - Browse (listar todas las reservas)
- [ ] GET /api/reservas/:id - Read (obtener reserva específica)
- [ ] POST /api/reservas - Add (crear nueva reserva)
- [ ] PUT /api/reservas/:id - Edit (modificar reserva existente)
- [ ] DELETE /api/reservas/:id - Delete (soft delete de reserva)

#### BREAD Salones - Administrador

- [ ] GET /api/admin/salones - Browse con más detalles
- [ ] GET /api/admin/salones/:id - Read completo
- [ ] POST /api/admin/salones - Add con validaciones admin
- [ ] PUT /api/admin/salones/:id - Edit completo
- [ ] DELETE /api/admin/salones/:id - Delete con verificaciones

#### BREAD Servicios - Administrador

- [ ] GET /api/admin/servicios - Browse completo
- [ ] GET /api/admin/servicios/:id - Read con detalles
- [ ] POST /api/admin/servicios - Add con validaciones
- [ ] PUT /api/admin/servicios/:id - Edit completo
- [ ] DELETE /api/admin/servicios/:id - Delete con verificaciones

#### BREAD Turnos - Administrador

- [ ] GET /api/admin/turnos - Browse completo
- [ ] GET /api/admin/turnos/:id - Read con detalles
- [ ] POST /api/admin/turnos - Add con validaciones
- [ ] PUT /api/admin/turnos/:id - Edit completo
- [ ] DELETE /api/admin/turnos/:id - Delete con verificaciones

#### BREAD Usuarios - Administrador

- [x] GET /usuarios/ver_usuarios - Browse (listar todos los usuarios)
- [ ] GET /usuarios/:id - Read (obtener usuario específico)
- [x] POST /usuarios/registrar - Add (crear nuevo usuario)
- [ ] PUT /usuarios/:id - Edit (modificar usuario existente)
- [ ] DELETE /usuarios/:id - Delete (soft delete de usuario)

#### Notificaciones - Administrador

- [ ] Configurar recepción de notificación al crear reserva
- [ ] Crear template de email/SMS para administrador
- [ ] Integrar alertas en tiempo real

## ✅ VALIDACIONES Y MIDDLEWARE

### Configuración express-validator

- [ ] Instalar y configurar express-validator
- [ ] Crear función helper para manejo de errores de validación
- [ ] Crear middleware centralizado para validaciones

### Validaciones de Usuarios

- [ ] Validar formato de email en registro/login
- [ ] Validar longitud de nombre de usuario (min/max)
- [ ] Validar formato de teléfono celular
- [ ] Validar que nombre y apellido no estén vacíos
- [ ] Validar tipo_usuario en valores permitidos

### Validaciones de Salones

- [ ] Validar que título no esté vacío
- [ ] Validar formato de dirección
- [ ] Validar rango de latitud y longitud
- [ ] Validar capacidad mínima (>0)
- [ ] Validar importe como número positivo

### Validaciones de Servicios

- [ ] Validar que descripción no esté vacía
- [ ] Validar importe como número positivo
- [ ] Validar longitud máxima de descripción

### Validaciones de Turnos

- [ ] Validar formato de hora_desde y hora_hasta
- [ ] Validar que hora_desde < hora_hasta
- [ ] Validar orden como número entero positivo
- [ ] Validar no solapamiento de horarios

### Validaciones de Reservas

- [ ] Validar fecha_reserva no sea pasada
- [ ] Validar existencia de salón, usuario y turno (FK)
- [ ] Validar formato de importe_salon e importe_total
- [ ] Validar disponibilidad de salón en fecha/turno
- [ ] Validar formato de archivo de foto_cumpleaniero

### Manejo de Errores HTTP

- [ ] Crear middleware centralizado de manejo de errores
- [ ] Implementar responses HTTP apropiados (200, 201, 400, 401, 403, 404, 500)
- [ ] Crear estructura consistente de respuestas de error
- [ ] Implementar logging de errores

## 📊 REPORTES E INFORMES

### Informes Estadísticos (Solo Procedimientos Almacenados)

- [ ] Endpoint GET /api/admin/estadisticas/reservas-periodo
- [ ] Implementar llamada a SP reservas por período
- [ ] Endpoint GET /api/admin/estadisticas/salones-utilizados
- [ ] Implementar llamada a SP salones más utilizados
- [ ] Endpoint GET /api/admin/estadisticas/servicios-solicitados
- [ ] Implementar llamada a SP servicios más solicitados
- [ ] Endpoint GET /api/admin/estadisticas/ingresos-periodo
- [ ] Implementar llamada a SP ingresos por período

### Generación de Reportes PDF

- [ ] Configurar puppeteer para generación de PDFs
- [ ] Crear template HTML para reporte de reservas
- [ ] Endpoint GET /api/admin/reportes/reservas/pdf
- [ ] Incluir datos de reserva, cliente, salón, turno y servicios
- [ ] Aplicar estilos CSS profesionales al PDF
- [ ] Configurar headers para descarga de archivo PDF

### Generación de Reportes CSV

- [ ] Configurar csv-writer para generación de CSVs
- [ ] Endpoint GET /api/admin/reportes/reservas/csv
- [ ] Definir estructura de columnas del CSV
- [ ] Incluir datos relacionados en el CSV
- [ ] Configurar headers para descarga de archivo CSV

### Filtros y Parámetros de Reportes

- [ ] Implementar filtro por rango de fechas
- [ ] Implementar filtro por salón específico
- [ ] Implementar filtro por tipo de servicio
- [ ] Implementar filtro por estado de reserva

## 🔔 SISTEMA DE NOTIFICACIONES

### Configuración de Servicio de Notificaciones

- [x] Elegir proveedor (nodemailer para email)
- [x] Configurar credenciales en variables de entorno
- [x] Crear servicio base de notificaciones (envioNotificacion.js)

### Notificaciones por Email

- [x] Configurar servicio de email (SMTP Gmail)
- [x] Crear template HTML para confirmación de reserva (plantillaSalon.hbs)
- [ ] Crear template HTML para nueva reserva (admin)
- [x] Implementar envío de email asíncrono

### Notificaciones por SMS (Opcional)

- [ ] Configurar servicio SMS
- [ ] Crear mensajes de texto para confirmación
- [ ] Crear mensajes de texto para administrador

### Triggers de Notificaciones

- [x] Enviar notificación al cliente tras crear salón (implementado)
- [ ] Enviar notificación al admin tras crear reserva
- [x] Manejar errores en envío de notificaciones
- [ ] Implementar cola de notificaciones (opcional)

## 🛡️ REGLAS DE NEGOCIO Y RESTRICCIONES

### Restricciones de Reservas

- [ ] Implementar validación: solo admin puede modificar reservas
- [ ] Crear middleware específico para proteger PUT /api/reservas/:id
- [ ] Validar permisos antes de permitir modificación

### Implementación de Soft Delete

- [ ] Modificar DELETE de usuarios para usar soft delete
- [ ] Modificar DELETE de salones para usar soft delete
- [ ] Modificar DELETE de servicios para usar soft delete
- [ ] Modificar DELETE de turnos para usar soft delete
- [ ] Modificar DELETE de reservas para usar soft delete
- [ ] Actualizar consultas SELECT para filtrar activo = 1

### Validación de Disponibilidad

- [ ] Crear función para verificar disponibilidad de salón
- [ ] Validar no solapamiento de reservas en mismo salón/turno/fecha
- [ ] Implementar verificación en POST reservas
- [ ] Implementar verificación en PUT reservas

### Restricciones de Estadísticas

- [ ] Asegurar que estadísticas solo se generen via SP
- [ ] Prohibir consultas SQL directas para estadísticas
- [ ] Validar que endpoints de estadísticas llamen solo a SP

## 📚 DOCUMENTACIÓN

### Configuración Swagger

- [ ] Configurar swagger-jsdoc y swagger-ui-express
- [ ] Crear archivo swagger.json base
- [ ] Configurar endpoint /api-docs para documentación

### Documentación de Autenticación

- [ ] Documentar endpoint POST /api/auth/login
- [ ] Documentar estructura del token JWT
- [ ] Documentar header Authorization requerido
- [ ] Documentar respuestas de autenticación

### Documentación de Endpoints por Rol

- [ ] Documentar todos los endpoints de Cliente
- [ ] Documentar todos los endpoints de Empleado
- [ ] Documentar todos los endpoints de Administrador
- [ ] Incluir ejemplos de request/response para cada endpoint

### Documentación de Códigos de Error

- [ ] Documentar código 400 - Bad Request
- [ ] Documentar código 401 - Unauthorized
- [ ] Documentar código 403 - Forbidden
- [ ] Documentar código 404 - Not Found
- [ ] Documentar código 500 - Internal Server Error
- [ ] Incluir ejemplos de respuestas de error

### Documentación de Validaciones

- [ ] Documentar todas las validaciones de campos
- [ ] Documentar formatos esperados (fechas, emails, etc.)
- [ ] Documentar rangos numéricos permitidos

## 🧪 TESTING Y REFINAMIENTO

### Testing de Autenticación

- [ ] Testear login exitoso para cada rol
- [ ] Testear login fallido (credenciales incorrectas)
- [ ] Testear acceso sin token
- [ ] Testear acceso con token expirado
- [ ] Testear acceso con rol incorrecto

### Testing de Endpoints por Rol

- [ ] Testear todos los endpoints de Cliente
- [ ] Verificar que Cliente no pueda acceder a endpoints de Empleado
- [ ] Testear todos los endpoints de Empleado
- [ ] Verificar que Empleado no pueda acceder a endpoints de Admin
- [ ] Testear todos los endpoints de Administrador

### Testing de Validaciones

- [ ] Testear validaciones de campos obligatorios
- [ ] Testear validaciones de formatos (email, teléfono)
- [ ] Testear validaciones de rangos numéricos
- [ ] Testear validaciones de fechas

### Testing de Reglas de Negocio

- [ ] Testear que solo admin puede modificar reservas
- [ ] Testear funcionamiento del soft delete
- [ ] Testear validación de disponibilidad de salones
- [ ] Testear generación de estadísticas solo via SP

### Testing de Reportes y Notificaciones

- [ ] Testear generación de PDFs
- [ ] Testear generación de CSVs
- [ ] Testear envío de notificaciones por email
- [ ] Testear manejo de errores en notificaciones

### Optimización y Performance

- [ ] Revisar consultas SQL para optimización
- [ ] Implementar índices necesarios en base de datos
- [ ] Testear rendimiento con datos de prueba masivos
- [ ] Optimizar consultas de reportes
- [ ] Implementar paginación en listados grandes

## 📝 ASPECTOS TÉCNICOS COMPLETADOS

✅ Framework Express.js configurado  
✅ Estructura base del proyecto creada  
✅ Configuración de base de datos (db.js)  
✅ Middleware de validación de sesión básico  
✅ Controladores y servicios base para usuarios y salones  
✅ Sistema de vistas con Handlebars

---

**Nota**: Este TODO está basado en los requisitos funcionales y técnicos del Trabajo Final Integrador. Cada item debe completarse respetando las restricciones y reglas de negocio establecidas.
