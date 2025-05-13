const ImageCard = ({ image }) => {
  return (
    <div>
      <img src={image.urls.small} alt="" />
    </div>
  );
};

// full - for modal

export default ImageCard;
