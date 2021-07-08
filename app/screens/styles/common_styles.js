import colors from './colors';
import buttonStylds from './button_styles';
import Constants from 'expo-constants';

export default {	
	heroHeight: 235,
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
		shadowRadius: 6,
		shadowOpacity: 1
	},
	leftHeaderIcon: {
		alignItems: 'flex-start',
		shadowColor: colors.black,
		shadowOffset: { width: 0, height: 1 },
		shadowRadius: 4,
		shadowOpacity: 1
	},
	textInputContainer: {
        backgroundColor: colors.white,
		borderColor: colors.lightGrey,
		borderWidth: 1,
        flexDirection: 'row',
        width: '100%',
        padding: 10,
        marginTop: 20
    },
    textInput: {
        color: colors.darkGrey,
        fontSize: 14,
        width: '100%',
    },
	counterContainer: {
		flexDirection: 'row',
		marginTop: 20,
		width: '100%',
		justifyContent: 'center'
	},
	altText: {
		color: colors.medGrey,
		fontSize: 14
	},
	medPrimaryBtn: {
		...buttonStylds.btnPrimaryM,
		borderRadius: 0
	}
}