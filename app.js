// Estado de la aplicaci�n
const state = {
    isLoggedIn: false,
    currentUser: null,
    cart: [],
    products: [
        {
            id: 1,
            name: "Sudadera 42",
            description: "Sudadera negra con logo de 42. Algodón premium, edición limitada.",
            price: 39.99,
            image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzMzIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSI0OCIgZmlsbD0iIzAwZmYwMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPvCfkYQ8L3RleHQ+PC9zdmc+",
            averageRating: 4.8,
            reviewCount: 127
        },
        {
            id: 2,
            name: "Taza 42",
            description: "Taza negra con logo de 42. Ideal para café o té.",
            price: 14.99,
            image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjNjY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSI0OCIgZmlsbD0iI2ZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPvCfkYQ8L3RleHQ+PC9zdmc+",
            averageRating: 4.6,
            reviewCount: 89
        },
        {
            id: 3,
            name: "Gorra 42",
            description: "Gorra negra con logo de 42. Ajustable y transpirable.",
            price: 24.99,
            image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMjIyIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSI0OCIgZmlsbD0iIzAwZmYwMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPvCfkYQ8L3RleHQ+PC9zdmc+",
            averageRating: 4.5,
            reviewCount: 94
        },
        {
            id: 4,
            name: "Camiseta 42",
            description: "Camiseta blanca con logo de 42 en verde neón.",
            price: 19.99,
            image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZmZmIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSI0OCIgZmlsbD0iIzAwZmYwMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPvCfkYQ8L3RleHQ+PC9zdmc+",
            averageRating: 4.7,
            reviewCount: 156
        },
        {
            id: 5,
            name: "Mochila 42",
            description: "Mochila negra resistente con detalles verdes y logo 42.",
            price: 49.99,
            image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjNDQ0Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSI0OCIgZmlsbD0iIzAwZmYwMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPvCfkYQ8L3RleHQ+PC9zdmc+",
            averageRating: 4.9,
            reviewCount: 203
        },
        {
            id: 6,
            name: "Llavero 42",
            description: "Llavero metálico con logo de 42. Pequeño y elegante.",
            price: 6.99,
            image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjOTk5Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSI0OCIgZmlsbD0iIzAwZmYwMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPvCfkYQ8L3RleHQ+PC9zdmc+"
        },
        {
            id: 7,
            name: "Pantalón 42",
            description: "Pantalón negro con detalles verdes y logo 42. Cómodo y moderno.",
            price: 59.99,
            image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzMzIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSI0OCIgZmlsbD0iIzAwZmYwMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPvCfkYQ8L3RleHQ+PC9zdmc+"
        },
        {
            id: 8,
            name: "Zapatillas 42",
            description: "Zapatillas deportivas con logo de 42. Perfectas para programar.",
            price: 89.99,
            image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjNjY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSI0OCIgZmlsbD0iIzAwZmYwMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPvCfkYQ8L3RleHQ+PC9zdmc+"
        },
        {
            id: 9,
            name: "Reloj 42",
            description: "Reloj inteligente con logo de 42. Tecnología y estilo.",
            price: 199.99,
            image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMjIyIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSI0OCIgZmlsbD0iIzAwZmYwMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPvCfkYQ8L3RleHQ+PC9zdmc+"
        },
        {
            id: 10,
            name: "Auriculares 42",
            description: "Auriculares inalámbricos con logo de 42. Sonido premium.",
            price: 79.99,
            image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjNDQ0Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSI0OCIgZmlsbD0iIzAwZmYwMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPvCfkYQ8L3RleHQ+PC9zdmc+"
        },
        {
            id: 11,
            name: "Bufanda 42",
            description: "Bufanda de lana con logo de 42. Calidez y estilo.",
            price: 29.99,
            image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjOTk5Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSI0OCIgZmlsbD0iIzAwZmYwMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPvCfkYQ8L3RleHQ+PC9zdmc+"
        },
        {
            id: 12,
            name: "Gafas 42",
            description: "Gafas de sol con logo de 42. Protección y moda.",
            price: 49.99,
            image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjNjY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSI0OCIgZmlsbD0iIzAwZmYwMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPvCfkYQ8L3RleHQ+PC9zdmc+"
        },
        {
            id: 13,
            name: "Chaqueta 42",
            description: "Chaqueta elegante con logo de 42. Perfecta para el invierno.",
            price: 89.99,
            image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjNDQ0Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSI0OCIgZmlsbD0iIzAwZmYwMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPvCfkYQ8L3RleHQ+PC9zdmc+"
        },
        {
            id: 14,
            name: "Pantalones 42",
            description: "Pantalones cómodos con diseño 42. Ideales para programar.",
            price: 65.99,
            image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzMzIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSI0OCIgZmlsbD0iIzAwZmYwMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPvCfkYQ8L3RleHQ+PC9zdmc+"
        },
        {
            id: 15,
            name: "Mochila 42",
            description: "Mochila resistente con logo de 42. Para tus aventuras.",
            price: 55.99,
            image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjNjY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSI0OCIgZmlsbD0iIzAwZmYwMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPvCfkYQ8L3RleHQ+PC9zdmc+"
        },
        {
            id: 16,
            name: "Zapatillas 42",
            description: "Zapatillas deportivas con estilo 42. Máxima comodidad.",
            price: 95.99,
            image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMjIyIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSI0OCIgZmlsbD0iIzAwZmYwMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPvCfkYQ8L3RleHQ+PC9zdmc+"
        },
        {
            id: 17,
            name: "Reloj 42",
            description: "Reloj inteligente con logo de 42. Tecnología avanzada.",
            price: 199.99,
            image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjOTk5Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSI0OCIgZmlsbD0iIzAwZmYwMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPvCfkYQ8L3RleHQ+PC9zdmc+"
        },
        {
            id: 18,
            name: "Bufanda 42",
            description: "Bufanda de lana con diseño 42. Calidez y estilo.",
            price: 35.99,
            image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjNjY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSI0OCIgZmlsbD0iIzAwZmYwMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPvCfkYQ8L3RleHQ+PC9zdmc+"
        },
        {
            id: 19,
            name: "Gorra 42",
            description: "Gorra ajustable con logo de 42. Estilo urbano.",
            price: 29.99,
            image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjNDQ0Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSI0OCIgZmlsbD0iIzAwZmYwMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPvCfkYQ8L3RleHQ+PC9zdmc+"
        },
        {
            id: 20,
            name: "Camiseta 42",
            description: "Camiseta básica con logo de 42. Algodón 100%.",
            price: 24.99,
            image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZmZmIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSI0OCIgZmlsbD0iIzAwZmYwMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPvCfkYQ8L3RleHQ+PC9zdmc+"
        },
        {
            id: 21,
            name: "Sudadera 42",
            description: "Sudadera con capucha y logo de 42. Cómoda y cálida.",
            price: 69.99,
            image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzMzIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSI0OCIgZmlsbD0iIzAwZmYwMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPvCfkYQ8L3RleHQ+PC9zdmc+"
        },
        {
            id: 22,
            name: "Pantalón 42",
            description: "Pantalón de mezclilla con logo de 42. Duradero y cómodo.",
            price: 79.99,
            image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjNjY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSI0OCIgZmlsbD0iIzAwZmYwMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPvCfkYQ8L3RleHQ+PC9zdmc+"
        },
        {
            id: 23,
            name: "Auriculares 42",
            description: "Auriculares inalámbricos con logo de 42. Sonido premium.",
            price: 89.99,
            image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjNDQ0Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSI0OCIgZmlsbD0iIzAwZmYwMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPvCfkYQ8L3RleHQ+PC9zdmc+"
        },
        {
            id: 24,
            name: "Taza 42",
            description: "Taza de cerámica con logo de 42. Perfecta para tu café.",
            price: 19.99,
            image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjOTk5Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSI0OCIgZmlsbD0iIzAwZmYwMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPvCfkYQ8L3RleHQ+PC9zdmc+"
        }
    ]
};

