import { ClipLoader } from 'react-spinners';
import PropTypes from 'prop-types';

const Loader = ({ loading, size = 70 }) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <ClipLoader
        color={'green'}
        loading={loading}
        size={size}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

Loader.propTypes = {
  loading: PropTypes.bool,
  size: PropTypes.string,
};

export default Loader;
