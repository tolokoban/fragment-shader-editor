precision lowp float;
varying vec2 varPos;
uniform float t;

float f( float x, float y ) {
  float x1 = x + 0.5 * cos( t * .045481 );
  float y1 = y + 0.5 * sin( t * .029912 );
  float r1 = sqrt( x1*x1 + y1*y1 );

  float x2 = x + cos( t * .074541 );
  float y2 = y + sin( t * .067418 );
  float r2 = sqrt( x2*x2 + y2*y2 );

  float x3 = x + 0.7 * sin( t * .074121 );
  float y3 = y + 0.7 * cos( t * .098142 );
  float r3 = sqrt( x3*x3 + y3*y3 );

  return 0.5 * (
    sin( r1 * (50.0+10.0*sin(t)) + t ) 
    + sin( r2 * (50.0+10.0*sin(t)) + t ) 
    + sin( r3 * (50.0+10.0*sin(t)) + t ) 
  );
}

const float H0 = -1.0;
const vec4 C0H = vec4(0,0,0,1);
const vec4 C1L = vec4(0,0,1,1);
const float H1 = -0.7;
const vec4 C1H = vec4(0,0,1,1);
const vec4 C2L = vec4(0,1,0,1);
const float H2 = 0.0;
const vec4 C2H = vec4(0,1,0,1);
const vec4 C3L = vec4(1,0,0,1);
const float H3 = 0.7;
const vec4 C3H = vec4(1,0,0,1);
const vec4 C4L = vec4(0,0,0,1);
const float H4 = 1.0;


void main() { 
  float z = clamp( f( varPos.x, varPos.y ), H0, H4 );
  
  if( z <= H1 ) {
    z = (z - H0) / (H1 - H0);
    gl_FragColor = mix( C0H, C1L, z );
  }
  else if( z <= H2 ) {
    z = (z - H1) / (H2 - H1);
    gl_FragColor = mix( C1H, C2L, z );
  }
  else if( z <= H3 ) {
    z = (z - H2) / (H3 - H2);
    gl_FragColor = mix( C2H, C3L, z );
  }
  else if( z <= H4 ) {
    z = (z - H3) / (H4 - H3);
    gl_FragColor = mix( C3H, C4L, z );
  }
}