// Referencias DOM
const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');
const userArea = document.getElementById('userArea');
const userButton = document.getElementById('userButton');
const userDropdown = document.getElementById('userDropdown');
const userName = document.getElementById('userName');
const userAvatar = document.getElementById('userAvatar');
const cartButton = document.getElementById('cartButton');
const cart = document.getElementById('cart');
const cartBackdrop = document.getElementById('cartBackdrop');
const cartCount = document.getElementById('cartCount');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const authModal = document.getElementById('authModal');
const registerModal = document.getElementById('registerModal');
const settingsModal = document.getElementById('settingsModal');
const toast = document.getElementById('toast');

// Event Listeners
loginBtn?.addEventListener('click', () => openModal(authModal));
registerBtn?.addEventListener('click', () => openModal(registerModal));
cartButton?.addEventListener('click', toggleCart);
cartBackdrop?.addEventListener('click', hideCart);

document.addEventListener('click', (e) => {
    if (userDropdown && !userArea.contains(e.target)) {
        userDropdown.hidden = true;
    }
});

// Cerrar modales
document.querySelectorAll('[data-close]').forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('dialog');
        if (modal) modal.close();
    });
});

// Formularios
document.getElementById('loginForm')?.addEventListener('submit', handleLogin);
document.getElementById('registerForm')?.addEventListener('submit', handleRegister);
document.getElementById('settingsForm')?.addEventListener('submit', handleSettingsSave);

// Toggle dropdown de usuario
userButton?.addEventListener('click', () => {
    userDropdown.hidden = !userDropdown.hidden;
});

// Inicializar tienda - usando sistema local

// Acciones del dropdown
document.querySelectorAll('.dropdown__item').forEach(item => {
    item.addEventListener('click', () => {
        const action = item.dataset.action;
        handleDropdownAction(action);
        userDropdown.hidden = true;
    });
});

