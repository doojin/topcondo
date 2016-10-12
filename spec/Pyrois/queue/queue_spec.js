let Queue = require('../../../Helios/Pyrois/queue/queue');

describe('Queue', function() {

    let queue;

    beforeEach(() => {
        queue = new Queue(2);
    });

    it('_hasJobsToRun should return true when jobs array not empty', () => {
        queue.jobs = ['job1'];
        expect(queue._hasJobsToRun()).toBe(true);
    });

    it('_hasJobsToRun should return false when jobs array is empty', () => {
        queue.jobs = [];
        expect(queue._hasJobsToRun()).toBe(false);
    });

    it('addJob should add job to queue and execute jobs', () => {
        spyOn(queue, '_runJobs').and.callFake(() => {});
        expect(queue.jobs.length).toEqual(0);

        queue.addJob('job1');
        expect(queue.jobs.length).toEqual(1);
        expect(queue.jobs[0]).toEqual('job1');

        expect(queue._runJobs).toHaveBeenCalled();
    });

    it('_finishJobExecution should decrement amount of running jobs', () => {
        queue.runningJobs = 5;

        queue._finishJobExecution();

        expect(queue.runningJobs).toEqual(4);
    });

    it('_runJobs should run maximum amount of jobs', () => {
        let job1Promise = buildJobPromise();
        let job2Promise = buildJobPromise();
        let job3Promise = buildJobPromise();

        let job1 = buildJob(job1Promise);
        let job2 = buildJob(job2Promise);
        let job3 = buildJob(job3Promise);

        queue.addJob(job1);
        queue.addJob(job2);
        queue.addJob(job3);

        expect(queue.runningJobs).toEqual(2);
        expect(queue.jobs.length).toEqual(1);
        expect(queue.jobs[0]).toEqual(job3);

        job1Promise.fulfill();

        expect(queue.runningJobs).toEqual(2);
        expect(queue.jobs.length).toEqual(0);

        job2Promise.reject();

        expect(queue.runningJobs).toEqual(1);
        expect(queue.jobs.length).toEqual(0);

        job3Promise.fulfill();

        expect(queue.runningJobs).toEqual(0);
        expect(queue.jobs.length).toEqual(0);
    });

    function buildJobPromise() {
        let promise = {};

        promise.then = (fulfill, reject) => {
            promise.fulfill = fulfill;
            promise.reject = reject;
        };

        return promise;
    }

    function buildJob(promise) {
        return {
            run: () => promise
        };
    }

});