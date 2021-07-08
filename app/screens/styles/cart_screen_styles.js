import colors from './colors';
import buttons from './button_styles';

const shared = {
	headerText: {
		fontSize: 14,
		fontWeight: '600'
	}
}

export default {
	tabContainer: {
		display: 'flex',
		justifyContent: 'space-between',
		flexDirection: 'row',
		backgroundColor: colors.lightGrey,
	},
	tabButton: {
		flex: 1,
		width: '50%',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
	},
	tabText: {
		lineHeight: 50,
		textAlign: 'center',
		justifyContent: 'center'
	},
	tabCaret: {
		top: 2,
		marginTop: -12,
		borderBottom: 0,
		marginBottom: 0
	},
	activeTab: {
		backgroundColor: colors.primary
	},
	noOrderText: {
		textAlign: 'center',
		paddingVertical: 20
	},
	orderDetailsContainer: {
		flex: 1,
		backgroundColor: colors.white
	},
	detailsHeader: {
		display: 'flex',
		flexDirection: 'row',
		paddingVertical: 20,
		paddingHorizontal: 10
	},
	cartItems: {
		display: 'flex',
		flexGrow: 1,
		maxHeight: '50%'
	},
	cartTotals: {
		display: 'flex',
	},
	cartTerms: {
		display: 'flex',
	},
	qty: {
		...shared.headerText,
		flexGrow: 1
	},
	item: {
		...shared.headerText,
		flexGrow: 4
	},
	price: {
		...shared.headerText,
		flexGrow: 1
	},
	cartItemRow: {
		display: 'flex',
		flexDirection: 'row',		
		paddingVertical: 10
	},
	cartItemQtyWrapper: {
		flexGrow: 1,
		maxWidth: '10%'
	},
	cartItemQtyText: {
		textAlign: 'center',
		...shared.headerText
	},
	cartItemItemWrapper: {
		flexGrow: 3,
		maxWidth: '65%'
	},
	cartItemItemTitle: {
		...shared.headerText
	},
	cartItemNoteHeader: {
		...shared.headerText,
		fontSize: 12,
		lineHeight: 18
	},
	cartItemNote: {
		fontSize: 12,
		fontWeight: '400',
		lineHeight: 14,
		paddingHorizontal: 10
	},
	cartItemPrice: {
		flexGrow: 1,
		maxWidth: '25%',
		...shared.headerText,
		paddingLeft: 10,
	},
	cartTotalRow: {
		flexDirection: 'row',
		marginBottom: 5,
	},
	cartTotalTitle: {
		flexGrow: 1,
		maxWidth: '75%',
		textAlign: 'right',
		fontWeight: '600',
		fontSize: 16,
		lineHeight: 32,
	},
	cartTotalPrice: {
		flexGrow: 1,
		maxWidth: '25%',
		lineHeight: 32,
		paddingLeft: 10
	},
	terms: {
		display: 'flex',
		marginVertical: 15
	},
	termsContent: {
		flexDirection: 'row',
		paddingHorizontal: 15,
		marginBottom: 10
	},
	termsText: {
		flexShrink: 1,
		fontSize: 14,
	},
	checkboxStyle: {
		borderRadius: 0
	},
	btnContainer: {
		display: 'flex',
		alignItems: 'center',
	},
	btn: {
		...buttons.btnPrimaryM,
		borderRadius: 0
	}
}