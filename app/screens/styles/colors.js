const baseColors = {
    primary: '#20c997',
    secondary: '#4ecdc4',
    black: '#000',
    white: '#fff',
    blue: '#007bff',
    indigo: '#6610f2',
    purple: '#6f42c1',
    pink: '#e83e8c',
    red: '#dc3545',
    orange: '#fd7e14',
    yellow: '#ffc107',
    green: '#28a745',
    teal: '#20c997',
    cyan: '#17a2b8',
    gray: '#6c757d',
    success: '#28a745',
    info: '#17a2b8',
    warning: '#ffc107',
    danger: '#dc3545',
    light: '#f8f9fa',
    lightGrey: '#cccccc',
    dark: '#343a40',
    darkGrey: '#212529',
    medGrey: '#6e6869',
    offWhite: '#eeeeee'
}

export default {
	...baseColors,
    /** Text colors */
    primaryTextColor: baseColors.darkGrey,
    secondaryTextColor: baseColors.secondary,
    link: '#007bff',
    linkHover: '#0056b3',

	/** Alerts */
	alertPrimaryTextColor: '#004085',
	alertPrimaryBackgroundColor: '#cce5ff',
	alertPrimaryBorderColor: '#b8daff',
	alertPrimaryLinkColor: '#002752',

	alertSecondaryTextColor: '#383d41',
	alertSecondaryBackgroundColor: '#e2e3e5',
	alertSecondaryBorderColor: '#d6d8db',
	alertSecondaryLinkColor: '#202326',

	alertSuccessTextColor: '#155724',
	alertSuccessBackgroundColor: '#d4edda',
	alertSuccessBorderColor: '#c3e6cb',
	alertSuccessLinkColor: '#0b2e13',

	alertDangerTextColor: '#721c24',
	alertDangerBackgroundColor: '#f8d7da',
	alertDangerBorderColor: '#f5c6cb',
	alertDangerLinkColor: '#491217',

	alertWarningTextColor: '#856404',
	alertWarningBackgroundColor: '#fff3cd',
	alertWarningBorderColor: '#ffeeba',
	alertWarningLinkColor: '#533f03',

	alertInfoTextColor: '#0c5460',
	alertInfoBackgroundColor: '#d1ecf1',
	alertInfoBorderColor: '#bee5eb',
	alertInfoLinkColor: '#062c33',

	alertLightTextColor: '#818182',
	alertLightBackgroundColor: '#fefefe',
	alertLightBorderColor: '#fdfdfe',
	alertLightLinkColor: '#686868',

	alertDarkTextColor: '#1b1e21',
	alertDarkBackgroundColor: '#d6d8d9',
	alertDarkBorderColor: '#c6c8ca',
	alertDarkLinkColor: '#040505',

	/** Background colors */
	primaryBackgroundColor: baseColors.primary,
	secondaryBackgroundColor: baseColors.secondary,
	successBackgroundColor: baseColors.success,
	infoBackgroundColor: baseColors.info,
	warningBackgroundColor: baseColors.warning,
	dangerBackgroundColor: baseColors.danger,
	lightBackgroundColor: baseColors.light,
	darkBackgroundColor: baseColors.dark
}
