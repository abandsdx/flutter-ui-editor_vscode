// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "ui-dragger" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('ui-dragger.openEditor', () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showInformationMessage('No active editor!');
			return;
		}

		const document = editor.document;
		if (!document.fileName.endsWith('.uijson')) {
			vscode.window.showInformationMessage('This command can only be run on .uijson files.');
			return;
		}

		// Create and show a new webview panel
		const panel = vscode.window.createWebviewPanel(
			'uiDragger', // Identifies the type of the webview. Used internally
			'UI Dragger Editor', // Title of the panel displayed to the user
			vscode.ViewColumn.One, // Editor column to show the new webview panel in.
			{
				// Enable scripts in the webview
				enableScripts: true
			}
		);

		// Set the webview's initial html content
		panel.webview.html = getWebviewContent();

		// Post the initial data to the webview
		panel.webview.postMessage({ command: 'load', data: document.getText() });

		// Handle messages from the webview
		panel.webview.onDidReceiveMessage(
			message => {
				switch (message.command) {
					case 'updatePosition':
						const { componentId, x, y } = message;
						const text = document.getText();
						const json = JSON.parse(text);
						json[componentId] = { x, y };
						const newText = JSON.stringify(json, null, 2);

						const edit = new vscode.WorkspaceEdit();
						edit.replace(document.uri, new vscode.Range(document.positionAt(0), document.positionAt(text.length)), newText);
						vscode.workspace.applyEdit(edit);
						return;
				}
			},
			undefined,
			context.subscriptions
		);
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}

function getWebviewContent() {
	return `<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>UI Dragger</title>
	<style>
		#canvas {
			position: relative;
			width: 100%;
			height: 100vh;
			background-color: #f0f0f0;
			border: 1px solid #ccc;
		}
		.component {
			position: absolute;
			width: 100px;
			height: 50px;
			background-color: #3498db;
			color: white;
			display: flex;
			align-items: center;
			justify-content: center;
			cursor: grab;
			border: 1px solid #2980b9;
			user-select: none;
		}
	</style>
</head>
<body>
	<div id="canvas"></div>

	<script>
		const vscode = acquireVsCodeApi();
		const canvas = document.getElementById('canvas');
		let activeComponent = null;
		let offsetX = 0;
		let offsetY = 0;

		function initializeDraggable(component) {
			component.addEventListener('mousedown', (e) => {
				activeComponent = component;
				activeComponent.style.cursor = 'grabbing';
				offsetX = e.clientX - activeComponent.getBoundingClientRect().left;
				offsetY = e.clientY - activeComponent.getBoundingClientRect().top;
			});
		}

		document.addEventListener('mousemove', (e) => {
			if (activeComponent) {
				const x = e.clientX - offsetX;
				const y = e.clientY - offsetY;
				activeComponent.style.left = x + 'px';
				activeComponent.style.top = y + 'px';
			}
		});

		document.addEventListener('mouseup', () => {
			if (activeComponent) {
				activeComponent.style.cursor = 'grab';
				const x = parseInt(activeComponent.style.left, 10);
				const y = parseInt(activeComponent.style.top, 10);
				vscode.postMessage({
					command: 'updatePosition',
					componentId: activeComponent.id,
					x: x,
					y: y
				});
				activeComponent = null;
			}
		});

		window.addEventListener('message', event => {
			const message = event.data;
			switch (message.command) {
				case 'load':
					const data = JSON.parse(message.data);
					canvas.innerHTML = ''; // Clear existing components
					for (const id in data) {
						const componentData = data[id];
						const component = document.createElement('div');
						component.id = id;
						component.className = 'component';
						component.style.left = componentData.x + 'px';
						component.style.top = componentData.y + 'px';
						component.textContent = id;
						canvas.appendChild(component);
						initializeDraggable(component);
					}
					break;
			}
		});
	</script>
</body>
</html>`;
}
