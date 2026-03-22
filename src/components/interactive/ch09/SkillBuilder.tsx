import { useState } from 'react';
import { useSceneComplete } from '../../../engine/SceneContext';
import { useLanguage } from '../../../i18n/LanguageContext';

type BuildStep = 'name' | 'description' | 'instructions' | 'preview';

interface SkillOption {
  id: string;
  name: string;
  description: string;
  instructions: string;
}

export default function SkillBuilder() {
  const sceneComplete = useSceneComplete();
  const { t } = useLanguage();
  const [step, setStep] = useState<BuildStep>('name');
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  const skillOptions: SkillOption[] = [
    {
      id: 'deploy',
      name: 'deploy',
      description: t('将当前项目部署到生产环境', 'Deploy the current project to production'),
      instructions: t(
        `1. 先运行 npm test 确保测试通过
2. 运行 npm run build 构建项目
3. 使用 Bash 执行 deploy.sh 脚本
4. 检查部署状态，确认服务正常运行
5. 如果失败，自动回滚到上一个版本`,
        `1. Run npm test to ensure tests pass
2. Run npm run build to build the project
3. Execute the deploy.sh script via Bash
4. Check deployment status and confirm service is running
5. If it fails, automatically roll back to the previous version`
      ),
    },
    {
      id: 'review',
      name: 'code-review',
      description: t('对指定文件或 PR 进行代码审查', 'Perform code review on specified files or PRs'),
      instructions: t(
        `1. 读取目标文件或 PR diff
2. 检查以下方面：
   - 代码风格是否符合项目规范
   - 是否有潜在的 bug 或安全问题
   - 性能是否可以优化
   - 测试覆盖是否充分
3. 输出结构化的审查报告`,
        `1. Read the target files or PR diff
2. Check the following aspects:
   - Does the code style conform to project standards
   - Are there potential bugs or security issues
   - Can performance be optimized
   - Is test coverage sufficient
3. Output a structured review report`
      ),
    },
    {
      id: 'pr-desc',
      name: 'pr-description',
      description: t('根据 git diff 生成 PR 描述', 'Generate PR description from git diff'),
      instructions: t(
        `1. 运行 git diff main...HEAD 获取变更
2. 分析所有改动的文件和内容
3. 生成包含以下部分的 PR 描述：
   - Summary（1-3 个要点）
   - Changes（详细变更列表）
   - Test plan（测试计划）
4. 使用 Markdown 格式输出`,
        `1. Run git diff main...HEAD to get changes
2. Analyze all modified files and content
3. Generate a PR description with the following sections:
   - Summary (1-3 key points)
   - Changes (detailed change list)
   - Test plan
4. Output in Markdown format`
      ),
    },
  ];

  const skill = skillOptions.find((s) => s.id === selectedSkill);

  const handleSelectSkill = (id: string) => {
    setSelectedSkill(id);
    setStep('description');
  };

  const handleNext = () => {
    if (step === 'description') {
      setStep('instructions');
    } else if (step === 'instructions') {
      setStep('preview');
      if (sceneComplete) {
        sceneComplete();
      }
    }
  };

  const handleReset = () => {
    setSelectedSkill(null);
    setStep('name');
  };

  const buildSkillMd = () => {
    if (!skill) return '';
    return `---
name: ${skill.name}
description: ${skill.description}
---

# ${skill.name}

${skill.instructions}`;
  };

  const stepLabels: Record<BuildStep, string> = {
    name: t('选择名称', 'Choose Name'),
    description: t('确认描述', 'Confirm Description'),
    instructions: t('编写指令', 'Write Instructions'),
    preview: t('预览文件', 'Preview File'),
  };

  const steps: BuildStep[] = ['name', 'description', 'instructions', 'preview'];

  return (
    <div className="skill-builder" data-interactive>
      <div className="skill-builder__steps">
        {steps.map((s, i) => (
          <div
            key={s}
            className={`skill-builder__step ${
              s === step ? 'skill-builder__step--active' : ''
            } ${steps.indexOf(step) > i ? 'skill-builder__step--done' : ''}`}
          >
            <div className="skill-builder__step-num">{i + 1}</div>
            <div className="skill-builder__step-label">{stepLabels[s]}</div>
          </div>
        ))}
      </div>

      {step === 'name' && (
        <div className="skill-builder__panel">
          <div className="skill-builder__panel-title">{t('选择要创建的 Skill', 'Choose a Skill to Create')}</div>
          <div className="skill-builder__panel-desc">
            {t(
              '一个 Skill 就是一个 SKILL.md 文件。先给它起个名字——',
              'A Skill is just a SKILL.md file. Let\'s give it a name first—'
            )}
          </div>
          <div className="skill-builder__options">
            {skillOptions.map((opt) => (
              <div
                key={opt.id}
                className="skill-builder__option"
                onClick={() => handleSelectSkill(opt.id)}
                style={{ cursor: 'pointer' }}
              >
                <div className="skill-builder__option-name">/{opt.name}</div>
                <div className="skill-builder__option-desc">{opt.description}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {step === 'description' && skill && (
        <div className="skill-builder__panel">
          <div className="skill-builder__panel-title">
            Skill: <span style={{ color: '#7c3aed' }}>/{skill.name}</span>
          </div>
          <div className="skill-builder__panel-desc">
            {t(
              'description 告诉 AI 这个 skill 做什么。AI 会根据它判断何时自动调用。',
              'The description tells the AI what this skill does. The AI uses it to decide when to auto-invoke.'
            )}
          </div>
          <div className="skill-builder__field">
            <div className="skill-builder__field-label">description</div>
            <div className="skill-builder__field-value">{skill.description}</div>
          </div>
          <div className="skill-builder__file-preview">
            <div className="skill-builder__file-header">{t('SKILL.md (构建中...)', 'SKILL.md (building...)')}</div>
            <pre className="skill-builder__file-body">
{`---
name: ${skill.name}
description: ${skill.description}
---

# ${skill.name}

${t('(指令待编写...)', '(Instructions pending...)')}`}
            </pre>
          </div>
          <button className="skill-builder__btn" onClick={handleNext}>
            {t('下一步：编写指令 →', 'Next: Write Instructions →')}
          </button>
        </div>
      )}

      {step === 'instructions' && skill && (
        <div className="skill-builder__panel">
          <div className="skill-builder__panel-title">
            {t('编写指令', 'Write Instructions')}
          </div>
          <div className="skill-builder__panel-desc">
            {t(
              '指令是 skill 的核心——告诉 AI 具体该怎么做。就像写一个详细的 SOP（标准操作流程）。',
              'Instructions are the core of a skill—they tell the AI exactly what to do. Like writing a detailed SOP (Standard Operating Procedure).'
            )}
          </div>
          <div className="skill-builder__instructions">
            {skill.instructions.split('\n').map((line, i) => (
              <div
                key={i}
                className="skill-builder__instruction-line"
                style={{
                  opacity: 1,
                  transition: `opacity 0.3s ease ${i * 0.1}s`,
                }}
              >
                {line}
              </div>
            ))}
          </div>
          <button className="skill-builder__btn" onClick={handleNext}>
            {t('生成 SKILL.md →', 'Generate SKILL.md →')}
          </button>
        </div>
      )}

      {step === 'preview' && skill && (
        <div className="skill-builder__panel">
          <div className="skill-builder__panel-title">
            {t('SKILL.md 已生成', 'SKILL.md Generated')}
          </div>
          <div className="skill-builder__file-preview skill-builder__file-preview--final">
            <div className="skill-builder__file-header">
              <span className="skill-builder__file-icon">📄</span>
              .claude/skills/{skill.name}/SKILL.md
            </div>
            <pre className="skill-builder__file-body">{buildSkillMd()}</pre>
          </div>
          <div className="skill-builder__invoke">
            <div className="skill-builder__invoke-label">{t('触发方式', 'Trigger Methods')}</div>
            <div className="skill-builder__invoke-methods">
              <div className="skill-builder__invoke-method">
                <span className="skill-builder__invoke-tag" style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6' }}>
                  {t('手动', 'Manual')}
                </span>
                <span>{t(
                  <>输入 <code>/{skill.name}</code> 触发</>,
                  <>Type <code>/{skill.name}</code> to trigger</>
                )}</span>
              </div>
              <div className="skill-builder__invoke-method">
                <span className="skill-builder__invoke-tag" style={{ background: 'rgba(124, 58, 237, 0.15)', color: '#7c3aed' }}>
                  {t('自动', 'Auto')}
                </span>
                <span>{t(
                  'AI 根据 description 判断是否需要这个 skill',
                  'AI determines whether this skill is needed based on its description'
                )}</span>
              </div>
            </div>
          </div>
          <button
            className="skill-builder__btn skill-builder__btn--secondary"
            onClick={handleReset}
          >
            {t('↺ 构建另一个 Skill', '↺ Build Another Skill')}
          </button>
        </div>
      )}
    </div>
  );
}
