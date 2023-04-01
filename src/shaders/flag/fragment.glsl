varying vec2 vUv;
varying float vRandom;
varying float vElevation;

uniform vec3 uColor;
uniform sampler2D uTexture;

void main()   {
    vec4 textureColor = texture2D(uTexture, vUv);
    textureColor.rgb *= vElevation * 2.0 + 0.5;
    gl_FragColor = textureColor + vec4(uColor, 1.0)*0.3;
}