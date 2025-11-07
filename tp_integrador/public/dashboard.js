// Configuración
const API_BASE_URL = 'http://localhost:3000/api/v1';
const TOKEN_KEY = 'auth_token';

// Estado global
let reservasData = [];
let salones = new Set();
let clientes = new Set();

// Elementos del DOM
const salonFilter = document.getElementById('salonFilter');
const clienteFilter = document.getElementById('clienteFilter');
const btnRefresh = document.getElementById('btnRefresh');
const btnDownloadCSV = document.getElementById('btnDownloadCSV');
const errorMessage = document.getElementById('errorMessage');

// Estadísticas
const totalReservasEl = document.getElementById('totalReservas');
const totalServiciosEl = document.getElementById('totalServicios');
const totalSalonesEl = document.getElementById('totalSalones');
const totalGeneralEl = document.getElementById('totalGeneral');

// Tabla
const reservasTableBody = document.querySelector('#reservasTable tbody');

async function verificarAutenticacion() {
    const token = localStorage.getItem(TOKEN_KEY);
    
    if (!token) {
        await mostrarLogin();
    }
    
    return localStorage.getItem(TOKEN_KEY);
}

async function mostrarLogin() {
    const nombre_usuario = prompt('Nombre de usuario:');
    if (!nombre_usuario) {
        alert('Debe ingresar un nombre de usuario');
        window.location.reload();
        return;
    }

    const contrasenia = prompt('Contraseña:');
    if (!contrasenia) {
        alert('Debe ingresar una contraseña');
        window.location.reload();
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/auth/iniciar_sesion`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre_usuario, contrasenia })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.mensaje || 'Credenciales inválidas');
        }

        const data = await response.json();
        
        if (data.token) {
            localStorage.setItem(TOKEN_KEY, data.token);
            alert('¡Sesión iniciada correctamente!');
        } else {
            throw new Error('No se recibió el token');
        }

    } catch (error) {
        alert('Error al iniciar sesión: ' + error.message);
        window.location.reload();
    }
}

function getAuthToken() {
    return localStorage.getItem(TOKEN_KEY);
}


async function cargarDatos(salonId = null) {
    try {
        errorMessage.style.display = 'none';
        mostrarCargando();

        const token = getAuthToken();
        if (!token) {
            throw new Error('No se encontró token de autenticación');
        }

        const url = salonId 
            ? `${API_BASE_URL}/informes/reservas?salon_id=${salonId}`
            : `${API_BASE_URL}/informes/reservas`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            if (response.status === 401 || response.status === 403) {
                throw new Error('No autorizado. Verifique su sesión.');
            }
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        
        if (data.estado === 'success' && data.data) {
            reservasData = data.data;
            procesarDatos();
            renderizarTabla();
            actualizarFiltroSalones();
            actualizarFiltroClientes();
        } else {
            throw new Error('Formato de respuesta inválido');
        }

    } catch (error) {
        console.error('Error al cargar datos:', error);
        mostrarError(error.message);
    }
}


function procesarDatos() {
    const totalReservas = reservasData.length;
    
    const totalServicios = reservasData.reduce((sum, r) => 
        sum + parseFloat(r.total_servicios || 0), 0
    );
    
    const totalSalones = reservasData.reduce((sum, r) => 
        sum + parseFloat(r.importe_salon || 0), 0
    );
    
    const totalGeneral = reservasData.reduce((sum, r) => 
        sum + parseFloat(r.importe_total || 0), 0
    );

    // Actualizar UI
    totalReservasEl.textContent = totalReservas;
    totalServiciosEl.textContent = formatearMoneda(totalServicios);
    totalSalonesEl.textContent = formatearMoneda(totalSalones);
    totalGeneralEl.textContent = formatearMoneda(totalGeneral);
}


function renderizarTabla() {
    if (reservasData.length === 0) {
        reservasTableBody.innerHTML = `
            <tr>
                <td colspan="9" class="loading">No hay reservas para mostrar</td>
            </tr>
        `;
        return;
    }

    reservasTableBody.innerHTML = reservasData.map(reserva => `
        <tr>
            <td>${reserva.reserva_id || '-'}</td>
            <td>${formatearFecha(reserva.fecha_reserva)}</td>
            <td>${reserva.tematica || '-'}</td>
            <td>${reserva.salon_nombre || '-'}</td>
            <td>${reserva.turno_hora_inicio || '-'} - ${reserva.turno_hora_fin || '-'}</td>
            <td>${reserva.cliente_nombre_completo || '-'}</td>
            <td>${reserva.cliente_email || '-'}</td>
            <td>${reserva.cantidad_servicios || 0}</td>
            <td><strong>${formatearMoneda(reserva.importe_total)}</strong></td>
        </tr>
    `).join('');
}


function actualizarFiltroSalones() {
    salones.clear();
    reservasData.forEach(r => {
        if (r.salon_nombre) {
            salones.add(r.salon_nombre);
        }
    });

    // Reconstruir opciones del select
    const opcionesActuales = salonFilter.value;
    salonFilter.innerHTML = '<option value="">Todos los salones</option>';
    
    Array.from(salones).sort().forEach(salon => {
        const option = document.createElement('option');
        option.value = salon;
        option.textContent = salon;
        salonFilter.appendChild(option);
    });

    salonFilter.value = opcionesActuales;
}


function actualizarFiltroClientes() {
    clientes.clear();
    reservasData.forEach(r => {
        if (r.cliente_nombre_completo) {
            clientes.add(r.cliente_nombre_completo);
        }
    });

    // Reconstruir opciones del select
    const opcionesActuales = clienteFilter.value;
    clienteFilter.innerHTML = '<option value="">Todos los clientes</option>';
    
    Array.from(clientes).sort().forEach(cliente => {
        const option = document.createElement('option');
        option.value = cliente;
        option.textContent = cliente;
        clienteFilter.appendChild(option);
    });

    clienteFilter.value = opcionesActuales;
}


async function descargarCSV() {
    try {
        const token = getAuthToken();
        if (!token) {
            alert('No se encontró token de autenticación');
            return;
        }

        const salonId = salonFilter.value || '';
        const url = salonId 
            ? `${API_BASE_URL}/informes/descargar?salon_id=${salonId}`
            : `${API_BASE_URL}/informes/descargar`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`Error al descargar: ${response.statusText}`);
        }

        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = `informe_reservas_${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(downloadUrl);

    } catch (error) {
        console.error('Error al descargar CSV:', error);
        alert('Error al descargar el archivo CSV');
    }
}

function formatearFecha(fecha) {
    if (!fecha) return '-';
    const date = new Date(fecha);
    return date.toLocaleDateString('es-AR');
}

function formatearMoneda(valor) {
    if (valor === null || valor === undefined) return '$0.00';
    return `$${parseFloat(valor).toFixed(2)}`;
}

function mostrarCargando() {
    reservasTableBody.innerHTML = `
        <tr>
            <td colspan="9" class="loading">Cargando datos...</td>
        </tr>
    `;
}

function mostrarError(mensaje) {
    errorMessage.style.display = 'block';
    errorMessage.querySelector('p').textContent = `⚠️ ${mensaje}`;
    
    reservasTableBody.innerHTML = `
        <tr>
            <td colspan="9" class="loading">Error al cargar los datos</td>
        </tr>
    `;
}

// Event Listeners
btnRefresh.addEventListener('click', () => {
    cargarDatos();
});

btnDownloadCSV.addEventListener('click', descargarCSV);

salonFilter.addEventListener('change', () => {
    aplicarFiltros();
});

clienteFilter.addEventListener('change', () => {
    aplicarFiltros();
});

function aplicarFiltros() {
    const salonSeleccionado = salonFilter.value;
    const clienteSeleccionado = clienteFilter.value;
    
    let datosFiltrados = [...reservasData];
    
    // Filtrar por salón
    if (salonSeleccionado) {
        datosFiltrados = datosFiltrados.filter(r => r.salon_nombre === salonSeleccionado);
    }
    
    // Filtrar por cliente
    if (clienteSeleccionado) {
        datosFiltrados = datosFiltrados.filter(r => r.cliente_nombre_completo === clienteSeleccionado);
    }
    
    // Guardar datos originales, aplicar filtros, y restaurar
    const tempData = reservasData;
    reservasData = datosFiltrados;
    renderizarTabla();
    procesarDatos();
    reservasData = tempData;
}

// Cargar datos al iniciar
document.addEventListener('DOMContentLoaded', async () => {
    await verificarAutenticacion();
    cargarDatos();
});
