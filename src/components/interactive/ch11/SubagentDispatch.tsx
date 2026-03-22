import { useState, useEffect } from 'react';
import { useSceneComplete } from '../../../engine/SceneContext';
import { useLanguage } from '../../../i18n/LanguageContext';

interface Subagent {
  id: string;
  name: string;
  icon: string;
  model: string;
  permissions: string[];
  description: string;
  task: string;
  result: string;
}

type Phase = 'select' | 'dispatching' | 'working' | 'returned';

export default function SubagentDispatch() {
  const sceneComplete = useSceneComplete();
  const { t } = useLanguage();
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [dispatchedAgents, setDispatchedAgents] = useState<Set<string>>(new Set());
  const [agentPhases, setAgentPhases] = useState<Record<string, Phase>>({});
  const [completedCount, setCompletedCount] = useState(0);

  const subagents: Subagent[] = [
    {
      id: 'explore',
      name: 'Explore',
      icon: '🔍',
      model: t('Haiku (快速)', 'Haiku (Fast)'),
      permissions: [t('只读', 'Read-only')],
      description: t(
        '快速探索型子代理。使用轻量模型，只有读取权限。适合快速浏览代码、搜索文件、了解项目结构。',
        'Fast exploration subagent. Uses a lightweight model with read-only access. Ideal for quickly browsing code, searching files, and understanding project structure.'
      ),
      task: t(
        '扫描 src/ 目录，找出所有导出的 API 函数',
        'Scan the src/ directory and find all exported API functions'
      ),
      result: t(
        '找到 23 个导出函数，分布在 8 个模块中。主要 API 入口在 src/api/index.ts。',
        'Found 23 exported functions across 8 modules. Main API entry point is src/api/index.ts.'
      ),
    },
    {
      id: 'plan',
      name: 'Plan',
      icon: '📋',
      model: t('Sonnet (均衡)', 'Sonnet (Balanced)'),
      permissions: [t('只读', 'Read-only'), t('搜索', 'Search')],
      description: t(
        '研究规划型子代理。只有读取权限，专注于分析和制定方案。不会修改任何文件。',
        'Research and planning subagent. Read-only access, focused on analysis and planning. Will not modify any files.'
      ),
      task: t(
        '分析当前认证模块，制定重构计划',
        'Analyze the current auth module and create a refactoring plan'
      ),
      result: t(
        '建议将 auth 模块拆分为 3 个子模块：token、session、permission。预计影响 12 个文件。',
        'Recommend splitting the auth module into 3 sub-modules: token, session, permission. Estimated impact: 12 files.'
      ),
    },
    {
      id: 'general',
      name: 'General',
      icon: '🛠️',
      model: t('Opus (强力)', 'Opus (Powerful)'),
      permissions: [t('读取', 'Read'), t('编辑', 'Edit'), 'Bash', 'MCP'],
      description: t(
        '全能型子代理。拥有完整的工具权限，可以读写文件、执行命令。适合需要实际修改代码的任务。',
        'General-purpose subagent. Has full tool permissions—can read/write files and execute commands. Ideal for tasks that require actual code modifications.'
      ),
      task: t(
        '重构 auth 模块，按计划拆分为三个子模块',
        'Refactor the auth module, splitting it into three sub-modules as planned'
      ),
      result: t(
        '已完成重构。创建 3 个新模块，更新 12 个引用文件，所有测试通过。',
        'Refactoring complete. Created 3 new modules, updated 12 referencing files, all tests passing.'
      ),
    },
  ];

  useEffect(() => {
    if (completedCount >= 3 && sceneComplete) {
      sceneComplete();
    }
  }, [completedCount, sceneComplete]);

  const dispatchAgent = (agentId: string) => {
    if (dispatchedAgents.has(agentId)) return;

    setDispatchedAgents((prev) => new Set(prev).add(agentId));
    setAgentPhases((prev) => ({ ...prev, [agentId]: 'dispatching' }));

    setTimeout(() => {
      setAgentPhases((prev) => ({ ...prev, [agentId]: 'working' }));
    }, 800);

    setTimeout(() => {
      setAgentPhases((prev) => ({ ...prev, [agentId]: 'returned' }));
      setCompletedCount((c) => c + 1);
    }, 2500);
  };

  const getPhaseLabel = (phase: Phase | undefined) => {
    switch (phase) {
      case 'dispatching': return t('派遣中...', 'Dispatching...');
      case 'working': return t('执行任务中...', 'Working...');
      case 'returned': return t('已完成', 'Completed');
      default: return t('待命', 'Standby');
    }
  };

  return (
    <div className="subagent-dispatch" data-interactive>
      <div className="subagent-dispatch__main-agent">
        <div className="subagent-dispatch__main-icon">🧠</div>
        <div className="subagent-dispatch__main-label">{t('主代理 (你)', 'Main Agent (You)')}</div>
      </div>

      <div className="subagent-dispatch__connections">
        {subagents.map((agent) => {
          const phase = agentPhases[agent.id];
          const isDispatched = dispatchedAgents.has(agent.id);
          return (
            <div
              className="subagent-dispatch__line"
              key={agent.id}
              style={{
                opacity: isDispatched ? 1 : 0.3,
              }}
            />
          );
        })}
      </div>

      <div className="subagent-dispatch__agents">
        {subagents.map((agent) => {
          const phase = agentPhases[agent.id];
          const isSelected = selectedAgent === agent.id;
          const isDispatched = dispatchedAgents.has(agent.id);

          return (
            <div
              key={agent.id}
              className={`subagent-dispatch__card ${isSelected ? 'subagent-dispatch__card--selected' : ''} ${phase === 'working' ? 'subagent-dispatch__card--working' : ''} ${phase === 'returned' ? 'subagent-dispatch__card--done' : ''}`}
              onClick={() => setSelectedAgent(isSelected ? null : agent.id)}
            >
              <div className="subagent-dispatch__card-header">
                <span className="subagent-dispatch__card-icon">{agent.icon}</span>
                <span className="subagent-dispatch__card-name">{agent.name}</span>
              </div>

              <div className="subagent-dispatch__card-model">
                {t('模型', 'Model')}: {agent.model}
              </div>

              <div className="subagent-dispatch__card-perms">
                {agent.permissions.map((perm) => (
                  <span key={perm} className="subagent-dispatch__perm-tag">{perm}</span>
                ))}
              </div>

              {isSelected && (
                <div className="subagent-dispatch__card-detail">
                  <p className="subagent-dispatch__card-desc">{agent.description}</p>

                  {!isDispatched && (
                    <button
                      className="subagent-dispatch__dispatch-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        dispatchAgent(agent.id);
                      }}
                    >
                      {t('派遣任务', 'Dispatch Task')}
                    </button>
                  )}

                  {isDispatched && (
                    <div className="subagent-dispatch__task">
                      <div className="subagent-dispatch__task-label">{t('任务', 'Task')}:</div>
                      <div className="subagent-dispatch__task-text">{agent.task}</div>
                    </div>
                  )}

                  {phase === 'returned' && (
                    <div className="subagent-dispatch__result">
                      <div className="subagent-dispatch__result-label">{t('结果', 'Result')}:</div>
                      <div className="subagent-dispatch__result-text">{agent.result}</div>
                    </div>
                  )}
                </div>
              )}

              <div className={`subagent-dispatch__status subagent-dispatch__status--${phase || 'idle'}`}>
                {getPhaseLabel(phase)}
              </div>
            </div>
          );
        })}
      </div>

      <div className="subagent-dispatch__progress">
        {t(
          `已完成 ${completedCount} / 3 个任务`,
          `Completed ${completedCount} / 3 tasks`
        )}
      </div>
    </div>
  );
}
