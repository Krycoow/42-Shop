// Reseñas profesionales predefinidas para productos

const professionalReviews = {
    1: [ // Sudadera 42
        {
            userName: "María González",
            rating: 5,
            date: "2024-01-15",
            comment: "¡Increíble calidad! La sudadera es súper cómoda y el logo se ve perfecto. La tela es de primera calidad y no se encoge en la lavadora. Definitivamente repetiré.",
            verified: true,
            helpful: 12
        },
        {
            userName: "Carlos Ruiz",
            rating: 5,
            date: "2024-01-10",
            comment: "Perfecta para programar. La comodidad es máxima y el diseño es único. Mis compañeros siempre preguntan dónde la compré. ¡Recomendada al 100%!",
            verified: true,
            helpful: 8
        },
        {
            userName: "Ana Martín",
            rating: 4,
            date: "2024-01-08",
            comment: "Muy buena calidad, aunque esperaba que fuera un poco más gruesa. El diseño es perfecto y el envío fue súper rápido. Satisfecha con la compra.",
            verified: true,
            helpful: 6
        }
    ],
    2: [ // Taza 42
        {
            userName: "David López",
            rating: 5,
            date: "2024-01-12",
            comment: "La taza perfecta para mi café matutino. El logo se ve genial y la calidad es excelente. No se decolora y mantiene el café caliente por más tiempo.",
            verified: true,
            helpful: 15
        },
        {
            userName: "Laura Sánchez",
            rating: 5,
            date: "2024-01-09",
            comment: "¡Me encanta! Es la taza más bonita que tengo. El diseño es único y la calidad se nota desde el primer uso. Perfecta para regalar.",
            verified: true,
            helpful: 9
        }
    ],
    3: [ // Gorra 42
        {
            userName: "Miguel Torres",
            rating: 5,
            date: "2024-01-14",
            comment: "Gorra perfecta para el verano. El ajuste es ideal y el logo se ve increíble. La calidad es de primera y el precio muy justo.",
            verified: true,
            helpful: 11
        },
        {
            userName: "Sofia García",
            rating: 4,
            date: "2024-01-11",
            comment: "Buena gorra, aunque esperaba que fuera un poco más grande. El diseño es perfecto y la calidad es buena. Recomendada.",
            verified: true,
            helpful: 7
        }
    ],
    4: [ // Camiseta 42
        {
            userName: "Javier Moreno",
            rating: 5,
            date: "2024-01-13",
            comment: "Camiseta de excelente calidad. La tela es súper suave y el logo en verde neón se ve espectacular. Perfecta para el día a día.",
            verified: true,
            helpful: 13
        },
        {
            userName: "Elena Rodríguez",
            rating: 5,
            date: "2024-01-07",
            comment: "¡Me encanta esta camiseta! El diseño es único y la comodidad es máxima. Ya pedí otra en diferente color. ¡Excelente calidad!",
            verified: true,
            helpful: 10
        }
    ],
    5: [ // Mochila 42
        {
            userName: "Roberto Jiménez",
            rating: 5,
            date: "2024-01-16",
            comment: "Mochila perfecta para el trabajo. Los compartimentos son ideales y la calidad es excepcional. El diseño es único y profesional.",
            verified: true,
            helpful: 14
        },
        {
            userName: "Carmen López",
            rating: 4,
            date: "2024-01-05",
            comment: "Buena mochila, aunque esperaba que fuera un poco más grande. La calidad es excelente y el diseño es perfecto.",
            verified: true,
            helpful: 8
        }
    ],
    6: [ // Llavero 42
        {
            userName: "Antonio Pérez",
            rating: 5,
            date: "2024-01-17",
            comment: "Llavero perfecto para mis llaves. El diseño es elegante y la calidad es excelente. Un detalle pequeño pero muy bien hecho.",
            verified: true,
            helpful: 6
        }
    ],
    7: [ // Pantalón 42
        {
            userName: "Isabel Fernández",
            rating: 5,
            date: "2024-01-18",
            comment: "Pantalón súper cómodo y con un diseño único. La calidad es de primera y el corte es perfecto. Definitivamente repetiré.",
            verified: true,
            helpful: 12
        },
        {
            userName: "Francisco García",
            rating: 4,
            date: "2024-01-06",
            comment: "Buen pantalón, aunque la talla es un poco grande. La calidad es excelente y el diseño es perfecto. Recomendado.",
            verified: true,
            helpful: 9
        }
    ],
    8: [ // Zapatillas 42
        {
            userName: "Patricia Ruiz",
            rating: 5,
            date: "2024-01-19",
            comment: "Zapatillas perfectas para programar. La comodidad es máxima y el diseño es único. Mis pies nunca han estado tan cómodos.",
            verified: true,
            helpful: 16
        },
        {
            userName: "Manuel Díaz",
            rating: 5,
            date: "2024-01-04",
            comment: "¡Excelentes zapatillas! La calidad es de primera y el diseño es perfecto. Perfectas para el día a día y muy cómodas.",
            verified: true,
            helpful: 11
        }
    ],
    9: [ // Reloj 42
        {
            userName: "Teresa Morales",
            rating: 5,
            date: "2024-01-20",
            comment: "Reloj inteligente perfecto. La tecnología es avanzada y el diseño es elegante. Funciona perfectamente y se ve genial.",
            verified: true,
            helpful: 18
        },
        {
            userName: "José Antonio",
            rating: 4,
            date: "2024-01-03",
            comment: "Buen reloj, aunque la batería podría durar más. El diseño es perfecto y la calidad es excelente. Recomendado.",
            verified: true,
            helpful: 7
        }
    ],
    10: [ // Auriculares 42
        {
            userName: "Mónica Herrera",
            rating: 5,
            date: "2024-01-21",
            comment: "Auriculares de sonido premium. La calidad del audio es excepcional y el diseño es único. Perfectos para trabajar y escuchar música.",
            verified: true,
            helpful: 15
        },
        {
            userName: "Álvaro Sánchez",
            rating: 5,
            date: "2024-01-02",
            comment: "¡Increíbles auriculares! El sonido es de primera calidad y la comodidad es máxima. Definitivamente los mejores que he tenido.",
            verified: true,
            helpful: 13
        }
    ],
    11: [ // Bufanda 42
        {
            userName: "Cristina Vega",
            rating: 5,
            date: "2024-01-22",
            comment: "Bufanda perfecta para el invierno. La lana es de excelente calidad y el diseño es único. Muy cálida y cómoda.",
            verified: true,
            helpful: 9
        }
    ],
    12: [ // Gafas 42
        {
            userName: "Fernando Castro",
            rating: 5,
            date: "2024-01-23",
            comment: "Gafas de sol perfectas. La protección es excelente y el diseño es único. Perfectas para el verano y muy cómodas.",
            verified: true,
            helpful: 10
        },
        {
            userName: "Beatriz Ramos",
            rating: 4,
            date: "2024-01-01",
            comment: "Buenas gafas, aunque esperaba que fueran un poco más grandes. La calidad es excelente y el diseño es perfecto.",
            verified: true,
            helpful: 6
        }
    ]
};

