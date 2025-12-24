const users = JSON.parse(localStorage.getItem("users") || "{}");
let currentUser = null;

function handleAuth() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;

  if (!username || !password) {
    alert("נא למלא שם משתמש וסיסמה");
    return;
  }

  if (!users[username]) {
    users[username] = {
      password,
      boards: { rank: "", journey: "", grades: "", name: "" }
    };
    saveUsers();
  } else if (users[username].password !== password) {
    alert("סיסמה שגויה");
    return;
  }

  currentUser = username;
  openDashboard();
}

function openDashboard() {
  document.getElementById("authBox").style.display = "none";
  document.getElementById("dashboard").style.display = "block";

  const data = users[currentUser].boards;
  document.getElementById("rank").value = data.rank;
  document.getElementById("journey").value = data.journey;
  document.getElementById("grades").value = data.grades;
  document.getElementById("name").value = data.name;
}

function saveBoards() {
  users[currentUser].boards = {
    rank: document.getElementById("rank").value,
    journey: document.getElementById("journey").value,
    grades: document.getElementById("grades").value,
    name: document.getElementById("name").value
  };
  saveUsers();
  alert("נשמר בהצלחה");
}

function saveUsers() {
  localStorage.setItem("users", JSON.stringify(users));
}

function logout() {
  location.reload();
}
