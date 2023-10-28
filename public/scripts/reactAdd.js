function AppWidget({ title }) {
    const [name, setName] = React.useState("");
    const [type, setType] = React.useState("");
    const [country, setCountry] = React.useState("");
    const [region, setRegion] = React.useState("");
    const [lon, setLon] = React.useState("");
    const [lat, setLat] = React.useState("");
    const [desc, setDesc] = React.useState("");

    function updateName(name) {
        setName(name);
    }

    function updateType(type) {
        setType(type);
    }

    function updateCountry(country) {
        setCountry(country);
    }

    function updateRegion(region) {
        setRegion(region);
    }

    function updateLon(lon) {
        setLon(lon);
    }

    function updateLat(lat) {
        setLat(lat);
    }

    function updateDesc(desc) {
        setDesc(desc);
    }

    function manageAdd() {
        const poi = {
            name: name,
            type: type,
            country: country,
            region: region,
            lon: lon,
            lat: lat,
            desc: desc
        };

        addPoi(poi);

    }

    async function addPoi(poi) {
        const response = await fetch(`http://localhost:3000/poi/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(poi),
        });
        if (response.status == 200) {
            alert(`POI Added !`);
            window.location.href = "/";
        } else if (response.status == 404) {
            alert("Invalid data! Please try again");
        } else if (response.status == 401) {
            alert(`You're not logged in! Please Login in order do do that!`);
        } else {
            alert(`Undifined error: ${response.status}`);
        }
    }

    return (
        <div>
            <InputWidget
                title={title}
                updateName={updateName}
                updateType={updateType}
                updateCountry={updateCountry}
                updateRegion={updateRegion}
                updateLon={updateLon}
                updateLat={updateLat}
                updateDesc={updateDesc}
                manageAdd={manageAdd}
            />
        </div>
    );
}

function InputWidget({ title, updateName, updateType, updateCountry, updateRegion, updateLon, updateLat, updateDesc, manageAdd}) {
    function updateNamef() {
        updateName(document.getElementById("name").value);
    }
    function updateTypef() {
        updateType(document.getElementById("name").value);
    }
    function updateCountryf() {
        updateCountry(document.getElementById("name").value);
    }
    function updateRegionf() {
        updateRegion(document.getElementById("name").value);
    }
    function updateLonf() {
        updateLon(document.getElementById("name").value);
    }
    function updateLatf() {
        updateLat(document.getElementById("name").value);
    }
    function updateDescf() {
        updateDesc(document.getElementById("name").value);
    }

    return (
        <div className="container-fluid">
            <h1 className="h3 mb-0 text-gray-800">{title}</h1>
            <br />

            <i className="fas fa-fw fa-chart-area"></i>
            <span>Please enter the POI information bellow:
            </span>
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <fieldset  style={{ width: `100%` }} >
                    <input type="text" className="form-control bg-light border-0 small" placeholder="Name"
                        aria-describedby="basic-addon2" id="name" required onChange={updateNamef}/>
                    <br />
                    <input type="text" className="form-control bg-light border-0 small" placeholder="Type"
                        aria-describedby="basic-addon2" id="type" required onChange={updateTypef}/>
                    <br />
                    <input type="text" className="form-control bg-light border-0 small" placeholder="Country"
                        aria-describedby="basic-addon2" id="country" required onChange={updateCountryf}/>
                    <br />
                    <input type="text" className="form-control bg-light border-0 small" placeholder="Region"
                        aria-describedby="basic-addon2" id="region" required onChange={updateRegionf}/>
                    <br />
                    <input type="number" className="form-control bg-light border-0 small" placeholder="Longitude"
                        aria-describedby="basic-addon2" id="lon" required onChange={updateLonf}/>
                    <br />
                    <input type="number" className="form-control bg-light border-0 small" placeholder="Latitude"
                        aria-describedby="basic-addon2" id="lat" required onChange={updateLatf}/>
                    <br />
                    <input type="text" className="form-control bg-light border-0 small" placeholder="Desciption"
                        aria-describedby="basic-addon2" id="desc" required onChange={updateDescf}/>
                    <br />
                    <input type="submit" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
                        id="addBtn" value="Add"  style={{ width: `100%` }} onClick={manageAdd}  />
                </fieldset>
            </div>

        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<AppWidget title="Add a POI" />);
