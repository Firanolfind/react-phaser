import Phaser from 'phaser';
import GameObject from './GameObject';
import { setFillStyle, stroke, interactive, origin, size } from './GameObject/performedProps';
import TYPES from '../types';

const allowedProps = [
	'x',
	'y',
	'z',
	'width',
	'height',
	'fillColor',
	'alpha',
	'origin',
	'angle',
	'strokeWidth',
	'strokeColor',
	'strokeAlpha',
	'smoothness',
	'scale',
	'visible',
	'interactive',
	'stroke'
];

const performedProps = {
	interactive,
	width: size,
	height: size,
	fillColor: setFillStyle,
	origin,
	stroke
};

class Ellipse extends GameObject {
	register(scene) {
		const { x, y, width, height, fillColor } = this.props;
		this.scene = scene;
		this.preRegister();
		this.instance = scene.add.ellipse(x, y, width, height, fillColor);
		this.registered = true;
		this.update(this.props);
		this.postRegister();

		return this.instance;
	}
}

Object.assign(Ellipse.prototype, {
	type: TYPES.ELLIPSE,
	performedProps,
	allowedProps
});

export default Ellipse;
