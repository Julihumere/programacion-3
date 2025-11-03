# Tasks - Sistema de Gestión Trampolín Park

## 📋 Funcionalidades por Rol de Usuario

---

## 👤 CLIENTE

### Autenticación cliente

- [x] Iniciar sesión (autenticación)
- [x] Registro de nuevo cliente

### Reservas

- [ ] Crear reserva // LAUCHA
- [ ] Listar mis reservas // LAUCHA

### Consultas (solo lectura)

- [x] Listar salones disponibles
- [x] Listar servicios disponibles
- [x] Listar turnos disponibles

### Notificaciones

- [ ] Recibir notificación automática cuando se confirma una reserva // LAUCHA

---

## 👔 EMPLEADO

### Autenticación empleado

- [x] Iniciar sesión (autenticación)

### Consultas

- [ ] Listar reservas (todas) // LAUCHA
- [ ] Listar clientes // LAUCHA

### BREAD - Salones

- [x] **B**rowse - Listar todos los salones
- [x] **R**ead - Ver detalle de un salón
- [x] **E**dit - Editar un salón existente
- [x] **A**dd - Crear nuevo salón
- [x] **D**elete - Eliminar un salón

### BREAD - Servicios

- [x] **B**rowse - Listar todos los servicios
- [x] **R**ead - Ver detalle de un servicio
- [x] **E**dit - Editar un servicio existente
- [x] **A**dd - Crear nuevo servicio
- [x] **D**elete - Eliminar un servicio

### BREAD - Turnos

- [x] **B**rowse - Listar todos los turnos
- [x] **R**ead - Ver detalle de un turno
- [x] **E**dit - Editar un turno existente
- [x] **A**dd - Crear nuevo turno
- [x] **D**elete - Eliminar un turno

---

## 🔑 ADMINISTRADOR

### Autenticación

- [x] Iniciar sesión (autenticación)

### BREAD - Reservas

- [ ] **B**rowse - Listar todas las reservas // LAUCHA
- [ ] **R**ead - Ver detalle de una reserva // LAUCHA
- [ ] **E**dit - Editar una reserva existente // LAUCHA
- [ ] **A**dd - Crear nueva reserva // LAUCHA
- [ ] **D**elete - Eliminar una reserva // LAUCHA

### BREAD - Salones

- [x] **B**rowse - Listar todos los salones
- [x] **R**ead - Ver detalle de un salón
- [x] **E**dit - Editar un salón existente
- [x] **A**dd - Crear nuevo salón
- [x] **D**elete - Eliminar un salón

### BREAD - Servicios

- [x] **B**rowse - Listar todos los servicios
- [x] **R**ead - Ver detalle de un servicio
- [x] **E**dit - Editar un servicio existente
- [x] **A**dd - Crear nuevo servicio
- [x] **D**elete - Eliminar un servicio

### BREAD - Turnos

- [x] **B**rowse - Listar todos los turnos
- [x] **R**ead - Ver detalle de un turno
- [x] **E**dit - Editar un turno existente
- [x] **A**dd - Crear nuevo turno
- [x] **D**elete - Eliminar un turno

### BREAD - Usuarios

- [x] **B**rowse - Listar todos los usuarios
- [ ] **R**ead - Ver detalle de un usuario // JULIO
- [ ] **E**dit - Editar un usuario existente // JULIO
- [ ] **A**dd - Crear nuevo usuario // JULIO
- [ ] **D**elete - Eliminar un usuario // JULIO

### Informes y Reportes

- [ ] Generar informes estadísticos (mediante procedimientos almacenados) // JULIO
- [ ] Generar reporte de reservas en formato PDF // JULIO
- [ ] Generar reporte de reservas en formato CSV // JULIO
- [ ] Generar reporte de reservas en otros formatos (No JSON) // JULIO

### Notificaciones

- [ ] Recibir notificación automática cuando se realiza una reserva // LAUCHA

---

## 🔧 Tareas Técnicas Generales

### Base de Datos

- [ ] Crear/actualizar procedimientos almacenados para informes estadísticos // JULIO
- [ ] Optimizar consultas de base de datos // JULIO
- [ ] Crear índices necesarios // JULIO

### Seguridad

- [x] Implementar middleware de autorización por rol
- [x] Validar permisos en cada endpoint
- [x] Sanitizar inputs (express-validator) ✅
- [x] Implementar rate limiting

### Sistema de Notificaciones

- [x] Configurar servicio de email para notificaciones ✅ (nodemailer instalado)
- [x] Crear plantillas de email para confirmación de reserva
- [x] Crear plantillas de email para notificación de nueva reserva (admin)
- [-] Implementar cola de emails (opcional)

### Generación de Reportes

- [ ] Instalar librería para generación de PDF (ej: pdfkit, puppeteer)
- [ ] Instalar librería para generación de CSV (ej: fast-csv, json2csv)
- [ ] Crear templates para reportes PDF
- [ ] Implementar endpoint para descargar reportes

### Testing

- [ ] Configurar framework de testing (Jest/Mocha)
- [ ] Crear tests unitarios para servicios
- [ ] Crear tests de integración para endpoints
- [ ] Crear tests para validaciones

### Documentación

- [ ] Documentar API con Swagger/OpenAPI
- [ ] Crear documentación de uso para cada rol
- [ ] Documentar proceso de instalación y configuración

---

## 📊 Estado del Proyecto

### ✅ Completado

- Estructura base del proyecto
- Configuración de base de datos
- Sistema de autenticación con JWT y Passport
- Express-validator implementado para validaciones de usuarios
- Nodemailer configurado para envío de emails
- CRUD básico de usuarios, salones, servicios y turnos

### 🚧 En Progreso

- Validaciones con express-validator para todas las entidades

### ⏳ Pendiente

- Sistema completo de autorizaciones por rol
- Gestión completa de reservas
- Generación de reportes PDF/CSV
- Procedimientos almacenados para estadísticas
- Sistema de notificaciones automáticas

---

## 🎯 Prioridades

### Alta Prioridad

1. Implementar sistema de autorización por roles
2. Completar BREAD de reservas
3. Sistema de notificaciones automáticas

### Media Prioridad

1. Generación de reportes PDF/CSV
2. Procedimientos almacenados para estadísticas
3. Validaciones completas con express-validator

### Baja Prioridad

1. Testing completo
2. Documentación con Swagger
3. Optimizaciones de rendimiento

---

**Última actualización:** 3 de noviembre, 2025
