import { useState, useEffect } from 'react';
import { useSceneComplete } from '../../../engine/SceneContext';
import { useLanguage } from '../../../i18n/LanguageContext';

interface Subagent {
  id: string;
  name: string;
  icon: string;
  color: string;
  model: string;
  zhModel: string;
  permissions: string[];
  zhPermissions: string[];
  zhDescription: string;
  enDescription: string;
  zhTask: string;
  enTask: string;
  zhResult: string;
  enResult: string;
}

type Phase = 'select' | 'dispatching' | 'working' | 'returned';

const AGENTS: Subagent[] = [
  {
    id: 'explore',
    name: 'Explore',
    icon: '🔍',
    color: '#3b82f6',
    zhModel: 'Haiku (快速)',
    model: 'Haiku (Fast)',
    zhPermissions: ['只读'],
    permissions: ['Read-only'],
    zhDescription: '快速探索型子代理。使用轻量模型，只有读取权限。适合快速浏览代码、搜索文件。',
    enDescription: 'Fast exploration subagent. Lightweight model, read-only. For quick code browsing and search.',
    zhTask: '扫描 src/ 目录，找出所有导出的 API 函数',
    enTask: 'Scan src/ and find all exported API functions',
    zhResult: '找到 23 个导出函数，分布在 8 个模块中。主 API 入口：src/api/index.ts',
    enResult: 'Found 23 exports across 8 modules. Main entry: src/api/index.ts',
  },
  {
    id: 'plan',
    name: 'Plan',
    icon: '📋',
    color: '#f59e0b',
    zhModel: 'Sonnet (均衡)',
    model: 'Sonnet (Balanced)',
    zhPermissions: ['只读', '搜索'],
    permissions: ['Read', 'Search'],
    zhDescription: '研究规划型子代理。专注于分析和制定方案，不修改文件。',
    enDescription: 'Research & planning subagent. Focused on analysis and planning, no modifications.',
    zhTask: '分析认证模块，制定重构计划',
    enTask: 'Analyze auth module and create refactoring plan',
    zhResult: '建议拆分为 token、session、permission 三个子模块，影响 12 个文件',
    enResult: 'Recommend 3 sub-modules: token, session, permission. 12 files impacted',
  },
  {
    id: 'general',
    name: 'General',
    icon: '🛠️',
    color: '#a855f7',
    zhModel: 'Opus (强力)',
    model: 'Opus (Powerful)',
    zhPermissions: ['读取', '编辑', 'Bash', 'MCP'],
    permissions: ['Read', 'Edit', 'Bash', 'MCP'],
    zhDescription: '全能型子代理。拥有完整工具权限，可读写文件、执行命令。',
    enDescription: 'General-purpose subagent. Full tool access—read, write, execute commands.',
    zhTask: '重构 auth 模块，拆分为三个子模块',
    enTask: 'Refactor auth module into three sub-modules',
    zhResult: '完成重构：3 个新模块，12 个文件更新，所有测试通过 ✓',
    enResult: 'Done: 3 new modules, 12 files updated, all tests pass ✓',
  },
];

