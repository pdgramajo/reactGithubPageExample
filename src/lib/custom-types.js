import PropTypes from 'prop-types';

const user = PropTypes.shape({
  name: PropTypes.string,
  email: PropTypes.string,
  readOnly: PropTypes.bool,
});
const userData = PropTypes.shape({
  id: PropTypes.string,
  userName: PropTypes.string,
  email: PropTypes.string,
  phoneNumber: PropTypes.string,
  roles: PropTypes.string,
});
const users = PropTypes.arrayOf(userData);

export default {
    user,
    users,
    userData
};
