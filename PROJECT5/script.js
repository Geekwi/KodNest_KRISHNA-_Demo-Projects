let usersData = [];
let familyData = [];

// Load login credentials
fetch("users.json")
  .then(response => response.json())
  .then(data => { usersData = data; })
  .catch(error => console.error("Error loading users:", error));

// Login function
function login() {
  let username = document.getElementById("username").value.trim();
  let password = document.getElementById("password").value.trim();

  let user = usersData.find(u => u.username === username && u.password === password);

  if (user) {
    document.getElementById("loginPage").style.display = "none";
    document.getElementById("searchPage").style.display = "block";
    loadFamily();
  } else {
    document.getElementById("loginError").textContent = "Invalid username or password!";
  }
}

// Load family members
function loadFamily() {
  fetch("family.json")
    .then(response => response.json())
    .then(data => {
      familyData = data;
      document.getElementById("family").innerHTML = '<p style="color:red">Start typing to search family members...</p>';
    })
    .catch(error => console.error("Error loading family:", error));
}

// Display family cards
function displayFamily(list) {
  let container = document.getElementById("family");
  container.innerHTML = "";
  list.forEach(member => {
    let card = document.createElement("div");
    card.className = "member";
    card.innerHTML = `
      <img src="${member.img}" alt="${member.name}">
      <h2>${member.name}</h2>
      <p>Relation: ${member.relation}</p>
      <p>Age: ${member.age}</p>
    `;
    container.appendChild(card);
  });

  if (list.length === 0) {
    container.innerHTML = "<p>No family members found.</p>";
  }
}

// Search filter
document.addEventListener("input", function(e) {
  if (e.target.id === "searchBox") {
    let query = e.target.value.toLowerCase();
    if (query === "") {
      document.getElementById("family").innerHTML = "<p>Start typing to search family members...</p>";
      return;
    }
    let filtered = familyData.filter(member =>
      member.name.toLowerCase().includes(query) ||
      member.relation.toLowerCase().includes(query)
    );
    displayFamily(filtered);
  }
});
