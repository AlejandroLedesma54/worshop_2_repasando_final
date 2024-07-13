let habitaciones = [];
let reservas = [];
let roomTypes = [];

// Función para cargar datos iniciales
async function cargarDatos() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        habitaciones = data.rooms || [];
        roomTypes = data.roomTypes || [];
        reservas = []; // Asumiendo que no tienes reservas iniciales en el JSON
        console.log("Datos cargados correctamente.");
    } catch (error) {
        console.error("Error al cargar los datos:", error);
    }
}

// Mostrar habitaciones disponibles según la fecha seleccionada
function mostrarHabitacionesDisponibles() {
    const fechaInicio = new Date(document.getElementById('fechaInicio').value);
    const fechaFin = new Date(document.getElementById('fechaFin').value);
    const contenedor = document.getElementById('habitacionesDisponibles');
    contenedor.innerHTML = '';

    // Filtro para verificar la disponibilidad de la habitación en las fechas seleccionadas
    const disponibles = habitaciones.filter(habitacion => {
        return reservas.every(reserva => {
            const inicioReserva = new Date(reserva.fechaInicio);
            const finReserva = new Date(reserva.fechaFin);
            return reserva.habitacionId !== habitacion.number ||
                   (fechaFin <= inicioReserva || fechaInicio >= finReserva);
        });
    });

    disponibles.forEach(habitacion => {
        const habitacionTipo = roomTypes.find(type => type.id === habitacion.roomTypeId);
        const radioBtn = `<label><input type="radio" name="habitacion" value="${habitacion.number}"> ${habitacionTipo.name} - Room ${habitacion.number}, Price per night: $${habitacion.priceNight}</label><br>`;
        contenedor.innerHTML += radioBtn;
    });
}

// Crear una reserva para la habitación seleccionada
function crearReserva() {
    const seleccionada = document.querySelector('input[name="habitacion"]:checked');
    if (!seleccionada) {
        alert("Por favor, seleccione una habitación.");
        return;
    }
    const habitacionId = seleccionada.value;
    const nombre = document.getElementById('nombreReserva').value;
    const fechaInicio = document.getElementById('fechaInicio').value;
    const fechaFin = document.getElementById('fechaFin').value;

    if (!nombre || !fechaInicio || !fechaFin) {
        alert("Por favor, complete todos los campos para realizar la reserva.");
        return;
    }

    const nuevaReserva = {
        id: reservas.length + 1,
        habitacionId: parseInt(habitacionId),
        fechaInicio,
        fechaFin,
        huesped: nombre
    };

    reservas.push(nuevaReserva);
    alert("Reserva creada con éxito!");
    mostrarHabitacionesDisponibles(); // Actualizar la lista de habitaciones disponibles
}

// Consultar reservas por nombre
function consultarReservasPorNombre() {
    const nombreBusqueda = document.getElementById('buscarNombre').value.toLowerCase();
    const contenedor = document.getElementById('reservasConsultadas');
    contenedor.innerHTML = '';

    const resultados = reservas.filter(reserva => reserva.huesped.toLowerCase().includes(nombreBusqueda));
    resultados.forEach(reserva => {
        const detalle = `<p>Reserva ${reserva.id} a nombre de ${reserva.huesped}, desde ${reserva.fechaInicio} hasta ${reserva.fechaFin}</p>`;
        contenedor.innerHTML += detalle;
    });
}

document.addEventListener('DOMContentLoaded', cargarDatos);
