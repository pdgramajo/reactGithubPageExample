import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Card, Tooltip } from 'reactstrap';
import md5 from 'md5';
import Helpers from '../../lib/Helpers';

const ImageItem = ({ imageURL, handlerDelete, disabled }) => {

    console.log('disabled', disabled)
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const toggle = () => setTooltipOpen(!tooltipOpen);

    const onDismiss = () => {

        let array = imageURL.split('/');

        handlerDelete(array[array.length - 1]);
    }

    return (
        <Card>
            {
                !disabled &&

                <div style={{ position: 'absolute', right: 0 }}>
                    <button
                        type="button"
                        className="close"
                        aria-label="Close"
                        onClick={onDismiss}
                        id={`tooltipId${md5(imageURL)}`}
                    >
                        <span
                            style={{ margin: 10, fontSize: 29 }}
                            aria-hidden="true"
                        >
                            ×
                    </span>
                    </button>
                    <Tooltip
                        placement="right"
                        isOpen={tooltipOpen}
                        target={`tooltipId${md5(imageURL)}`}
                        toggle={toggle}
                    >
                        Delete
                </Tooltip>
                </div>
            }
            <div className="card-item-image">
                <img
                    alt={imageURL}
                    className="rounded-circle"
                    src={Helpers.getImageUrl(imageURL)}
                />
            </div>
        </Card>
    );
};

ImageItem.propTypes = {
    imageURL: PropTypes.string,
    handlerDelete: PropTypes.func,
    disabled: PropTypes.bool
};
ImageItem.defaultProps = {
    disabled: false
}

export default ImageItem;