export default function SubagentDispatch() {
  const sceneComplete = useSceneComplete();
  const { t } = useLanguage();
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [dispatchedAgents, setDispatchedAgents] = useState<Set<string>>(new Set());
  const [agentPhases, setAgentPhases] = useState<Record<string, Phase>>({});
  const [completedCount, setCompletedCount] = useState(0);

  useEffect(() => {
    if (completedCount >= 3 && sceneComplete) sceneComplete();
  }, [completedCount, sceneComplete]);

  const dispatchAgent = (agentId: string) => {
    if (dispatchedAgents.has(agentId)) return;
    setDispatchedAgents((prev) => new Set(prev).add(agentId));
    setAgentPhases((prev) => ({ ...prev, [agentId]: 'dispatching' }));
    setTimeout(() => setAgentPhases((prev) => ({ ...prev, [agentId]: 'working' })), 800);
    setTimeout(() => {
      setAgentPhases((prev) => ({ ...prev, [agentId]: 'returned' }));
      setCompletedCount((c) => c + 1);
    }, 2500);
  };

  const selected = AGENTS.find((a) => a.id === selectedAgent);

  return (
    <div className="scene-dark-interactive" data-interactive style={S.root}>
      {/* Main Agent */}
      <div style={S.mainAgent}>
        <div style={S.mainIcon}>🧠</div>
        <div style={S.mainLabel}>{t('主代理（你）', 'Main Agent (You)')}</div>
      </div>

      {/* Connection lines */}
      <div style={S.lines}>
        {AGENTS.map((agent) => {
          const phase = agentPhases[agent.id];
          const active = !!phase;
          return (
            <div key={agent.id} style={{
              ...S.line,
              backgroundColor: active ? agent.color : 'rgba(255,255,255,0.12)',
              boxShadow: active ? `0 0 6px ${agent.color}40` : 'none',
            }} />
          );
        })}
      </div>

      {/* Agent Cards */}
      <div style={S.cards}>
        {AGENTS.map((agent) => {
          const phase = agentPhases[agent.id];
          const isSelected = selectedAgent === agent.id;
          const isDispatched = dispatchedAgents.has(agent.id);
          const isDone = phase === 'returned';

          return (
            <div
              key={agent.id}
              style={{
                ...S.card,
                borderColor: isSelected ? agent.color : isDone ? `${agent.color}60` : 'rgba(255,255,255,0.1)',
                backgroundColor: isSelected ? `${agent.color}10` : 'rgba(255,255,255,0.03)',
              }}
              onClick={() => setSelectedAgent(isSelected ? null : agent.id)}
            >
              <div style={S.cardHeader}>
                <span style={{ fontSize: '20px' }}>{agent.icon}</span>
                <span style={{ ...S.cardName, color: isSelected ? agent.color : '#e5e5e5' }}>
                  {agent.name}
                </span>
              </div>

              <div style={S.modelTag}>
                {t(agent.zhModel, agent.model)}
              </div>

              <div style={S.permRow}>
                {(t(agent.zhPermissions, agent.permissions) as string[]).map((p) => (
                  <span key={p} style={{ ...S.permTag, borderColor: `${agent.color}40`, color: agent.color }}>
                    {p}
                  </span>
                ))}
              </div>

              {/* Status */}
              <div style={{
                ...S.status,
                color: isDone ? '#4ade80' : phase === 'working' ? '#fbbf24' : phase === 'dispatching' ? agent.color : '#666',
              }}>
                {phase === 'dispatching' && t('派遣中...', 'Dispatching...')}
                {phase === 'working' && t('⚙️ 执行中...', '⚙️ Working...')}
                {phase === 'returned' && t('✅ 已完成', '✅ Done')}
                {!phase && t('待命', 'Standby')}
              </div>

              {isDone && !isSelected && (
                <div style={S.checkCorner}>✓</div>
              )}
            </div>
          );
        })}
      </div>

      {/* Detail Panel */}
      {selected && (
        <div style={{ ...S.detail, borderColor: `${selected.color}30` }}>
          <div style={{ ...S.detailTitle, color: selected.color }}>
            {selected.icon} {selected.name}
          </div>
          <div style={S.detailDesc}>
            {t(selected.zhDescription, selected.enDescription)}
          </div>

          {!dispatchedAgents.has(selected.id) && (
            <button
              style={{ ...S.dispatchBtn, backgroundColor: selected.color, boxShadow: `0 0 20px ${selected.color}30` }}
              onClick={(e) => { e.stopPropagation(); dispatchAgent(selected.id); }}
            >
              {t('▶ 派遣任务', '▶ Dispatch Task')}
            </button>
          )}

          {dispatchedAgents.has(selected.id) && (
            <div style={S.taskBlock}>
              <div style={S.taskLabel}>{t('📌 任务', '📌 Task')}</div>
              <div style={S.taskText}>{t(selected.zhTask, selected.enTask)}</div>
            </div>
          )}

          {agentPhases[selected.id] === 'returned' && (
            <div style={{ ...S.resultBlock, borderColor: `${selected.color}30` }}>
              <div style={{ ...S.resultLabel, color: selected.color }}>{t('📊 结果', '📊 Result')}</div>
              <div style={S.resultText}>{t(selected.zhResult, selected.enResult)}</div>
            </div>
          )}
        </div>
      )}

      {/* Progress */}
      <div style={{
        ...S.progress,
        color: completedCount >= 3 ? '#4ade80' : '#888',
      }}>
        {completedCount >= 3
          ? t('三个子代理，各有所长——分身术完成。', 'Three subagents, each with strengths — cloning complete.')
          : t(`已完成 ${completedCount} / 3 个任务`, `Completed ${completedCount} / 3 tasks`)
        }
      </div>
    </div>
  );
}

