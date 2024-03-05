import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  const command = 'test.sayHello';

  const commandHandler = async (name: string = 'world') => {
    console.log(`Hello ${name}!!!`);
    await printDefinitionsForActiveEditor();
  };

  context.subscriptions.push(vscode.commands.registerCommand(command, commandHandler));

  async function printDefinitionsForActiveEditor() {
	    console.log('Printing definitions...');

    const activeEditor = vscode.window.activeTextEditor;
	console.log(activeEditor);

    if (!activeEditor) {
      return;
    }

    const definitions = await vscode.commands.executeCommand<vscode.Location[]>(
      'vscode.executeDefinitionProvider',
      activeEditor.document.uri,
      activeEditor.selection.active
    );

	console.log(definitions);

    logDefinitions(definitions);
  }

  function logDefinitions(definitions: vscode.Location[]) {
    for (const definition of definitions) {
      console.log(definition);
    }
  }
}
