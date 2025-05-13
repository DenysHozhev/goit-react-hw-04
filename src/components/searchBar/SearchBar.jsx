import { useState } from "react";
import toast from "react-hot-toast";

export default function SearchBar({ onSubmit }) {
  const [request, setRequest] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (request.trim() === "") {
      toast.error("Please, enter your request");
      return;
    }
    onSubmit(request);
    setRequest("");
  };
  return (
    <header>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={request}
          onChange={(evt) => setRequest(evt.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </header>
  );
}
