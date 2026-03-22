import SceneEngine from '../../engine/SceneEngine';
import Scene from '../../components/scene/Scene';
import Narration from '../../components/scene/Narration';
import ChatBubble from '../../components/scene/ChatBubble';
import DeepDive from '../../components/scene/DeepDive';
import HookLifecycle from '../../components/interactive/ch08/HookLifecycle';
import { LanguageProvider, useLanguage } from '../../i18n/LanguageContext';

export default function Ch08Scenes() {
  return <LanguageProvider><Ch08Content /></LanguageProvider>;
}

function Ch08Content() {
  const { t } = useLanguage();

  return (
    <SceneEngine>
      <Scene>
        <Narration>
          <p>{t('你已经很能干了。', 'You\'ve become quite capable.')}</p>
          <p>
            {t(
              '但有些事情，每次都要人来告诉你做——',
              'But some things still require someone to tell you every time—'
            )}
          </p>
          <p>
            {t('"记得跑 lint"。', '"Remember to run lint".')}
            <br />
            {t('"别忘了格式化"。', '"Don\'t forget to format".')}
            <br />
            {t('"提交前先跑测试"。', '"Run tests before committing".')}
          </p>
          <p>{t(
            <>能不能<strong>自动化</strong>？</>,
            <>Can we <strong>automate</strong> this?</>
          )}</p>
        </Narration>
      </Scene>

      <Scene>
        <Narration>
          <p>{t('想想这些重复的动作——', 'Think about these repetitive actions—')}</p>
          <p>{t('每次编辑文件后跑 linter。', 'Running linter after every file edit.')}</p>
          <p>{t('每次提交前跑测试。', 'Running tests before every commit.')}</p>
          <p>{t('每次会话开始时加载环境变量。', 'Loading environment variables at every session start.')}</p>
          <p>
            {t(
              <strong>一次又一次，完全相同的操作。</strong>,
              <strong>Over and over, the exact same operations.</strong>
            )}
          </p>
          <p>{t('能不能一劳永逸？', 'Can we set it up once and for all?')}</p>
        </Narration>
      </Scene>

      <Scene>
        <Narration>
          <p>
            {t(
              <><strong>Hooks</strong> 就是"触发器"。</>,
              <><strong>Hooks</strong> are "triggers".</>
            )}
          </p>
          <p>
            {t(
              '在特定事件发生时，自动执行你定义的脚本。',
              'When specific events occur, they automatically execute scripts you define.'
            )}
          </p>
          <p>
            {t(
              <>就像 Git Hooks——commit 前自动跑 lint。<br />但 Claude Code 的 Hooks 更强大：它可以在 AI 的<strong>整个生命周期</strong>中挂载。</>,
              <>Like Git Hooks—automatically running lint before a commit.<br />But Claude Code's Hooks are more powerful: they can be attached throughout the AI's <strong>entire lifecycle</strong>.</>
            )}
          </p>
        </Narration>
      </Scene>

      <Scene interactive>
        <Narration>
          <p>{t(
            'AI 的一次工作流程，有哪些关键时刻可以挂载 Hook？',
            'In an AI workflow, what are the key moments where you can attach a Hook?'
          )}</p>
          <p>{t(
            '点击时间线上的事件，探索每个挂载点：',
            'Click events on the timeline to explore each hook point:'
          )}</p>
        </Narration>
        <HookLifecycle />
      </Scene>

      <Scene>
        <Narration>
          <p>{t('Hook 有四种类型——', 'There are four types of Hooks—')}</p>
          <p>
            {t(
              <><strong>Command</strong>：执行 shell 脚本。最常用。</>,
              <><strong>Command</strong>: Execute shell scripts. The most common.</>
            )}
          </p>
          <p>
            {t(
              <><strong>HTTP</strong>：发送 HTTP 请求。适合通知和 webhook。</>,
              <><strong>HTTP</strong>: Send HTTP requests. Great for notifications and webhooks.</>
            )}
          </p>
          <p>
            {t(
              <><strong>Prompt</strong>：问 AI 一个问题，用回答决定下一步。</>,
              <><strong>Prompt</strong>: Ask the AI a question and use the answer to decide next steps.</>
            )}
          </p>
          <p>
            {t(
              <><strong>Agent</strong>：派一个子代理去执行任务。</>,
              <><strong>Agent</strong>: Dispatch a sub-agent to perform a task.</>
            )}
          </p>
        </Narration>
        <DeepDive title={t('Hook 类型详解', 'Hook Types Explained')}>
          <p>
            {t(
              'Command 类型最直接——执行一段 shell 命令，用退出码和 stdout 控制行为。PreToolUse 的 Hook 可以返回 JSON，包含 decision（approve/deny）和 reason，来拦截或批准工具调用。',
              'The Command type is the most straightforward—it executes a shell command and uses exit codes and stdout to control behavior. A PreToolUse Hook can return JSON containing a decision (approve/deny) and reason to intercept or approve tool calls.'
            )}
          </p>
        </DeepDive>
      </Scene>

      <Scene>
        <Narration>
          <p>{t(
            <>Hook 的真正威力在于<strong>拦截</strong>。</>,
            <>The real power of Hooks lies in <strong>interception</strong>.</>
          )}</p>
          <p>
            {t(
              <>PreToolUse 返回 <code>deny</code>？工具调用被阻止。</>,
              <>PreToolUse returns <code>deny</code>? The tool call is blocked.</>
            )}
          </p>
          <p>
            {t(
              <>返回 <code>approve</code>？跳过用户确认，自动执行。</>,
              <>Returns <code>approve</code>? Skip user confirmation, execute automatically.</>
            )}
          </p>
          <p>
            {t(
              'PostToolUse？工具执行完自动做后处理。',
              'PostToolUse? Automatically run post-processing after tool execution.'
            )}
          </p>
          <p>{t(
            '你可以精确控制 AI 的每一个动作。',
            'You can precisely control every action the AI takes.'
          )}</p>
        </Narration>
      </Scene>

      <Scene>
        <Narration>
          <p>
            {t(
              <>Hooks 把<strong>"每次都要手动做"</strong>变成了<strong>"一次配置，永远自动"</strong>。</>,
              <>Hooks turn <strong>"do it manually every time"</strong> into <strong>"configure once, automate forever"</strong>.</>
            )}
          </p>
          <p>{t(
            '它是 Claude Code 自动化的基石。',
            'It\'s the cornerstone of Claude Code automation.'
          )}</p>
          <p>
            {t(
              <>编辑后自动格式化。<br />提交前自动测试。<br />危险操作自动拦截。</>,
              <>Auto-format after editing.<br />Auto-test before committing.<br />Auto-intercept dangerous operations.</>
            )}
          </p>
          <p>{t('一切都在后台默默发生。', 'Everything happens silently in the background.')}</p>
        </Narration>
      </Scene>

      <Scene>
        <Narration>
          <p>{t('自动化很好。', 'Automation is great.')}</p>
          <p>
            {t(
              <>但如果你有一套复杂的工作流程，想<strong>打包复用</strong>呢？</>,
              <>But what if you have a complex workflow you want to <strong>package for reuse</strong>?</>
            )}
          </p>
          <p>
            {t(
              <>下一章——<strong>Skills</strong>。</>,
              <>Next chapter—<strong>Skills</strong>.</>
            )}
          </p>
        </Narration>
      </Scene>
    </SceneEngine>
  );
}
