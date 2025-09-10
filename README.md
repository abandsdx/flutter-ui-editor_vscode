# ui-dragger README

This is the README for your extension "ui-dragger". After writing up a brief description, we recommend including the following sections.

## Features

Describe specific features of your extension including screenshots of your extension in action. Image paths are relative to this README file.

For example if there is an image subfolder under your extension project workspace:

\!\[feature X\]\(images/feature-x.png\)

> Tip: Many popular extensions utilize animations. This is an excellent way to show off your extension! We recommend short, focused animations that are easy to follow.

## Requirements

If you have any requirements or dependencies, add a section describing those and how to install and configure them.

## Extension Settings

Include if your extension adds any VS Code settings through the `contributes.configuration` extension point.

For example:

This extension contributes the following settings:

* `myExtension.enable`: Enable/disable this extension.
* `myExtension.thing`: Set to `blah` to do something.

## Known Issues

Calling out known issues can help limit users opening duplicate issues against your extension.

## Release Notes

Users appreciate release notes as you update your extension.

### 1.0.0

Initial release of ...

### 1.0.1

Fixed issue #.

### 1.1.0

Added features X, Y, and Z.

---

## Following extension guidelines

Ensure that you've read through the extensions guidelines and follow the best practices for creating your extension.

* [Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)

## Working with Markdown

You can author your README using Visual Studio Code. Here are some useful editor keyboard shortcuts:

* Split the editor (`Cmd+\` on macOS or `Ctrl+\` on Windows and Linux).
* Toggle preview (`Shift+Cmd+V` on macOS or `Shift+Ctrl+V` on Windows and Linux).
* Press `Ctrl+Space` (Windows, Linux, macOS) to see a list of Markdown snippets.

## For more information

* [Visual Studio Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)
* [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)

**Enjoy!**

---

## 功能說明與使用方式 (中文)

本擴充功能提供一個視覺化的編輯器，讓您可以透過拖拉的方式調整 UI 元件的位置。

### 主要功能

*   **視覺化編輯**：在 VS Code 中開啟一個可互動的畫布 (Webview)，讓您能直觀地移動元件。
*   **檔案同步**：當元件在畫布上被移動後，變更會自動儲存回來源的 `.uijson` 檔案。
*   **自訂格式**：使用簡單的 `.uijson` 檔案格式來定義您的 UI 佈局。

### 如何使用

1.  **建立檔案**：在您的專案中建立一個副檔名為 `.uijson` 的檔案 (例如: `my-ui.uijson`)。
2.  **定義元件**：在檔案中，使用 JSON 格式來定義您的元件 ID 和初始位置 (x, y)。例如：
    ```json
    {
      "header": { "x": 10, "y": 10 },
      "sidebar": { "x": 10, "y": 60 },
      "mainContent": { "x": 120, "y": 60 }
    }
    ```
3.  **打開編輯器**：
    *   在 VS Code 中打開您建立的 `.uijson` 檔案。
    *   按下 `Ctrl+Shift+P` (在 Mac 上為 `Cmd+Shift+P`) 來打開命令面板。
    *   輸入並選擇 "**Open UI Dragger Editor**" 命令。
4.  **開始編輯**：
    *   一個新的編輯器分頁將會開啟，並在畫布上顯示您定義的元件。
    *   在畫布上用滑鼠拖拉元件到您想要的位置。
5.  **自動儲存**：
    *   當您放開滑鼠後，您的 `.uijson` 檔案內容將會自動更新並儲存。
