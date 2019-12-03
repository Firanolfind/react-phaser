import GameObject from './GameObject';
import { setFillStyle, stroke, interactive, origin } from './GameObject/performedProps';
import TYPES from '../types';

const allowedProps = [
	'x',
	'y',
	'z',
	'x1',
	'y1',
	'x2',
	'y2',
	'x3',
	'y3',
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
	fillColor: setFillStyle,
	origin,
	stroke
};

class Triangle extends GameObject {
	register(scene) {
		const { x, y, x1, y1, x2, y2, x3, y3, fillColor } = this.props;
		this.scene = scene;
		this.instance = scene.add.triangle(x, y, x1, y1, x2, y2, x3, y3, fillColor);
		this.registered = true;
		window.triangle = this;
		this.update(this.props);

		return this.instance;
	}
}

Object.assign(Triangle.prototype, {
	type: TYPES.TRIANGLE,
	performedProps,
	allowedProps
});

export default Triangle;
