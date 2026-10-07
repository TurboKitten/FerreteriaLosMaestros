import {
  CUENTAS_INICIALES,
  PRODUCTOS_INICIALES,
  USUARIOS_INICIALES,
} from '../data/tienda'

export const CLAVES = {
  productos: 'admin_productos',
  usuarios: 'admin_usuarios',
  cuentas: 'admin_cuentas',
  pedidos: 'admin_pedidos',
  sesion: 'sesionActiva',
}

export function leerJSON(clave, valorInicial = []) {
  try {
    const datos = localStorage.getItem(clave)
    return datos ? JSON.parse(datos) : valorInicial
  } catch (error) {
    console.error(`No se pudieron leer los datos: ${clave}`, error)
    return valorInicial
  }
}

export function escribirJSON(clave, datos) {
  localStorage.setItem(clave, JSON.stringify(datos))
}


export function cargarProductos() {
  return leerJSON(CLAVES.productos, PRODUCTOS_INICIALES)
}
export function guardarProductos(productos) {
  escribirJSON(CLAVES.productos, productos)
}


export function cargarUsuarios() {
  return leerJSON(CLAVES.usuarios, USUARIOS_INICIALES)
}
export function guardarUsuarios(usuarios) {
  escribirJSON(CLAVES.usuarios, usuarios)
}


export function cargarCuentas() {
  return leerJSON(CLAVES.cuentas, CUENTAS_INICIALES)
}
export function guardarCuentas(cuentas) {
  escribirJSON(CLAVES.cuentas, cuentas)
}

export function cargarPedidos() {
  return leerJSON(CLAVES.pedidos, [])
}
export function guardarPedidos(pedidos) {
  escribirJSON(CLAVES.pedidos, pedidos)
}


export function obtenerSesion() {
  return leerJSON(CLAVES.sesion, null)
}
export function iniciarSesion(usuario) {
  escribirJSON(CLAVES.sesion, {
    nombre: usuario.nombre,
    usuario: usuario.usuario,
    rol: usuario.rol,
  })
}
export function cerrarSesion() {
  localStorage.removeItem(CLAVES.sesion)
  notificarSesion()
}


export function notificarSesion() {
  window.dispatchEvent(new Event('ferreteria:sesion'))
}


export function obtenerClaveCarrito() {
  const sesion = obtenerSesion()
  return sesion ? `carrito_${sesion.usuario}` : 'carrito_invitado'
}
export function cargarCarrito() {
  return leerJSON(obtenerClaveCarrito(), [])
}
export function guardarCarrito(carrito) {
  escribirJSON(obtenerClaveCarrito(), carrito)
}

export function inicializarDatos() {
  if (!localStorage.getItem(CLAVES.productos)) {
    guardarProductos(PRODUCTOS_INICIALES)
  }
  if (!localStorage.getItem(CLAVES.usuarios)) {
    guardarUsuarios(USUARIOS_INICIALES)
  }
  if (!localStorage.getItem(CLAVES.cuentas)) {
    guardarCuentas(CUENTAS_INICIALES)
  }
}


export const ROLES_CLIENTE = ['Cliente', 'Usuario', 'Contratista']

export function esRolCliente(rol) {
  return ROLES_CLIENTE.includes(rol)
}