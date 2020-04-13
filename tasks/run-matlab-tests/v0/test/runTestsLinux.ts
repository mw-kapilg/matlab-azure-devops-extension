// Copyright 2020 The MathWorks, Inc.

import ma = require("azure-pipelines-task-lib/mock-answer");
import mr = require("azure-pipelines-task-lib/mock-run");
import path = require("path");
import {runCmdArg, runCmdPath} from "./common";

const tp = path.join(__dirname, "..", "main.js");
const tr = new mr.TaskMockRunner(tp);

tr.setInput("testResultsJUnit", "results.xml");
tr.setInput("codeCoverageCobertura", "coverage.xml");
tr.setInput("sourceFolder", "source");

tr.registerMock("./utils", {
    platform: () => "linux",
});

const a: ma.TaskLibAnswers = {
    checkPath: {
        [runCmdPath]: true,
    },
    exec: {
        [runCmdPath + ".sh " + runCmdArg("results.xml", "coverage.xml", "source")]: {
            code: 0,
            stdout: "ran tests",
        },
    },
} as ma.TaskLibAnswers;
tr.setAnswers(a);

tr.run();
