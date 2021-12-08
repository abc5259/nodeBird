import PropTypes from "prop-types";
import Link from "next/link";

const PostCardContent = ({ postData }) => {
  return (
    <div>
      {postData.split(/(#[^\s#]+)/g).map((str, i) => {
        if (str.startsWith("#")) {
          return (
            <Link key={i} href={`/hashtag/${str.slice(1)}`}>
              <a>{str}</a>
            </Link>
          );
        } else {
          return str;
        }
      })}
    </div>
  );
};

PostCardContent.propTypes = {
  postData: PropTypes.string.isRequired,
};

export default PostCardContent;
