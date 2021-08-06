import colors from './colors';

export default {
	appScreenCustomBG: {
		backgroundColor: 'transparent'
	},
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'transparent'
	},
	alertInner: {
		width: '60%',
		paddingVertical: 10,
		borderRadius: 10
	},
	info: {
		borderColor: colors.alertLightBorderColor,
		backgroundColor: colors.alertLightBackgroundColor,
	},
	infoText: {
		color: colors.alertLightTextColor,
		textAlign: 'center'
	},
	error: {
		borderColor: colors.alertDangerBorderColor,
		backgroundColor: colors.alertDangerBackgroundColor,
	},
	errorText: {
		color: colors.alertDangerTextColor,
		textAlign: 'center'
	},
	warning: {
		borderColor: colors.alertWarningBorderColor,
		backgroundColor: colors.alertWarningBackgroundColor,
	},
	warningText: {
		color: colors.alertWarningTextColor,
		textAlign: 'center'
	},
	success: {
		borderColor: colors.alertSuccessBorderColor,
		backgroundColor: colors.alertSuccessBackgroundColor,
	},
	successText: {
		color: colors.alertSuccessTextColor,
		textAlign: 'center'
	}
}