const S: Record<string, React.CSSProperties> = {
  root: {
    fontFamily: 'var(--font-mono, "SF Mono", "Fira Code", monospace)',
    fontSize: '13px',
    backgroundColor: 'var(--color-bg-secondary, #1a1a2e)',
    border: '1px solid var(--color-border, #333)',
    borderRadius: '12px',
    padding: '20px',
    maxWidth: '720px',
    margin: '0 auto',
  },
  mainAgent: {
    textAlign: 'center',
    marginBottom: '8px',
  },
  mainIcon: {
    fontSize: '28px',
    marginBottom: '4px',
  },
  mainLabel: {
    fontSize: '13px',
    fontWeight: 700,
    color: '#a78bfa',
  },
  lines: {
    display: 'flex',
    justifyContent: 'center',
    gap: '80px',
    marginBottom: '8px',
  },
  line: {
    width: '2px',
    height: '24px',
    borderRadius: '1px',
    transition: 'all 0.5s ease',
  },
  cards: {
    display: 'flex',
    gap: '8px',
    marginBottom: '12px',
  },
  card: {
    flex: 1,
    padding: '12px 10px',
    borderRadius: '10px',
    border: '1px solid rgba(255,255,255,0.1)',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    textAlign: 'center',
    position: 'relative',
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    marginBottom: '6px',
  },
  cardName: {
    fontWeight: 700,
    fontSize: '14px',
  },
  modelTag: {
    fontSize: '10px',
    color: '#888',
    marginBottom: '6px',
  },
  permRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '4px',
    justifyContent: 'center',
    marginBottom: '8px',
  },
  permTag: {
    padding: '1px 6px',
    borderRadius: '4px',
    fontSize: '10px',
    fontWeight: 600,
    border: '1px solid',
  },
  status: {
    fontSize: '11px',
    fontWeight: 600,
    transition: 'color 0.3s ease',
  },
  checkCorner: {
    position: 'absolute',
    top: '6px',
    right: '8px',
    color: '#4ade80',
    fontWeight: 700,
    fontSize: '12px',
  },
  detail: {
    padding: '14px',
    borderRadius: '10px',
    border: '1px solid',
    backgroundColor: 'rgba(255,255,255,0.02)',
    marginBottom: '12px',
  },
  detailTitle: {
    fontSize: '15px',
    fontWeight: 700,
    marginBottom: '6px',
  },
  detailDesc: {
    fontSize: '12px',
    color: '#aaa',
    lineHeight: '1.6',
    marginBottom: '12px',
  },
  dispatchBtn: {
    display: 'block',
    margin: '0 auto',
    padding: '10px 28px',
    borderRadius: '8px',
    border: 'none',
    color: '#fff',
    fontSize: '14px',
    fontWeight: 700,
    fontFamily: 'var(--font-mono, monospace)',
    cursor: 'pointer',
    transition: 'transform 0.15s',
  },
  taskBlock: {
    padding: '8px 12px',
    borderRadius: '6px',
    backgroundColor: 'rgba(255,255,255,0.04)',
    marginBottom: '8px',
  },
  taskLabel: {
    fontSize: '11px',
    fontWeight: 700,
    color: '#888',
    marginBottom: '4px',
  },
  taskText: {
    fontSize: '12px',
    color: '#ccc',
    lineHeight: '1.5',
  },
  resultBlock: {
    padding: '8px 12px',
    borderRadius: '6px',
    border: '1px solid',
    backgroundColor: 'rgba(34, 197, 94, 0.05)',
  },
  resultLabel: {
    fontSize: '11px',
    fontWeight: 700,
    marginBottom: '4px',
  },
  resultText: {
    fontSize: '12px',
    color: '#4ade80',
    lineHeight: '1.5',
  },
  progress: {
    textAlign: 'center',
    fontSize: '13px',
    fontWeight: 600,
  },
};
