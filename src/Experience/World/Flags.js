import * as THREE from 'three'
import Experience from '../Experience.js'

import testVertexShader from '../../shaders/flag/vertex.glsl'
import testFragmentShader from '../../shaders/flag/fragment.glsl'

export default class Flag
{
    constructor(text, imatge)
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.debug = this.experience.debug

        this.setModel()
        this.setMaterial(imatge)
        this.setMesh()

        // Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('flag')

            const debugObject = {}
            debugObject.position = this.mesh.position
            this.debugFolder.add(debugObject.position, 'x').min(-5).max(5).step(0.001).name('X')
            this.debugFolder.add(debugObject.position, 'y').min(-5).max(5).step(0.001).name('Y')
            this.debugFolder.add(debugObject.position, 'z').min(-5).max(5).step(0.001).name('Z')
        }
    }

    setModel()
    {
        this.geometry = new THREE.PlaneGeometry(1,1,32,32)
        this.geometryPalo = new THREE.CylinderGeometry(0.075,0.075,2,8)
    }

    setMaterial(imatge)
    {
        this.material = new THREE.ShaderMaterial({
            vertexShader: testVertexShader,
            fragmentShader: testFragmentShader,
            transparent: false,
            // wireframe : true,
            side: THREE.DoubleSide,
            uniforms:{
                uFrequency: { 
                    value: new THREE.Vector2(10, 5)
                },
                uTime: { value: 0 },
                uColor: { value: new THREE.Color('null') },
                uTexture: { value: imatge }
            }
        })
    }

    setMesh()
    {
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.meshPalo = new THREE.Mesh(this.geometryPalo, new THREE.MeshBasicMaterial({color:0x43464B}))
        this.mesh.add(this.meshPalo)
        this.meshPalo.position.set(-.6,-.3,0)
        this.mesh.position.set(0, 2, 0)
        this.mesh.scale.y *= 2/3
        
        this.scene.add(this.mesh)
    }

    setPosition(x, y, z){
        this.mesh.position.set(x, y, z)
    }

    update()
    {
        this.material.uniforms.uTime.value = this.time.elapsed * 0.01
    }

}