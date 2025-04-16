const baseURL = "http://localhost:8000/items";

// Easter Egg: Konami Code Implementation
let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiPosition = 0;

document.addEventListener('keydown', function(e) {
  // Check if the pressed key matches the next key in the sequence
  if (e.key === konamiCode[konamiPosition]) {
    konamiPosition++;
    
    // If the entire sequence is entered correctly
    if (konamiPosition === konamiCode.length) {
      activateEasterEgg();
      konamiPosition = 0; // Reset for next time
    }
  } else {
    konamiPosition = 0; // Reset if wrong key
  }
});

function activateEasterEgg() {
  // Create an overlay
  const overlay = document.createElement('div');
  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.backgroundColor = 'rgba(0,0,0,0.8)';
  overlay.style.display = 'flex';
  overlay.style.flexDirection = 'column';
  overlay.style.alignItems = 'center';
  overlay.style.justifyContent = 'center';
  overlay.style.zIndex = '9999';
  overlay.style.color = '#fff';
  overlay.style.fontFamily = 'monospace';
  
  // Add animated text
  const message = document.createElement('h1');
  message.textContent = '🎮 Konami Code Activated! 🎮';
  message.style.textAlign = 'center';
  message.style.animation = 'bounce 0.5s infinite alternate';
  
  // Team members easter egg
  const teamMessage = document.createElement('div');
  teamMessage.innerHTML = `
    <p style="font-size: 20px; margin-top: 20px;">Special thanks to our awesome dev team:</p>
    <ul style="list-style-type: none; padding: 0; text-align: center;">
      <li>👩‍💻 Team Lead: YOU!</li>
      <li>🧙‍♂️ Code Wizards: Your Amazing Colleagues</li>
      <li>🚀 Version: 1.0.0-secretSauce</li>
    </ul>
    <p style="margin-top: 20px; font-style: italic;">"The best code is written on Friday afternoons - said no developer ever."</p>
  `;
  
  // Add a button to close the easter egg
  const closeButton = document.createElement('button');
  closeButton.textContent = 'Back to Reality';
  closeButton.style.marginTop = '30px';
  closeButton.style.padding = '10px 20px';
  closeButton.style.cursor = 'pointer';
  closeButton.style.backgroundColor = '#4CAF50';
  closeButton.style.border = 'none';
  closeButton.style.borderRadius = '5px';
  closeButton.onclick = function() {
    document.body.removeChild(overlay);
  };
  
  // Add CSS animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes bounce {
      from { transform: translateY(0px); }
      to { transform: translateY(-15px); }
    }
  `;
  document.head.appendChild(style);
  
  // Assemble and add to page
  overlay.appendChild(message);
  overlay.appendChild(teamMessage);
  overlay.appendChild(closeButton);
  document.body.appendChild(overlay);
}

// Fix for the items functionality
async function loadItems(searchTerm = "") {
  try {
    const res = await fetch(baseURL);
    if (!res.ok) throw new Error("Failed to fetch items");
    const data = await res.json();
    const list = document.getElementById("itemList");
    list.innerHTML = "";
    const filteredItems = data.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    document.getElementById("itemCount").textContent = `Total items: ${filteredItems.length}`;
    filteredItems.forEach(item => {
      const li = document.createElement("li");
      li.textContent = `${item.name}: ${item.description}`;
      const del = document.createElement("button");
      del.textContent = "Delete";
      del.onclick = () => deleteItem(item._id);
      li.appendChild(del);
      list.appendChild(li);
    });
  } catch (err) {
    console.error("Error loading items:", err);
  }
}

async function deleteItem(id) {
  try {
    await fetch(`${baseURL}/${id}`, { method: "DELETE" });
    loadItems(document.getElementById("search").value);
  } catch (err) {
    console.error("Delete failed:", err);
  }
}

document.getElementById("search").addEventListener("input", (e) => {
  loadItems(e.target.value);
});

document.getElementById("itemForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const description = document.getElementById("description").value;
  try {
    const response = await fetch(baseURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    e.target.reset(); // Reset the form fields
    loadItems(document.getElementById("search").value);
  } catch (err) {
    console.error("Error adding item:", err);
    alert("Failed to add item. Check console for details.");
  }
});

// Load items when page loads
window.addEventListener('DOMContentLoaded', () => {
  loadItems();
});