// Función para obtener reseñas de un producto
function getProductReviews(productId) {
    return professionalReviews[productId] || [];
}

// Función para calcular el rating promedio
function calculateAverageRating(productId) {
    const reviews = getProductReviews(productId);
    if (reviews.length === 0) return 0;
    
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return totalRating / reviews.length;
}

// Función para generar estrellas
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    let stars = '';
    for (let i = 0; i < fullStars; i++) {
        stars += '⭐';
    }
    if (hasHalfStar) {
        stars += '✨';
    }
    for (let i = 0; i < emptyStars; i++) {
        stars += '☆';
    }
    return stars;
}

// Función para formatear fecha
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Hacer funciones disponibles globalmente
window.getProductReviews = getProductReviews;
window.calculateAverageRating = calculateAverageRating;
window.generateStars = generateStars;
window.formatDate = formatDate;

const professionalReviews = {
    1: [ // Sudadera 42
        {
            userName: "María González",
            rating: 5,
            date: "2024-01-15",
            comment: "¡Increíble calidad! La sudadera es súper cómoda y el logo se ve perfecto. La tela es de primera calidad y no se encoge en la lavadora. Definitivamente repetiré.",
            verified: true,
            helpful: 12
        },
        {
            userName: "Carlos Ruiz",
            rating: 5,
            date: "2024-01-10",
            comment: "Perfecta para programar. La comodidad es máxima y el diseño es único. Mis compañeros siempre preguntan dónde la compré. ¡Recomendada al 100%!",
            verified: true,
            helpful: 8
        },
        {
            userName: "Ana Martín",
            rating: 4,
            date: "2024-01-08",
            comment: "Muy buena calidad, aunque esperaba que fuera un poco más gruesa. El diseño es perfecto y el envío fue súper rápido. Satisfecha con la compra.",
            verified: true,
            helpful: 6
        }
    ],
    2: [ // Taza 42
        {
            userName: "David López",
            rating: 5,
            date: "2024-01-12",
            comment: "La taza perfecta para mi café matutino. El logo se ve genial y la calidad es excelente. No se decolora y mantiene el café caliente por más tiempo.",
            verified: true,
            helpful: 15
        },
        {
            userName: "Laura Sánchez",
            rating: 5,
            date: "2024-01-09",
            comment: "¡Me encanta! Es la taza más bonita que tengo. El diseño es único y la calidad se nota desde el primer uso. Perfecta para regalar.",
            verified: true,
            helpful: 9
        }
    ],
    3: [ // Gorra 42
        {
            userName: "Miguel Torres",
            rating: 5,
            date: "2024-01-14",
            comment: "Gorra perfecta para el verano. El ajuste es ideal y el logo se ve increíble. La calidad es de primera y el precio muy justo.",
            verified: true,
            helpful: 11
        },
        {
            userName: "Sofia García",
            rating: 4,
            date: "2024-01-11",
            comment: "Buena gorra, aunque esperaba que fuera un poco más grande. El diseño es perfecto y la calidad es buena. Recomendada.",
            verified: true,
            helpful: 7
        }
    ],
    4: [ // Camiseta 42
        {
            userName: "Javier Moreno",
            rating: 5,
            date: "2024-01-13",
            comment: "Camiseta de excelente calidad. La tela es súper suave y el logo en verde neón se ve espectacular. Perfecta para el día a día.",
            verified: true,
            helpful: 13
        },
        {
            userName: "Elena Rodríguez",
            rating: 5,
            date: "2024-01-07",
            comment: "¡Me encanta esta camiseta! El diseño es único y la comodidad es máxima. Ya pedí otra en diferente color. ¡Excelente calidad!",
            verified: true,
            helpful: 10
        }
    ],
    5: [ // Mochila 42
        {
            userName: "Roberto Jiménez",
            rating: 5,
            date: "2024-01-16",
            comment: "Mochila perfecta para el trabajo. Los compartimentos son ideales y la calidad es excepcional. El diseño es único y profesional.",
            verified: true,
            helpful: 14
        },
        {
            userName: "Carmen López",
            rating: 4,
            date: "2024-01-05",
            comment: "Buena mochila, aunque esperaba que fuera un poco más grande. La calidad es excelente y el diseño es perfecto.",
            verified: true,
            helpful: 8
        }
    ],
    6: [ // Llavero 42
        {
            userName: "Antonio Pérez",
            rating: 5,
            date: "2024-01-17",
            comment: "Llavero perfecto para mis llaves. El diseño es elegante y la calidad es excelente. Un detalle pequeño pero muy bien hecho.",
            verified: true,
            helpful: 6
        }
    ],
    7: [ // Pantalón 42
        {
            userName: "Isabel Fernández",
            rating: 5,
            date: "2024-01-18",
            comment: "Pantalón súper cómodo y con un diseño único. La calidad es de primera y el corte es perfecto. Definitivamente repetiré.",
            verified: true,
            helpful: 12
        },
        {
            userName: "Francisco García",
            rating: 4,
            date: "2024-01-06",
            comment: "Buen pantalón, aunque la talla es un poco grande. La calidad es excelente y el diseño es perfecto. Recomendado.",
            verified: true,
            helpful: 9
        }
    ],
    8: [ // Zapatillas 42
        {
            userName: "Patricia Ruiz",
            rating: 5,
            date: "2024-01-19",
            comment: "Zapatillas perfectas para programar. La comodidad es máxima y el diseño es único. Mis pies nunca han estado tan cómodos.",
            verified: true,
            helpful: 16
        },
        {
            userName: "Manuel Díaz",
            rating: 5,
            date: "2024-01-04",
            comment: "¡Excelentes zapatillas! La calidad es de primera y el diseño es perfecto. Perfectas para el día a día y muy cómodas.",
            verified: true,
            helpful: 11
        }
    ],
    9: [ // Reloj 42
        {
            userName: "Teresa Morales",
            rating: 5,
            date: "2024-01-20",
            comment: "Reloj inteligente perfecto. La tecnología es avanzada y el diseño es elegante. Funciona perfectamente y se ve genial.",
            verified: true,
            helpful: 18
        },
        {
            userName: "José Antonio",
            rating: 4,
            date: "2024-01-03",
            comment: "Buen reloj, aunque la batería podría durar más. El diseño es perfecto y la calidad es excelente. Recomendado.",
            verified: true,
            helpful: 7
        }
    ],
    10: [ // Auriculares 42
        {
            userName: "Mónica Herrera",
            rating: 5,
            date: "2024-01-21",
            comment: "Auriculares de sonido premium. La calidad del audio es excepcional y el diseño es único. Perfectos para trabajar y escuchar música.",
            verified: true,
            helpful: 15
        },
        {
            userName: "Álvaro Sánchez",
            rating: 5,
            date: "2024-01-02",
            comment: "¡Increíbles auriculares! El sonido es de primera calidad y la comodidad es máxima. Definitivamente los mejores que he tenido.",
            verified: true,
            helpful: 13
        }
    ],
    11: [ // Bufanda 42
        {
            userName: "Cristina Vega",
            rating: 5,
            date: "2024-01-22",
            comment: "Bufanda perfecta para el invierno. La lana es de excelente calidad y el diseño es único. Muy cálida y cómoda.",
            verified: true,
            helpful: 9
        }
    ],
    12: [ // Gafas 42
        {
            userName: "Fernando Castro",
            rating: 5,
            date: "2024-01-23",
            comment: "Gafas de sol perfectas. La protección es excelente y el diseño es único. Perfectas para el verano y muy cómodas.",
            verified: true,
            helpful: 10
        },
        {
            userName: "Beatriz Ramos",
            rating: 4,
            date: "2024-01-01",
            comment: "Buenas gafas, aunque esperaba que fueran un poco más grandes. La calidad es excelente y el diseño es perfecto.",
            verified: true,
            helpful: 6
        }
    ]
};

// Función para obtener reseñas de un producto
function getProductReviews(productId) {
    return professionalReviews[productId] || [];
}

// Función para calcular el rating promedio
function calculateAverageRating(productId) {
    const reviews = getProductReviews(productId);
    if (reviews.length === 0) return 0;
    
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return totalRating / reviews.length;
}

// Función para generar estrellas
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    let stars = '';
    for (let i = 0; i < fullStars; i++) {
        stars += '⭐';
    }
    if (hasHalfStar) {
        stars += '✨';
    }
    for (let i = 0; i < emptyStars; i++) {
        stars += '☆';
    }
    return stars;
}

// Función para formatear fecha
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Hacer funciones disponibles globalmente
window.getProductReviews = getProductReviews;
window.calculateAverageRating = calculateAverageRating;
window.generateStars = generateStars;
window.formatDate = formatDate;
