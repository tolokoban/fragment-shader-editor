uniform float uniWidth;
uniform float uniHeight;

attribute vec2 attPos;

varying vec2 varPos;


void main() {
  varPos = attPos;

  float factorX = 1.0;
  float factorY = 1.0;
  if( uniWidth > uniHeight ) {
    factorY = uniWidth / uniHeight;
  } else {
    factorX = uniHeight / uniWidth;
  }
  gl_Position = vec4( attPos.x * factorX, attPos.y * factorY, 0, 1 );
}
