import ImageCard from "../imageCard/ImageCard";

const ImageGallery = ({ images, onImageClick }) => {
  return (
    <ul>
      {/* Набір елементів списку із зображеннями */}
      {images.map((img, index) => (
        <li key={index} onClick={() => onImageClick(img)}>
          <ImageCard image={img} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
