// Main for tutorial 3
const roles = {
    harvester: require('./HarvesterManager'),
    worker: require('./WorkerManager'),
}
const SpawnManager = require('./SpawnManager');

module.exports.loop = function () {

    // Run the harvester manager for every creep in the game
    for(const key in Game.creeps) {
        const creep = Game.creeps[key];
        roles[creep.memory.role].runRole(creep);
    }

    // set the limits for the creeps
    for(const key in Game.rooms){
        const room = Game.rooms[key];

        // Skip this room if its not your room or has no controller
        if(!room.controller || !room.controller.my){
            continue;
        }

        SpawnManager.setSpawnLimits(room);
    }

    // Run the spawn next creep for every spawn
    for(const key in Game.spawns){
        const spawn = Game.spawns[key];
        spawn.spawnNextCreep();        
    }
}