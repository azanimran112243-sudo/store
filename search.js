// --- GLOBAL CORE STORAGE CATALOG ---
window.SEARCH_INVENTORY = [
    { id: 1, name: "AeroPulse Sports Sneakers", price: 8500, img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60" },
    { id: 2, name: "Minimalist Retro Camera", price: 45000, img: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&auto=format&fit=crop&q=60" },
    { id: 3, name: "Urban Obsidian Sunglasses", price: 3200, img: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&auto=format&fit=crop&q=60" },
    { id: 4, name: "Alpha Stealth Mechanical Keyboard", price: 12500, img: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&auto=format&fit=crop&q=60" },
    { id: 5, name: "Vanguard Leather Boots", price: 14000, img: "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=500&auto=format&fit=crop&q=60" }
];

// --- VIRTUAL MERCHANTS DYNAMIC PIPELINE SYNC ---
function syncCustomInventory() {
    const customProducts = JSON.parse(localStorage.getItem('aion_custom_products')) || [];
    customProducts.forEach(prod => {
        if (!window.SEARCH_INVENTORY.some(item => item.id === prod.id)) {
            window.SEARCH_INVENTORY.push(prod);
        }
    });
}
syncCustomInventory(); // Execute instantly on script parsing

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