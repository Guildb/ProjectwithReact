function AppWidget({ title }) {
    const [username, setUser] = React.useState("");
    const [password, setPass] = React.useState("");

    function updateUser(username) {
        setUser(username);
    }

    function updatePass(password) {
        setPass(password);
    }

    function manageLogin() {
        const user = {
            username: username,
            password: password
        };
        if (
            username.trim() == "" || password.trim() == ""
        ) {
            alert("Please you need to fill both details!");
        } else {
            loginUser(user);
        }
    }

    async function loginUser(user) {
        const response = await fetch(`http://localhost:3000/user/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });
        if (response.status == 404) {
            alert("ERROR!! Invalid details please try again");
        } else if (response.status == 200) {
            alert("Logged In!");
            window.location.href = "/";
        } else {
            alert(`Undifined error: ${response}`);
        }
    }

    return (
        <div>
            <InputWidget
                title={title}
                updateUser={updateUser}
                updatePass={updatePass}
                manageLogin={manageLogin}
            />
        </div>
    );
}

function InputWidget({ title, updateUser, updatePass, manageLogin }) {
    function updateUserf() {
        updateUser(document.getElementById("username").value);
    }

    function updatePassf() {
        updatePass(document.getElementById("password").value);
    }

    return (
        <div className="card-body p-0">
            <div className="row">
                <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                <div className="col-lg-6">
                    <div className="p-5">
                        <div className="text-center">
                            <h1 className="h4 text-gray-900 mb-4">{title}</h1>
                        </div>
                        <fieldset className="user" >
                            <div className="form-group">
                                <input type="email" className="form-control form-control-user" id="username"
                                    aria-describedby="emailHelp" placeholder="Enter Username" required onChange={updateUserf} />
                            </div>
                            <div className="form-group">
                                <input type="password" className="form-control form-control-user" id="password"
                                    placeholder="Password" required onChange={updatePassf} />
                            </div>
                            <input type="button" className="btn btn-primary btn-user btn-block" id="loginBtn"
                                value="Login" onClick={manageLogin} />
                            <a href="/" className="btn btn-primary btn-user btn-block">
                                Go Back
                            </a>
                        </fieldset>
                    </div>
                </div>
            </div>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<AppWidget title="Welcome Back!" />);