// Manejadores de eventos
function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('rememberMe')?.checked || false;

    showLoadingState(e.target.querySelector('button'));
    
    const submitButton = e.target.querySelector('button');
    
    // Timeout de seguridad (10 segundos)
    const timeoutId = setTimeout(() => {
        hideLoadingState(submitButton);
        showToast('Tiempo de espera agotado. Intenta de nuevo.', 'error');
    }, 10000);
    
    // Verificar si Firebase está disponible
    if (typeof firebase !== 'undefined' && firebase.auth) {
        // Usar Firebase para autenticación
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                
                // Configurar persistencia según la preferencia del usuario
                const persistence = rememberMe ? 
                    firebase.auth.Auth.Persistence.LOCAL : 
                    firebase.auth.Auth.Persistence.SESSION;
                
                firebase.auth().setPersistence(persistence).then(() => {
                    state.isLoggedIn = true;
                    state.currentUser = {
                        uid: user.uid,
                        name: user.displayName || user.email.split('@')[0],
                        email: user.email,
                        avatar: user.photoURL || null
                    };
                    updateUIForLoggedInUser();
                    authModal.close();
                    showToast('Sesión iniciada correctamente', 'success');
                    hideLoadingState(submitButton);
                    clearTimeout(timeoutId);
                });
            })
            .catch((error) => {
                hideLoadingState(submitButton);
                clearTimeout(timeoutId);
                console.error('Error de Firebase:', error);
                
                // Manejar errores específicos de Firebase
                let errorMessage = 'Error al iniciar sesión';
                switch (error.code) {
                    case 'auth/user-not-found':
                        errorMessage = 'Usuario no encontrado';
                        break;
                    case 'auth/wrong-password':
                        errorMessage = 'Contraseña incorrecta';
                        break;
                    case 'auth/invalid-email':
                        errorMessage = 'Email inválido';
                        break;
                    case 'auth/too-many-requests':
                        errorMessage = 'Demasiados intentos. Intenta más tarde';
                        break;
                    case 'auth/network-request-failed':
                        errorMessage = 'Error de conexión. Intenta de nuevo';
                        break;
                    default:
                        errorMessage = 'Error al iniciar sesión: ' + error.message;
                }
                showToast(errorMessage, 'error');
            });
    } else {
        // Fallback: login local si Firebase no está disponible
        console.log('Firebase no disponible, usando login local');
        
        // Simular login local
        setTimeout(() => {
            state.isLoggedIn = true;
            state.currentUser = {
                uid: 'local_user',
                name: email.split('@')[0],
                email: email,
                avatar: null
            };
            updateUIForLoggedInUser();
            authModal.close();
            showToast('Sesión iniciada correctamente (modo local)', 'success');
            hideLoadingState(submitButton);
            clearTimeout(timeoutId);
        }, 1000);
    }
}

function handleRegister(e) {
    e.preventDefault();
    const name = document.getElementById('regName').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;

    // Validaciones básicas
    if (!name || !email || !password) {
        showToast('Por favor completa todos los campos', 'error');
        return;
    }

    if (password.length < 6) {
        showToast('La contraseña debe tener al menos 6 caracteres', 'error');
        return;
    }

    const submitButton = e.target.querySelector('button');
    showLoadingState(submitButton);
    
    // Timeout de seguridad (10 segundos)
    const timeoutId = setTimeout(() => {
        hideLoadingState(submitButton);
        showToast('Tiempo de espera agotado. Intenta de nuevo.', 'error');
    }, 10000);
    
    // Verificar si Firebase está disponible
    if (typeof firebase !== 'undefined' && firebase.auth) {
        // Usar Firebase para registro
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                
                // Actualizar perfil con el nombre
                return user.updateProfile({
                    displayName: name
                }).then(() => {
                    state.isLoggedIn = true;
                    state.currentUser = {
                        uid: user.uid,
                        name: name,
                        email: user.email,
                        avatar: user.photoURL || null
                    };
                    updateUIForLoggedInUser();
                    registerModal.close();
                    showToast('Cuenta creada correctamente', 'success');
                    hideLoadingState(submitButton);
                    clearTimeout(timeoutId);
                });
            })
            .catch((error) => {
                hideLoadingState(submitButton);
                clearTimeout(timeoutId);
                console.error('Error de Firebase:', error);
                
                // Manejar errores específicos de Firebase
                let errorMessage = 'Error al crear cuenta';
                switch (error.code) {
                    case 'auth/email-already-in-use':
                        errorMessage = 'Este email ya está registrado';
                        break;
                    case 'auth/invalid-email':
                        errorMessage = 'Email inválido';
                        break;
                    case 'auth/weak-password':
                        errorMessage = 'La contraseña es muy débil';
                        break;
                    case 'auth/network-request-failed':
                        errorMessage = 'Error de conexión. Intenta de nuevo';
                        break;
                    default:
                        errorMessage = 'Error al crear cuenta: ' + error.message;
                }
                showToast(errorMessage, 'error');
            });
    } else {
        // Fallback: registro local si Firebase no está disponible
        console.log('Firebase no disponible, usando registro local');
        
        // Simular registro local
        setTimeout(() => {
            state.isLoggedIn = true;
            state.currentUser = {
                uid: 'local_' + Date.now(),
                name: name,
                email: email,
                avatar: null
            };
            updateUIForLoggedInUser();
            registerModal.close();
            showToast('Cuenta creada correctamente (modo local)', 'success');
            hideLoadingState(submitButton);
            clearTimeout(timeoutId);
        }, 1000);
    }
}

