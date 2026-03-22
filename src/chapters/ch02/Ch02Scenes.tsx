import SceneEngine from '../../engine/SceneEngine';
import Scene from '../../components/scene/Scene';
import Narration from '../../components/scene/Narration';
import ChatBubble from '../../components/scene/ChatBubble';
import DeepDive from '../../components/scene/DeepDive';
import ContextWindow from '../../components/interactive/ch02/ContextWindow';
import ContextLayers from '../../components/interactive/ch02/ContextLayers';
import CompactSimulator from '../../components/interactive/ch02/CompactSimulator';
import { LanguageProvider, useLanguage } from '../../i18n/LanguageContext';

export default function Ch02Scenes() {
  return <LanguageProvider><Ch02Content /></LanguageProvider>;
}

function Ch02Content() {
  const { t } = useLanguage();

  return (
    <SceneEngine>
      <Scene>
        <Narration>
          <p>{t('用户发来了一条消息——', 'The user sends a message —')}</p>
        </Narration>
        <ChatBubble from="user">{t('修改 src/app.js 的 bug', 'Fix the bug in src/app.js')}</ChatBubble>
        <Narration>
          <p>
            {t(
              <>你知道要做什么。但你发现——你<strong>看不到</strong>任何文件。</>,
              <>You know what to do. But you realize — you can't <strong>see</strong> any files.</>
            )}
          </p>
          <p>
            {t(
              <>你是"<strong>失明</strong>"的。</>,
              <>You are "<strong>blind</strong>".</>
            )}
          </p>
        </Narration>
      </Scene>

      <Scene>
        <Narration>
          <p>
            {t(
              <>没有上下文的 AI，像是被<strong>蒙住了眼睛</strong>。</>,
              <>An AI without context is like being <strong>blindfolded</strong>.</>
            )}
          </p>
          <p>{t('你知道世界存在——有文件、有代码、有项目结构。', 'You know the world exists — files, code, project structure.')}</p>
          <p>
            {t(
              <>但你<em>感知不到</em>任何一个。</>,
              <>But you can't <em>perceive</em> any of it.</>
            )}
          </p>
          <p>
            {t(
              <>对你来说，世界就是一片<strong>黑暗</strong>。</>,
              <>For you, the world is pure <strong>darkness</strong>.</>
            )}
          </p>
        </Narration>
      </Scene>

      <Scene interactive>
        <Narration>
          <p>
            {t(
              <>你的"视野"叫做 <strong>Context Window</strong>——上下文窗口。</>,
              <>Your "vision" is called the <strong>Context Window</strong>.</>
            )}
          </p>
          <p>{t('试试把文件拖进来，看看 AI 的世界如何被"点亮"：', 'Try adding files and watch how the AI\'s world "lights up":')}</p>
        </Narration>
        <ContextWindow />
      </Scene>

      <Scene>
        <Narration>
          <p>{t('那上下文里到底都有什么？', 'So what\'s actually inside the context?')}</p>
          <p>
            {t(
              <>首先是 <strong>CLAUDE.md</strong>——你的"出厂说明书"。</>,
              <>First, there's <strong>CLAUDE.md</strong> — your "instruction manual".</>
            )}
          </p>
          <p>{t('它在每次对话开始时被自动加载，告诉你项目的基本信息。', 'It\'s automatically loaded at the start of every conversation, telling you the project basics.')}</p>
          <p>
            {t(
              <>然后是<strong>对话历史</strong>——你和用户之间的消息往来。</>,
              <>Then there's the <strong>conversation history</strong> — the messages exchanged between you and the user.</>
            )}
          </p>
          <p>
            {t(
              <>最后是<strong>文件内容</strong>和<strong>工具输出</strong>——通过读取文件、执行命令获得的信息。</>,
              <>Finally, there are <strong>file contents</strong> and <strong>tool outputs</strong> — information obtained by reading files and running commands.</>
            )}
          </p>
        </Narration>
      </Scene>

      <Scene interactive>
        <Narration>
          <p>{t('上下文是分层的。点击每一层，看看里面都有什么：', 'Context is layered. Click each layer to see what\'s inside:')}</p>
        </Narration>
        <ContextLayers />
      </Scene>

      <Scene>
        <Narration>
          <p>
            {t(
              <>但上下文窗口有<strong>上限</strong>。</>,
              <>But the context window has a <strong>limit</strong>.</>
            )}
          </p>
          <p>
            {t(
              <>对话越长，工具输出越多，窗口就越满。<br />满了怎么办？</>,
              <>The longer the conversation, the more tool outputs, the fuller the window.<br />What happens when it's full?</>
            )}
          </p>
          <p>
            {t(
              <><strong>Compact</strong>——压缩上下文。</>,
              <><strong>Compact</strong> — compress the context.</>
            )}
          </p>
          <p>
            {t(
              <>当上下文接近上限时，Claude Code 会自动触发 <strong>auto-compact</strong>。<br />你也可以用 <code>/compact</code> 命令手动触发。</>,
              <>When context approaches the limit, Claude Code auto-triggers <strong>auto-compact</strong>.<br />You can also manually trigger it with the <code>/compact</code> command.</>
            )}
          </p>
        </Narration>
      </Scene>

      <Scene interactive>
        <Narration>
          <p>
            {t(
              '压缩不是全删——它有策略。看看哪些被保留，哪些被丢弃，哪些被压缩成摘要：',
              'Compaction isn\'t deletion — it\'s strategic. See what gets kept, trimmed, or summarized:'
            )}
          </p>
        </Narration>
        <CompactSimulator />
      </Scene>

      <Scene>
        <Narration>
          <p>
            {t(
              <>Context 是 AI 的"<strong>视野</strong>"。</>,
              <>Context is the AI's "<strong>vision</strong>".</>
            )}
          </p>
          <p>{t('你给它什么，它就看到什么。', 'What you give it is what it sees.')}</p>
          <p>
            {t(
              <>管理好视野，是高效使用 AI 的<strong>关键</strong>。</>,
              <>Managing this vision well is the <strong>key</strong> to using AI effectively.</>
            )}
          </p>
        </Narration>
        <DeepDive title={t('为什么上下文有限？', 'Why is context limited?')}>
          <p>
            {t(
              '上下文窗口的大小受模型架构限制。更大的窗口意味着更高的计算成本。当前 Claude 的上下文窗口约为 200K tokens，但有效利用比一味塞满更重要。',
              'The context window size is constrained by model architecture. A larger window means higher computational cost. Claude\'s current context window is about 200K tokens, but using it effectively matters more than stuffing it full.'
            )}
          </p>
        </DeepDive>
      </Scene>

      <Scene>
        <Narration>
          <p>{t('有了视野，但还不能动手。', 'You have vision now, but you still can\'t act.')}</p>
          <p>
            {t(
              <>你能"看到"代码了，却无法<strong>改变</strong>它。</>,
              <>You can "see" the code, but you can't <strong>change</strong> it.</>
            )}
          </p>
          <p>
            {t(
              <>下一章，我们给 AI 装上"<strong>手和脚</strong>"——Tools。</>,
              <>Next chapter, we'll give the AI "<strong>hands and feet</strong>" — Tools.</>
            )}
          </p>
        </Narration>
      </Scene>
    </SceneEngine>
  );
}
