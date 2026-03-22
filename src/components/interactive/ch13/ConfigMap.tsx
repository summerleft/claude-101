import { useState, useEffect } from 'react';
import { useSceneComplete } from '../../../engine/SceneContext';
import { useLanguage } from '../../../i18n/LanguageContext';

interface ConfigFile {
  id: string;
  name: string;
  path: string;
  scope: string;
  scopeLevel: number;
  icon: string;
  description: string;
  example: string;
}

export default function ConfigMap() {
  const sceneComplete = useSceneComplete();
  const { t } = useLanguage();
  const [selectedConfig, setSelectedConfig] = useState<ConfigFile | null>(null);
  const [visitedConfigs, setVisitedConfigs] = useState<Set<string>>(new Set());

  const configFiles: ConfigFile[] = [
    {
      id: 'user-settings',
      name: 'User Settings',
      path: '~/.claude/settings.json',
      scope: t('用户级', 'User-level'),
      scopeLevel: 1,
      icon: '👤',
      description: t(
        '你的个人全局设置。适用于所有项目。定义默认权限、偏好的模型、全局 Allow/Deny 规则。',
        'Your personal global settings. Applies to all projects. Define default permissions, preferred model, global Allow/Deny rules.'
      ),
      example: `{
  "permissions": {
    "allow": ["Bash(npm *)"],
    "deny": ["Bash(rm -rf *)"]
  },
  "model": "claude-sonnet-4-20250514"
}`,
    },
    {
      id: 'project-settings',
      name: 'Project Settings',
      path: '.claude/settings.json',
      scope: t('项目级', 'Project-level'),
      scopeLevel: 2,
      icon: '📁',
      description: t(
        '项目共享配置。提交到 Git，团队共享。定义项目特定的权限规则和工具配置。',
        'Shared project configuration. Committed to Git, shared across the team. Define project-specific permission rules and tool configs.'
      ),
      example: `{
  "permissions": {
    "allow": [
      "Bash(npm run build)",
      "Bash(npm test)"
    ]
  }
}`,
    },
    {
      id: 'local-settings',
      name: 'Local Settings',
      path: '.claude/settings.local.json',
      scope: t('本地级', 'Local-level'),
      scopeLevel: 3,
      icon: '💻',
      description: t(
        '本地覆盖配置。不提交到 Git，只在你的机器上生效。用于覆盖项目设置中不适合你的部分。',
        'Local override configuration. Not committed to Git, only takes effect on your machine. Used to override project settings that don\'t suit you.'
      ),
      example: `{
  "permissions": {
    "allow": [
      "Bash(docker *)"
    ]
  }
}`,
    },
    {
      id: 'claude-md',
      name: 'CLAUDE.md',
      path: 'CLAUDE.md',
      scope: t('项目级', 'Project-level'),
      scopeLevel: 2,
      icon: '📝',
      description: t(
        'AI 的行为指南。用自然语言告诉 Claude Code 这个项目的规范、架构、注意事项。团队共享。',
        'AI behavior guide. Use natural language to tell Claude Code about project standards, architecture, and considerations. Shared across the team.'
      ),
      example: t(
        `# 项目规范
- 使用 TypeScript strict 模式
- 组件使用函数式写法
- 提交前必须通过 ESLint
- API 响应使用 camelCase`,
        `# Project Standards
- Use TypeScript strict mode
- Components use functional style
- Must pass ESLint before committing
- API responses use camelCase`
      ),
    },
    {
      id: 'skills',
      name: 'Skills',
      path: '.claude/skills/',
      scope: t('项目级', 'Project-level'),
      scopeLevel: 2,
      icon: '⚡',
      description: t(
        '可复用的技能定义。每个 .md 文件是一个 Skill，定义了特定任务的步骤和上下文。',
        'Reusable skill definitions. Each .md file is a Skill, defining steps and context for a specific task.'
      ),
      example: t(
        `# /deploy

## 步骤
1. npm run build
2. npm test
3. npm run deploy:staging`,
        `# /deploy

## Steps
1. npm run build
2. npm test
3. npm run deploy:staging`
      ),
    },
    {
      id: 'agents',
      name: 'Agents',
      path: '.claude/agents/',
      scope: t('项目级', 'Project-level'),
      scopeLevel: 2,
      icon: '🤖',
      description: t(
        '自定义子代理定义。每个 .md 文件定义一个专门的 Agent，有自己的系统提示和工具权限。',
        'Custom subagent definitions. Each .md file defines a specialized Agent with its own system prompt and tool permissions.'
      ),
      example: t(
        `# code-reviewer

## 角色
你是一个严格的代码审查者。

## 工具
- Read (只读)
- Grep (搜索)`,
        `# code-reviewer

## Role
You are a strict code reviewer.

## Tools
- Read (read-only)
- Grep (search)`
      ),
    },
    {
      id: 'mcp',
      name: 'MCP Config',
      path: '.mcp.json',
      scope: t('项目级', 'Project-level'),
      scopeLevel: 2,
      icon: '🔌',
      description: t(
        'MCP 服务器配置。定义项目使用的外部工具服务器，如数据库、API、文档服务等。',
        'MCP server configuration. Define external tool servers used by the project, such as databases, APIs, documentation services, etc.'
      ),
      example: `{
  "mcpServers": {
    "postgres": {
      "command": "npx",
      "args": ["@pg/mcp-server"]
    }
  }
}`,
    },
  ];

  const scopeHierarchy = [
    { level: 5, name: t('组织策略 (Managed)', 'Organization Policy (Managed)'), color: 'var(--color-red, #ef4444)' },
    { level: 4, name: t('命令行参数 (CLI)', 'CLI Arguments (CLI)'), color: 'var(--color-orange, #f97316)' },
    { level: 3, name: t('本地配置 (Local)', 'Local Config (Local)'), color: 'var(--color-yellow, #eab308)' },
    { level: 2, name: t('项目配置 (Project)', 'Project Config (Project)'), color: 'var(--color-blue, #3b82f6)' },
    { level: 1, name: t('用户配置 (User)', 'User Config (User)'), color: 'var(--color-purple, #a855f7)' },
  ];

  useEffect(() => {
    if (visitedConfigs.size >= configFiles.length && sceneComplete) {
      sceneComplete();
    }
  }, [visitedConfigs.size, sceneComplete]);

  const selectConfig = (config: ConfigFile) => {
    setSelectedConfig(config);
    setVisitedConfigs((prev) => new Set(prev).add(config.id));
  };

  return (
    <div className="config-map" data-interactive>
      <div className="config-map__hierarchy">
        <div className="config-map__hierarchy-title">{t('优先级（高 → 低）', 'Priority (High → Low)')}</div>
        {scopeHierarchy.map((scope) => (
          <div key={scope.level} className="config-map__hierarchy-item">
            <span
              className="config-map__hierarchy-bar"
              style={{ background: scope.color, width: `${scope.level * 20}%` }}
            />
            <span className="config-map__hierarchy-label">{scope.name}</span>
          </div>
        ))}
      </div>

      <div className="config-map__layout">
        <div className="config-map__grid">
          {configFiles.map((config) => {
            const isSelected = selectedConfig?.id === config.id;
            const isVisited = visitedConfigs.has(config.id);

            return (
              <div
                key={config.id}
                className={`config-map__card ${isSelected ? 'config-map__card--selected' : ''} ${isVisited ? 'config-map__card--visited' : ''}`}
                onClick={() => selectConfig(config)}
              >
                <div className="config-map__card-icon">{config.icon}</div>
                <div className="config-map__card-name">{config.name}</div>
                <div className="config-map__card-path">{config.path}</div>
                <div className="config-map__card-scope">{config.scope}</div>
              </div>
            );
          })}
        </div>

        <div className="config-map__detail">
          {selectedConfig ? (
            <>
              <div className="config-map__detail-header">
                <span className="config-map__detail-icon">{selectedConfig.icon}</span>
                <div>
                  <div className="config-map__detail-name">{selectedConfig.name}</div>
                  <code className="config-map__detail-path">{selectedConfig.path}</code>
                </div>
              </div>
              <p className="config-map__detail-desc">{selectedConfig.description}</p>
              <div className="config-map__detail-example-label">{t('示例', 'Example')}:</div>
              <pre className="config-map__detail-example">{selectedConfig.example}</pre>
            </>
          ) : (
            <div className="config-map__detail-empty">
              <p>{t('点击左侧的配置文件卡片', 'Click a config file card on the left')}</p>
              <p>{t('了解它的作用和用法', 'to learn about its role and usage')}</p>
            </div>
          )}
        </div>
      </div>

      <div className="config-map__progress">
        {t(
          `已探索 ${visitedConfigs.size} / ${configFiles.length} 个配置`,
          `Explored ${visitedConfigs.size} / ${configFiles.length} configs`
        )}
      </div>
    </div>
  );
}
