import React from 'react';
import CustomTypes from '../../lib/custom-types';
import PropTypes from 'prop-types';

const HasPermission = ({ user, allowedRoles, children }) => {

    const isAllowed = () => {
        if (user && allowedRoles) {
            const haspermission = allowedRoles.split(',').find(role => role === user.securityGroup);
            return haspermission ? true : false;
        }
        return false;
    }

    return (
        <>
            {
                isAllowed() &&
                children
            }
        </>
    );
};

HasPermission.propTypes = {
    user: CustomTypes.userData,
    allowedRoles: PropTypes.string,
};

export default HasPermission;