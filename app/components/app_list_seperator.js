import React from 'react';
import { 
    View
} from 'react-native';
import colors from '../screens/styles/colors';

const styles = {
    separator: {
        width: '100%',
        height: 1,
        backgroundColor: colors.light
    }
};

class AppListSeparator extends React.Component {
    render() {
        return (
            <View style={styles.separator} />
        )
    }
}

export { AppListSeparator }