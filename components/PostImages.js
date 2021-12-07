import PropTypes from "prop-types";
import { Carousel } from "antd";

const PostImages = ({ images }) => {
  const contentStyle = {
    maxWidth: "100%",
    witdth: "100%",
  };
  return (
    <>
      <Carousel autoplay>
        {images.map(image => (
          <div>
            <img src={image.src} style={contentStyle} alt={image.src} />
          </div>
        ))}
      </Carousel>
    </>
  );
};

PostImages.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object),
};

export default PostImages;