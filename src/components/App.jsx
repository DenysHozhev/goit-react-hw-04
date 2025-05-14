import { useState, useEffect } from "react";
import axios from "axios";
import { Toaster } from "react-hot-toast";

import SearchBar from "./searchBar/SearchBar";
import ImageGallery from "./imageGallery/ImageGallery";
import Loader from "./loader/Loader";
import ErrorMessage from "./errorMessage/ErrorMessage";
import LoadMoreBtn from "./loadMoreBtn/LoadMoreBtn";
import ImageModal from "./imageModal/ImageModal";

import "./App.css";

axios.defaults.baseURL = "https://api.unsplash.com/";

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [loadBtn, setLoadBtn] = useState(false);
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (!query) return;

    setLoading(true);
    setError(false);

    responseData(query, { page })
      .then((data) => {
        setImages((prevImages) =>
          page === 1 ? data.results : [...prevImages, ...data.results]
        );
        setTotalPages(data.total_pages);
        setLoadBtn(page < data.total_pages);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [query, page]);

  function responseData(query, additionalParams = {}) {
    const requestParams = {
      client_id: "LZr_vOm1lIn6mvyhgEe6tt3KkdPj308WnErdw7HcsBE",
      query,
      ...additionalParams,
    };

    return axios
      .get("search/photos", { params: requestParams })
      .then((response) => response.data);
  }

  const onSubmit = (newQuery) => {
    if (newQuery === query) return;
    setImages([]);
    setPage(1);
    setQuery(newQuery);
  };

  const loadMore = () => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const openModal = (image) => {
    setSelectedImage(image);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <SearchBar onSubmit={onSubmit} />
      <Toaster />
      <ImageGallery images={images} onImageClick={openModal} />
      {loading && <Loader />}
      {error && <ErrorMessage />}
      {loadBtn && !loading && <LoadMoreBtn onClick={loadMore} />}
      <ImageModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        selectedImage={selectedImage}
      />
    </div>
  );
}

export default App;
