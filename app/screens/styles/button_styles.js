import colors from './colors';

const btn = {
    fontWeight: '400',
    alignContent: 'center',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'transparent',
    paddingHorizontal: 12,
    paddingVertical:  6,
    alignItems: 'center',
    justifyContent: 'center'
};

const btnCommon = {
    btnPrimary: {
        ...btn,
        backgroundColor: colors.primaryBackgroundColor,
        borderColor: colors.primaryBackgroundColor
    },
    btnSecondary: {
        ...btn,
        backgroundColor: colors.secondaryBackgroundColor,
        borderColor: colors.secondaryBackgroundColor
    },
    btnSuccess: {
        ...btn,
        backgroundColor: colors.successBackgroundColor,
        borderColor: colors.successBackgroundColor
    },
    btnInfo: {
        ...btn,
        backgroundColor: colors.infoBackgroundColor,
        borderColor: colors.infoBackgroundColor
    },
    btnWarning: {
        ...btn,
        backgroundColor: colors.warningBackgroundColor,
        borderColor: colors.warningBackgroundColor
    },
    btnDanger: {
        ...btn,
        backgroundColor: colors.dangerBackgroundColor,
        borderColor: colors.dangerBackgroundColor
    },
    btnLight: {
        ...btn,
        backgroundColor: colors.lightBackgroundColor,
        borderColor: colors.lightBackgroundColor
    },
    btnDark: {
        ...btn,
        backgroundColor: colors.darkBackgroundColor,
        borderColor: colors.darkBackgroundColor
    },
    btnXL: {
        paddingVertical: 5,
        width: '100%',
        borderRadius: 35
    },
    btnXLText: {
        fontSize: 32,
        fontWeight: '500'
    },
    btnL: {
        paddingVertical: 5,
        width: '80%',
        borderRadius: 30    
    },
    btnLText: {
        fontSize: 28,
        fontWeight: '500'
    },
    btnM: {
        paddingVertical: 5,
        width: '60%',
        borderRadius: 25
    },
    btnMText: {
        fontSize: 24,
        fontWeight: '500'
    },
    btnS: {
        paddingVertical: 5,
        width: '40%',
        borderRadius: 20
    },
    btnSText: {
        fontSize: 20,
        fontWeight: '500'
    },
    btnXS: {
        paddingVertical: 5,
        width: '20%',
        borderRadius: 20
    },
    btnXSText: {
        fontSize: 16,
        fontWeight: '500'
    }
};

