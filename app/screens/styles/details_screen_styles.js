import colors from './colors';
import Constants from 'expo-constants';
import common_styles from './common_styles';
import { color } from 'react-native-reanimated';

const shared = {
	productImageHeight: 200,
	attributeListItemHeaderHeight: 44,
	attributeListItemHeight: 30
}

export default {
	headerButtons: {
		...common_styles.headerButtons,
		top: Constants.statusBarHeight,
	},
	leftHeaderIcon: {
		...common_styles.leftHeaderIcon
	},
	heroImage: {
		flex: 1,
		height: common_styles.heroHeight,
		resizeMode: 'cover',
		overflow: 'hidden',
		backgroundColor: colors.white
	},
	contentContainer: {
		flex: 1,
		position: 'relative',
		paddingHorizontal: 10,
		backgroundColor: colors.white,
		overflow: 'hidden',
		top: shared.productImageHeight - Constants.statusBarHeight
	},
	detailsPageHeader: {
		fontSize: 24,
		fontWeight: '500',
		textAlign: 'center',
		paddingBottom: 10,
		color: colors.darkGrey,
	},
	detailsDescription: {
		fontSize: 14,
		paddingBottom: 10,
		color: colors.darkGrey,
		textAlign: 'center'
	},
	attrListContainer: {
		flex: 1,
		flexGrow: 0.53,
	},
	attributeInstructions: {
		fontSize: 12,
		color: colors.gray,
		paddingBottom: 10
	},
	attributeListSectionHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: colors.white,
		paddingRight: 12
	},
	attributeListSectionHeaderText: {
		color: colors.blue,
		fontSize: 18,
		fontWeight: '500',
		lineHeight: shared.attributeListItemHeaderHeight,
	},
	attributeListItem: {
		backgroundColor: colors.white,
		height: shared.attributeListItemHeight,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	attributeListItemText: {
		fontSize: 16,
		lineHeight: shared.attributeListItemHeight,
		flexGrow: 1
	},
	attributeListItemSwitch: {
		alignItems: 'flex-end',
		marginRight: 20
	},
	attributeListItemCheck: {
		alignItems: 'flex-end',
	},
	quantityUpdateText: {
		...common_styles.altText,
		textAlign: 'center',
		marginTop: 10,
		fontSize: 12
	},
	addToCartButtonContainer: {
		position: 'relative',
		alignItems: 'center',
		justifyContent: 'center',
		top: shared.productImageHeight - 50,
		marginBotton: 0,		
	},
	addToCartButton: {
		...common_styles.medPrimaryBtn,
		height: 100,
		width: 100,
		borderRadius: 50,
		borderWidth: 5,
		borderColor: colors.white,
	},
	notificationSuccessText: {
		color: colors.alertSuccessTextColor
	}
}