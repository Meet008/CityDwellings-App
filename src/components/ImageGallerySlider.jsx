import React from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

function ImageGallerySlider(props) {
  const galleryItems = props.images.map((imageUrl) => ({
    original: imageUrl,
    thumbnail: imageUrl,
  }));

  return (
    <div>
      <ImageGallery
        items={galleryItems}
        showPlayButton={false}
        slideOnThumbnailOver={true}
      />
    </div>
  );
}

export default ImageGallerySlider;
