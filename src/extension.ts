import * as vscode from "vscode";
import { exec } from "child_process";
import * as path from "path";

export function activate(context: vscode.ExtensionContext) {

  const compileCommand = vscode.commands.registerCommand(
    "moonscript.compile",
    () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        vscode.window.showErrorMessage("No active MoonScript file");
        return;
      }

      const filePath = editor.document.fileName;
      if (!filePath.endsWith(".moon")) {
        vscode.window.showErrorMessage("Not a MoonScript file");
        return;
      }

      const outFile = filePath.replace(/\.moon$/, ".lua");

      exec(`moonc "${filePath}" -o "${outFile}"`, (error, stdout, stderr) => {
        if (error) {
          vscode.window.showErrorMessage(stderr || error.message);
          return;
        }
        vscode.window.showInformationMessage(
          `Compiled MoonScript → ${path.basename(outFile)}`
        );
      });
    }
  );

  context.subscriptions.push(compileCommand);
}

export function deactivate() {}
