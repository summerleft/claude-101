import SceneEngine from '../../engine/SceneEngine';
import Scene from '../../components/scene/Scene';
import Narration from '../../components/scene/Narration';
import ChatBubble from '../../components/scene/ChatBubble';
import DeepDive from '../../components/scene/DeepDive';
import AgenticLoopViz from '../../components/interactive/ch04/AgenticLoopViz';
import { LanguageProvider, useLanguage } from '../../i18n/LanguageContext';

export default function Ch04Scenes() {
  return <LanguageProvider><Ch04Content /></LanguageProvider>;
}

function Ch04Content() {
  const { t } = useLanguage();
  return (
    <SceneEngine>
      <Scene>
        <Narration>
          <p>{t('一个工具做一件事。', 'One tool does one thing.')}</p>
          <p>
            {t(
              <>但真正的任务，从来不是<strong>一步</strong>完成的。</>,
              <>But real tasks are never completed in <strong>one step</strong>.</>
            )}
          </p>
        </Narration>
      </Scene>

      <Scene>
        <ChatBubble from="user">{t('帮我重构这个模块，加上测试', 'Help me refactor this module and add tests')}</ChatBubble>
        <Narration>
          <p>{t('这需要：', 'This requires:')}</p>
          <p>
            {t(
              '读代码 → 理解结构 → 修改文件 → 写测试 → 运行测试 → 修复失败…',
              'Read code → Understand structure → Edit files → Write tests → Run tests → Fix failures…'
            )}
          </p>
          <p>
            {t(
              <>一连串的动作，每一步都依赖于上一步的<strong>结果</strong>。</>,
              <>A chain of actions, each step depending on the <strong>result</strong> of the previous one.</>
            )}
          </p>
        </Narration>
      </Scene>

      <Scene>
        <Narration>
          <p>
            {t(
              <>这就是 <strong>Agentic Loop</strong>：</>,
              <>This is the <strong>Agentic Loop</strong>:</>
            )}
          </p>
          <p>
            {t(
              <><strong>思考</strong>(Think) → <strong>行动</strong>(Act) → <strong>观察</strong>(Observe) → <strong>重复</strong>(Repeat)</>,
              <><strong>Think</strong> → <strong>Act</strong> → <strong>Observe</strong> → <strong>Repeat</strong></>
            )}
          </p>
          <p>
            {t(
              <>不是一问一答，而是一个<strong>持续运转</strong>的循环。</>,
              <>Not a single Q&A, but a <strong>continuously running</strong> loop.</>
            )}
          </p>
          <p>{t(
            'AI 在每一轮循环中，根据观察到的结果，决定下一步做什么。',
            'In each iteration, the AI decides what to do next based on the observed results.'
          )}</p>
        </Narration>
      </Scene>

      <Scene interactive>
        <Narration>
          <p>
            {t(
              '点击"下一步"，跟着 AI 走完一次真实的 Agentic Loop：',
              'Click "Next" and follow the AI through a real Agentic Loop:'
            )}
          </p>
        </Narration>
        <AgenticLoopViz />
      </Scene>

      <Scene>
        <Narration>
          <p>
            {t(
              <>循环什么时候<strong>结束</strong>？</>,
              <>When does the loop <strong>end</strong>?</>
            )}
          </p>
          <p>{t('两种情况：', 'Two scenarios:')}</p>
          <p>
            {t(
              <>一、AI 认为任务<strong>完成了</strong>——所有步骤执行成功，结果符合预期。</>,
              <>First, the AI believes the task is <strong>complete</strong> — all steps succeeded and results match expectations.</>
            )}
          </p>
          <p>
            {t(
              <>二、遇到了需要<strong>人类决策</strong>的问题——比如不确定该选择哪个方案。</>,
              <>Second, it encounters a problem requiring <strong>human decision</strong> — such as being unsure which approach to take.</>
            )}
          </p>
        </Narration>
        <DeepDive title={t('循环的上限', 'Loop limits')}>
          <p>
            {t(
              'Agentic Loop 有最大迭代次数限制，防止 AI 陷入无限循环。如果循环次数过多，AI 会暂停并向用户汇报当前进度，请求指示。',
              'The Agentic Loop has a maximum iteration limit to prevent the AI from getting stuck in an infinite loop. If too many iterations occur, the AI pauses and reports progress to the user, requesting further instructions.'
            )}
          </p>
        </DeepDive>
      </Scene>

      <Scene>
        <Narration>
          <p>
            {t(
              <>Agentic Loop 是 Claude Code 的<strong>心脏</strong>。</>,
              <>The Agentic Loop is the <strong>heart</strong> of Claude Code.</>
            )}
          </p>
          <p>{t('它不是简单的一问一答——', 'It\'s not a simple Q&A —')}</p>
          <p>
            {t(
              <>而是一个<strong>持续思考和行动</strong>的循环。</>,
              <>It\'s a loop of <strong>continuous thinking and acting</strong>.</>
            )}
          </p>
          <p>{t(
            '这就是"智能体"（Agent）和"聊天机器人"的本质区别。',
            'This is the fundamental difference between an "agent" and a "chatbot".'
          )}</p>
        </Narration>
      </Scene>

      <Scene>
        <Narration>
          <p>{t(
            '工具很强大，但它们只能操作本地文件。',
            'Tools are powerful, but they can only work with local files.'
          )}</p>
          <p>
            {t(
              <>如果 AI 需要连接<strong>外部世界</strong>呢？</>,
              <>What if the AI needs to connect to the <strong>outside world</strong>?</>
            )}
          </p>
          <p>
            {t(
              <>下一章——<strong>MCP</strong>。</>,
              <>Next chapter — <strong>MCP</strong>.</>
            )}
          </p>
        </Narration>
      </Scene>
    </SceneEngine>
  );
}
