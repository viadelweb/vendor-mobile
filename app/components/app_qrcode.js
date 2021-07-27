import React from 'react';
import {
	View
} from 'react-native';
import { SvgXml } from 'react-native-svg';
import { brokerRegistry } from '../brokers';
import PropTypes from 'prop-types';
import QRCode from 'qrcode';
import colors from '../screens/styles/colors';
import constants from '../config/app_constants';

const cartBroker = brokerRegistry.broker.getBroker(constants.CART_BROKER);

class AppQRCode extends React.Component {
	state = {
		options: {
			errorCorrectionLevel: 'L',
			type: 'svg',
			quality: 0.3,
			margin: 1,
			color: {
				dark: colors.primaryBackgroundColor,
				light: colors.white
			}
		},
		svg: null
	};
	subscribers = new Map();

	componentDidMount() {
		this.createDataSubscribers();
	}

	componentWillUnmount() {
        this.subscribers.forEach((sub, key) => {
            sub.unsubscribe();
            sub.complete();
        });
    }

	createDataSubscribers() {
		const cKey = constants.CART_BROKER + '.' + constants.COMFIRMED_ORDER_OBSERVABLE;
		if (!this.subscribers.has(cKey)) {
			this.subscribers.set(cKey, cartBroker[constants.COMFIRMED_ORDER_OBSERVABLE].subscribe(order => {
				if (order) {
					console.log(order.orderConfirmationUrl);
					QRCode.toString(order.orderConfirmationUrl, this.state.options, (e, data) => {
						if (e)
							return console.log('qrcode error: ', e);
						this.setState({svg: <SvgXml xml={data} width="200" height="200"/>});
					});
				}
			}));
		}
	}

	render() {
		return (
			<View>
				{this.state.svg}
			</View>
		)
	}
}

AppQRCode.propTypes = {
	url: PropTypes.string
}

export { AppQRCode }