function handleSettingsSave(e) {
    e.preventDefault();
    const fullName = document.getElementById('fullName').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const postcode = document.getElementById('postcode').value;

    showLoadingState(e.target.querySelector('button'));
    setTimeout(() => {
        state.currentUser = {
            ...state.currentUser,
            name: fullName,
            phone,
            address,
            city,
            postcode
        };
        updateUIForLoggedInUser();
        settingsModal.close();
        showToast('Cambios guardados correctamente');
        hideLoadingState(e.target.querySelector('button'));
    }, 1000);
}

function handleDropdownAction(action) {
    switch (action) {
        case 'settings':
            openModal(settingsModal);
            fillSettingsForm();
            break;
        case 'orders':
            showToast('Pr�ximamente: Historial de pedidos');
            break;
        case 'logout':
            logout();
            break;
    }
}

// Utilidades
function openModal(modal) {
    if (modal instanceof HTMLDialogElement) {
        if (modal === settingsModal && !state.isLoggedIn) {
            showToast('Debes iniciar sesi�n primero');
            return;
        }
        modal.showModal();
    }
}

function toggleCart() {
    const isHidden = cart.getAttribute('aria-hidden') === 'true';
    cart.setAttribute('aria-hidden', !isHidden);
    cartBackdrop.classList.toggle('active', !isHidden);
}

function hideCart() {
    cart.setAttribute('aria-hidden', 'true');
    cartBackdrop.classList.remove('active');
}

function showToast(message, duration = 3000) {
    toast.textContent = message;
    toast.classList.add('active');
    setTimeout(() => {
        toast.classList.remove('active');
    }, duration);
}

function updateUIForLoggedInUser() {
    const user = state.currentUser;
    loginBtn.hidden = true;
    registerBtn.hidden = true;
    userArea.hidden = false;
    userName.textContent = user.name;
    if (user.avatar) {
        userAvatar.src = user.avatar;
    }
    
    // Actualizar navegación moderna si existe
    if (window.modernNav) {
        window.modernNav.updateUserUI(user);
    }
}

function fillSettingsForm() {
    if (!state.currentUser) return;
    
    const { name, phone, address, city, postcode } = state.currentUser;
    document.getElementById('fullName').value = name || '';
    document.getElementById('phone').value = phone || '';
    document.getElementById('address').value = address || '';
    document.getElementById('city').value = city || '';
    document.getElementById('postcode').value = postcode || '';
}

function logout() {
    firebase.auth().signOut().then(() => {
        state.isLoggedIn = false;
        state.currentUser = null;
        loginBtn.hidden = false;
        registerBtn.hidden = false;
        userArea.hidden = true;
        showToast('Sesión cerrada correctamente');
    }).catch((error) => {
        showToast('Error al cerrar sesión: ' + error.message);
    });
}

// Manejador de cambio de avatar
document.getElementById('avatarInput')?.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('avatarPreview').src = e.target.result;
            state.currentUser.avatar = e.target.result;
            userAvatar.src = e.target.result;
            showToast('Foto de perfil actualizada');
        };
        reader.readAsDataURL(file);
    }
});

// Funciones de carrito
function addToCart(product) {
    if (!state.isLoggedIn) {
        showToast('Debes iniciar sesi�n para a�adir productos al carrito');
        openModal(authModal);
        return;
    }
    
    const existingItem = state.cart.find(item => item.id === product.id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        state.cart.push({ ...product, quantity: 1 });
    }
    
    updateCartUI();
}

function removeFromCart(productId) {
    state.cart = state.cart.filter(item => item.id !== productId);
    updateCartUI();
}

function updateCartUI() {
    const newCount = state.cart.reduce((total, item) => total + item.quantity, 0);
    if (cartCount) {
        cartCount.textContent = newCount;
        // pulse animation
        cartCount.classList.remove('pulse');
        void cartCount.offsetWidth;
        cartCount.classList.add('pulse');
    }
    
    // Actualizar navegación moderna si existe
    if (window.modernNav) {
        window.modernNav.updateCartCount(newCount);
    }
    
    if (state.cart.length === 0) {
        cartItems.innerHTML = `
            <div class="cart__empty">
                <svg width="64" height="64" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" 
                          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
                </svg>
                <p>Tu carrito est� vac�o</p>
            </div>
        `;
    } else {
        cartItems.innerHTML = state.cart.map(item => {
            const unit = (window.currencyUtils && window.currencyUtils.formatPrice) ? window.currencyUtils.formatPrice(item.price) : `${item.price.toFixed(2)} €`;
            const lineTotalBase = item.price * item.quantity;
            const lineTotal = (window.currencyUtils && window.currencyUtils.formatPrice) ? window.currencyUtils.formatPrice(lineTotalBase) : `${lineTotalBase.toFixed(2)} €`;
            return `
            <div class="cart__item">
                <img src="${item.image}" alt="${item.name}" class="cart__item-image">
                <div class="cart__item-content">
                    <h3 class="cart__item-title">${item.name}</h3>
                    <p class="cart__item-price">${item.quantity} x ${unit} <span style="float:right;">${lineTotal}</span></p>
                </div>
                <button onclick="removeFromCart(${item.id})" class="button button--secondary" aria-label="Eliminar">
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </button>
            </div>
        `;
        }).join('');
    }

    const total = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = (window.currencyUtils && window.currencyUtils.formatPrice) ? window.currencyUtils.formatPrice(total) : `${total.toFixed(2)} €`;
    document.getElementById('checkout').disabled = total === 0;
}

