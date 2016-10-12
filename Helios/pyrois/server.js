let Queue = require('./queue/queue');

let queue = new Queue(2);

queue.addJob(createJob(true));
queue.addJob(createJob(true));
queue.addJob(createJob(false));
queue.addJob(createJob(false));
queue.addJob(createJob(false));
queue.addJob(createJob(true));


function createJob(isSuccessful) {
    return {
        run: () => new Promise((fulfill, reject) => {
            let randomTimeout = Math.random() * (3000 - 500) + 500;
            setTimeout(() => isSuccessful ? fulfill() : reject('Some reason'), randomTimeout);
        })
    };
}