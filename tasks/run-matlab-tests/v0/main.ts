// Copyright 2020 The MathWorks, Inc.

import * as taskLib from "azure-pipelines-task-lib/task";
import { chmodSync } from "fs";
import * as path from "path";
import {platform} from "./utils";

async function run() {
    try {
        taskLib.setResourcePath(path.join( __dirname, "task.json"));
        const options: IRunTestsOptions = {
            JUnitTestResults: taskLib.getInput("testResultsJUnit"),
            CoberturaCodeCoverage: taskLib.getInput("codeCoverageCobertura"),
            SourceFolder: taskLib.getInput("sourceFolder"),
            SelectByFolder: taskLib.getInput("selectByFolder"),
            SelectByTag: taskLib.getInput("selectByTag")};
        await runTests(options);
    } catch (err) {
        taskLib.setResult(taskLib.TaskResult.Failed, err.message);
    }
}

async function runTests(options: IRunTestsOptions) {
    const runToolPath = path.join(__dirname, "bin", "run_matlab_command." + (platform() === "win32" ? "bat" : "sh"));
    chmodSync(runToolPath, "777");
    const runTool = taskLib.tool(runToolPath);
    runTool.arg(`addpath('${path.join(__dirname, "scriptgen")}');` +
        `testScript = genscript('Test',` +
            `'JUnitTestResults','${options.JUnitTestResults || ""}',` +
            `'CoberturaCodeCoverage','${options.CoberturaCodeCoverage || ""}',` +
            `'SourceFolder','${options.SourceFolder || ""}',` +
            `'SelectByFolder','${options.SelectByFolder || ""}',` +
            `'SelectByTag','${options.SelectByTag || ""}');` +
        `disp('Running MATLAB script with contents:');` +
        `disp(testScript.Contents);` +
        `fprintf('__________\\n\\n');` +
        `run(testScript);`);
    const exitCode = await runTool.exec();
    if (exitCode !== 0) {
        throw new Error(taskLib.loc("FailedToRunTests"));
    }
}

interface IRunTestsOptions {
    JUnitTestResults?: string;
    CoberturaCodeCoverage?: string;
    SourceFolder?: string;
    SelectByFolder?: string;
    SelectByTag?: string;
}

run();
