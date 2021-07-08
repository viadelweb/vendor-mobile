import React from 'react';
import { View} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

class AppIcon extends React.Component {
    render() {
        const {
            name,
            size,
            color,
            styles = {},
            visible = true
        } = this.props;

        return (
            <>{visible && <View style={styles}>
                <MaterialCommunityIcons
					name={name}
					color={color}
					size={size} />
            </View>}</>
        )
    }
}

AppIcon.propTypes = {
    name: PropTypes.string,
    size: PropTypes.number,
    color: PropTypes.string,
    styles: PropTypes.object,
    visible: PropTypes.bool
};

export { AppIcon }
