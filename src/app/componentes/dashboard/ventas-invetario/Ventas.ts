interface Cliente {
    id_cliente: number;
    nombre: string;
    correo: string;
  }
  
  interface DetalleVenta {
    id_producto: number;
    nombre_producto: string;
    precio_unitario: number;
    cantidad: number;
    subtotal: number;
  }
  
  export interface Venta {
    id_venta: number;
    fecha: string;
    cliente: Cliente;
    detalle_venta: DetalleVenta[];
    total_venta: number;
  }
  
  export const ventas: Venta[] = [
    {
      id_venta: 1,
      fecha: "2023-06-01",
      cliente: {
        id_cliente: 1,
        nombre: "Juan Pérez",
        correo: "juan@example.com",
      },
      detalle_venta: [
        {
          id_producto: 1,
          nombre_producto: "Martillos",
          precio_unitario: 25.99,
          cantidad: 2,
          subtotal: 51.98,
        },
        {
          id_producto: 2,
          nombre_producto: "Taladro",
          precio_unitario: 39.99,
          cantidad: 1,
          subtotal: 39.99,
        },
      ],
      total_venta: 91.97,
    },
    {
      id_venta: 2,
      fecha: "2023-06-02",
      cliente: {
        id_cliente: 2,
        nombre: "María López",
        correo: "maria@example.com",
      },
      detalle_venta: [
        {
          id_producto: 3,
          nombre_producto: "Protoboard",
          precio_unitario: 59.99,
          cantidad: 1,
          subtotal: 59.99,
        },
      ],
      total_venta: 59.99,
    },
    // Agrega más elementos de venta de ferreterías aquí...
    {
      id_venta: 3,
      fecha: "2023-06-03",
      cliente: {
        id_cliente: 3,
        nombre: "Carlos Gómez",
        correo: "carlos@example.com",
      },
      detalle_venta: [
        {
          id_producto: 4,
          nombre_producto: "Destornilladores",
          precio_unitario: 12.99,
          cantidad: 3,
          subtotal: 38.97,
        },
        {
          id_producto: 5,
          nombre_producto: "Llaves ajustables",
          precio_unitario: 19.99,
          cantidad: 2,
          subtotal: 39.98,
        },
      ],
      total_venta: 78.95,
    },
    {
      id_venta: 4,
      fecha: "2023-06-04",
      cliente: {
        id_cliente: 4,
        nombre: "Laura Rodríguez",
        correo: "laura@example.com",
      },
      detalle_venta: [
        {
          id_producto: 6,
          nombre_producto: "Sierra eléctrica",
          precio_unitario: 89.99,
          cantidad: 1,
          subtotal: 89.99,
        },
      ],
      total_venta: 89.99,
    },
    {
      id_venta: 5,
      fecha: "2023-06-05",
      cliente: {
        id_cliente: 5,
        nombre: "Pedro Gutiérrez",
        correo: "pedro@example.com",
      },
      detalle_venta: [
        {
          id_producto: 7,
          nombre_producto: "Cinta métrica",
          precio_unitario: 9.99,
          cantidad: 5,
          subtotal: 49.95,
        },
      ],
      total_venta: 49.95,
    },
    {
      id_venta: 6,
      fecha: "2023-06-06",
      cliente: {
        id_cliente: 6,
        nombre: "Ana Martínez",
        correo: "ana@example.com",
      },
      detalle_venta: [
        {
          id_producto: 8,
          nombre_producto: "Clavos",
          precio_unitario: 5.99,
          cantidad: 10,
          subtotal: 59.90,
        },
        {
          id_producto: 9,
          nombre_producto: "Lija",
          precio_unitario: 3.99,
          cantidad: 5,
          subtotal: 19.95,
        },
      ],
      total_venta: 79.85,
    },
    {
      id_venta: 7,
      fecha: "2023-06-07",
      cliente: {
        id_cliente: 7,
        nombre: "Roberto Sánchez",
        correo: "roberto@example.com",
      },
      detalle_venta: [
        {
          id_producto: 10,
          nombre_producto: "Pintura",
          precio_unitario: 15.99,
          cantidad: 2,
          subtotal: 31.98,
        },
        {
          id_producto: 11,
          nombre_producto: "Brochas",
          precio_unitario: 8.99,
          cantidad: 3,
          subtotal: 26.97,
        },
      ],
      total_venta: 58.95,
    },
    {
      id_venta: 8,
      fecha: "2023-06-08",
      cliente: {
        id_cliente: 8,
        nombre: "Isabel Torres",
        correo: "isabel@example.com",
      },
      detalle_venta: [
        {
          id_producto: 12,
          nombre_producto: "Tornillos",
          precio_unitario: 6.99,
          cantidad: 8,
          subtotal: 55.92,
        },
      ],
      total_venta: 55.92,
    },
    {
      id_venta: 9,
      fecha: "2023-06-09",
      cliente: {
        id_cliente: 9,
        nombre: "Jorge Ramírez",
        correo: "jorge@example.com",
      },
      detalle_venta: [
        {
          id_producto: 13,
          nombre_producto: "Escalera",
          precio_unitario: 79.99,
          cantidad: 1,
          subtotal: 79.99,
        },
        {
          id_producto: 14,
          nombre_producto: "Llave inglesa",
          precio_unitario: 14.99,
          cantidad: 2,
          subtotal: 29.98,
        },
      ],
      total_venta: 109.97,
    },
    {
      id_venta: 10,
      fecha: "2023-06-10",
      cliente: {
        id_cliente: 10,
        nombre: "Sofía Castro",
        correo: "sofia@example.com",
      },
      detalle_venta: [
        {
          id_producto: 15,
          nombre_producto: "Pegamento",
          precio_unitario: 7.99,
          cantidad: 3,
          subtotal: 23.97,
        },
        {
          id_producto: 16,
          nombre_producto: "Cerradura",
          precio_unitario: 24.99,
          cantidad: 1,
          subtotal: 24.99,
        },
      ],
      total_venta: 48.96,
    },
  ];
  