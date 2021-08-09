import colors from './colors';

export default {
	container: {
		display: 'flex',
		alignItems: 'center',
		backgroundColor: colors.white
	},
	confirmationText: {
		fontSize: 14,
		color: colors.noteColor,
		paddingTop: 20
	},
	thankYou: {
		fontSize: 24,
		fontWeight: '500'
	},
	instructions: {
		fontSize: 14,
		textAlign: 'center',
		paddingVertical: 20,
		paddingHorizontal: 80
	},
	est: {
		fontSize: 24,
		fontWeight: '200',
		paddingTop: 20,
	},
	time: {
		fontSize: 24,
		color: colors.secondaryTextColor,
		fontWeight: '500',
		paddingTop: 10,
		paddingBottom: 20
	},
	rowDataContainer: {
		width: '100%',
		paddingHorizontal: 15,
		paddingVertical: 10,
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 10,
	},
	title: {
		fontWeight: '500'
	},
	comment: {
		textAlign: 'right'
	},
	commentNewLine: {
		color: colors.noteColor,
		fontSize: 12
	},
	mapContainer: {
		flex: 1,
		width: '100%',
	},
	getDirectionText: {
		paddingVertical: 15,
		textAlign: 'center',
		color: colors.link
	}
}