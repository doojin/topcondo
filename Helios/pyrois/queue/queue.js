class Queue {

    constructor(maxRunningJobs) {
        this.jobs = [];
        this.runningJobs = 0;
        this.maxRunningJobs = maxRunningJobs;
    }

    addJob(job) {
        this.jobs.push(job);
        this._runJobs();
    }

    _runJobs() {
        let availableSize = this.maxRunningJobs - this.runningJobs;

        for (let i = 0; i < availableSize && this._hasJobsToRun(); i++) {
            let job = this.jobs.shift();
            this.runningJobs++;

            job.run().then(() => this._finishJobExecution(), () => this._finishJobExecution());
        }
    }

    _hasJobsToRun() {
        return this.jobs.length > 0;
    }

    _finishJobExecution() {
        this.runningJobs--;
        this._runJobs();
    }

}

module.exports = Queue;