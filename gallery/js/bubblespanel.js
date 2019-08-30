function BubblesPanel(id) {
	let canvas = document.querySelector(id);
	let c = canvas.getContext('2d');

	canvas.width = canvas.offsetWidth;
	canvas.height = canvas.offsetHeight;


	// Declarations --------------------
	let mouse = {
		x: 0,
		y: 0
	};
	// Utilities ----------------------

	function randomIntFromRange(min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}


	// Bubbles -------------------------
	class Bubbles {
		constructor(x, y, radius) {
			this.x = x;
			this.y = y;
			this.radius = radius;
			this.color = {
				bg: 'rgba(255, 255, 255, 0.45)'
			};
			this.velocity = {
				x: (Math.random() - 0.5) * 0.5,
				y: Math.random() * 2
			};
			this.opacity = 1;
		}
	}
	Bubbles.prototype.draw = function () {
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		c.fillStyle = this.color.bg;
		c.fill();
		c.closePath();
	};
	Bubbles.prototype.update = function () {
		this.y -= this.velocity.y;
		this.draw();
	};


	// Mini Bubbles ---------------

	class miniBubbles {
		constructor(x, y, radius) {
			this.x = x;
			this.y = y;
			this.radius = radius;
			this.color = {
				bg: 'rgba(255, 255, 255, 0.45)',
			};
			this.velocity = {
				x: (Math.random() - 0.5) * 0.6,
				y: (Math.random() - 1) * 0.5
			}
			this.gravity = -0.03;
			this.timeToLive = 500;
		}
	}
	miniBubbles.prototype.draw = function () {
		c.save();
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		c.fillStyle = this.color.bg;
		c.fill();
		c.closePath();
		c.restore();
	}
	miniBubbles.prototype.update = function () {
		if (this.y - this.radius < 0) {
			this.velocity.y = this.velocity.y;
		} else {
			this.velocity.y += this.gravity;
		}
		this.x += this.velocity.x;
		this.y += this.velocity.y;
		this.timeToLive -= 1;
		this.draw();
	}

	const backgroundGradient = c.createLinearGradient(0, canvas.height/Math.tan(33*Math.PI/180), canvas.height, 0);
	backgroundGradient.addColorStop(0, '#71bcd9')
	backgroundGradient.addColorStop(1, '#b2e3f7')
	let bubbles = [];
	let minibubbles = [];
	let timer = 0;
	let spawnRate = 99;

	function init() {
		bubbles = [];
		minibubbles = [];
	}

	function animate() {
		requestAnimationFrame(animate);
		//background linear gradient ------------
		c.fillStyle = backgroundGradient;
		c.fillRect(0, 0, canvas.width, canvas.height);

		// Render the Bubbles -------------------
		bubbles.forEach((bubble, index) => {
			bubble.update();
			if (bubble.radius == 0) {
				bubbles.splice(index, 1);
			}
		});
		minibubbles.forEach((minibubble, index) => {
			minibubble.update();
			if (minibubble.timeToLive == 0) {
				minibubbles.splice(index, 1);
			}
		});

		timer++;
		if (timer % spawnRate == 0) {
			const radius = randomIntFromRange(15, 30);
			const minradius = Math.random() * 2 + 1;
			// const radius = 15;
			const x = Math.max(radius, Math.random() * canvas.width - radius);
			const y = canvas.height + 100;
			bubbles.push(new Bubbles(x, y, radius, 'white'));
			minibubbles.push(new miniBubbles(x, y, minradius));
			spawnRate = randomIntFromRange(70, 200);
		}


		//  When Hover over the bubbles ------------------
		for (let i = 0; i < bubbles.length; i++) {
			if (
				mouse.x > bubbles[i].x - bubbles[i].radius &&
				mouse.x < bubbles[i].x + bubbles[i].radius
			) {
				if (
					mouse.y > bubbles[i].y - bubbles[i].radius &&
					mouse.y < bubbles[i].y + bubbles[i].radius
				) {
					let x = bubbles[i].x;
					let y = bubbles[i].y;
					let radius = Math.random() * 2 + 1;
					bubbles[i].radius -= bubbles[i].radius;
					for (let a = 0; a < Math.random() * 4 + 4; a++) {
						minibubbles.push(new miniBubbles(x, y, radius));
					}
				}
			}
		}
	}


	// Event Listener ---------------

	canvas.addEventListener('mousemove', mouseMove);

	function mouseMove(e) {
		mouse.x = e.offsetX;
		mouse.y = e.offsetY;
	}
	addEventListener('resize', function () {
		canvas.width = canvas.offsetWidth;
		canvas.height = canvas.offsetHeight;
		init();
	});

	//  call ---------------
	animate();
	init();
};