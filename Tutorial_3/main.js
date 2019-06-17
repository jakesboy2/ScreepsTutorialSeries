// Main for tutorial 3
const roles = {
    harvester: require('./Tutorial_3/HarvesterManager'),
    worker: require('./Tutorial_3/WorkerManager'),
}

module.exports.loop = function () {

    // Run the harvester manager for every creep in the game
    for(const key in Game.creeps) {
        const creep = Game.creeps[key];
        roles[creep.memory.role].runRole(creep);
    }
}