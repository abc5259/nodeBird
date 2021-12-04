import PropTypes from "prop-types";
import Head from "next/head";
import "antd/dist/antd.css";
const App = ({ Component }) => {
  // pages의 공통 부분
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>NodeBird</title>
      </Head>
      <Component />
    </>
  );
};

App.PropTypes = {
  Component: PropTypes.elementType.isRequired,
};
export default App;
