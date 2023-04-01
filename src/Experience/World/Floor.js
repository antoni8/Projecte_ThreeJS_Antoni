import * as THREE from 'three'
import * as CANNON from 'cannon-es'
import Experience from '../Experience.js'

import testVertexShader from '../../shaders/F1/vertex.glsl'
import testFragmentShader from '../../shaders/F1/fragment.glsl'

export default class Floor
{
    constructor(radius, position)
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.world = this.experience.world
        this.debug = this.experience.debug

        this.radius = radius
        this.position = position

        this.setGeometry()
        this.setMaterial()
        this.setMesh()
        this.setPhysics()

        // Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder(`floor color shader`)
            const debugObject = {}
            debugObject.portalColorStart = '#ff0000'
            debugObject.portalColorEnd = '#000000'

            this.debugFolder.addColor(debugObject, 'portalColorStart')
                .onChange(() => {
                    this.material.uniforms.uColorStart.value
                        .set(debugObject.portalColorStart)
                })

            this.debugFolder.addColor(debugObject, 'portalColorEnd')
                .onChange(() => {
                    this.material.uniforms.uColorEnd.value
                        .set(debugObject.portalColorEnd)
                })
        }
    }

    setGeometry()
    {
        this.geometry = new THREE.PlaneGeometry(10,10)
    }

    setMaterial()
    {
        this.material = new THREE.ShaderMaterial({
            uniforms:
            {
                uTime: { value: 0 },
                uColorStart: { value: new THREE.Color(0xff0000) },
                uColorEnd: { value: new THREE.Color(0x000000) }
            },
            vertexShader: testVertexShader,
            fragmentShader: testFragmentShader
        })
    }

    setMesh()
    {
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.rotation.x = - Math.PI * 0.5
        this.mesh.position.copy(this.position)
        this.mesh.receiveShadow = true
        this.scene.add(this.mesh)
    }

    setPhysics(){

        this.shape = new CANNON.Cylinder(this.radius, this.radius, 0.2, 12)
        //this.shape = new CANNON.Plane(this.radius)
        this.body = new CANNON.Body({ mass: 0, shape: this.shape })
        this.body.position.copy(this.mesh.position)
        /*
        this.body.quaternion.setFromAxisAngle(
            new CANNON.Vec3(1,0,0),
            -Math.PI*0.5
        )

         */
        this.world.physicsWorld.addBody(this.body)
    }
    update()
    {
        this.material.uniforms.uTime.value = this.time.elapsed * 0.001
    }
}