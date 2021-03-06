import Phaser from 'phaser';
import Reconciler from 'react-reconciler';
import invariant from 'fbjs/lib/invariant';
import emptyObject from 'fbjs/lib/emptyObject';

import {
	unstable_now as now,
	unstable_scheduleCallback as scheduleDeferredCallback,
	unstable_cancelCallback as cancelDeferredCallback
} from 'scheduler';
import { version, name } from '../package.json';

import Scene, { addToScene, insertBeforeToScene, UPDATE } from './Scene';
import Audio from './objects/Audio';
import Components from './ComponentsMap';

/* eslint-disable no-unused-vars */
const PhaserRenderer = Reconciler({
	getChildHostContext() {
		if (process.env.NODE_ENV !== 'production') {
			console.log('getChildHostContext', arguments);
		}
	},

	getRootHostContext() {
		if (process.env.NODE_ENV !== 'production') {
			console.log('getRootHostContext', arguments);
		}
	},

	unmountResponderInstance() {
		if (process.env.NODE_ENV !== 'production') {
			console.log('unmountResponderInstance', arguments);
		}
	},

	mountResponderInstance() {
		if (process.env.NODE_ENV !== 'production') {
			console.log('mountResponderInstance', arguments);
		}
	},
	updateContainerAtExpirationTime() {
		if (process.env.NODE_ENV !== 'production') {
			console.log('updateContainerAtExpirationTime', arguments);
		}
	},

	appendInitialChild(parent, child) {
		if (parent instanceof Scene) {
			addToScene(parent, child);
			return;
		}

		if (child instanceof Audio) {
			parent.addToScene(child);
			return;
		}

		parent.add(child);
	},

	appendChild(parent, child) {
		if (parent instanceof Scene) {
			addToScene(parent, child);
			return;
		}

		if (child instanceof Audio) {
			parent.addToScene(child);
			return;
		}

		parent.add(child);
	},

	insertBefore(parent, child, beforeChild) {
		invariant(child !== beforeChild, 'React-Phaser-Bindings: Can not insert node before itself');

		if (parent instanceof Scene) {
			insertBeforeToScene(parent, child, beforeChild);
			return;
		}

		if (child instanceof Audio) {
			parent.addToScene(child);
			return;
		}

		parent.insertBefore(child, beforeChild);
	},

	appendChildToContainer(game, child) {
		if (child instanceof Scene) {
			child.register(game);
		}
	},

	insertInContainerBefore(parentInstance, child, beforeChild) {
		invariant(child !== beforeChild, 'React-Phaser-Bindings: Can not insert node before itself');
	},

	createInstance(type, props, scope) {
		const Node = Components[type];

		invariant(Node, `React-Phaser-Bindings: Unsupported component type: ${type}`);

		return new Node(props);
	},

	createTextInstance(text, rootContainerInstance, paperScope) {
		if (typeof text === 'string' || typeof text === 'number') {
			return text;
		}

		return undefined;
	},

	finalizeInitialChildren(instance, type, props, rootContainerInstance) {
		return false;
	},

	getPublicInstance(instance) {
		return instance;
	},

	prepareForCommit(rootContainerInstance) {},

	prepareUpdate(instance, type, oldProps, newProps) {
		return true;
	},

	resetAfterCommit(rootContainerInstance) {},

	resetTextContent(instance) {},

	shouldDeprioritizeSubtree(type, props) {
		return false;
	},

	getRootHostContext() {
		return emptyObject;
	},

	getChildHostContext() {
		return emptyObject;
	},

	isPrimaryRenderer: false,
	supportsMutation: true,
	supportsHydration: false,
	supportsPersistence: false,

	scheduleTimeout: setTimeout,
	cancelTimeout: clearTimeout,
	noTimeout: -1,

	now,
	scheduleDeferredCallback,
	cancelDeferredCallback,

	shouldSetTextContent(type, props) {
		return false;
	},

	removeChild(parentInstance, child) {
		if (!(child instanceof Scene)) {
			child.destroy();
		}
	},

	removeChildFromContainer(parentInstance, child) {},
	commitTextUpdate(textInstance, oldText, newText) {},
	commitMount(instance, type, newProps) {},

	commitUpdate(instance, updatePayload, type, oldProps, newProps, scope) {
		if (instance instanceof Scene) {
			instance[UPDATE](newProps, oldProps);
		} else {
			instance.update(newProps, oldProps);
		}
	},

	hideInstance(instance) {},
	hideTextInstance(textInstance) {},
	unhideInstance(instance, props) {},
	unhideTextInstance(textInstance, text) {}
});

PhaserRenderer.injectIntoDevTools({
	findFiberByHostInstance: () => null,
	bundleType: process.env.NODE_ENV === 'production' ? 0 : 1,
	rendererPackageName: name,
	version
});
/* eslint-enable no-unused-vars */

export default PhaserRenderer;
