import React from 'react';
import {
    Text
} from 'react-native';
import PropTypes from 'prop-types';

class AppText extends React.Component {
    render() {
        const {
            children,
            numberOfLines,
            style
        } = this.props

        return (
            <Text style={style}
                  numberOfLines={numberOfLines}
                  textBreackStrategy={'simple'}>
            {children}
            </Text>
        )
    }
}

AppText.propTypes = {
    numberOfLines: PropTypes.number,
    style: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array
    ])
}

export { AppText }