module.exports = {
    setSpawnLimits: function(room){

        // Define the limits for a room
        const workerLimits = 5;
        const harvesterLimits = 3;

        // Set the property in memory if it doesn't exist
        if(!room.memory.spawnLimits) {
            room.memory.spawnLimits = {};
        }

        // Set the limits in the room memory
        const spawnLimits = {
            worker: workerLimits,
            harvester: harvesterLimits
        };

        room.memory.spawnLimits = spawnLimits;
    }
}

// Add a function to the spawn objects that will spawn the next creep if needed
StructureSpawn.prototype.spawnNextCreep = function() {

    const room = this.room;
    const workerCount = _.filter(Game.creeps, (creep) => 
        creep.memory.homeRoom === room.name && creep.memory.role === 'worker'
    ).length;
    const harvesterCount = _.filter(Game.creeps, (creep) => 
        creep.memory.homeRoom === room.name && creep.memory.role === 'harvester'
    ).length;

    const harvesterLimits = room.memory.spawnLimits['harvester'];
    const workerLimits = room.memory.spawnLimits['worker'];
    
    // Spawn the appropriate creep, if any
    if(harvesterCount < harvesterLimits){ // Check for harvester
        // Spawn a harvester
        this.spawnHarvester();
    }
    else if(workerCount < workerLimits) {     // Check for worker
        // Spawn a Worker
        this.spawnWorker();
    }  
}

// Add a function to spawn objects to spawn a harvester
StructureSpawn.prototype.spawnHarvester = function () {

    // Set all basic information about the creep to be spawned
    const energyCapacityAvailable = this.room.energyCapacityAvailable;
    const name = Game.time;
    const body = [];
    const creepMemory = {
        working: false,
        role: 'harvester',
        homeRoom: this.room.name
    };

    // Generate the creep body
    const numberOfParts = Math.floor(energyCapacityAvailable / 200);
    const leftOverEnergy = energyCapacityAvailable % 200;
    const numberOfExtraParts = Math.floor(leftOverEnergy / 100);

    // Create the main section
    for(let i = 0; i < numberOfParts; ++i) {
        body.push(WORK);
        body.push(CARRY);
        body.push(MOVE);
    }

    // Create the extra section
    for(let i = 0; i < numberOfExtraParts; ++i){
        body.push(CARRY);
        body.push(MOVE);
    }

    // Spawn the creep using all of this information
    this.spawnCreep(body, name, {memory: creepMemory});
}

// Add a function to the spawn objects to spawn a worker
StructureSpawn.prototype.spawnWorker = function () {

    // Set all basic information about the creep to be spawned
    const energyCapacityAvailable = this.room.energyCapacityAvailable;
    const name = Game.time;
    const body = [];
    const creepMemory = {
        working: false,
        role: 'worker',
        homeRoom: this.room.name
    };

    // Generate the creep body
    const numberOfParts = Math.floor(energyCapacityAvailable / 200);
    const leftOverEnergy = energyCapacityAvailable % 200;
    const numberOfExtraParts = Math.floor(leftOverEnergy / 100);

    // Create the main section
    for(let i = 0; i < numberOfParts; ++i) {
        body.push(WORK);
        body.push(CARRY);
        body.push(MOVE);
    }

    // Create the extra section
    for(let i = 0; i < numberOfExtraParts; ++i){
        body.push(CARRY);
        body.push(MOVE);
    }

    // Spawn the creep using all of this information
    this.spawnCreep(body, name, {memory: creepMemory});
}