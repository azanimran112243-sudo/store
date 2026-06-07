// --- GLOBAL CORE STORAGE CATALOG ---
window.SEARCH_INVENTORY = [
    { id: 1, name: "AeroPulse Sports Sneakers", price: 8500, img: "https://picsum.photos/id/1/500/500" },
    { id: 2, name: "Minimalist Retro Camera", price: 45000, img: "https://picsum.photos/id/160/500/500" },
    { id: 3, name: "Urban Obsidian Sunglasses", price: 3200, img: "https://picsum.photos/id/121/500/500" },
    { id: 4, name: "Alpha Stealth Mechanical Keyboard", price: 12500, img: "https://picsum.photos/id/366/500/500" },
    { id: 5, name: "Vanguard Leather Boots", price: 14000, img: "https://picsum.photos/id/102/500/500" },
    { id: 6, name: "Precision Titanium Watch", price: 28000, img: "https://picsum.photos/id/175/500/500" },
    { id: 7, name: "Sonic Wave Headphones", price: 9500, img: "https://picsum.photos/id/367/500/500" },
    { id: 8, name: "Tactical Cargo Jacket", price: 18000, img: "https://picsum.photos/id/429/500/500" },
    { id: 9, name: "Executive Leather Briefcase", price: 22000, img: "https://picsum.photos/id/425/500/500" },
    { id: 10, name: "Ergonomic Office Chair", price: 35000, img: "https://picsum.photos/id/491/500/500" },
    { id: 11, name: "Smart Home Hub Controller", price: 15000, img: "https://picsum.photos/id/555/500/500" },
    { id: 12, name: "Premium Fountain Pen", price: 7500, img: "https://picsum.photos/id/506/500/500" },
    { id: 13, name: "Studio Condenser Microphone", price: 19000, img: "https://picsum.photos/id/559/500/500" },
    { id: 14, name: "Gravel Trail Running Shoe", price: 11000, img: "https://picsum.photos/id/431/500/500" },
    { id: 15, name: "Portable Power Bank 20k", price: 4500, img: "https://picsum.photos/id/570/500/500" },
    { id: 16, name: "Wireless Charging Pad", price: 2500, img: "https://picsum.photos/id/575/500/500" }
];

function populateMainProductGrid() {
    const grid = document.getElementById('product-grid');
    if (!grid) return;
    
    grid.innerHTML = '';
    window.SEARCH_INVENTORY.forEach(item => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${item.img}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>Rs. ${item.price.toLocaleString()}</p>
            <a href="product.html?id=${item.id}" class="view-btn">View Object</a>
        `;
        grid.appendChild(card);
    });
}

// --- GLOBAL SEARCH ENGINE AUTOCOMPLETE ENVIRONMENT ---
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.search-bar input');
    const searchSuggestions = document.getElementById('searchSuggestions');
    const searchButton = document.querySelector('.search-bar button');

    if (!searchInput || !searchSuggestions) return;

    searchInput.addEventListener('input', () => {
        const query = searchInput.value.trim().toLowerCase();
        if (query.length === 0) {
            searchSuggestions.style.display = 'none';
            return;
        }

        const filtered = SEARCH_INVENTORY.filter(product => 
            product.name.toLowerCase().includes(query)
        );

        renderSuggestions(filtered);
    });

    if (searchButton) {
        searchButton.addEventListener('click', executeTopMatchRedirect);
    }
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') executeTopMatchRedirect();
    });

    function renderSuggestions(products) {
        if (products.length === 0) {
            searchSuggestions.innerHTML = `<div class="suggestion-item" style="color:var(--text-gray); cursor:default; pointer-events:none;">No products found</div>`;
            searchSuggestions.style.display = 'block';
            return;
        }

        searchSuggestions.innerHTML = '';
        products.slice(0, 6).forEach(product => {
            const row = document.createElement('a');
            row.href = `product.html?id=${product.id}`;
            row.className = 'suggestion-item';
            row.innerHTML = `
                <img src="${product.img}" alt="${product.name}" style="width:40px; height:40px; object-fit:cover;">
                <div class="suggestion-info">
                    <span class="suggestion-name" style="color:#FFF; font-size:0.85rem; display:block;">${product.name}</span>
                    <span class="suggestion-price" style="color:var(--text-gray); font-size:0.8rem;">Rs. ${product.price.toLocaleString()}</span>
                </div>
            `;
            searchSuggestions.appendChild(row);
        });
        searchSuggestions.style.display = 'block';
    }

    function executeTopMatchRedirect() {
        const query = searchInput.value.trim().toLowerCase();
        if (query.length === 0) return;
        const topMatch = SEARCH_INVENTORY.find(product => product.name.toLowerCase().includes(query));
        if (topMatch) {
            window.location.href = `product.html?id=${topMatch.id}`;
        }
    }

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-container')) {
            searchSuggestions.style.display = 'none';
        }
    });
});