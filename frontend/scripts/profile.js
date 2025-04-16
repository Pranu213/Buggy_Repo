const baseURL = ""; // Leave empty if frontend and backend run on same domain/port

// Load users on page load
async function loadUsers() {
  const res = await fetch(`${baseURL}/users`);
  const users = await res.json();

  const list = document.getElementById("userList");
  const count = document.getElementById("userCounts");

  list.innerHTML = "";
  count.textContent = `Total users: ${users.length}`;

  users.forEach(user => {
    const li = document.createElement("li");
    li.textContent = `${user.username}: ${user.bio}`;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = async () => {
      await fetch(`${baseURL}/users/${user._id}`, {
        method: "DELETE"
      });
      loadUsers();
    };

    li.appendChild(deleteBtn);
    list.appendChild(li);
  });
}

// Search users
document.getElementById("search").addEventListener("input", async (e) => {
  const term = e.target.value.toLowerCase();
  const res = await fetch(`${baseURL}/users`);
  const users = await res.json();
  const list = document.getElementById("userList");
  const count = document.getElementById("userCounts");

  const filtered = users.filter(user =>
    user.username.toLowerCase().includes(term)
  );

  list.innerHTML = "";
  count.textContent = `Total users: ${filtered.length}`;

  filtered.forEach(user => {
    const li = document.createElement("li");
    li.textContent = `${user.username}: ${user.bio}`;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = async () => {
      await fetch(`${baseURL}/users/${user._id}`, {
        method: "DELETE"
      });
      loadUsers();
    };

    li.appendChild(deleteBtn);
    list.appendChild(li);
  });
});

// Add new user
document.getElementById("userForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const bio = document.getElementById("bio").value;

  await fetch(`${baseURL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username, bio })
  });

  e.target.reset();
  loadUsers();
});

// Initial load
loadUsers();
