const currentPath = window.location.pathname;

function highlightNavigation() {
    if (currentPath.endsWith('products.html')) {
        const productNav = document.querySelector('.products-navigate');
        if (productNav) {
            productNav.style.textDecorationLine = 'underline';
            productNav.style.fontSize = '30px';
        }
    }
}

highlightNavigation();

const productContainer = document.querySelector('.subContainer33');

async function loadProducts() {
    try {
        const response = await fetch('http://127.0.0.1:5000/products');
        if (!response.ok) throw new Error('Network response was not ok');
        
        const data = await response.json();
        data.forEach(elem => {
            const container = document.createElement('div');
            container.classList.add('product-container');
            container.innerHTML = `
                <h2>${elem.name}</h2>
                <p>${elem.description}</p>
                <button class="apply">Apply</button>
            `;
            productContainer.appendChild(container);
        });

        setupModalHandlers();
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

function setupModalHandlers() {
    const modal = document.querySelector('.apply-container');
    const modalClose = document.querySelector('.closing');

    productContainer.addEventListener('click', event => {
        if (event.target && event.target.classList.contains('apply')) {
            modal.style.display = 'block';
        }
    });

    modalClose.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
        }
    });
}

async function handleClientFormSubmit(event) {
    event.preventDefault();

    var formData = {
        name: document.querySelector('.clientName').value,
        surname: document.querySelector('.surnameClient').value,
        price: document.querySelector('.price').value,
        description: document.querySelector('textarea').value,
        product: document.querySelector('select').value,
        email: document.querySelector('.email').value,
        phoneNumber: document.querySelector('.phone-number').value
    };

    if (isNaN(formData.price) || formData.price <= 0) {
        alert('Please enter a valid price.');
        return;
    }

    try {
        const response = await fetch('http://127.0.0.1:5000/add_client', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Server Error');
        }

        const data = await response.json();
        alert('Client added successfully!');
    } catch (error) {
        console.error('Error adding client:', error);
        alert(`An error occurred: ${error.message}`);
    }
}

document.querySelector('.client').addEventListener('submit', handleClientFormSubmit);

loadProducts();

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.container33 input');
    const productList = document.querySelector('.subContainer33');
    const fetchUrl = 'http://127.0.0.1:5000/products';

    function fetchProducts() {
        return fetch(fetchUrl).then(response => response.json());
    }

    function displayProducts(products) {
        productList.innerHTML = products.length > 0
            ? products.map(product => `
                <div class="product-container">
                    <h2>${product.name}</h2>
                    <p>${product.description}</p>
                    <button class="apply">Apply</button>
                </div>
            `).join('')
            : '<p>No products found.</p>';
    }

    function searchProducts(query) {
        fetchProducts().then(products => {
            const filteredProducts = products.filter(product =>
                product.name.toLowerCase().includes(query)
            );
            displayProducts(filteredProducts);
        });
    }

    searchInput.addEventListener('change', () => {
        const query = searchInput.value.toLowerCase();
        searchProducts(query);
    });

    document.getElementById('bbb').addEventListener('click', function (event){
        event.preventDefault();
        const query = searchInput.value.toLowerCase();
        searchProducts(query);
    })


});
