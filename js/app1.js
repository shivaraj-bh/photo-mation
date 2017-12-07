
var table = [];
var camera, scene, renderer;
var controls;
var objects = [];
var targets = { table: [], sphere: [], helix: [], grid: [] };


function log_func(user){
   
        console.log("I am here ");
        var user_string =user+='';
        firebase.database().ref("/"+user_string).once('value',function(snapshot){
            var N = snapshot.numChildren();
            table = [];
            snapshot.forEach(function(childsnapshot){
                var key = childsnapshot.val();
                table.push(key.url);
                console.log('key pushing');
            });
            for(var i = 1;i<=N;i++){
                console.log('pushing');
                    table.push(Math.floor((Math.random() * 8) + 1));
                    table.push(Math.floor((Math.random() * 8) + 1));
                
    
            }
           init();
           animate();
        });
 
}
              function init() {
                if(objects.length>0){
                    location.reload(true);
                }
camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 10000 );
camera.position.z = 3000;
scene = new THREE.Scene();
    // table
    // User is signed in.



   

    
console.log("My length is"+table.length);
for ( var i = 0; i < table.length/3 ; i += 1 ) {
    console.log("Yo wassup");
    
var element = document.createElement( 'div' );
element.className = 'element';
element.style.backgroundColor = 'rgba(0,127,127,' + ( Math.random() * 0.5 + 0.25 ) + ')';

        var image = document.createElement('img');
        image.className = 'img1';
        var modal = document.getElementById('myModal1');
        var modalImg = document.getElementById("img01");
        var captionText = document.getElementById("caption");
        image.onclick = function(){
            modal.style.display = "block";
            modalImg.src = this.src;
            captionText.innerHTML = this.alt;
        }
        
        // Get the <span> element that closes the modal
        var span = document.getElementById("closetheshit");
        
        // When the user clicks on <span> (x), close the modal
        span.onclick = function() { 
            modal.style.display = "none";
        }
        console.log(table[i]);
        url = table[i];
        try{
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = function(event) {
        var blob = xhr.response;
         };
        xhr.open('GET', url);
        xhr.send();
        image.setAttribute('src',url);
        
        image.height = 190;
        image.width = 140;
        }catch(e){
            console.log(e);
        }
element.appendChild(image);
var object = new THREE.CSS3DObject( element );
object.position.x = Math.random() * 4000 - 2000;
object.position.y = Math.random() * 4000 - 2000;
object.position.z = Math.random() * 4000 - 2000;
scene.add( object );
objects.push( object );
//
var object = new THREE.Object3D();
object.position.x = ( table[ i + table.length/3 ] * 140 ) - 1330;
object.position.y = - ( table[ i + 1 + table.length/3 ] * 180 ) + 990;
targets.table.push( object );
}
// sphere
var vector = new THREE.Vector3();
var spherical = new THREE.Spherical();
for ( var i = 0, l = objects.length; i < l; i ++ ) {
var phi = Math.acos( -1 + ( 2 * i ) / l );
var theta = Math.sqrt( l * Math.PI ) * phi;
var object = new THREE.Object3D();
spherical.set( 600, phi, theta );
object.position.setFromSpherical( spherical );
vector.copy( object.position ).multiplyScalar( 2 );
object.lookAt( vector );
targets.sphere.push( object );

}
// helix
var vector = new THREE.Vector3();
var cylindrical = new THREE.Cylindrical();
for ( var i = 0, l = objects.length; i < l; i ++ ) {
var theta = i * 0.175 + Math.PI;
var y = - ( i * 8 ) + 450;
var object = new THREE.Object3D();
cylindrical.set( 900, theta, y );
object.position.setFromCylindrical( cylindrical );
vector.x = object.position.x * 2;
vector.y = object.position.y;
vector.z = object.position.z * 2;
object.lookAt( vector );
targets.helix.push( object );
}
// grid
for ( var i = 0; i < objects.length; i ++ ) {
var object = new THREE.Object3D();
object.position.x = ( ( i % 5 ) * 400 ) - 800;
object.position.y = ( - ( Math.floor( i / 5 ) % 5 ) * 400 ) + 800;
object.position.z = ( Math.floor( i / 25 ) ) * 1000 - 2000;
targets.grid.push( object );
}
//
renderer = new THREE.CSS3DRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.domElement.style.position = 'absolute';
document.getElementById( 'container' ).appendChild( renderer.domElement );
//
controls = new THREE.TrackballControls( camera, renderer.domElement );
controls.rotateSpeed = 0.5;
controls.minDistance = 500;
controls.maxDistance = 6000;
controls.addEventListener( 'change', render );
var button = document.getElementById( 'table' );
button.addEventListener( 'click', function ( event ) {
transform( targets.table, 2000 );
}, false );
var button = document.getElementById( 'sphere' );
button.addEventListener( 'click', function ( event ) {
transform( targets.sphere, 2000 );
}, false );
var button = document.getElementById( 'helix' );
button.addEventListener( 'click', function ( event ) {
transform( targets.helix, 2000 );
}, false );
var button = document.getElementById( 'grid' );
button.addEventListener( 'click', function ( event ) {
transform( targets.grid, 2000 );
}, false );
transform( targets.table, 2000 );
//
window.addEventListener( 'resize', onWindowResize, false );
}
function transform( targets, duration ) {
TWEEN.removeAll();
for ( var i = 0; i < objects.length; i ++ ) {
var object = objects[ i ];
var target = targets[ i ];
new TWEEN.Tween( object.position )
.to( { x: target.position.x, y: target.position.y, z: target.position.z }, Math.random() * duration + duration )
.easing( TWEEN.Easing.Exponential.InOut )
.start();
new TWEEN.Tween( object.rotation )
.to( { x: target.rotation.x, y: target.rotation.y, z: target.rotation.z }, Math.random() * duration + duration )
.easing( TWEEN.Easing.Exponential.InOut )
.start();
}
new TWEEN.Tween( this )
.to( {}, duration * 2 )
.onUpdate( render )
.start();
}
function onWindowResize() {
camera.aspect = window.innerWidth / window.innerHeight;
camera.updateProjectionMatrix();
renderer.setSize( window.innerWidth, window.innerHeight );
render();
}
function animate() {
 
requestAnimationFrame( animate );
TWEEN.update();
controls.update();

}
function render() {
renderer.render( scene, camera );
}