// Renderizar productos
function renderProducts() {
    const catalog = document.getElementById('catalog');
    catalog.innerHTML = state.products.map(product => {
        const formatted = (window.currencyUtils && window.currencyUtils.formatPrice)
            ? window.currencyUtils.formatPrice(product.price)
            : `${product.price.toFixed(2)} €`;
        
        // Generar estrellas para el rating
        const stars = generateStars(product.averageRating || 0);
        const reviewCount = product.reviewCount || 0;
        
        return `
        <article class="card" tabindex="0" data-product-id="${product.id}">
            <img src="${product.image}" alt="${product.name}" class="card__image" onclick="showProductModal(${product.id})">
            <div class="card__content">
                <h2 class="card__title" onclick="showProductModal(${product.id})">${product.name}</h2>
                <p class="card__description">${product.description}</p>
                
                <!-- Rating y reseñas -->
                <div class="product-rating">
                    <div class="stars-display">${stars}</div>
                    <span class="rating-text">${(product.averageRating || 0).toFixed(1)} (${reviewCount})</span>
                </div>
                
                <div class="card__price" data-price="${product.price}">${formatted}</div>
                
                <!-- Selector de cantidad -->
                <div class="quantity-selector">
                    <button type="button" class="quantity-btn minus" onclick="changeQuantity(${product.id}, -1)">-</button>
                    <input type="number" id="qty-${product.id}" value="1" min="1" max="99" class="quantity-input" 
                           onchange="validateQuantity(${product.id})">
                    <button type="button" class="quantity-btn plus" onclick="changeQuantity(${product.id}, 1)">+</button>
                </div>
                
                <div class="card__actions">
                    <button onclick="addToCartWithQuantity(${product.id})" class="button button--primary button--full">Añadir al carrito</button>
                    <button class="button button--secondary" data-action="view-reviews" data-product-id="${product.id}" style="margin-top: 10px; width: 100%;">
                        <span>⭐</span> Ver Reseñas
                    </button>
                </div>
                
                <!-- Contenedor de reseñas -->
                <div class="reviews-container" id="reviews-${product.id}"></div>
            </div>
        </article>
    `;
    }).join('');
    
    // Inicializar reseñas para cada producto
    state.products.forEach(product => {
        const container = document.getElementById(`reviews-${product.id}`);
        if (container && window.reviewSystem) {
            window.reviewSystem.renderReviews(product.id, container);
        }
    });
}

// Generar estrellas para rating
function generateStars(rating) {
    const roundedRating = Math.round(rating * 2) / 2;
    return Array(5).fill(0).map((_, i) => {
        const starClass = i < roundedRating ? 'star--filled' : '';
        return `<span class="star ${starClass}">★</span>`;
    }).join('');
}

// Cambiar cantidad de producto
function changeQuantity(productId, delta) {
    const input = document.getElementById(`qty-${productId}`);
    if (input) {
        const currentValue = parseInt(input.value) || 1;
        const newValue = Math.max(1, Math.min(99, currentValue + delta));
        input.value = newValue;
    }
}

// Validar cantidad
function validateQuantity(productId) {
    const input = document.getElementById(`qty-${productId}`);
    if (input) {
        const value = parseInt(input.value) || 1;
        input.value = Math.max(1, Math.min(99, value));
    }
}

// Añadir al carrito con cantidad específica
function addToCartWithQuantity(productId, quantity = null) {
    const product = state.products.find(p => p.id === productId);
    if (!product) return;
    
    // Si no se proporciona cantidad, intentar obtenerla del input
    if (quantity === null) {
        const quantityInput = document.getElementById(`qty-${productId}`);
        quantity = parseInt(quantityInput?.value) || 1;
    }
    
    if (!state.isLoggedIn) {
        showToast('Debes iniciar sesión para añadir productos al carrito');
        openModal(authModal);
        return;
    }
    
    // Animar añadir al carrito
    if (window.animateAddToCart) {
        window.animateAddToCart(productId, quantity);
    }
    
    // Añadir la cantidad especificada
    for (let i = 0; i < quantity; i++) {
        addToCart(product);
    }
    
    // Resetear cantidad a 1
    if (quantityInput) {
        quantityInput.value = 1;
    }
    
    // Animación ya manejada por el sistema de animación del carrito
}

// Modal de producto - ahora manejado por el sistema de animaciones
// Esta función se sobrescribe en animations.js

window.changeModalQty = function(delta) {
    window.modalQty = Math.max(1, (window.modalQty || 1) + delta);
    const el = document.getElementById('modalQty');
    if (el) el.value = window.modalQty;
};

