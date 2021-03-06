import Phaser from 'phaser';
import GameObject from './GameObject';
import { width, height, interactive, origin, textChildren } from './GameObject/performedProps';
import TYPES from '../types';

export const allowedProps = [
	'children',
	'x',
	'y',
	'z',
	'originX',
	'originY',
	'alpha',
	'angle',
	'scale',
	'tint',
	'visible',
	'origin',
	'interactive'
];

export const performedProps = {
	width,
	height,
	children: textChildren,
	origin,
	interactive
};

class Text extends GameObject {
	register(scene) {
		const { x, y, style } = this.props;
		this.scene = scene;
		this.preRegister();
		this.instance = new Phaser.GameObjects.Text(scene, x, y, undefined, style);
		this.registered = true;
		scene.add.displayList.add(this.instance);
		this.postRegister();
		this.update(this.props);

		return this.instance;
	}
}

Object.assign(Text.prototype, {
	texture: '',
	type: TYPES.TEXT,
	performedProps,
	allowedProps
});

export default Text;
