// Data produk
const products = [
    {
        id: 1,
        name: 'NC-Pro X1',
        category: 'headphones',
        price: 'Rp 2.999.000',
        rating: 5,
        image: './images/headphone-1.png'
    },
    {
        id: 2,
        name: 'NC-Air Plus',
        category: 'earbuds',
        price: 'Rp 1.899.000',
        rating: 4.5,
        image: './images/earbud-1.jpg'
    },
    {
        id: 3,
        name: 'NC-Sound Max',
        category: 'speakers',
        price: 'Rp 3.499.000',
        rating: 4.8,
        image: './images/speaker-1.jpg'
    },
    {
        id: 4,
        name: 'NC-Open Air',
        category: 'open-ear',
        price: 'Rp 2.199.000',
        rating: 4.7,
        image: './images/open-ear-1.jpg'
    },
    {
        id: 5,
        name: 'NC-Pro X2',
        category: 'headphones',
        price: 'Rp 3.499.000',
        rating: 4.9,
        image: './images/headphone-2.png'
    },
    {
        id: 6,
        name: 'NC-Air Lite',
        category: 'earbuds',
        price: 'Rp 1.299.000',
        rating: 4.3,
        image: './images/earbud-2.jpg'
    },
    {
        id: 7,
        name: 'NC-Sound Mini',
        category: 'speakers',
        price: 'Rp 1.999.000',
        rating: 4.6,
        image: './images/speaker-2.jpg'
    },
    {
        id: 8,
        name: 'NC-Open Sport',
        category: 'open-ear',
        price: 'Rp 1.899.000',
        rating: 4.4,
        image: './images/open-ear-2.jpg'
    }
];

// Fungsi untuk menampilkan rating dalam bentuk bintang
function generateRatingStars(rating) {
    const fullStar = '★';
    const halfStar = '★';
    const emptyStar = '☆';
    let stars = '';
    
    const fullStarsCount = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    // Tambahkan bintang penuh
    for (let i = 0; i < fullStarsCount; i++) {
        stars += fullStar;
    }
    
    // Tambahkan setengah bintang jika ada
    if (hasHalfStar) {
        stars += halfStar;
    }
    
    // Tambahkan bintang kosong
    const emptyStarsCount = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStarsCount; i++) {
        stars += emptyStar;
    }
    
    return stars;
}

// Fungsi untuk menampilkan produk
function displayProducts(filteredProducts) {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '';
    
    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <div class="rating">${generateRatingStars(product.rating)}</div>
            <p class="price">${product.price}</p>
        `;
        productsGrid.appendChild(productCard);
    });
}

// Event listener untuk tombol filter
document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    // Tampilkan semua produk saat halaman dimuat
    displayProducts(products);
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Hapus kelas active dari semua tombol
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Tambahkan kelas active ke tombol yang diklik
            button.classList.add('active');
            
            const selectedCategory = button.getAttribute('data-category');
            const filteredProducts = selectedCategory === 'all' 
                ? products 
                : products.filter(product => product.category === selectedCategory);
            
            displayProducts(filteredProducts);
        });
    });
});