window.addModalToCart = function(productId) {
    const product = state.products.find(p => p.id === productId);
    if (!product) return;
    const qty = parseInt(window.modalQty || 1, 10);
    
    if (!state.isLoggedIn) {
        showToast('Debes iniciar sesión para añadir productos al carrito');
        document.getElementById('productModal').close();
        openModal(authModal);
        return;
    }
    
    // Animar añadir al carrito
    if (window.animateAddToCart) {
        window.animateAddToCart(productId, qty);
    }
    
    for (let i = 0; i < qty; i++) {
        addToCart(product);
    }
    
    // Animación ya manejada por el sistema de animación del carrito
    
    document.getElementById('productModal').close();
};

// Estados de carga
function showLoadingState(button) {
    if (!button) return;
    
    button.disabled = true;
    button.classList.add('loading');
    const originalText = button.textContent;
    button.dataset.originalText = originalText;
    button.textContent = 'Cargando...';
    
    // Añadir spinner visual
    button.innerHTML = '<span class="spinner"></span> Cargando...';
}

function hideLoadingState(button) {
    if (!button) return;
    
    button.disabled = false;
    button.classList.remove('loading');
    button.textContent = button.dataset.originalText || 'Enviar';
}

// Listener de Firebase para mantener sesión
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        state.isLoggedIn = true;
        state.currentUser = {
            uid: user.uid,
            name: user.displayName || user.email.split('@')[0],
            email: user.email,
            avatar: user.photoURL || null
        };
        updateUIForLoggedInUser();
    } else {
        state.isLoggedIn = false;
        state.currentUser = null;
        loginBtn.hidden = false;
        registerBtn.hidden = false;
        userArea.hidden = true;
    }
});

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    updateCartUI();
});

// Función para ir al checkout
function goToCheckout() {
    if (state.cart.length === 0) {
        showToast('Tu carrito está vacío', 'warning');
        return;
    }
    window.location.href = 'checkout.html';
}

// Hacer funciones disponibles globalmente
window.renderProducts = renderProducts;
window.updateCartUI = updateCartUI;
window.goToCheckout = goToCheckout;
window.addToCartWithQuantity = addToCartWithQuantity;

// Función para actualizar precios globalmente
window.updateAllPrices = function() {
    // Actualizar precios en productos
    const priceElements = document.querySelectorAll('.card__price');
    priceElements.forEach(el => {
        const productId = el.closest('.card')?.dataset?.id;
        if (productId) {
            const product = state.products.find(p => p.id === productId);
            if (product && window.formatPrice) {
                el.textContent = window.formatPrice(product.price);
            }
        }
    });
    
    // Actualizar precios en carrito
    if (window.updateCartUI) {
        window.updateCartUI();
    }
};

// Asegurar que los productos se rendericen
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        if (window.renderProducts) {
            window.renderProducts();
        }
    }, 100);
});

            phone,
            address,
            city,
            postcode
        };
        updateUIForLoggedInUser();
        settingsModal.close();
        showToast('Cambios guardados correctamente');
        hideLoadingState(e.target.querySelector('button'));
    }, 1000);
}

function handleDropdownAction(action) {
    switch (action) {
        case 'settings':
            openModal(settingsModal);
            fillSettingsForm();
            break;
        case 'orders':
            showToast('Pr�ximamente: Historial de pedidos');
            break;
        case 'logout':
            logout();
            break;
    }
}

// Utilidades
function openModal(modal) {
    if (modal instanceof HTMLDialogElement) {
        if (modal === settingsModal && !state.isLoggedIn) {
            showToast('Debes iniciar sesi�n primero');
            return;
        }
        modal.showModal();
    }
}

function toggleCart() {
    const isHidden = cart.getAttribute('aria-hidden') === 'true';
    cart.setAttribute('aria-hidden', !isHidden);
    cartBackdrop.classList.toggle('active', !isHidden);
}

function hideCart() {
    cart.setAttribute('aria-hidden', 'true');
    cartBackdrop.classList.remove('active');
}

function showToast(message, duration = 3000) {
    toast.textContent = message;
    toast.classList.add('active');
    setTimeout(() => {
        toast.classList.remove('active');
    }, duration);
}

function updateUIForLoggedInUser() {
    const user = state.currentUser;
    loginBtn.hidden = true;
    registerBtn.hidden = true;
    userArea.hidden = false;
    userName.textContent = user.name;
    if (user.avatar) {
        userAvatar.src = user.avatar;
    }
    
    // Actualizar navegación moderna si existe
    if (window.modernNav) {
        window.modernNav.updateUserUI(user);
    }
}

function fillSettingsForm() {
    if (!state.currentUser) return;
    
    const { name, phone, address, city, postcode } = state.currentUser;
    document.getElementById('fullName').value = name || '';
    document.getElementById('phone').value = phone || '';
    document.getElementById('address').value = address || '';
    document.getElementById('city').value = city || '';
    document.getElementById('postcode').value = postcode || '';
}

function logout() {
    firebase.auth().signOut().then(() => {
        state.isLoggedIn = false;
        state.currentUser = null;
        loginBtn.hidden = false;
        registerBtn.hidden = false;
        userArea.hidden = true;
        showToast('Sesión cerrada correctamente');
    }).catch((error) => {
        showToast('Error al cerrar sesión: ' + error.message);
    });
}