const buttonSizes = {
    /** Button Primary Sizes */
    btnPrimaryXL: {
        ...btnCommon.btnPrimary,
        ...btnCommon.btnXL
    },
    btnPrimaryL: {
        ...btnCommon.btnPrimary,
        ...btnCommon.btnL
    },
    btnPrimaryM: {
        ...btnCommon.btnPrimary,
        ...btnCommon.btnM
    },
    btnPrimaryS: {
        ...btnCommon.btnPrimary,
        ...btnCommon.btnS
    },
    btnPrimaryS: {
        ...btnCommon.btnPrimary,
        ...btnCommon.btnS
    },

    /** Button Secondary Sizes */
    btnSecondaryXL: {
        ...btnCommon.btnSecondary,
        ...btnCommon.btnXL
    },
    btnSecondaryL: {
        ...btnCommon.btnSecondary,
        ...btnCommon.btnL
    },
    btnSecondaryM: {
        ...btnCommon.btnSecondary,
        ...btnCommon.btnM
    },
    btnSecondaryS: {
        ...btnCommon.btnSecondary,
        ...btnCommon.btnS
    },
    btnSecondaryXS: {
        ...btnCommon.btnSecondary,
        ...btnCommon.btnXS
    },

    /** Button Success Sizes */
    btnSuccessXL: {
        ...btnCommon.btnSuccess,
        ...btnCommon.btnXL
    },
    btnSuccessL: {
        ...btnCommon.btnSuccess,
        ...btnCommon.btnL
    },
    btnSuccessM: {
        ...btnCommon.btnSuccess,
        ...btnCommon.btnM
    },
    btnSuccessS: {
        ...btnCommon.btnSuccess,
        ...btnCommon.btnS
    },
    btnSuccessXS: {
        ...btnCommon.btnSuccess,
        ...btnCommon.btnXS
    },

    /** Button Info Sizes */
    btnInfoXL: {
        ...btnCommon.btnInfo,
        ...btnCommon.btnXL
    },
    btnInfoL: {
        ...btnCommon.btnInfo,
        ...btnCommon.btnL
    },
    btnInfoM: {
        ...btnCommon.btnInfo,
        ...btnCommon.btnM
    },
    btnInfoS: {
        ...btnCommon.btnInfo,
        ...btnCommon.btnS
    },
    btnInfoXS: {
        ...btnCommon.btnInfo,
        ...btnCommon.btnXS
    },

    /** Button Warning Sizes */
    btnWarningXL: {
        ...btnCommon.btnWarning,
        ...btnCommon.btnXL
    },
    btnWarningL: {
        ...btnCommon.btnWarning,
        ...btnCommon.btnL
    },
    btnWarningM: {
        ...btnCommon.btnWarning,
        ...btnCommon.btnM
    },
    btnWarningS: {
        ...btnCommon.btnWarning,
        ...btnCommon.btnS
    },
    btnWarningXS: {
        ...btnCommon.btnWarning,
        ...btnCommon.btnXS
    },

    /** Button Danger Sizes */
    btnDangerXL: {
        ...btnCommon.btnDanger,
        ...btnCommon.btnXL
    },
    btnDangerL: {
        ...btnCommon.btnDanger,
        ...btnCommon.btnL
    },
    btnDangerM: {
        ...btnCommon.btnDanger,
        ...btnCommon.btnM
    },
    btnDangerS: {
        ...btnCommon.btnDanger,
        ...btnCommon.btnS
    },
    btnDangerXS: {
        ...btnCommon.btnDanger,
        ...btnCommon.btnXS
    },

    /** Button Light Sizes */
    btnLightXL: {
        ...btnCommon.btnLight,
        ...btnCommon.btnXL
    },
    btnLightL: {
        ...btnCommon.btnLight,
        ...btnCommon.btnL
    },
    btnLightM: {
        ...btnCommon.btnLight,
        ...btnCommon.btnM
    },
    btnLightS: {
        ...btnCommon.btnLight,
        ...btnCommon.btnS
    },
    btnLightXS: {
        ...btnCommon.btnLight,
        ...btnCommon.btnXS
    },

    /** Button Dark Sizes */
    btnDarkXL: {
        ...btnCommon.btnDark,
        ...btnCommon.btnXL
    },
    btnDarkL: {
        ...btnCommon.btnDark,
        ...btnCommon.btnL
    },
    btnDarkM: {
        ...btnCommon.btnDark,
        ...btnCommon.btnM
    },
    btnDarkS: {
        ...btnCommon.btnDark,
        ...btnCommon.btnS
    },
    btnDarkXS: {
        ...btnCommon.btnDark,
        ...btnCommon.btnXS
    },
};

