import React from 'react';
import {
	View,
} from 'react-native';
import MapView from 'react-native-maps';

import {
	AppScreen,
	AppText,
	AppQRCode,
	AppButton
} from '../components';
import styles from './styles/order_confirmation_screen_styles';
import constants from '../config/app_constants';
import { brokerRegistry } from '../brokers';
import { effectsRegistry } from '../effects';

const cartBroker = brokerRegistry.broker.getBroker(constants.CART_BROKER);
const appHookEffects = effectsRegistry.effects.getEffect(constants.APP_HOOK_EFFECTS);

class OrderConfirmationScreen extends React.Component {
	state = {
		confirmation: '',
		thankYou: '',
		qrCodeInstructions: '',
		estimateWaitTime: '',
		minutes: '',
		hour: '',
		hours: '',
		seconds: '',
		venderContact: '',
		currentLocation: '',
		additionalInformation: '',
		getDirections: '',
		orderDetails: {},
		confirmationUrl: '',
		region: {
			latitude: 37.78825,
			longitude: -122.4324,
			latitudeDelta: 0.0922,
			longitudeDelta: 0.0421,
		}
	}
	subscribers = new Map();

	componentDidMount() {
		this.getTranslateText();
		this.createDataSubscribers();
	}

	componentWillUnmount() {
        this.subscribers.forEach((sub, key) => {
            sub.unsubscribe();
            sub.complete();
        });
    }

	onRegionChange(region) {
		this.setState({ region });
	}

	getTranslateText() {
		const { t } = appHookEffects.getEffectsByName(['t']);
		setTimeout(() => {
			if (t) {
				this.setState({
					confirmation: t('confirmation'),
					thankYou: t('thank_you'),
					qrCodeInstructions: t('qr_code_instructions'),
					estimateWaitTime: t('estimate_wait_time'),
					minutes: t('minutes'),
					hour: t('hour'),
					hours: t('hours'),
					seconds: t('seconds'),
					venderContact: t('vender_contact'),
					currentLocation: t('current_location'),
					additionalInformation: t('additional_information'),
					getDirections: t('get_directions'),
				})
			}
		})
	}

	createDataSubscribers() {
		const cKey = constants.CART_BROKER + '.' + constants.COMFIRMED_ORDER_OBSERVABLE;
		if (!this.subscribers.has(cKey)) {
			this.subscribers.set(cKey, cartBroker[constants.COMFIRMED_ORDER_OBSERVABLE].subscribe(order => {
				if (order) {
					this.setState({
						orderDetails: order
					});
				}
			}))
		}
	}


	render() {
		return (
			<AppScreen style={styles.container}>
				<AppText style={styles.confirmationText}>
					{this.state.confirmation}&nbsp;{this.state.orderDetails?.orderConfirmationNumber}
				</AppText>
				<AppText style={styles.thankYou}>{this.state.thankYou}</AppText>
				<AppText style={styles.instructions}>{this.state.qrCodeInstructions}</AppText>
				<View>
					<AppQRCode url={this.state.orderDetails?.orderConfirmationUrl}/>
				</View>
				<AppText style={styles.est}>{this.state.estimateWaitTime}</AppText>
				<AppText style={styles.time}>15&nbsp;{this.state.minutes}</AppText>
				<View style={styles.rowDataContainer}>
					<View style={styles.row}>
						<AppText style={styles.title}>{this.state.venderContact}</AppText>
						<AppText style={styles.comment}>{this.state.orderDetails?.company?.poc_phone}</AppText>
					</View>
					<View style={styles.row}>
						<AppText style={styles.title}>{this.state.currentLocation}</AppText>						
						<View>
							<AppText style={styles.comment}>{this.state.orderDetails?.company?.address}</AppText>
							<AppText style={styles.comment}>{this.state.orderDetails?.company?.city},&nbsp;{this.state.orderDetails?.company?.state}&nbsp;{this.state.orderDetails?.company?.postal_code}</AppText>
						</View>
					</View>
					<View>
						<AppText style={styles.title}>{this.state.additionalInformation}</AppText>
						<AppText style={styles.commentNewLine}>Additional daily info</AppText>
					</View>
				</View>
				<View style={styles.mapContainer}>
					<MapView
						style={{
							flex: 1
						  }}
						  initialRegion={{
							latitude: 37.78825,
							longitude: -122.4324,
							latitudeDelta: 0.0922,
							longitudeDelta: 0.0421
						  }}
					/>
					<AppButton style={styles.getDirectionText}>GET DIRECTIONS</AppButton>
				</View>
			</AppScreen>
		)
	}
}

export { OrderConfirmationScreen }