// Manejador de cambio de avatar
document.getElementById('avatarInput')?.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('avatarPreview').src = e.target.result;
            state.currentUser.avatar = e.target.result;
            userAvatar.src = e.target.result;
            showToast('Foto de perfil actualizada');
        };
        reader.readAsDataURL(file);
    }
});

// Funciones de carrito
function addToCart(product) {
    if (!state.isLoggedIn) {
        showToast('Debes iniciar sesi�n para a�adir productos al carrito');
        openModal(authModal);
        return;
    }
    
    const existingItem = state.cart.find(item => item.id === product.id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        state.cart.push({ ...product, quantity: 1 });
    }
    
    updateCartUI();
}

function removeFromCart(productId) {
    state.cart = state.cart.filter(item => item.id !== productId);
    updateCartUI();
}

function updateCartUI() {
    const newCount = state.cart.reduce((total, item) => total + item.quantity, 0);
    if (cartCount) {
        cartCount.textContent = newCount;
        // pulse animation
        cartCount.classList.remove('pulse');
        void cartCount.offsetWidth;
        cartCount.classList.add('pulse');
    }
    
    // Actualizar navegación moderna si existe
    if (window.modernNav) {
        window.modernNav.updateCartCount(newCount);
    }
    
    if (state.cart.length === 0) {
        cartItems.innerHTML = `
            <div class="cart__empty">
                <svg width="64" height="64" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" 
                          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
                </svg>
                <p>Tu carrito est� vac�o</p>
            </div>
        `;
    } else {
        cartItems.innerHTML = state.cart.map(item => {
            const unit = (window.currencyUtils && window.currencyUtils.formatPrice) ? window.currencyUtils.formatPrice(item.price) : `${item.price.toFixed(2)} €`;
            const lineTotalBase = item.price * item.quantity;
            const lineTotal = (window.currencyUtils && window.currencyUtils.formatPrice) ? window.currencyUtils.formatPrice(lineTotalBase) : `${lineTotalBase.toFixed(2)} €`;
            return `
            <div class="cart__item">
                <img src="${item.image}" alt="${item.name}" class="cart__item-image">
                <div class="cart__item-content">
                    <h3 class="cart__item-title">${item.name}</h3>
                    <p class="cart__item-price">${item.quantity} x ${unit} <span style="float:right;">${lineTotal}</span></p>
                </div>
                <button onclick="removeFromCart(${item.id})" class="button button--secondary" aria-label="Eliminar">
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </button>
            </div>
        `;
        }).join('');
    }

    const total = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = (window.currencyUtils && window.currencyUtils.formatPrice) ? window.currencyUtils.formatPrice(total) : `${total.toFixed(2)} €`;
    document.getElementById('checkout').disabled = total === 0;
}

// Renderizar productos
function renderProducts() {
    const catalog = document.getElementById('catalog');
    catalog.innerHTML = state.products.map(product => {
        const formatted = (window.currencyUtils && window.currencyUtils.formatPrice)
            ? window.currencyUtils.formatPrice(product.price)
            : `${product.price.toFixed(2)} €`;
        
        // Generar estrellas para el rating
        const stars = generateStars(product.averageRating || 0);
        const reviewCount = product.reviewCount || 0;
        
        return `
        <article class="card" tabindex="0" data-product-id="${product.id}">
            <img src="${product.image}" alt="${product.name}" class="card__image" onclick="showProductModal(${product.id})">
            <div class="card__content">
                <h2 class="card__title" onclick="showProductModal(${product.id})">${product.name}</h2>
                <p class="card__description">${product.description}</p>
                
                <!-- Rating y reseñas -->
                <div class="product-rating">
                    <div class="stars-display">${stars}</div>
                    <span class="rating-text">${(product.averageRating || 0).toFixed(1)} (${reviewCount})</span>
                </div>
                
                <div class="card__price" data-price="${product.price}">${formatted}</div>
                
                <!-- Selector de cantidad -->
                <div class="quantity-selector">
                    <button type="button" class="quantity-btn minus" onclick="changeQuantity(${product.id}, -1)">-</button>
                    <input type="number" id="qty-${product.id}" value="1" min="1" max="99" class="quantity-input" 
                           onchange="validateQuantity(${product.id})">
                    <button type="button" class="quantity-btn plus" onclick="changeQuantity(${product.id}, 1)">+</button>
                </div>
                
                <div class="card__actions">
                    <button onclick="addToCartWithQuantity(${product.id})" class="button button--primary button--full">Añadir al carrito</button>
                    <button class="button button--secondary" data-action="view-reviews" data-product-id="${product.id}" style="margin-top: 10px; width: 100%;">
                        <span>⭐</span> Ver Reseñas
                    </button>
                </div>
                
                <!-- Contenedor de reseñas -->
                <div class="reviews-container" id="reviews-${product.id}"></div>
            </div>
        </article>
    `;
    }).join('');
    
    // Inicializar reseñas para cada producto
    state.products.forEach(product => {
        const container = document.getElementById(`reviews-${product.id}`);
        if (container && window.reviewSystem) {
            window.reviewSystem.renderReviews(product.id, container);
        }
    });
}

