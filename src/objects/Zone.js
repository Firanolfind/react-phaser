import Phaser from 'phaser';
import GameObject from './GameObject';
import TYPES from '../types';
import { interactive, origin } from './GameObject/performedProps';

const performedProps = {
	interactive,
	origin
	// TODO: check drop zone more detail later
	// isRadius: (inst, { width, height, radius, isRadius }) => {
	// 	if (isRadius) {
	// 		inst.setCircleDropZone(radius);
	// 	} else {
	// 		inst.setRectangleDropZone(width, height);
	// 	}
	// }
};

const allowedProps = ['x', 'y', 'width', 'height', 'interactive', 'origin'];

class Zone extends GameObject {
	register(scene) {
		const { x, y, width, height } = this.props;
		this.scene = scene;
		this.preRegister();
		this.instance = new Phaser.GameObjects.Zone(scene, x, y, width, height);
		this.registered = true;
		scene.add.displayList.add(this.instance);
		this.update(this.props);
		this.postRegister();

		return this.instance;
	}
}

Object.assign(Zone.prototype, {
	name: '',
	type: TYPES.ZONE,
	performedProps,
	allowedProps
});

export default Zone;
