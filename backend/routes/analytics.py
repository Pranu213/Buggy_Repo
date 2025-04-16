const endpoint = "/analytics";  // relative to the same host/port

async function loadAnalytics() {
  try {
    const res = await fetch(endpoint);
    if (!res.ok) throw new Error("Network response was not ok");
    const data = await res.json();

    // Populate stats
    document.getElementById("itemCount").textContent = data.stats.item_count;
    document.getElementById("userCount").textContent = data.stats.user_count;
    document.getElementById("avgItemName").textContent = data.stats.avg_item_name_length.toFixed(2);
    document.getElementById("avgUserName").textContent = data.stats.avg_user_username_length.toFixed(2);
    document.getElementById("maxItemName").textContent = data.stats.max_item_name_length;
    document.getElementById("maxUserName").textContent = data.stats.max_user_username_length;

    // Display plot
    if (data.plot) {
      document.getElementById("plot").src = data.plot;
    } else {
      console.warn("No plot returned");
    }
  } catch (err) {
    console.error("Failed to load analytics:", err);
  }
}

window.addEventListener("DOMContentLoaded", loadAnalytics);
