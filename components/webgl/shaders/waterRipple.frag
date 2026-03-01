precision highp float;

uniform float uTime;
uniform vec2 uMouse;
uniform vec2 uResolution;
uniform sampler2D uTexture;
uniform float uHasTexture;

varying vec2 vUv;

// Simplex-like noise
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                      -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  vec2 uv = vUv;
  vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);

  // Mouse ripple
  vec2 mouseUV = uMouse;
  float dist = length((uv - mouseUV) * aspect);
  float ripple = sin(dist * 30.0 - uTime * 4.0) * exp(-dist * 4.0) * 0.03;

  // Background wave distortion
  float wave1 = snoise(uv * 3.0 + uTime * 0.15) * 0.015;
  float wave2 = snoise(uv * 5.0 - uTime * 0.1) * 0.008;

  vec2 distortedUV = uv + vec2(ripple + wave1, ripple + wave2);

  // Base color — dark moyin palette with sakura glow
  vec3 bg1 = vec3(0.102, 0.086, 0.145); // #1a1625
  vec3 bg2 = vec3(0.176, 0.141, 0.204); // #2d2433
  vec3 sakura = vec3(1.0, 0.753, 0.827); // #ffc0d3

  vec3 color = mix(bg1, bg2, distortedUV.y);

  // Sakura glow spots
  float glow1 = exp(-length((distortedUV - vec2(0.3, 0.7)) * aspect) * 3.0) * 0.15;
  float glow2 = exp(-length((distortedUV - vec2(0.7, 0.3)) * aspect) * 3.0) * 0.1;
  float mouseGlow = exp(-dist * 6.0) * 0.2;

  color += sakura * (glow1 + glow2 + mouseGlow);

  // Subtle noise texture
  float noiseVal = snoise(distortedUV * 8.0 + uTime * 0.05) * 0.02;
  color += noiseVal;

  // Texture overlay if available
  if (uHasTexture > 0.5) {
    vec4 tex = texture2D(uTexture, distortedUV);
    color = mix(color, tex.rgb, tex.a * 0.4);
  }

  gl_FragColor = vec4(color, 1.0);
}
