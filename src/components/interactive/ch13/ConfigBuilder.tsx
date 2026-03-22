import { useState, useEffect } from 'react';
import { useSceneComplete } from '../../../engine/SceneContext';
import { useLanguage } from '../../../i18n/LanguageContext';

interface Question {
  id: string;
  question: string;
  options: { label: string; value: string }[];
}

interface GeneratedConfig {
  filename: string;
  content: string;
}

function generateConfigs(answers: Record<string, string>, lang: string): GeneratedConfig[] {
  const configs: GeneratedConfig[] = [];
  const isEn = lang === 'en';

  const langMap: Record<string, string> = {
    typescript: 'TypeScript', python: 'Python', rust: 'Rust', go: 'Go',
  };
  const lintToolMap: Record<string, string> = {
    typescript: 'ESLint + Prettier', python: 'ruff', rust: 'clippy', go: 'golangci-lint',
  };
  const testCmdMap: Record<string, string> = {
    typescript: 'npm test', python: 'pytest', rust: 'cargo test', go: 'go test ./...',
  };
  const buildCmdMap: Record<string, string> = {
    typescript: 'npm run build', python: 'python -m build', rust: 'cargo build', go: 'go build ./...',
  };

  const langKey = answers.language || 'typescript';

  let claudeMd = isEn ? `# Project Standards\n\n` : `# 项目规范\n\n`;
  claudeMd += isEn ? `- Language: ${langMap[langKey]}\n` : `- 语言: ${langMap[langKey]}\n`;
  claudeMd += isEn ? `- Use strict mode\n` : `- 使用 strict 模式\n`;
  if (answers.lint === 'yes') {
    claudeMd += isEn
      ? `- Code must pass ${lintToolMap[langKey]} checks\n`
      : `- 代码必须通过 ${lintToolMap[langKey]} 检查\n`;
  }
  if (answers.testing === 'yes') {
    claudeMd += isEn
      ? `- All tests must pass before committing (${testCmdMap[langKey]})\n`
      : `- 提交前必须通过所有测试 (${testCmdMap[langKey]})\n`;
  }
  claudeMd += isEn ? `\n## Build Command\n\n` : `\n## 构建命令\n\n`;
  claudeMd += `\`\`\`bash\n${buildCmdMap[langKey]}\n\`\`\``;
  configs.push({ filename: 'CLAUDE.md', content: claudeMd });

  const allowRules: string[] = [];
  const denyRules: string[] = ['Bash(rm -rf *)'];
  if (answers.bash === 'npm') {
    allowRules.push('Bash(npm *)', 'Bash(npx *)');
  } else if (answers.bash === 'docker') {
    allowRules.push('Bash(npm *)', 'Bash(npx *)', 'Bash(docker *)');
  }
  if (answers.testing === 'yes') {
    allowRules.push(`Bash(${testCmdMap[langKey]})`);
  }
  configs.push({
    filename: '.claude/settings.json',
    content: JSON.stringify({ permissions: { allow: allowRules, deny: denyRules } }, null, 2),
  });

  if (answers.lint === 'yes' || answers.testing === 'yes') {
    const lintCmdMap: Record<string, string> = {
      typescript: 'npx eslint --fix $FILE', python: 'ruff check --fix $FILE',
      rust: 'cargo clippy --fix', go: 'golangci-lint run',
    };
    const hooks: Record<string, unknown[]> = {};
    if (answers.lint === 'yes') {
      hooks.afterEdit = [{ command: lintCmdMap[langKey], description: isEn ? 'Auto-lint after edit' : '编辑后自动 lint' }];
    }
    if (answers.testing === 'yes') {
      hooks.beforeCommit = [{ command: testCmdMap[langKey], description: isEn ? 'Run tests before commit' : '提交前运行测试' }];
    }
    configs.push({ filename: '.claude/hooks.json', content: JSON.stringify(hooks, null, 2) });
  }

  return configs;
}

export default function ConfigBuilder() {
  const sceneComplete = useSceneComplete();
  const { lang, t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [activeFile, setActiveFile] = useState(0);

  const questions: Question[] = [
    {
      id: 'language',
      question: t('你的项目用什么语言？', 'What language does your project use?'),
      options: [
        { label: 'TypeScript', value: 'typescript' },
        { label: 'Python', value: 'python' },
        { label: 'Rust', value: 'rust' },
        { label: 'Go', value: 'go' },
      ],
    },
    {
      id: 'lint',
      question: t('需要自动 lint 吗？', 'Do you need auto-linting?'),
      options: [
        { label: t('是的', 'Yes'), value: 'yes' },
        { label: t('不需要', 'No'), value: 'no' },
      ],
    },
    {
      id: 'bash',
      question: t('允许哪些 Bash 命令？', 'Which Bash commands to allow?'),
      options: [
        { label: t('npm/yarn', 'npm/yarn'), value: 'npm' },
        { label: t('npm + docker', 'npm + docker'), value: 'docker' },
        { label: t('全部允许', 'Allow all'), value: 'all' },
      ],
    },
    {
      id: 'testing',
      question: t('提交前自动测试？', 'Auto-test before commit?'),
      options: [
        { label: t('是的', 'Yes'), value: 'yes' },
        { label: t('不需要', 'No'), value: 'no' },
      ],
    },
  ];

  useEffect(() => {
    if (showResults && sceneComplete) {
      sceneComplete();
    }
  }, [showResults, sceneComplete]);

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
    if (currentStep < questions.length - 1) {
      setTimeout(() => setCurrentStep((s) => s + 1), 300);
    } else {
      setTimeout(() => setShowResults(true), 300);
    }
  };

  const generatedConfigs = generateConfigs(answers, lang);

  if (showResults) {
    return (
      <div className="cb" data-interactive>
        <div className="cb__done-title">{t('配置已生成 ✓', 'Config Generated ✓')}</div>
        <div className="cb__tabs">
          {generatedConfigs.map((config, i) => (
            <button
              key={config.filename}
              className={`cb__tab ${i === activeFile ? 'cb__tab--active' : ''}`}
              onClick={() => setActiveFile(i)}
            >
              {config.filename}
            </button>
          ))}
        </div>
        <div className="cb__file">
          <pre className="cb__file-code">{generatedConfigs[activeFile].content}</pre>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentStep];

  return (
    <div className="cb" data-interactive>
      <div className="cb__progress">
        {questions.map((_, i) => (
          <div
            key={i}
            className={`cb__dot ${i < currentStep ? 'cb__dot--done' : ''} ${i === currentStep ? 'cb__dot--active' : ''}`}
          />
        ))}
      </div>

      <div className="cb__question">{currentQuestion.question}</div>

      <div className="cb__options">
        {currentQuestion.options.map((option) => (
          <button
            key={option.value}
            className={`cb__opt ${answers[currentQuestion.id] === option.value ? 'cb__opt--selected' : ''}`}
            onClick={() => handleAnswer(currentQuestion.id, option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
