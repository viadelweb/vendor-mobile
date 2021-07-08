import colors from './colors';
import Constants from 'expo-constants';

const shared = {
	heroContainerHeight: 235,
	circleImage: {
		height: 80,
		width: 80,
		borderRadius: 40,
		overflow: 'hidden',
		alignItems: 'center'
	}
}

export default {
	heroImage: {
		flex: 1,
		height: shared.heroContainerHeight,
		resizeMode: 'cover',
		overflow: 'hidden',
		backgroundColor: colors.white
	},
	heroLogoLeftCircle: {
		...shared.circleImage
	},
	logoContainer: {
		// backgroundColor: colors.red,
		height: shared.heroContainerHeight - Constants.statusBarHeight,
		flexDirection: 'row',
		alignItems: 'flex-end',
		paddingBottom: 10
	},
	heroTextContainr: {
		flex: 1,
		flexDirection: 'column',
		paddingHorizontal: 10
	},
	heroTextHeader: {
		color: colors.white,
		fontSize: 30,
		lineHeight: 40.5,
		fontWeight: '500',
		textShadowColor: colors.black,
		textShadowOffset: { width: 1, height: 1 },
		textShadowRadius: 10
	},
	heroTextDescription: {
		color: colors.offWhite,
		fontSize: 16,
		fontWeight: '500',
		textShadowColor: colors.black,
		textShadowOffset: { width: 1, height: 1 },
		textShadowRadius: 10
	},
	headerButtons: {
		display: 'flex',
		flexDirection: 'row',
		paddingHorizontal: 8,
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		justifyContent: 'space-between',
		zIndex: 1
	},
	rightHeaderIcon: {
		alignItems: 'flex-end',
		shadowColor: colors.black,
		shadowOffset: { width: 1, height: 1 },
		shadowRadius: 5,
	},
	leftHeaderIcon: {
		alignItems: 'flex-start',
		shadowColor: colors.black,
		shadowOffset: { width: 1, height: 1 },
		shadowRadius: 5,
	},
	distanceTextContainer: {
		position: 'relative',
		flexDirection: 'row'		
	},
	distanceText: {
		color: colors.medGrey,
		fontSize: 12,
		textTransform: 'uppercase',
		paddingVertical: 10,
		paddingLeft: 8
	},
	categoryListContainer: {
		height: 120,
		marginBottom: 20
	},
	categoryImage: {
		...shared.circleImage,
		marginRight: 10
	},
	categoryText: {		
		fontSize: 13,
		textAlign: 'center',
		paddingVertical: 5,
		width: 80
	},
	itemListContainer: {
		flex: 1,
	},
	listItemContentContainer: {
		flexDirection: 'row',
		paddingVertical: 5,
		backgroundColor: colors.white
	},
	listItemContent: {
		flexDirection: 'column',
		width: 1,
		flexGrow: 1,
		paddingRight: 10
	},
	listItemPrice: {
		display: 'flex',
		paddingRight: 8
	},
	listItemImage: {
		alignContent: 'flex-start',
		width: 80,
        height: 80,
        marginRight: 10,
	},
	listItemHeader: {
		fontSize: 16,
		fontWeight: '500',
        lineHeight: 30.5,
	},
	listItemDescription: {
		color: colors.dark
	},
}
