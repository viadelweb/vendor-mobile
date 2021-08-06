import * as React from 'react';

export const isReadyRef = React.createRef();
export const navigationRef = React.createRef();

export function navigate(name, params) {
	if (isReadyRef.current && navigationRef.current) {
		navigationRef.current.navigate(name, params);
	} else {
		console.log('app not mounted');
	}
}

export function goBack() {
	if (isReadyRef.current && navigationRef.current) {
		navigationRef.current.goBack()
	}
}
