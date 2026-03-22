import SceneEngine from '../../engine/SceneEngine';
import Scene from '../../components/scene/Scene';
import Narration from '../../components/scene/Narration';
import ChatBubble from '../../components/scene/ChatBubble';
import DeepDive from '../../components/scene/DeepDive';
import MemorySystem from '../../components/interactive/ch06/MemorySystem';
import { LanguageProvider, useLanguage } from '../../i18n/LanguageContext';

export default function Ch06Scenes() {
  return <LanguageProvider><Ch06Content /></LanguageProvider>;
}

function Ch06Content() {
  const { t } = useLanguage();
  return (
    <SceneEngine>
      <Scene>
        <Narration>
          <p>{t(
            <>每次对话开始，你的记忆都是<strong>空白</strong>的。</>,
            <>Every conversation starts with a <strong>blank</strong> memory.</>
          )}</p>
          <p>
            {t(
              <>昨天的讨论、上周的决定、上个月的架构——<br /><strong>全部归零</strong>。</>,
              <>Yesterday's discussions, last week's decisions, last month's architecture —<br /><strong>All reset to zero</strong>.</>
            )}
          </p>
        </Narration>
      </Scene>

      <Scene>
        <ChatBubble from="user">{t('继续昨天的工作', 'Continue yesterday\'s work')}</ChatBubble>
        <Narration>
          <p>
            {t('"昨天"？', '"Yesterday"?')}
          </p>
          <p>
            {t(
              <>对你来说，没有"昨天"。<br />每次醒来都是第一天。</>,
              <>For you, there is no "yesterday".<br />Every wake-up is day one.</>
            )}
          </p>
          <p>
            {t(
              <>这就像每天早上都<strong>失忆</strong>一样。<br />用户觉得你是同一个助手，但你每次都是全新的。</>,
              <>It's like waking up with <strong>amnesia</strong> every morning.<br />Users think you're the same assistant, but you're brand new each time.</>
            )}
          </p>
        </Narration>
      </Scene>

      <Scene>
        <Narration>
          <p>{t('怎么跨越遗忘？', 'How to overcome forgetting?')}</p>
          <p>{t('两种方式——', 'Two approaches —')}</p>
          <p>
            {t(
              <><strong>CLAUDE.md</strong>——手动记忆。</>,
              <><strong>CLAUDE.md</strong> — manual memory.</>
            )}
          </p>
          <p>
            {t(
              <><strong>Auto Memory</strong>——自动记忆。</>,
              <><strong>Auto Memory</strong> — automatic memory.</>
            )}
          </p>
        </Narration>
      </Scene>

      <Scene interactive>
        <Narration>
          <p>{t('两层记忆系统，各有分工。', 'Two layers of memory, each with its own role.')}</p>
          <p>{t('点击每一层，看看它是怎么工作的：', 'Click each layer to see how it works:')}</p>
        </Narration>
        <MemorySystem />
      </Scene>

      <Scene>
        <Narration>
          <p>
            {t(
              <><strong>CLAUDE.md</strong> 就是你的"说明书"。</>,
              <><strong>CLAUDE.md</strong> is your "instruction manual".</>
            )}
          </p>
          <p>{t('每次启动时自动加载。', 'Auto-loaded every time you start.')}</p>
          <p>
            {t(
              <>项目级的 CLAUDE.md 在项目根目录。<br />用户级的在 <code>~/.claude/CLAUDE.md</code>。<br />组织级的由团队统一管理。</>,
              <>Project-level CLAUDE.md lives in the project root.<br />User-level is at <code>~/.claude/CLAUDE.md</code>.<br />Organization-level is managed by the team.</>
            )}
          </p>
          <p>{t('三层覆盖，从通用到具体。', 'Three layers of overrides, from general to specific.')}</p>
        </Narration>
        <DeepDive title={t('CLAUDE.md 最佳实践', 'CLAUDE.md best practices')}>
          <p>
            {t(
              '好的 CLAUDE.md 应该包含：项目结构、技术栈、开发命令、编码规范、常见陷阱。不要写太多——保持简洁，让 AI 快速理解项目全貌。',
              'A good CLAUDE.md should include: project structure, tech stack, dev commands, coding conventions, and common pitfalls. Don\'t write too much — keep it concise so the AI can quickly understand the project overview.'
            )}
          </p>
        </DeepDive>
      </Scene>

      <Scene>
        <Narration>
          <p>
            {t(
              <><strong>Auto Memory</strong> 是 AI 的"笔记本"。</>,
              <><strong>Auto Memory</strong> is the AI's "notebook".</>
            )}
          </p>
          <p>
            {t(
              'AI 在工作中发现有用的信息——项目的特殊配置、用户的偏好、踩过的坑——自动记下来。',
              'The AI discovers useful information while working — special project configs, user preferences, lessons learned — and automatically notes them down.'
            )}
          </p>
          <p>
            {t(
              <>存储在 <code>~/.claude/projects/</code> 下，按项目路径隔离。</>,
              <>Stored under <code>~/.claude/projects/</code>, isolated by project path.</>
            )}
          </p>
          <p>{t('下次对话，自动加载前 200 行。', 'Next conversation, the first 200 lines auto-load.')}</p>
        </Narration>
      </Scene>

      <Scene>
        <Narration>
          <p>{t('完美的记忆系统不存在。', 'A perfect memory system doesn\'t exist.')}</p>
          <p>
            {t(
              <>但 <strong>CLAUDE.md + Auto Memory</strong> 的组合，<br />让 AI 从<strong>"金鱼"</strong>变成了<strong>"有经验的同事"</strong>。</>,
              <>But the combination of <strong>CLAUDE.md + Auto Memory</strong><br />transforms AI from a <strong>"goldfish"</strong> into an <strong>"experienced colleague"</strong>.</>
            )}
          </p>
          <p>
            {t(
              <>手动的说明书给方向，<br />自动的笔记补细节。</>,
              <>Manual guides provide direction,<br />automatic notes fill in the details.</>
            )}
          </p>
        </Narration>
      </Scene>

      <Scene>
        <Narration>
          <p>{t('记忆有了。但代码库有 10 万行，怎么办？', 'Memory: check. But the codebase has 100K lines — what now?')}</p>
          <p>
            {t(
              <>下一章，我们来看 AI 如何<strong>理解和检索代码库</strong>——</>,
              <>Next chapter, let's see how AI <strong>understands and searches the codebase</strong> —</>
            )}
          </p>
          <p>
            <strong>{t('Codebase Intelligence', 'Codebase Intelligence')}</strong>{t('。', '.')}
          </p>
        </Narration>
      </Scene>
    </SceneEngine>
  );
}
