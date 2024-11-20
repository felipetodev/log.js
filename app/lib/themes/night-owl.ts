import type { editor } from "monaco-editor";

// Night-Owl theme from https://github.com/brijeshb42/monaco-themes
export const nightOwlTheme: editor.IStandaloneThemeData = {
  base: "vs-dark",
  inherit: true,
  colors: {
    contrastBorder: "#122d42",
    focusBorder: "#122d42",
    foreground: "#d6deeb",
    "widget.shadow": "#011627",
    "selection.background": "#4373c2",
    errorForeground: "#EF5350",
    "button.background": "#7e57c2cc",
    "button.foreground": "#ffffffcc",
    "button.hoverBackground": "#7e57c2",
    "dropdown.background": "#011627",
    "dropdown.border": "#5f7e97",
    "dropdown.foreground": "#ffffffcc",
    "input.background": "#0b253a",
    "input.border": "#5f7e97",
    "input.foreground": "#ffffffcc",
    "input.placeholderForeground": "#5f7e97",
    "inputOption.activeBorder": "#ffffffcc",
    "punctuation.definition.generic.begin.html": "#ef5350f2",
    "inputValidation.errorBackground": "#AB0300F2",
    "inputValidation.errorBorder": "#EF5350",
    "inputValidation.infoBackground": "#00589EF2",
    "inputValidation.infoBorder": "#64B5F6",
    "inputValidation.warningBackground": "#675700F2",
    "inputValidation.warningBorder": "#FFCA28",
    "scrollbar.shadow": "#010b14",
    "scrollbarSlider.activeBackground": "#084d8180",
    "scrollbarSlider.background": "#084d8180",
    "scrollbarSlider.hoverBackground": "#084d8180",
    "badge.background": "#5f7e97",
    "badge.foreground": "#ffffff",
    "progress.background": "#7e57c2",
    "breadcrumb.foreground": "#A599E9",
    "breadcrumb.focusForeground": "#ffffff",
    "breadcrumb.activeSelectionForeground": "#FFFFFF",
    "breadcrumbPicker.background": "#001122",
    "list.activeSelectionBackground": "#234d708c",
    "list.activeSelectionForeground": "#ffffff",
    "list.invalidItemForeground": "#975f94",
    "list.dropBackground": "#011627",
    "list.focusBackground": "#010d18",
    "list.focusForeground": "#ffffff",
    "list.highlightForeground": "#ffffff",
    "list.hoverBackground": "#011627",
    "list.hoverForeground": "#ffffff",
    "list.inactiveSelectionBackground": "#0e293f",
    "list.inactiveSelectionForeground": "#5f7e97",
    "activityBar.background": "#011627",
    "activityBar.dropBackground": "#5f7e97",
    "activityBar.foreground": "#5f7e97",
    "activityBar.border": "#011627",
    "activityBarBadge.background": "#44596b",
    "activityBarBadge.foreground": "#ffffff",
    "sideBar.background": "#011627",
    "sideBar.foreground": "#89a4bb",
    "sideBar.border": "#011627",
    "sideBarTitle.foreground": "#5f7e97",
    "sideBarSectionHeader.background": "#011627",
    "sideBarSectionHeader.foreground": "#5f7e97",
    "editorGroup.emptyBackground": "#011627",
    "editorGroup.border": "#011627",
    "editorGroup.dropBackground": "#7e57c273",
    "editorGroupHeader.noTabsBackground": "#011627",
    "editorGroupHeader.tabsBackground": "#011627",
    "editorGroupHeader.tabsBorder": "#262A39",
    "tab.activeBackground": "#0b2942",
    "tab.activeForeground": "#d2dee7",
    "tab.border": "#272B3B",
    "tab.activeBorder": "#262A39",
    "tab.unfocusedActiveBorder": "#262A39",
    "tab.inactiveBackground": "#01111d",
    "tab.inactiveForeground": "#5f7e97",
    "tab.unfocusedActiveForeground": "#5f7e97",
    "tab.unfocusedInactiveForeground": "#5f7e97",
    "editor.background": "#011627",
    "editor.foreground": "#d6deeb",
    "editorLineNumber.foreground": "#728ea6",
    "editorLineNumber.activeForeground": "#C5E4FD",
    "editorCursor.foreground": "#80a4c2",
    "editor.selectionBackground": "#1d3b53",
    "editor.selectionHighlightBackground": "#5f7e9779",
    "editor.inactiveSelectionBackground": "#7e57c25a",
    "editor.wordHighlightBackground": "#f6bbe533",
    "editor.wordHighlightStrongBackground": "#e2a2f433",
    "editor.findMatchBackground": "#5f7e9779",
    "editor.findMatchHighlightBackground": "#1085bb5d",
    "editor.hoverHighlightBackground": "#7e57c25a",
    "editor.lineHighlightBackground": "#0003",
    "editor.rangeHighlightBackground": "#7e57c25a",
    "editorIndentGuide.background": "#5e81ce52",
    "editorIndentGuide.activeBackground": "#7E97AC",
    "editorRuler.foreground": "#5e81ce52",
    "editorCodeLens.foreground": "#5e82ceb4",
    "editorBracketMatch.background": "#5f7e974d",
    "editorOverviewRuler.currentContentForeground": "#7e57c2",
    "editorOverviewRuler.incomingContentForeground": "#7e57c2",
    "editorOverviewRuler.commonContentForeground": "#7e57c2",
    "editorError.foreground": "#EF5350",
    "editorWarning.foreground": "#b39554",
    "editorGutter.background": "#011627",
    "editorGutter.modifiedBackground": "#e2b93d",
    "editorGutter.addedBackground": "#9CCC65",
    "editorGutter.deletedBackground": "#EF5350",
    "diffEditor.insertedTextBackground": "#99b76d23",
    "diffEditor.insertedTextBorder": "#c5e47833",
    "diffEditor.removedTextBackground": "#ef535033",
    "diffEditor.removedTextBorder": "#ef53504d",
    "editorWidget.background": "#021320",
    "editorWidget.border": "#5f7e97",
    "editorSuggestWidget.background": "#2C3043",
    "editorSuggestWidget.border": "#2B2F40",
    "editorSuggestWidget.foreground": "#d6deeb",
    "editorSuggestWidget.highlightForeground": "#ffffff",
    "editorSuggestWidget.selectedBackground": "#5f7e97",
    "editorHoverWidget.background": "#011627",
    "editorHoverWidget.border": "#5f7e97",
    "debugExceptionWidget.background": "#011627",
    "debugExceptionWidget.border": "#5f7e97",
    "editorMarkerNavigation.background": "#0b2942",
    "editorMarkerNavigationError.background": "#EF5350",
    "editorMarkerNavigationWarning.background": "#FFCA28",
    "peekView.border": "#5f7e97",
    "peekViewEditor.background": "#011627",
    "peekViewEditor.matchHighlightBackground": "#7e57c25a",
    "peekViewResult.background": "#011627",
    "peekViewResult.fileForeground": "#5f7e97",
    "peekViewResult.lineForeground": "#5f7e97",
    "peekViewResult.matchHighlightBackground": "#ffffffcc",
    "peekViewResult.selectionBackground": "#2E3250",
    "peekViewResult.selectionForeground": "#5f7e97",
    "peekViewTitle.background": "#011627",
    "peekViewTitleDescription.foreground": "#697098",
    "peekViewTitleLabel.foreground": "#5f7e97",
    "merge.currentHeaderBackground": "#5f7e97",
    "merge.incomingHeaderBackground": "#7e57c25a",
    "panel.background": "#011627",
    "panel.border": "#5f7e97",
    "panelTitle.activeBorder": "#5f7e97",
    "panelTitle.activeForeground": "#ffffffcc",
    "panelTitle.inactiveForeground": "#d6deeb80",
    "statusBar.background": "#011627",
    "statusBar.foreground": "#5f7e97",
    "statusBar.border": "#262A39",
    "statusBar.debuggingBackground": "#202431",
    "statusBar.debuggingBorder": "#1F2330",
    "statusBar.noFolderBackground": "#011627",
    "statusBar.noFolderBorder": "#25293A",
    "statusBarItem.activeBackground": "#202431",
    "statusBarItem.hoverBackground": "#202431",
    "statusBarItem.prominentBackground": "#202431",
    "statusBarItem.prominentHoverBackground": "#202431",
    "titleBar.activeBackground": "#011627",
    "titleBar.activeForeground": "#eeefff",
    "titleBar.inactiveBackground": "#010e1a",
    "notifications.background": "#01111d",
    "notifications.border": "#262a39",
    "notificationCenter.border": "#262a39",
    "notificationToast.border": "#262a39",
    "notifications.foreground": "#ffffffcc",
    "notificationLink.foreground": "#80CBC4",
    "extensionButton.prominentForeground": "#ffffffcc",
    "extensionButton.prominentBackground": "#7e57c2cc",
    "extensionButton.prominentHoverBackground": "#7e57c2",
    "pickerGroup.foreground": "#d1aaff",
    "pickerGroup.border": "#011627",
    "terminal.ansiWhite": "#ffffff",
    "terminal.ansiBlack": "#011627",
    "terminal.ansiBlue": "#82AAFF",
    "terminal.ansiCyan": "#21c7a8",
    "terminal.ansiGreen": "#22da6e",
    "terminal.ansiMagenta": "#C792EA",
    "terminal.ansiRed": "#EF5350",
    "terminal.ansiYellow": "#c5e478",
    "terminal.ansiBrightWhite": "#ffffff",
    "terminal.ansiBrightBlack": "#575656",
    "terminal.ansiBrightBlue": "#82AAFF",
    "terminal.ansiBrightCyan": "#7fdbca",
    "terminal.ansiBrightGreen": "#22da6e",
    "terminal.ansiBrightMagenta": "#C792EA",
    "terminal.ansiBrightRed": "#EF5350",
    "terminal.ansiBrightYellow": "#ffeb95",
    "terminal.selectionBackground": "#1b90dd4d",
    "terminalCursor.background": "#234d70",
    "textCodeBlock.background": "#4f4f4f",
    "debugToolBar.background": "#011627",
    "welcomePage.buttonBackground": "#011627",
    "welcomePage.buttonHoverBackground": "#011627",
    "walkThrough.embeddedEditorBackground": "#011627",
    "gitDecoration.modifiedResourceForeground": "#a2bffc",
    "gitDecoration.deletedResourceForeground": "#EF535090",
    "gitDecoration.untrackedResourceForeground": "#c5e478ff",
    "gitDecoration.ignoredResourceForeground": "#395a75",
    "gitDecoration.conflictingResourceForeground": "#ffeb95cc",
    "source.elm": "#5f7e97",
    "string.quoted.single.js": "#ffffff",
    "meta.objectliteral.js": "#82AAFF",
  },
  rules: [
    {
      foreground: "#DCDCAA",
      token: "entity.name.function",
    },
    {
      foreground: "#DCDCAA",
      token: "support.function",
    },
    {
      foreground: "#DCDCAA",
      token: "support.constant.handlebars",
    },
    {
      foreground: "#DCDCAA",
      token: "source.powershell variable.other.member",
    },
    {
      foreground: "#DCDCAA",
      token: "entity.name.operator.custom-literal",
    },
    {
      foreground: "#4EC9B0",
      token: "meta.return-type",
    },
    {
      foreground: "#4EC9B0",
      token: "support.class",
    },
    {
      foreground: "#4EC9B0",
      token: "support.type",
    },
    {
      foreground: "#4EC9B0",
      token: "entity.name.type",
    },
    {
      foreground: "#4EC9B0",
      token: "entity.name.namespace",
    },
    {
      foreground: "#4EC9B0",
      token: "entity.other.attribute",
    },
    {
      foreground: "#4EC9B0",
      token: "entity.name.scope-resolution",
    },
    {
      foreground: "#4EC9B0",
      token: "entity.name.class",
    },
    {
      foreground: "#4EC9B0",
      token: "storage.type.numeric.go",
    },
    {
      foreground: "#4EC9B0",
      token: "storage.type.byte.go",
    },
    {
      foreground: "#4EC9B0",
      token: "storage.type.boolean.go",
    },
    {
      foreground: "#4EC9B0",
      token: "storage.type.string.go",
    },
    {
      foreground: "#4EC9B0",
      token: "storage.type.uintptr.go",
    },
    {
      foreground: "#4EC9B0",
      token: "storage.type.error.go",
    },
    {
      foreground: "#4EC9B0",
      token: "storage.type.rune.go",
    },
    {
      foreground: "#4EC9B0",
      token: "storage.type.cs",
    },
    {
      foreground: "#4EC9B0",
      token: "storage.type.generic.cs",
    },
    {
      foreground: "#4EC9B0",
      token: "storage.type.modifier.cs",
    },
    {
      foreground: "#4EC9B0",
      token: "storage.type.variable.cs",
    },
    {
      foreground: "#4EC9B0",
      token: "storage.type.annotation.java",
    },
    {
      foreground: "#4EC9B0",
      token: "storage.type.generic.java",
    },
    {
      foreground: "#4EC9B0",
      token: "storage.type.java",
    },
    {
      foreground: "#4EC9B0",
      token: "storage.type.object.array.java",
    },
    {
      foreground: "#4EC9B0",
      token: "storage.type.primitive.array.java",
    },
    {
      foreground: "#4EC9B0",
      token: "storage.type.primitive.java",
    },
    {
      foreground: "#4EC9B0",
      token: "storage.type.token.java",
    },
    {
      foreground: "#4EC9B0",
      token: "storage.type.groovy",
    },
    {
      foreground: "#4EC9B0",
      token: "storage.type.annotation.groovy",
    },
    {
      foreground: "#4EC9B0",
      token: "storage.type.parameters.groovy",
    },
    {
      foreground: "#4EC9B0",
      token: "storage.type.generic.groovy",
    },
    {
      foreground: "#4EC9B0",
      token: "storage.type.object.array.groovy",
    },
    {
      foreground: "#4EC9B0",
      token: "storage.type.primitive.array.groovy",
    },
    {
      foreground: "#4EC9B0",
      token: "storage.type.primitive.groovy",
    },
    {
      foreground: "#4EC9B0",
      token: "meta.type.cast.expr",
    },
    {
      foreground: "#4EC9B0",
      token: "meta.type.new.expr",
    },
    {
      foreground: "#4EC9B0",
      token: "support.constant.math",
    },
    {
      foreground: "#4EC9B0",
      token: "support.constant.dom",
    },
    {
      foreground: "#4EC9B0",
      token: "support.constant.json",
    },
    {
      foreground: "#4EC9B0",
      token: "entity.other.inherited-class",
    },
    {
      foreground: "#C586C0",
      token: "keyword.control",
    },
    {
      foreground: "#C586C0",
      token: "source.cpp keyword.operator.new",
    },
    {
      foreground: "#C586C0",
      token: "keyword.operator.delete",
    },
    {
      foreground: "#C586C0",
      token: "keyword.other.using",
    },
    {
      foreground: "#C586C0",
      token: "keyword.other.operator",
    },
    {
      foreground: "#C586C0",
      token: "entity.name.operator",
    },
    {
      foreground: "#9CDCFE",
      token: "variable",
    },
    {
      foreground: "#9CDCFE",
      token: "meta.definition.variable.name",
    },
    {
      foreground: "#9CDCFE",
      token: "support.variable",
    },
    {
      foreground: "#9CDCFE",
      token: "entity.name.variable",
    },
    {
      foreground: "#4FC1FF",
      token: "variable.other.constant",
    },
    {
      foreground: "#4FC1FF",
      token: "variable.other.enummember",
    },
    {
      foreground: "#9CDCFE",
      token: "meta.object-literal.key",
    },
    {
      foreground: "#CE9178",
      token: "support.constant.property-value",
    },
    {
      foreground: "#CE9178",
      token: "support.constant.font-name",
    },
    {
      foreground: "#CE9178",
      token: "support.constant.media-type",
    },
    {
      foreground: "#CE9178",
      token: "support.constant.media",
    },
    {
      foreground: "#CE9178",
      token: "constant.other.color.rgb-value",
    },
    {
      foreground: "#CE9178",
      token: "constant.other.rgb-value",
    },
    {
      foreground: "#CE9178",
      token: "support.constant.color",
    },
    {
      foreground: "#CE9178",
      token: "punctuation.definition.group.regexp",
    },
    {
      foreground: "#CE9178",
      token: "punctuation.definition.group.assertion.regexp",
    },
    {
      foreground: "#CE9178",
      token: "punctuation.definition.character-class.regexp",
    },
    {
      foreground: "#CE9178",
      token: "punctuation.character.set.begin.regexp",
    },
    {
      foreground: "#CE9178",
      token: "punctuation.character.set.end.regexp",
    },
    {
      foreground: "#CE9178",
      token: "keyword.operator.negation.regexp",
    },
    {
      foreground: "#CE9178",
      token: "support.other.parenthesis.regexp",
    },
    {
      foreground: "#d16969",
      token: "constant.character.character-class.regexp",
    },
    {
      foreground: "#d16969",
      token: "constant.other.character-class.set.regexp",
    },
    {
      foreground: "#d16969",
      token: "constant.other.character-class.regexp",
    },
    {
      foreground: "#d16969",
      token: "constant.character.set.regexp",
    },
    {
      foreground: "#DCDCAA",
      token: "keyword.operator.or.regexp",
    },
    {
      foreground: "#DCDCAA",
      token: "keyword.control.anchor.regexp",
    },
    {
      foreground: "#d7ba7d",
      token: "keyword.operator.quantifier.regexp",
    },
    {
      foreground: "#569cd6",
      token: "constant.character",
    },
    {
      foreground: "#d7ba7d",
      token: "constant.character.escape",
    },
    {
      foreground: "#C8C8C8",
      token: "entity.name.label",
    },
    {
      foreground: "#569CD6",
      token: "constant.language",
    },
    {
      foreground: "#569CD6",
      token: "entity.name.tag",
    },
    {
      foreground: "#569cd6",
      token: "storage",
    },
  ],
  encodedTokensColors: [],
};