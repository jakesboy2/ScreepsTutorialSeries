// Main for tutorial 2
// Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, CARRY, MOVE, MOVE], Game.time, {memory: {working: false, role: 'harvester'}});
// Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, CARRY, MOVE, MOVE], Game.time, {memory: {working: false, role: 'worker'}});

const roles = {
    harvester: require('./Tutorial_2/HarvesterManager'),
    worker: require('./Tutorial_2/WorkerManager'),
}

module.exports.loop = function () {

    // Run the harvester manager for every creep in the game
    for(const key in Game.creeps) {
        const creep = Game.creeps[key];
        roles[creep.memory.role].runRole(creep);
    }
}