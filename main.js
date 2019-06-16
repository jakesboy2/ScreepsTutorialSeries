// Main file for the Screeps Tutorial Series by Jacob Waldrip
// Started May 2019, last updated ${June 2019}
// The game runs the loop in this file, so all other files must be imported and used here
// Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, CARRY, MOVE, MOVE], Game.time, {memory: {working: false, role: 'harvester'}});
// Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, CARRY, MOVE, MOVE], Game.time, {memory: {working: false, role: 'worker'}});

const roles = {
    harvester: require('./HarvesterManager'),
    worker: require('./WorkerManager'),
}

module.exports.loop = function () {

    // Run the harvester manager for every creep in the game
    for(const key in Game.creeps) {
        const creep = Game.creeps[key];
        roles[creep.memory.role].runRole(creep);
    }
}