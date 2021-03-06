import React, { Component, Fragment } from 'react';
import { Provider, connect, ReactReduxContext } from 'react-redux';
import { createStore } from 'redux';
import {
	Game,
	Scene,
	Sprite,
	Image,
	Text,
	CounterText,
	CounterBitmapText,
	BitmapText,
	Audio,
	Zone,
	Tween,
	Container,
	Particles
} from 'react-phaser-bindings';
import gemsJson from './gems.json';
import flares from './flares.json';

var config = {
	width: 800,
	height: 600
};

const assets = [
	['atlas', 'gem', 'media/gems.png', gemsJson],
	['atlas', 'flares', 'media/flares.png', flares],
	['audio', 'background', 'media/music.mp3'],
	['bitmapFont', 'bitfont', 'media/bitfont.png', 'media/bitfont.fnt'],
	['image', 'background', 'media/sky.png'],
	['image', 'crate', 'media/crate.png']
];

class DemoGame extends Component {
	state = {
		x: 300,
		y: 10,
		param: false,
		playCounter: false
	};

	handleGem = () => {
		this.setState(({ x, y, playCounter }) => ({
			x: x === 60 ? 400 : 60,
			y: y === 10 ? 400 : 10,
			playCounter: !playCounter
		}));
	};

	handleOnCompleteCounter = () => {
		this.setState({
			playCounter: false
		});
	};

	onCreate = (scene) => {
		console.log(scene);
		this.scene = scene;
		this.fpsText = scene.add.text(30, 20, '0', { fontSize: '30px' });
	};

	onUpdate = () => {
		this.fpsText.text = this.scene.game.loop.actualFps.toFixed(2);
	};

	render() {
		const { x, y, show, playCounter } = this.state;
		return (
			<Game config={config}>
				<Scene name="demo" assets={assets} active onCreate={this.onCreate} onUpdate={this.onUpdate}>
					<Audio name="background" play loop volume={0.1} />
					<Image texture="background" x={0} y={0} />
					<CounterText
						x={515}
						y={127}
						style={{
							fill: '#ff0',
							fontSize: '50px'
						}}
						angle={30}
						from={0}
						to={500}
						play={playCounter}
						duration={3000}
						locale="en"
						delay={500}
						pattern="£$1"
						minimumFractionDigits={2}
						maximumFractionDigits={2}
						onComplete={this.handleOnCompleteCounter}
					/>
					<CounterBitmapText
						x={615}
						y={100}
						font="bitfont"
						size={50}
						align="left"
						angle={30}
						from={0}
						to={500}
						play={playCounter}
						duration={3000}
						leadingZero={4}
						fractionDigits={0}
						delay={500}
						minimumFractionDigits={2}
						maximumFractionDigits={2}
						onComplete={this.handleOnCompleteCounter}
					/>
					<Sprite
						interactive
						transition="x 150 Quad.easeInOut, y 150 Quad.easeInOut"
						texture="gem"
						play="ruby"
						x={x}
						y={y}
						animations={[
							{
								key: 'ruby',
								repeat: -1,
								generateFrameNames: {
									prefix: 'ruby_',
									suffix: '',
									start: 0,
									end: 6,
									zeroPad: 4
								}
							}
						]}
						onClick={this.handleGem}
						ignoreIfPlaying={false}
						startFrame={0}
					/>
					<BitmapText x="310" y="70" font="bitfont" size={22} align="left">
						DEMO SCENE
					</BitmapText>
					<Text
						scale={1}
						angle={0}
						x={315}
						y={127}
						style={{
							fill: '#000',
							fontSize: '20px'
						}}
					>
						React Phaser
					</Text>
					<Image
						interactive
						texture="crate"
						x={100}
						y={180}
						onClick={() => this.setState({ param: !this.state.param })}
					/>
					<Image
						interactive
						texture="crate"
						x={440}
						y={300}
						onMouseDown={(...args) => {
							console.log('Privet!', args);
						}}
					/>

					<Particles
						texture="flares"
						frame="red"
						config={{
							radial: true,
							x: 400,
							y: 300,
							blendMode: 'SCREEN',
							scale: { start: 3, end: 0 },
							gravityY: 1000,
							speed: 400,
							opacity: { start: 1, end: 0 },
							quantity: 2,
							lifespan: 700
						}}
						config={{
							radial: false,
							x: 100,
							y: 300,
							lifespan: 2000,
							speedX: { min: 200, max: 400 },
							quantity: 4,
							gravityY: -300,
							scale: { start: 0.6, end: 0, ease: 'Power3' },
							blendMode: 'ADD'
						}}
					/>
					<Sprite
						texture="gem"
						play="diamond"
						x={20}
						y={250}
						animations={[
							{
								key: 'diamond',
								repeat: -1,
								generateFrameNames: {
									prefix: 'diamond_',
									suffix: '',
									start: 0,
									end: 15,
									zeroPad: 4
								}
							}
						]}
						ignoreIfPlaying={false}
						startFrame={0}
					/>
					<Sprite
						texture="gem"
						play="prism"
						x={600}
						y={150}
						animations={[
							{
								key: 'prism',
								repeat: -1,
								generateFrameNames: {
									prefix: 'prism_',
									suffix: '',
									start: 0,
									end: 6,
									zeroPad: 4
								}
							}
						]}
					/>
					<Sprite
						interactive
						transition="x 150 Quad.easeInOut, y 150 Quad.easeInOut"
						texture="gem"
						play="ruby"
						x={x}
						y={y}
						animations={[
							{
								key: 'ruby',
								repeat: -1,
								generateFrameNames: {
									prefix: 'ruby_',
									suffix: '',
									start: 0,
									end: 6,
									zeroPad: 4
								}
							}
						]}
						onClick={this.handleGem}
						ignoreIfPlaying={false}
						startFrame={0}
					/>

					<Particles
						texture="gem"
						frame="prism_0000"
						animation={{
							repeat: -1,
							speed: 12,
							generateFrameNames: {
								prefix: 'prism_',
								suffix: '',
								start: 0,
								end: 6,
								zeroPad: 4
							}
						}}
						config={{
							radial: true,
							x: 400,
							y: 300,
							blendMode: 'SCENE',
							scale: 0.8,
							gravityY: 1000,
							angle: { min: 0, max: 360 },
							speed: 500,
							quantity: 3,
							lifespan: 1500,
							stepRate: 200,
							frequency: 100
						}}
					/>
					<Particles
						texture="gem"
						frame="ruby_0000"
						animation={{
							repeat: -1,
							speed: 12,
							generateFrameNames: {
								prefix: 'ruby_',
								suffix: '',
								start: 0,
								end: 6,
								zeroPad: 4
							}
						}}
						config={{
							radial: true,
							x: 400,
							y: 300,
							blendMode: 'SCENE',
							scale: 0.6,
							gravityY: 1000,
							angle: { min: 0, max: 360 },
							speed: 500,
							quantity: 3,
							lifespan: 1500,
							stepRate: 200,
							frequency: 100
						}}
					/>
				</Scene>
			</Game>
		);
	}
}

export default DemoGame;
