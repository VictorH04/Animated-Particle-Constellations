// line 2-7 A function that draws a line between two particles
function line(particle, particle2) {
	context.beginPath();
	context.moveTo(particle.x, particle.y);
	context.lineTo(particle2.x, particle2.y);
	context.stroke();
}

// Line 18: clearing the previous frame
// Line 19 to 41: For each particle
// Line 22 to 31: Check with every other particle
// Line 23: Make sure you're not checking a particle with itself
// Line 25 to 26: calculate approximate distance between particles (a sum of differences in the X and Y axles). You could use the actual distance [sqrt(distanceX^2+distanceY^2)], but that just slows things down and is not really visible.
// Line 23 to 26: If the distance is lower than the threshold, the width and the color of the line.
// Line 35 to 36: The Particle moves in both dimensions
// Line 34 and 36: Bounce off the edges
function animate() {
	context.clearRect(0, 0, canvas.width, canvas.height);
	for (let i = 0; i < maxParticles; i++) {
		let particle = particles[i];
		context.fillRect(particle.x - particleSize / 2, particle.y - particleSize / 2, particleSize, particleSize);
		for (let j = 0; j < maxParticles; j++) {
			if (i != j) {
				let particle2 = particles[j];
				let distanceX = Math.abs(particle.x - particle2.x);
				let distanceY = Math.abs(particle.y - particle2.y);
				if (distanceX < threshold && distanceY < threshold) {
					context.lineWidth = (threshold * 2 - (distanceX + distanceY)) / 50;
					let color = 200 - Math.floor(distanceX + distanceY);
					context.strokeStyle = 'rgb(' + color + ',' + color + ',' + color + ')';
					line(particle, particle2);
				}
			}
		}
		particle.x = particle.x + particle.vx;
		particle.y = particle.y + particle.vy;
		if (particle.x > canvas.width - particleSize || particle.x < particleSize) particle.vx = -particle.vx;
		if (particle.y > canvas.height - particleSize || particle.y < particleSize) particle.vy = -particle.vy;
	}
	window.requestAnimationFrame(animate);
}

// Line 48 to 53: Setting up Variables and parameters
//Line 54 to 61: Initialize the particles with random coordinates and speeds.
//Line 64: Start everything.
let canvas = document.getElementById('myCanvas');
let context = canvas.getContext('2d');
let particles = [];
let particleSize = 2;
let maxParticles = 88;
let threshold = 100;
for (let i = 0; i < maxParticles; i++) {
	let particle = {
		x: Math.random() * canvas.width,
		y: Math.random() * canvas.height,
		vx: Math.random(),
		vy: Math.random()
	};
	particles.push(particle);
}
context.fillstyle = 'white';
animate();