const buttonText = {
    /** Button Primary Text */
    btnPrimaryXLText: {
        ...btnCommon.btnXLText,
        color: colors.white,
    },
    btnPrimaryLText: {
        ...btnCommon.btnLText,
        color: colors.white,
    },
    btnPrimaryMText: {
        ...btnCommon.btnMText,
        color: colors.white,
    },
    btnPrimarySText: {
        ...btnCommon.btnSText,
        color: colors.white,
    },
    btnPrimaryXSText: {
        ...btnCommon.btnXSText,
        color: colors.white,
    },

    /** Button Secondary Text */
    btnSecondaryXLText: {
        ...btnCommon.btnXLText,
        color: colors.white
    },
    btnSecondaryLText: {
        ...btnCommon.btnLText,
        color: colors.white
    },
    btnSecondaryMText: {
        ...btnCommon.btnMText,
        color: colors.white
    },
    btnSecondarySText: {
        ...btnCommon.btnSText,
        color: colors.white
    },
    btnSecondaryXSText: {
        ...btnCommon.btnXSText,
        color: colors.white
    },

    /** Button Success Text */
    btnSuccessXLText: {
        ...btnCommon.btnXLText,
        color: colors.white
    },
    btnSuccessLText: {
        ...btnCommon.btnLText,
        color: colors.white
    },
    btnSuccessMText: {
        ...btnCommon.btnMText,
        color: colors.white
    },
    btnSuccessSText: {
        ...btnCommon.btnSText,
        color: colors.white
    },
    btnSuccessXSText: {
        ...btnCommon.btnXSText,
        color: colors.white
    },

    /** Button Info Text */
    btnInfoXLText: {
        ...btnCommon.btnXLText,
        color: colors.white
    },
    btnInfoLText: {
        ...btnCommon.btnLText,
        color: colors.white
    },
    btnInfoMText: {
        ...btnCommon.btnMText,
        color: colors.white
    },
    btnInfoSText: {
        ...btnCommon.btnSText,
        color: colors.white
    },
    btnInfoXSText: {
        ...btnCommon.btnXSText,
        color: colors.white
    },

    /** Button Warning Text */
    btnWarningXLText: {
        ...btnCommon.btnXLText,
        color: colors.darkGrey
    },
    btnWarningLText: {
        ...btnCommon.btnLText,
        color: colors.darkGrey
    },
    btnWarningMText: {
        ...btnCommon.btnMText,
        color: colors.darkGrey
    },
    btnWarningSText: {
        ...btnCommon.btnSText,
        color: colors.darkGrey
    },
    btnWarningXSText: {
        ...btnCommon.btnXSText,
        color: colors.darkGrey
    },

    /** Button Danger Text */
    btnDangerXLText: {
        ...btnCommon.btnXLText,
        color: colors.white
    },
    btnDangerLText: {
        ...btnCommon.btnLText,
        color: colors.white
    },
    btnDangerMText: {
        ...btnCommon.btnMText,
        color: colors.white
    },
    btnDangerSText: {
        ...btnCommon.btnSText,
        color: colors.white
    },
    btnDangerXSText: {
        ...btnCommon.btnXSText,
        color: colors.white
    },

    /** Button Light Text */
    btnLightXLText: {
        ...btnCommon.btnXLText,
        color: colors.darkGrey
    },
    btnLightLText: {
        ...btnCommon.btnLText,
        color: colors.darkGrey
    },
    btnLightMText: {
        ...btnCommon.btnMText,
        color: colors.darkGrey
    },
    btnLightSText: {
        ...btnCommon.btnSText,
        color: colors.darkGrey
    },
    btnLightXSText: {
        ...btnCommon.btnXSText,
        color: colors.darkGrey
    },

    /** Button Dark Text */
    btnDarkXLText: {
        ...btnCommon.btnXLText,
        color: colors.white
    },
    btnDarkLText: {
        ...btnCommon.btnLText,
        color: colors.white
    },
    btnDarkMText: {
        ...btnCommon.btnMText,
        color: colors.white
    },
    btnDarkSText: {
        ...btnCommon.btnSText,
        color: colors.white
    },
    btnDarkXSText: {
        ...btnCommon.btnXSText,
        color: colors.white
    },
};


export default {
	...btnCommon,
	...buttonSizes,
	...buttonText,
	listItemDelete: {
		backgroundColor: colors.dangerBackgroundColor,
		width: 50,
		justifyContent: 'center',
		alignItems: 'center'
	},
	listItemAdd: {
		backgroundColor: colors.successBackgroundColor,
		width: 50,
		justifyContent: 'center',
		alignItems: 'center'
	}
}