import React from 'react';
import {
    TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';

class AppButton extends React.Component {
    render() {
        const {
            children,
            onPress,
            styles
        } = this.props;

        return (
            <TouchableOpacity style={styles}
                  onPress={onPress}>
                {children}
            </TouchableOpacity>
        )
    }

}

AppButton.propTypes = {
    styles: PropTypes.object,
    onPress: PropTypes.func,
}

export { AppButton }
