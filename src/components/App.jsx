import SearchBar from "./searchBar/SearchBar";
import "./App.css";
import { Toaster } from "react-hot-toast";
import ImageGallery from "./imageGallery/ImageGallery";
import Loader from "./loader/Loader";
import { useState } from "react";
import ErrorMessage from "./errorMessage/ErrorMessage";
import LoadMoreBtn from "./loadMoreBtn/LoadMoreBtn";
import axios from "axios";
import ImageModal from "./imageModal/ImageModal";

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

  const onSubmit = (newQuery) => {
    console.log(`Search: ${newQuery}`);
    setLoading(true);
    setError(false);
    setLoadBtn(false);
    responseData(newQuery)
      .then((data) => {
        setImages(data.results);
        setLoadBtn(true);
        setPage(1);
        setQuery(newQuery);
        setTotalPages(data.total_pages);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  };

  axios.defaults.baseURL = "https://api.unsplash.com/";

  function responseData(query, additionalParams = {}) {
    const reqestParams = {
      client_id: "LZr_vOm1lIn6mvyhgEe6tt3KkdPj308WnErdw7HcsBE",
      query,

      ...additionalParams,
    };
    return axios
      .get("search/photos", {
        params: reqestParams,
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      });
  }

  const loadMore = () => {
    const nextPage = page + 1;
    responseData(query, { page: nextPage })
      .then((data) => {
        setImages((prevImages) => [...prevImages, ...data.results]);
        setLoadBtn(true);
        setPage(nextPage < totalPages);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  };

  let subtitle;

  function openModal(image) {
    setIsOpen(true);
    setSelectedImage(image);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <SearchBar onSubmit={onSubmit} />
      <Toaster />
      <ImageGallery images={images} onImageClick={openModal} />
      {loading && <Loader />}
      {error && <ErrorMessage />}
      {loadBtn && <LoadMoreBtn onClick={loadMore} />}
      <ImageModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        selectedImage={selectedImage}
      />
    </div>
  );
}

export default App;
