addSideandTopBar();


async function addSideandTopBar() {
  //Load Side Bar
  const side = await fetch("common/sidebar.html");
  const sidehtml = await side.text();
  document.getElementById("sidebar").insertAdjacentHTML("beforeend", sidehtml)

  //Load Top Bar
  const top = await fetch("common/topbar.html");
  const tophtml = await top.text();
  document.getElementById("topbar").insertAdjacentHTML("beforeend", tophtml)
  verifyLogin();

  //Load Footer
  const foot = await fetch("common/footer.html");
  const foothtml = await foot.text();
  document.getElementById("footer").insertAdjacentHTML("beforeend", foothtml)
};

async function verifyLogin() {
  const loggeduser = await fetch(`http://localhost:3000/user/login`);
  const user = await loggeduser.json();
  if (user.username) {
    document.getElementById(
      "user"
    ).innerHTML = `<a class="nav-link dropdown-toggle" role="button" onclick='logoutUser()'>
      <span class="mr-2 d-none d-lg-inline text-gray-600 small" id="userMsg">Welcome ${user.username} / Logoff</span>
      </a>`
  } else {
    document.getElementById(
      "user"
    ).innerHTML = `<a class="nav-link dropdown-toggle" href="login.html" role="button">
      <span class="mr-2 d-none d-lg-inline text-gray-600 small" id="userMsg">Login</span>
      </a>`

  }
};

async function logoutUser() {
  const response = await fetch(`http://localhost:3000/user/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.status == 400) {
    alert("ERROR!! Unable to logout please try again");
  } else if (response.status == 200) {
    alert("Logged out!");
    window.location.reload();
  } else {
    alert(`Undifined error: ${response}`);
  }
}
