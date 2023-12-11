import axios from "axios";
import { useEffect, useState } from "react";
import "../App.css";
import Filters from "../components/filters.tsx";
import Header from "../components/header.tsx";
import Navbar from "../components/navbar.tsx";
import SearchBar from "../components/searchbar.tsx";
import { FilterParams } from "../data-types/datatypes.ts";
import { SecondhandPost } from "../data-types/posttypes.ts";
import CreatePostButton from "./create-post/createPostButton.tsx";
import prepareUrl from "./prepareUrl.ts";

export default function Secondhand() {
  const [secondhandPosts, setSecondhandPosts] = useState([]);
  const [filterParams, setFilterParams] = useState<FilterParams>({
    categories: [],
    prices: {
      min: undefined,
      max: undefined,
    },
    dates: {
      startDate: undefined,
      endDate: undefined,
    },
    status: "all",
  });
  const [searchTerm, setSearchTerm] = useState("");

  // Callback function to handle search term
  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };

  /**
   * TODO: Implement loading
   */

  useEffect(() => {
    //setLoading(true);

    const url = prepareUrl(filterParams, searchTerm, "secondhand");
    console.log(url);

    axios
      .get(url)
      .then((res) => {
        setSecondhandPosts(res.data);

        //setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        //setLoading(false);
      });
  }, [filterParams, searchTerm]);

  function passFilters(params: FilterParams) {
    setFilterParams(params);
  }

  return (
    <div className="w-screen">
      <Header />
      <Navbar />
      <div className="flex flex-row grow">
        <Filters type="secondhand" passFilters={passFilters}></Filters>
        <div className="w-full h-full">
          <div className="flex items-center justify-center mb-3">
            <SearchBar type="secondhand" onSearch={handleSearch} />
            <CreatePostButton type="secondhand" />
          </div>
          <div className="container">
            <div className="row">
              {secondhandPosts.map((post: SecondhandPost) => (
                <div
                  className="col-12 col-sm-8 col-md-6 col-lg-4 mb-4"
                  key={post._id}
                >
                  <div className="card">
                    <div className="position-relative">
                      <span className="badge bg-primary rounded-pill position-absolute top-0 end-0 m-2">
                        {post.category}
                      </span>
                      <img
                        className="card-img w-30vw h-40vh object-cover"
                        src={post.image}
                        alt="Image"
                      />
                    </div>
                    <div className="card-img-overlay d-flex justify-content-end">
                      <a
                        href="#"
                        className="card-link text-danger like"
                        title="card"
                      >
                        <i className="fas fa-heart"></i>
                      </a>
                    </div>
                    <div className="card-body">
                      <h4 className="card-title">{post.title}</h4>
                      <div className="description-container h-13vh text-left">
                        <p className="card-text">
                          {post.description.length < 75
                            ? post.description
                            : post.description.slice(0, 75) + "..."}
                        </p>
                      </div>{" "}
                      <div className="buy d-flex justify-content-between align-posts-center">
                        <div className="price text-success">
                          <h5 className="mt-4">${post.price}</h5>
                        </div>
                        <a href="#" className="btn btn-danger mt-3">
                          <i className="fas fa-shopping-cart"></i> Details
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
