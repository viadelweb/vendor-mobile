import colors from './colors';
import Constants from 'expo-constants';


const shared = {
	warning: {
		backgroundColor: colors.alertWarningBackgroundColor,
		borderColor: colors.alertSuccessBorderColor,
		borderSize: 1,
	},
	error: {
		backgroundColor: colors.alertDangerBackgroundColor,
		borderColor: colors.alertSuccessBorderColor,
		borderSize: 1,
	},
	info: {
		backgroundColor: colors.alertInfoBackgroundColor,
		borderColor: colors.alertSuccessBorderColor,
		borderSize: 1,
	},
	success: {
		backgroundColor: colors.alertSuccessBackgroundColor,
		borderColor: colors.alertSuccessBorderColor,
		borderSize: 1,
	}
}

export default {
	notificationContainer: {
		position: 'absolute',
		display: 'flex',
		top: Constants.statusBarHeight,
		marginHorizontal: 10,
		display: 'flex',
		flexGrow: 1,
		flexDirection: 'row',
		minHeight: 40,
		zIndex: 100,
		borderRadius: 8,
		alignItems: 'center',
		padding: 10
	},
	content: {
		flex: 1,
	},
	closeBtn: {
		color: colors.alertSuccessLinkColor,
	},
	successNotification: {
		...shared.success
	},
	warningNotification: {
		...shared.warning
	},
	infoNotification: {
		...shared.info
	},
	errorNotification: {
		...shared.error
	}
}