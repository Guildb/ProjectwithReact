function AppWidget({ title }) {
    const [id, setId] = React.useState("");
    const [rev, setReview] = React.useState("");

    function updateID(id) {
        setId(id);
    }

    function updateReview(rev) {
        setReview(rev);
    }

    function manageReview() {
        const review = {
            poi_id: id,
            review: rev
        };
        if (
            review.review.trim() == "" || review.poi_id.trim() == ""
        ) {
            alert("Invaid data please try again!");
        } else {
            addReview(review);
        }
    }

    async function addReview(review) {
        const response = await fetch(`http://localhost:3000/review/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(review),
        });
        if (response.status == 200) {
            alert(`Review Added !`);
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
                updateReview={updateReview}
                manageReview={manageReview}
            />
        </div>
    );
}

function InputWidget({ title, updateID, updateReview, manageReview }) {
    function updateIDf() {
        updateID(document.getElementById("poiId").value);
    }

    function updateReviewf() {
        updateReview(document.getElementById("description").value);
    }
    return (
        <div className="container-fluid">
            <h1 className="h3 mb-0 text-gray-800">{title}</h1>
            <br/>
            <i className="fas fa-fw fa-chart-area"></i>
            <span>Please enter the details bellow of the poi you wish to review:
            </span>
            <br/>
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <fieldset style={{ width: `100%` }}>
                    <p>
                        <input type="number" className="form-control bg-light border-0 small"
                            placeholder="Please enter the POI id" aria-describedby="basic-addon2"
                            id="poiId" required onChange={updateIDf} />
                    </p>
                    <p>
                        <textarea rows="5" className="form-control bg-light border-0 small" placeholder="Description"
                            aria-describedby="basic-addon2" id="description" required
                            onChange={updateReviewf}>

                        </textarea>
                    </p>
                    <input type="submit" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
                        id="submitReview" value="submit" style={{ width: `100%` }} onClick={manageReview} />
                </fieldset>
            </div>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<AppWidget title="Review a POI" />);
