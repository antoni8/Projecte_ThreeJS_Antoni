export default [
    {
        name: 'environmentMapTexture',
        type: 'cubeTexture',
        path:
        [
            'textures/environmentMap/px.jpg',
            'textures/environmentMap/nx.jpg',
            'textures/environmentMap/py.jpg',
            'textures/environmentMap/ny.jpg',
            'textures/environmentMap/pz.jpg',
            'textures/environmentMap/nz.jpg'
        ]
    },
    {
        name: 'f1',
        type: 'gltfModel',
        path: 'models/F1/f1.gltf'
    },
    {
        name:'Race_font',
        type:'font',
        path:'fonts/Race_Sport_Regular.json'
    },
    {
        name: 'matcap6',
        type: 'texture',
        path: 'textures/matcaps/8.png'
    },
    {
        name: 'f1_wav',
        type: 'audio',
        path: 'audios/cotxe_wav.m4a'
    },
    {
        name: 'positions',
        type: 'file',
        path: 'data/positions.json'
    },
    {
        name:'Spain_flag',
        type:'texture',
        path:'textures/flags/Espanya.png'
    },
    {
        name:'Balear_flag',
        type:'texture',
        path:'textures/flags/Balears.png'
    },
    {
        name:'Manacor_flag',
        type:'texture',
        path:'textures/flags/Manacor.png'
    },
    {
        name: 'targets',
        type: 'file',
        path: 'data/targets.json'
    }
]