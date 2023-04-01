import * as THREE from 'three'
import * as CANNON from 'cannon-es'
import Experience from '../Experience.js'
import Environment from './Environment.js'
import Floor from './Floor.js'
import F1 from './F1.js'
import Text from './Text.js'
import Target from "./Target.js"
import Rain from'./Rain.js'
import Flag from './Flags.js'

export default class World
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.time = this.experience.time
        this.resources = this.experience.resources

        this.setPhysics()

        // Wait for resources
        this.resources.on('ready', () => {
            // Setup
            this.floor1 = new Floor(10, new THREE.Vector3(0, 0, 0))

            // Positions
            const dataInfo = JSON.parse(this.resources.items.positions);

           this.F1 = new F1()

            this.text = new Text("F1 2022 EXPOSURE")

            this.flags = []
            this.flagImage = [this.resources.items.Manacor_flag,this.resources.items.Balear_flag,this.resources.items.Spain_flag]
            for (let a =0; a<3;a++){
                this.flags[a] = new Flag(a, this.flagImage[a])
                this.flags[a].setPosition(dataInfo[a].position.x, dataInfo[a].position.y, dataInfo[a].position.z)
            }
            
            this.targets = new Target()
        
            this.rainDrops = []
            for (let r = 0; r < 50; r++) {
                this.rainDrops.push(new Rain())
            }

            this.environment = new Environment()

        })
    }

    setPhysics(){

        this.physicsWorld = new CANNON.World()
        this.physicsWorld.gravity.set(0, -1, 0)

        this.defaultMaterial = new CANNON.Material('default')
        this.defaultContactMaterial = new CANNON.ContactMaterial(
            this.defaultMaterial,
            this.defaultMaterial,
            {
                friction: 0.1,
                restitution: 0.7
            }
        )
        this.physicsWorld.addContactMaterial(this.defaultContactMaterial)
        this.physicsWorld.defaultContactMaterial = this.defaultContactMaterial
    }

    update()
    {
        if(this.experience.ready) {

            if (this.F1){
                this.F1.update()
            }

            if (this.flags) {
                for(let i=0; i<this.flags.length; i++){
                    this.flags[i].update()
                }
            }

            if (this.targets) {
                this.targets.update()
            }

            if (this.floor1){
                this.floor1.update()
            }

            // Update de físiques
            this.physicsWorld.step(1/60, this.time.deltaTime, 3)
            for(const rain of this.rainDrops){
                rain.update()
            }
        }
    }
}