import * as assert from "assert";
import * as mt from "azure-pipelines-task-lib/mock-test";
import * as path from "path";

describe("RunMATLABTest V0 Suite", function() {
    it("should succeed running MATLAB tests on linux", (done) => {
        this.timeout(5000);

        const tp = path.join(__dirname, "runTestsLinux.js");
        const tr = new mt.MockTestRunner(tp);

        tr.run();

        assert(tr.succeeded, "should have succeeded");
        assert(tr.stdOutContained("ran tests"), "should have run tests");

        done();
    });

    it("should succeed running MATLAB tests on windows", (done) => {
        this.timeout(5000);

        const tp = path.join(__dirname, "runTestsWindows.js");
        const tr = new mt.MockTestRunner(tp);

        tr.run();

        assert(tr.succeeded, "should have succeeded");
        assert(tr.stdOutContained("ran tests"), "should have run tests");

        done();
    });

    it("should fail when running test fails", (done) => {
        this.timeout(5000);

        const tp = path.join(__dirname, "failRunTests.js");
        const tr = new mt.MockTestRunner(tp);

        tr.run();

        assert(tr.failed, "should have failed");
        assert(tr.stdOutContained("tests failed"), "should have run tests");

        done();
    });
});
