let logger = require('../../Common/logger/logger');

class Queue {

    constructor(maxRunningJobs) {
        this.jobs = [];
        this.runningJobs = 0;
        this.maxRunningJobs = maxRunningJobs;

        this.logger = logger;
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

            job.run().then(
                () => this._finishJobExecutionWithSuccess(job),
                (reason) => this._finishJobExecutionWithFailure(job, reason)
            );
        }
    }

    _finishJobExecutionWithSuccess(job) {
        this._finishJobExecution();
        this.logger.info('Job ' + job.name + ' successfully finished execution');
    }

    _finishJobExecutionWithFailure(job, reason) {
        this._finishJobExecution();
        this.logger.error('Job ' + job.name + ' failed to finish execution (' + reason + ')');
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