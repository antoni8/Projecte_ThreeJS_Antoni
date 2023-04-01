import * as THREE from 'three'
import * as CANNON from 'cannon-es'
import Experience from '../Experience.js'

export default class Rain
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.world = this.experience.world
        this.resources = this.experience.resources

        this.radius = 0.1

        this.setGeometry()
        this.setTextures()
        this.setMaterial()
        this.setMesh()
        this.setPhysics()
    }

    setGeometry()
    {
        this.geometry = new THREE.SphereGeometry(this.radius,8,8)
    }

    setTextures()
    {
        
    }

    setMaterial()
    {
        this.r = Math.random()
        this.g = Math.random()
        this.b = Math.random()
        this.material = new THREE.MeshStandardMaterial({
            color: new THREE.Color(this.r,this.g,this.b),
        })
    }

    setRandomPosition(){
        let xPos = (Math.random() > 0.5 ? -1 : 1 ) * Math.random()* 5
        let yPos = 0 + Math.random()*5
        let zPos = (Math.random() > 0.5 ? -1 : 1 ) * Math.random()* 5
        this.mesh.position.set(xPos,yPos, zPos)
    }

    setMesh()
    {
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.setRandomPosition()
        this.scene.add(this.mesh)
    }

    setPhysics(){
        this.shape = new CANNON.Sphere(this.radius)
        this.body = new CANNON.Body({
            mass: Math.random()*.1,
            position: new CANNON.Vec3(0, 0, 0),
            shape: this.shape,
            material: this.world.defaultMaterial
        })
        this.body.position.copy(this.mesh.position)
        let xDir = (Math.random() > 0.5 ? -1 : 1 ) * Math.random()* 5
        let yDir = 1
        let zDir = (Math.random() > 0.5 ? -1 : 1 ) * Math.random()* 5
        this.body.applyLocalForce(new CANNON.Vec3(xDir, yDir, zDir), new CANNON.Vec3(0,0,0))
        this.world.physicsWorld.addBody(this.body)
    }

    update(){
        if(this.body.position.y < -0.05){
            this.body.velocity.set(0,1,0)
            this.setRandomPosition()
            this.body.position.copy(this.mesh.position)
        }
        this.mesh.position.copy(this.body.position)
        this.mesh.quaternion.copy(this.body.quaternion)
    }
}