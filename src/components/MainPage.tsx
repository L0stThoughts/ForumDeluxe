import "../scss/bootstrap.scss";
import React from "react";
import { Link } from "react-router-dom";

const categories = [
  { name: "Lounge", description: "Relax and chat about anything." },
  { name: "Tips", description: "Share and find useful tips." },
  { name: "Homework Assistance", description: "Get help with your homework." },
  { name: "Exams", description: "I ain't say nun. 💂‍♂️" },
];

export const MainPage: React.FC = () => {
  return (
    <div className="container mt-5 main-page-container">
      <h1 className="mb-4 text-light">Forum Categories</h1>
      <div className="list-group">
        {categories.map((category) => (
          <Link
            key={category.name}
            to={`/category/${category.name}`}
            className="list-group-item list-group-item-action"
          >
            <h5 className="mb-1">{category.name}</h5>
            <p className="mb-1">{category.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};
