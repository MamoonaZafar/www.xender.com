function randomRange(t, i) {
    return Math.random() * (i - t) + t
}
Particle3D = function(t) {
    THREE.Particle.call(this, t), this.velocity = new THREE.Vector3(0, -2, 0), this.velocity.rotateX(randomRange(-45, 45)), this.velocity.rotateY(randomRange(0, 360)), this.gravity = new THREE.Vector3(0, 0, 0), this.drag = 1
}, Particle3D.prototype = new THREE.Particle, Particle3D.prototype.constructor = Particle3D, Particle3D.prototype.updatePhysics = function() {
    this.velocity.multiplyScalar(this.drag), this.velocity.addSelf(this.gravity), this.position.addSelf(this.velocity)
};
var TO_RADIANS = Math.PI / 180;
THREE.Vector3.prototype.rotateY = function(t) {
    cosRY = Math.cos(t * TO_RADIANS), sinRY = Math.sin(t * TO_RADIANS);
    var i = this.z,
        o = this.x;
    this.x = o * cosRY + i * sinRY, this.z = o * -sinRY + i * cosRY
}, THREE.Vector3.prototype.rotateX = function(t) {
    cosRY = Math.cos(t * TO_RADIANS), sinRY = Math.sin(t * TO_RADIANS);
    var i = this.z,
        o = this.y;
    this.y = o * cosRY + i * sinRY, this.z = o * -sinRY + i * cosRY
}, THREE.Vector3.prototype.rotateZ = function(t) {
    cosRY = Math.cos(t * TO_RADIANS), sinRY = Math.sin(t * TO_RADIANS);
    var i = this.x,
        o = this.y;
    this.y = o * cosRY + i * sinRY, this.x = o * -sinRY + i * cosRY
};