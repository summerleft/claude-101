import { useState } from 'react';
import { useSceneComplete } from '../../../engine/SceneContext';
import { useLanguage } from '../../../i18n/LanguageContext';

interface FileNode {
  name: string;
  type: 'folder' | 'file';
  description: string;
  content: string;
  children?: FileNode[];
}

export default function PluginAnatomy() {
  const sceneComplete = useSceneComplete();
  const { t } = useLanguage();
  const [expandedPaths, setExpandedPaths] = useState<Set<string>>(new Set(['.claude-plugin/']));
  const [selectedFile, setSelectedFile] = useState<FileNode | null>(null);
  const [visitedFiles, setVisitedFiles] = useState<Set<string>>(new Set());

  const totalFiles = 7; // plugin.json, code-review.md, deploy.md, debugger.md, hooks.json, .mcp.json, plus folders count as exploration

  const pluginTree: FileNode[] = [
    {
      name: '.claude-plugin/',
      type: 'folder',
      description: t('插件根目录', 'Plugin root directory'),
      content: t(
        '这是 Plugin 的根目录。所有插件的组件都在这里组织。',
        'This is the Plugin\'s root directory. All plugin components are organized here.'
      ),
      children: [
        {
          name: 'plugin.json',
          type: 'file',
          description: t('插件清单', 'Plugin manifest'),
          content: t(
            `{
  "name": "fullstack-toolkit",
  "version": "1.0.0",
  "description": "全栈开发工具包",
  "author": "your-team",
  "permissions": ["read", "edit", "bash"]
}

这是插件的"身份证"——定义名字、版本、
描述、作者和所需权限。
安装插件时，Claude Code 会先读这个文件。`,
            `{
  "name": "fullstack-toolkit",
  "version": "1.0.0",
  "description": "Full-stack development toolkit",
  "author": "your-team",
  "permissions": ["read", "edit", "bash"]
}

This is the plugin's "ID card"—defining name, version,
description, author, and required permissions.
When installing a plugin, Claude Code reads this file first.`
          ),
        },
        {
          name: 'skills/',
          type: 'folder',
          description: t('Skill 文件', 'Skill files'),
          content: t(
            '存放插件包含的所有 Skills。每个 .md 文件就是一个 Skill，安装后以 plugin-name:skill-name 的格式注册。',
            'Contains all Skills included in the plugin. Each .md file is a Skill, registered in the format plugin-name:skill-name after installation.'
          ),
          children: [
            {
              name: 'code-review.md',
              type: 'file',
              description: t('代码审查 Skill', 'Code Review Skill'),
              content: t(
                `# code-review

## 触发条件
当用户请求代码审查时激活。

## 执行步骤
1. 读取目标文件
2. 检查代码风格、潜在 bug、性能问题
3. 生成审查报告

安装后的调用方式：
/fullstack-toolkit:code-review`,
                `# code-review

## Trigger Condition
Activated when a user requests a code review.

## Steps
1. Read target files
2. Check code style, potential bugs, performance issues
3. Generate review report

How to invoke after installation:
/fullstack-toolkit:code-review`
              ),
            },
            {
              name: 'deploy.md',
              type: 'file',
              description: t('部署 Skill', 'Deploy Skill'),
              content: t(
                `# deploy

## 触发条件
当用户请求部署时激活。

## 执行步骤
1. 运行测试
2. 构建生产版本
3. 部署到指定环境

命名空间避免冲突：
/fullstack-toolkit:deploy`,
                `# deploy

## Trigger Condition
Activated when a user requests deployment.

## Steps
1. Run tests
2. Build production version
3. Deploy to specified environment

Namespace prevents conflicts:
/fullstack-toolkit:deploy`
              ),
            },
          ],
        },
        {
          name: 'agents/',
          type: 'folder',
          description: t('Agent 定义', 'Agent definitions'),
          content: t(
            '存放自定义 Agent 的定义文件。每个 Agent 有自己的系统提示和工具权限。',
            'Contains definition files for custom Agents. Each Agent has its own system prompt and tool permissions.'
          ),
          children: [
            {
              name: 'debugger.md',
              type: 'file',
              description: t('调试 Agent', 'Debug Agent'),
              content: t(
                `# debugger

一个专门用于调试的 Agent。
拥有 read、bash 权限，
会自动设置断点、分析调用栈、
定位问题根源。`,
                `# debugger

An Agent specialized in debugging.
Has read and bash permissions,
automatically sets breakpoints, analyzes call stacks,
and locates the root cause of issues.`
              ),
            },
          ],
        },
        {
          name: 'hooks/',
          type: 'folder',
          description: t('Hook 配置', 'Hook configuration'),
          content: t(
            '存放自动触发的 Hook 定义。这些 Hook 在安装后自动生效。',
            'Contains auto-triggered Hook definitions. These Hooks take effect automatically after installation.'
          ),
          children: [
            {
              name: 'hooks.json',
              type: 'file',
              description: t('Hook 配置文件', 'Hook configuration file'),
              content: t(
                `{
  "afterEdit": [
    {
      "command": "npx eslint --fix $FILE",
      "description": "编辑后自动 lint"
    }
  ],
  "beforeCommit": [
    {
      "command": "npm test",
      "description": "提交前运行测试"
    }
  ]
}

定义在什么时机自动执行什么操作。`,
                `{
  "afterEdit": [
    {
      "command": "npx eslint --fix $FILE",
      "description": "Auto-lint after editing"
    }
  ],
  "beforeCommit": [
    {
      "command": "npm test",
      "description": "Run tests before committing"
    }
  ]
}

Defines what actions to execute automatically at what timing.`
              ),
            },
          ],
        },
        {
          name: '.mcp.json',
          type: 'file',
          description: t('MCP 服务器配置', 'MCP server configuration'),
          content: t(
            `{
  "mcpServers": {
    "database": {
      "command": "npx",
      "args": ["@db/mcp-server"],
      "env": { "DB_URL": "$PROJECT_DB_URL" }
    }
  }
}

插件可以自带 MCP 服务器配置。
安装后自动连接，无需手动配置。`,
            `{
  "mcpServers": {
    "database": {
      "command": "npx",
      "args": ["@db/mcp-server"],
      "env": { "DB_URL": "$PROJECT_DB_URL" }
    }
  }
}

Plugins can include MCP server configurations.
Automatically connects after installation, no manual setup needed.`
          ),
        },
      ],
    },
  ];

  const toggleFolder = (path: string) => {
    setExpandedPaths((prev) => {
      const next = new Set(prev);
      if (next.has(path)) {
        next.delete(path);
      } else {
        next.add(path);
      }
      return next;
    });
  };

  const selectFile = (node: FileNode, path: string) => {
    setSelectedFile(node);
    const newVisited = new Set(visitedFiles);
    newVisited.add(path);
    setVisitedFiles(newVisited);

    if (newVisited.size >= totalFiles && sceneComplete) {
      sceneComplete();
    }
  };

  const renderTree = (nodes: FileNode[], parentPath = '', depth = 0) => {
    return nodes.map((node) => {
      const currentPath = parentPath + node.name;
      const isExpanded = expandedPaths.has(currentPath);
      const isSelected = selectedFile?.name === node.name && selectedFile?.content === node.content;
      const isVisited = visitedFiles.has(currentPath);

      return (
        <div key={currentPath} style={{ marginLeft: depth * 16 }}>
          <div
            className={`plugin-anatomy__node ${isSelected ? 'plugin-anatomy__node--selected' : ''} ${isVisited ? 'plugin-anatomy__node--visited' : ''}`}
            onClick={() => {
              if (node.type === 'folder') {
                toggleFolder(currentPath);
                selectFile(node, currentPath);
              } else {
                selectFile(node, currentPath);
              }
            }}
          >
            <span className="plugin-anatomy__icon">
              {node.type === 'folder' ? (isExpanded ? '📂' : '📁') : '📄'}
            </span>
            <span className="plugin-anatomy__name">{node.name}</span>
            <span className="plugin-anatomy__desc">{node.description}</span>
          </div>

          {node.type === 'folder' && isExpanded && node.children && (
            <div className="plugin-anatomy__children">
              {renderTree(node.children, currentPath, depth + 1)}
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div className="plugin-anatomy" data-interactive>
      <div className="plugin-anatomy__layout">
        <div className="plugin-anatomy__tree">
          <div className="plugin-anatomy__tree-header">
            <span className="plugin-anatomy__tree-title">fullstack-toolkit</span>
            <span className="plugin-anatomy__tree-badge">Plugin</span>
          </div>
          {renderTree(pluginTree)}
          <div className="plugin-anatomy__progress">
            {t(
              <>已探索 {visitedFiles.size} / {totalFiles} 个文件</>,
              <>Explored {visitedFiles.size} / {totalFiles} files</>
            )}
          </div>
        </div>

        <div className="plugin-anatomy__detail">
          {selectedFile ? (
            <>
              <div className="plugin-anatomy__detail-header">
                <span className="plugin-anatomy__detail-icon">
                  {selectedFile.type === 'folder' ? '📂' : '📄'}
                </span>
                <span className="plugin-anatomy__detail-name">{selectedFile.name}</span>
              </div>
              <pre className="plugin-anatomy__detail-content">{selectedFile.content}</pre>
            </>
          ) : (
            <div className="plugin-anatomy__detail-empty">
              <p>{t('点击左侧文件树中的项目', 'Click an item in the file tree on the left')}</p>
              <p>{t('查看其内容和用途', 'to view its content and purpose')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