// Generar estrellas para rating
function generateStars(rating) {
    const roundedRating = Math.round(rating * 2) / 2;
    return Array(5).fill(0).map((_, i) => {
        const starClass = i < roundedRating ? 'star--filled' : '';
        return `<span class="star ${starClass}">★</span>`;
    }).join('');
}

// Cambiar cantidad de producto
function changeQuantity(productId, delta) {
    const input = document.getElementById(`qty-${productId}`);
    if (input) {
        const currentValue = parseInt(input.value) || 1;
        const newValue = Math.max(1, Math.min(99, currentValue + delta));
        input.value = newValue;
    }
}

// Validar cantidad
function validateQuantity(productId) {
    const input = document.getElementById(`qty-${productId}`);
    if (input) {
        const value = parseInt(input.value) || 1;
        input.value = Math.max(1, Math.min(99, value));
    }
}

// Añadir al carrito con cantidad específica
function addToCartWithQuantity(productId, quantity = null) {
    const product = state.products.find(p => p.id === productId);
    if (!product) return;
    
    // Si no se proporciona cantidad, intentar obtenerla del input
    if (quantity === null) {
        const quantityInput = document.getElementById(`qty-${productId}`);
        quantity = parseInt(quantityInput?.value) || 1;
    }
    
    if (!state.isLoggedIn) {
        showToast('Debes iniciar sesión para añadir productos al carrito');
        openModal(authModal);
        return;
    }
    
    // Animar añadir al carrito
    if (window.animateAddToCart) {
        window.animateAddToCart(productId, quantity);
    }
    
    // Añadir la cantidad especificada
    for (let i = 0; i < quantity; i++) {
        addToCart(product);
    }
    
    // Resetear cantidad a 1
    if (quantityInput) {
        quantityInput.value = 1;
    }
    
    // Animación ya manejada por el sistema de animación del carrito
}

// Modal de producto - ahora manejado por el sistema de animaciones
// Esta función se sobrescribe en animations.js

window.changeModalQty = function(delta) {
    window.modalQty = Math.max(1, (window.modalQty || 1) + delta);
    const el = document.getElementById('modalQty');
    if (el) el.value = window.modalQty;
};

window.addModalToCart = function(productId) {
    const product = state.products.find(p => p.id === productId);
    if (!product) return;
    const qty = parseInt(window.modalQty || 1, 10);
    
    if (!state.isLoggedIn) {
        showToast('Debes iniciar sesión para añadir productos al carrito');
        document.getElementById('productModal').close();
        openModal(authModal);
        return;
    }
    
    // Animar añadir al carrito
    if (window.animateAddToCart) {
        window.animateAddToCart(productId, qty);
    }
    
    for (let i = 0; i < qty; i++) {
        addToCart(product);
    }
    
    // Animación ya manejada por el sistema de animación del carrito
    
    document.getElementById('productModal').close();
};

// Estados de carga
function showLoadingState(button) {
    if (!button) return;
    
    button.disabled = true;
    button.classList.add('loading');
    const originalText = button.textContent;
    button.dataset.originalText = originalText;
    button.textContent = 'Cargando...';
    
    // Añadir spinner visual
    button.innerHTML = '<span class="spinner"></span> Cargando...';
}

function hideLoadingState(button) {
    if (!button) return;
    
    button.disabled = false;
    button.classList.remove('loading');
    button.textContent = button.dataset.originalText || 'Enviar';
}

// Listener de Firebase para mantener sesión
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        state.isLoggedIn = true;
        state.currentUser = {
            uid: user.uid,
            name: user.displayName || user.email.split('@')[0],
            email: user.email,
            avatar: user.photoURL || null
        };
        updateUIForLoggedInUser();
    } else {
        state.isLoggedIn = false;
        state.currentUser = null;
        loginBtn.hidden = false;
        registerBtn.hidden = false;
        userArea.hidden = true;
    }
});

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    updateCartUI();
});

// Función para ir al checkout
function goToCheckout() {
    if (state.cart.length === 0) {
        showToast('Tu carrito está vacío', 'warning');
        return;
    }
    window.location.href = 'checkout.html';
}

// Hacer funciones disponibles globalmente
window.renderProducts = renderProducts;
window.updateCartUI = updateCartUI;
window.goToCheckout = goToCheckout;
window.addToCartWithQuantity = addToCartWithQuantity;

// Función para actualizar precios globalmente
window.updateAllPrices = function() {
    // Actualizar precios en productos
    const priceElements = document.querySelectorAll('.card__price');
    priceElements.forEach(el => {
        const productId = el.closest('.card')?.dataset?.id;
        if (productId) {
            const product = state.products.find(p => p.id === productId);
            if (product && window.formatPrice) {
                el.textContent = window.formatPrice(product.price);
            }
        }
    });
    
    // Actualizar precios en carrito
    if (window.updateCartUI) {
        window.updateCartUI();
    }
};

// Asegurar que los productos se rendericen
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        if (window.renderProducts) {
            window.renderProducts();
        }
    }, 100);
});
