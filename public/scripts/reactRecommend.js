function AppWidget({ title }) {
    const [id, setId] = React.useState("");

    function updateID(id) {
        setId(id);
    }

    function manageRecommend() {
        const poi = {
            poi_id: id
        };
        if (
            poi.poi_id.trim() == ""
        ) {
            alert("Please enter an ID!");
        } else {
            recommend(poi);
        }
    }

    async function recommend(poi) {
        const response = await fetch(`http://localhost:3000/poi/recommend`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(poi),
        });
        if (response.status == 200) {
            alert(`Recommended :D`);
            window.location.href = "/";
        } else if (response.status == 404) {
            alert("Invalid ID! Please try again");
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
                updateID={updateID}
                manageRecommend={manageRecommend}
            />
        </div>
    );
}

function InputWidget({ title, updateID, manageRecommend }) {
    function updateIDf() {
        updateID(document.getElementById("idValue").value);
    }

    return (
        <div className="container-fluid">
            <h1 className="h3 mb-0 text-gray-800">{title}</h1>
            <br/>
            <i className="fas fa-fw fa-chart-area"></i>
            <span>In order to recommend a POI you will need to know the POI id, if you do not please
                <a href="/">
                    click here
                </a>
                to go to main page and search for the POI you looking for.
            </span>
            <br/>
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <fieldset style={{ width: `100%` }}>
                    <input type="number" className="form-control bg-light border-0 small"
                        placeholder="Please enter the POI id" aria-describedby="basic-addon2" id="idValue"
                        required onChange={updateIDf}/>
                        <br/>
                    <input type="submit" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
                        id="recommendBtn" value="Recommend" style={{ width: `100%` }} onClick={manageRecommend}/>
                </fieldset>
            </div>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<AppWidget title="Recommending a POI" />);
