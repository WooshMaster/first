// Store plants in localStorage
let plants = JSON.parse(localStorage.getItem('plants')) || [];

// Get DOM elements
const plantForm = document.getElementById('plantForm');
const plantsListDiv = document.getElementById('plantsList');

// Add new plant
plantForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const plant = {
        id: Date.now(),
        name: document.getElementById('plantName').value,
        waterNeeds: document.getElementById('waterNeeds').value,
        lightNeeds: document.getElementById('lightNeeds').value,
        notes: document.getElementById('notes').value,
        lastWatered: null
    };

    plants.push(plant);
    savePlants();
    displayPlants();
    plantForm.reset();
});

// Save plants to localStorage
function savePlants() {
    localStorage.setItem('plants', JSON.stringify(plants));
}

// Display plants
function displayPlants() {
    plantsListDiv.innerHTML = '';
    
    plants.forEach(plant => {
        const plantCard = document.createElement('div');
        plantCard.className = 'plant-card';
        
        const lastWateredText = plant.lastWatered 
            ? new Date(plant.lastWatered).toLocaleDateString()
            : 'Not yet watered';

        plantCard.innerHTML = `
            <h3>${plant.name}</h3>
            <div class="plant-info">
                <p><span>Water Needs:</span> ${plant.waterNeeds}</p>
                <p><span>Light Needs:</span> ${plant.lightNeeds}</p>
                <p><span>Notes:</span> ${plant.notes}</p>
                <p class="last-watered">Last Watered: ${lastWateredText}</p>
            </div>
            <button class="water-btn" onclick="waterPlant(${plant.id})">
                Mark as Watered
            </button>
            <button class="delete-btn" onclick="deletePlant(${plant.id})">
                Delete Plant
            </button>
        `;
        
        plantsListDiv.appendChild(plantCard);
    });
}

// Water a plant
function waterPlant(id) {
    const plant = plants.find(p => p.id === id);
    if (plant) {
        plant.lastWatered = new Date().toISOString();
        savePlants();
        displayPlants();
    }
}

// Delete a plant
function deletePlant(id) {
    if (confirm('Are you sure you want to delete this plant?')) {
        plants = plants.filter(plant => plant.id !== id);
        savePlants();
        displayPlants();
    }
}

// Initial display
displayPlants();
