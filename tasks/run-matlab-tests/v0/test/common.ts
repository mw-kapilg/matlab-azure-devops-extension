// Copyright 2020 The MathWorks, Inc.

import * as path from "path";

export function runCmdArg(
                    junit: string,
                    cobertura: string,
                    source: string,
                    selectByFolder: string,
                    selectByTag: string,
                    modelCoverageCobertura: string,
                    testResultsSimulinkTest: string,
                    testResultsPDF: string,
                    useParallel: string,
                    strict: string,
                    loggingLevel: string,
                    outputDetail: string,
                ) {
    return "addpath('" + path.join(path.dirname(__dirname), "scriptgen") + "');" +
        "testScript = genscript('Test'," +
            "'JUnitTestResults','" + junit + "'," +
            "'CoberturaCodeCoverage','" + cobertura + "'," +
            "'SourceFolder','" + source + "'," +
            "'SelectByFolder','" + selectByFolder + "'," +
            "'SelectByTag','" + selectByTag + "'," +
            "'CoberturaModelCoverage','" + modelCoverageCobertura + "'," +
            "'SimulinkTestResults','" + testResultsSimulinkTest + "'," +
            "'PDFTestReport','" + testResultsPDF + "'," +
            "'UseParallel'," + useParallel + "," +
            "'Strict'," + strict + "," +
            "'LoggingLevel','" + loggingLevel + "'," +
            "'OutputDetail','" + outputDetail + "');" +
        `disp('Running MATLAB script with contents:');` +
        `disp(testScript.Contents);` +
        `fprintf('__________\\n\\n');` +
        `run(testScript);`;
}
