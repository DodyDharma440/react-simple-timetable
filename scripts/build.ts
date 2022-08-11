/* eslint-disable no-console */
import { exec } from "child_process";
import chalk from "chalk";
import loading from "loading-cli";

function build() {
  const loadPrettier = loading(chalk.cyan("Formatting prettier")).start();
  exec(`rimraf dist && prettier --write src`, (error, stdout, stderr) => {
    console.log("");
    console.log(stdout);
    console.log(stderr);
    if (error) {
      console.log(chalk.red(error));
      loadPrettier.stop();
      return;
    }
    console.log(chalk.green("Format prettier complete!"));
    loadPrettier.stop();

    console.log("");
    console.log("");
    const loadBuild = loading(chalk.cyan(`Building package`)).start();
    console.log("");

    exec(
      `tsc && tsc --module CommonJS --outDir dist/cjs`,
      (error, stdout, stderr) => {
        if (error) {
          console.log(chalk.bgRed(stdout));
          console.log(chalk.bgRed(stderr));
          console.log(chalk.red(error));
          loadBuild.stop();
          return;
        }
        console.log(stderr);
        console.log(stdout);
        console.log(chalk.green("Build complete!"));
        loadBuild.stop();
      }
    );
  });
}

build();
