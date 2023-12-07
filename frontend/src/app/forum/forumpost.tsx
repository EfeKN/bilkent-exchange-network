import "../../bootstrap.css";
import "../../App.css";

interface ForumPostProps {
  forumPosts: {
    id: number;
    title: string;
    description: string;
    category: string;
  }[];
}

const handleForumPostClick = (postId: number) => {
  // Replace this with your desired functionality when a forum element is clicked
  console.log(`Forum post with ID ${postId} clicked!`);
};

export default function ForumPost({ forumPosts }: ForumPostProps) {
  return (
    <div className="container">
      <div className="row">
        {forumPosts.map((post) => (
          <div className="col-12 mb-4" key={post.id}>
            <div
              className="col-12"
              key={post.id}
              onClick={() => handleForumPostClick(post.id)}
              style={{ cursor: "pointer" }}
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
  );
}