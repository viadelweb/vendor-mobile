import React from 'react';
import {
    View
} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import PropTypes from 'prop-types';

import { AppText } from './app_text';
import { AppImage } from './app_image';
import styles from '../screens/styles/main_screen_styles';

class AppListItem extends React.Component {
    render() {
        const {
            title,
            description,
            uri,
            price,
            swipeLeftActions
        } = this.props;

        return (
            <Swipeable renderRightActions={swipeLeftActions}>
                <View style={styles.listItemContainer}>
                    <View style={styles.listItemContentContainer}>
                        <AppImage styles={styles.listItemImage} uri={uri} />
                        <View style={styles.listItemContent}>
                            <AppText numberOfLines={1} style={styles.listItemHeader}>{title}</AppText>
                            <AppText numberOfLines={2} style={styles.listItemDescription}>{description}</AppText>
                        </View>
                        <View style={styles.listItemPrice}>
                            <AppText numberOfLines={1} style={styles.listItemHeader}>{price}</AppText>
                        </View>
                    </View>
                </View>
            </Swipeable>
        )
    }
}

AppListItem.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    uri: PropTypes.string,
    price: PropTypes.string,
    swipeRightActions: PropTypes.func,
	swipeLeftActions: PropTypes.func
};

export { AppListItem }
