import axios from "axios";
import { useEffect, useState } from "react";
import "../../App.css";
import CreatePostButton from "../../components/createpostbutton";
import Filters from "../../components/filters";
import Header from "../../components/header";
import Navbar from "../../components/navbar";
import SearchBar from "../../components/searchbar";
import { BorrowPost } from "../../data-types/posttypes";

export default function Borrow() {
  const [borrowPosts, setBorrowPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Callback function to handle search term
  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };

  useEffect(() => {
    const endpoint = searchTerm
      ? `http://localhost:3000/borrow/borrowpost/${searchTerm}`
      : "http://localhost:3000/borrow/borrowpost";

    axios
      .get(endpoint)
      .then((res) => {
        //console.log(res.data);
        setBorrowPosts(res.data);
        //setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        //setLoading(false);
      });
  }, [searchTerm]);

  const handleBorrowPostClick = (postId: string) => {
    // Replace this with your desired functionality when a borrow element is clicked
    console.log(`Borrow post with ID ${postId} clicked!`);
  };

  return (
    <div className="w-screen h-screen">
      <Header />
      <Navbar />
      <div className="flex flex-row  grow">
        <Filters type="borrow"></Filters>
        <div className="w-full h-full">
          <div className="flex items-center justify-center mb-3">
            <SearchBar type="borrow" onSearch={handleSearch} />
            <CreatePostButton type="borrow" />
          </div>
          <div className="container">
            <div className="row">
              {borrowPosts.map((post: BorrowPost) => (
                <div className="col-12 mb-4" key={post.id}>
                  <div
                    className="col-12"
                    key={post.id}
                    onClick={() => handleBorrowPostClick(post.id)}
                    style={{ cursor: "pointer", textAlign: "left" }}
                  >
                    <div className="card" style={{ width: "100%" }}>
                      <div className="position-relative">
                        <span className="badge bg-primary rounded-pill position-absolute top-0 end-0 m-2">
                          {post.category}
                        </span>
                      </div>
                      <div className="card-img-overlay d-flex justify-content-end">
                        <a href="#" className="card-link text-danger like">
                          <i className="fas fa-heart"></i>
                        </a>
                      </div>
                      <div className="card-body">
                        <h2
                          className="card-title"
                          style={{ fontSize: "1.5rem", fontWeight: "bold" }}
                        >
                          {post.title.length < 50
                            ? post.title
                            : post.title.slice(0, 50) + "..."}
                        </h2>
                        <div
                          className="description-container"
                          style={{ height: "10%" }}
                        >
                          <p className="card-text">
                            {post.description.length < 315
                              ? post.description
                              : post.description.slice(0, 315) + "..."}
                          </p>
                        </div>
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
