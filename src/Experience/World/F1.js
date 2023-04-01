import * as THREE from 'three'
import * as SkeletonUtils from 'three/examples/jsm/utils/SkeletonUtils.js';
import Experience from '../Experience.js'

export default class Fox
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.debug = this.experience.debug
    
        // Resource
        this.resource = this.resources.items.f1
        this.audioResource = this.resources.items.f1_wav

        this.setModel()
        this.setAudio()
        
        this.volume = 20

        this.experience.mouse.on('f1', () =>
        {
            if(!this.audio.isPlaying) {
                if (this.experience.audioEnabled) {
                    this.audio.setVolume(this.volume)
                    this.audio.play()
                }
            }
        })

        // Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder(`f1 car`)
            const debugObject = {playSound: () => { this.audio.play() }}
            debugObject.position = this.model.position
            debugObject.rotation = this.model.rotation
            debugObject.volume = this.volume
            this.debugFolder.add(debugObject, 'playSound')
            this.debugFolder.add(debugObject.position, 'x').min(-5).max(5).step(0.001).name('X')
            this.debugFolder.add(debugObject.position, 'y').min(-5).max(5).step(0.001).name('Y')
            this.debugFolder.add(debugObject.position, 'z').min(-5).max(5).step(0.001).name('Z')

            this.debugFolder.add(debugObject.rotation, 'y').min(-Math.PI).max(Math.PI).step(0.001).name('Rotation')

            this.debugFolder.add(debugObject,'volume').min(1).max(20).step(1).name('Volume')
        }
    }

    setModel()
    {
        this.model = SkeletonUtils.clone(this.resource.scene)
        this.model.name = "f1 car" + this.number
        this.model.scale.set(1,1,1)
        this.scene.add(this.model)

        this.experience.mouse.addIntersectable(this)

        this.model.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                child.castShadow = true
            }
        })
    }

    setPosition(x, y, z){
        this.model.position.set(x, y, z)
    }

    setRotation(x, y, z){
        this.model.rotation.set(x, y, z)
    }

    setAudio(){
        this.audio = new THREE.PositionalAudio( this.experience.camera.listener );
        this.audio.setBuffer( this.audioResource );
    }

    update()
    {
        this.model.rotation.set(0, this.time.elapsed/10000, 0)
    }
}