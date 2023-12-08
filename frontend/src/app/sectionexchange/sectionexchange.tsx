import axios from "axios";
import { useEffect, useState } from "react";
import "../../App.css";
import Categories from "../../components/categories";
import CreatePostButton from "../../components/createpostbutton";
import SearchBar from "../../components/searchbar";
import { SectionexchangePost } from "../../data-types/posttypes";
import Header from "../../components/header";
import Navbar from "../../components/navbar";

export default function SectionExchange() {
  function handleDMClick(): void {
    console.log("DM Box Clicked");
  }

  const [sectionexchangePosts, setSectionexchangePosts] = useState([]);
  //const [loading, setLoading] = useState(false);

  useEffect(() => {
    //setLoading(true);
    axios
      .get("http://localhost:3000/sectionexchange/sectionexchangepost")
      .then((res) => {
        setSectionexchangePosts(res.data);
        //setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        //setLoading(false);
      });
  }, []);

  return (
    <>
      <Header />
      <Navbar />
      <div className="flex flex-row grow">
        <Categories type="sectionExchange"></Categories>
        <div className="w-full h-full">
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <SearchBar type="sectionExchange" />
            <CreatePostButton type="sectionExchange" />
          </div>
          <div className="container" style={{ width: "100%" }}>
            <div className="row mb-3 mr-20 ml-5">
              <div className="col-12">
                <div
                  className="card section-card row align-items-start justify-content-center pl-1 pr-1 py-2"
                  style={{ backgroundColor: "white", fontWeight: "bold" }}
                >
                  <div className="row align-items-start justify-content-start">
                    <div
                      className="col-md text-center" // Adjusted column size
                      style={{ borderRight: "1px solid black" }}
                    >
                      <p className="card-text">{"Name"}</p>
                    </div>
                    <div
                      className="col-md text-center" // Adjusted column size
                      style={{ borderRight: "1px solid black" }}
                    >
                      <p className="card-text">{"Offered Section"}</p>
                    </div>
                    <div
                      className="col-md text-center" // Adjusted column size
                      style={{ borderRight: "1px solid black" }}
                    >
                      <p className="card-text">{"Desired Section"}</p>
                    </div>
                    <div
                      className="col-md text-center" // Adjusted column size
                      style={{ borderRight: "1px solid black" }}
                    >
                      <p className="card-text">{"DM"}</p>
                    </div>
                    <div
                      className="col-md text-center" // Adjusted column size
                    >
                      <p className="card-text">{"Date"}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container" style={{ width: "100%" }}>
            {sectionexchangePosts.map((item: SectionexchangePost) => (
              <div className="row mb-1 mr-20 ml-5" key={item.id}>
                <div className="col-12">
                  <div
                    className="card section-card row align-items-start justify-content-center pl-1 pr-1 py-2"
                    style={{ backgroundColor: "white" }}
                  >
                    <div className="row align-items-start justify-content-start">
                      <div
                        className="col-md text-center" // Adjusted column size
                        style={{ borderRight: "1px solid black" }}
                      >
                        <p className="card-text">{item.title}</p>
                      </div>
                      <div
                        className="col-md text-center" // Adjusted column size
                        style={{ borderRight: "1px solid black" }}
                      >
                        <p className="card-text">{item.offeredSection}</p>
                      </div>
                      <div
                        className="col-md text-center" // Adjusted column size
                        style={{ borderRight: "1px solid black" }}
                      >
                        <p className="card-text">{item.desiredSection}</p>
                      </div>
                      <div
                        className="col-md text-center" // Adjusted column size
                        style={{ borderRight: "1px solid black" }}
                      >
                        <div>
                          {/* DM Box Image with hover title and click event */}
                          <img
                            className="img-fluid mx-auto d-block"
                            style={{ maxWidth: "4vw", maxHeight: "4vh" }}
                            src="/dmbox.png" // Replace with your image URL
                            alt="DM Box"
                            title="Send DM" // Tooltip on hover
                            onClick={() => handleDMClick()} // Your click handler
                          />
                        </div>
                      </div>
                      <div
                        className="col-md text-center" // Adjusted column size
                      >
                        <p className="card-text">{item.date}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
