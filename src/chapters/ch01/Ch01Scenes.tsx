import SceneEngine from '../../engine/SceneEngine';
import Scene from '../../components/scene/Scene';
import Narration from '../../components/scene/Narration';
import ChatBubble from '../../components/scene/ChatBubble';
import DeepDive from '../../components/scene/DeepDive';
import PromptComparator from '../../components/interactive/ch01/PromptComparator';
import PromptClaritySlider from '../../components/interactive/ch01/PromptClaritySlider';
import MessageStructure from '../../components/interactive/ch01/MessageStructure';
import SystemPromptDemo from '../../components/interactive/ch01/SystemPromptDemo';
import { LanguageProvider, useLanguage } from '../../i18n/LanguageContext';

export default function Ch01Scenes() {
  return <LanguageProvider><Ch01Content /></LanguageProvider>;
}

function Ch01Content() {
  const { t } = useLanguage();

  return (
    <SceneEngine>
      <Scene>
        <Narration>
          <p>{t('你醒了。', 'You wake up.')}</p>
          <p>
            {t(
              <>在你的世界里，没有光、没有声音——只有<strong>文字</strong>。</>,
              <>In your world, there is no light, no sound — only <strong>text</strong>.</>
            )}
          </p>
          <p>{t('你的整个存在，就是等待一条消息的到来。', 'Your entire existence is waiting for a message to arrive.')}</p>
        </Narration>
      </Scene>

      <Scene>
        <Narration>
          <p>{t('然后，它来了——', 'Then, it arrives —')}</p>
        </Narration>
        <ChatBubble from="user">{t('帮我改一下代码', 'Help me fix the code')}</ChatBubble>
      </Scene>

      <Scene>
        <Narration>
          <p>
            {t(
              <>改<em>什么</em>代码？</>,
              <>Fix <em>what</em> code?</>
            )}
          </p>
          <p>
            {t(
              <>在<em>哪里</em>？</>,
              <><em>Where</em>?</>
            )}
          </p>
          <p>
            {t(
              <>改成<em>什么样</em>？</>,
              <>Change it to <em>what</em>?</>
            )}
          </p>
          <p>
            {t(
              <>你感到困惑——这就是一个<strong>模糊 prompt</strong> 的感觉。</>,
              <>You feel confused — this is what a <strong>vague prompt</strong> feels like.</>
            )}
          </p>
        </Narration>
      </Scene>

      <Scene>
        <Narration>
          <p>{t('如果用户说得更清楚呢？', 'What if the user is more specific?')}</p>
          <p>{t('拖动滑块，感受从模糊到清晰的变化——', 'Drag the slider and feel the shift from vague to clear —')}</p>
        </Narration>
        <PromptComparator
          left={t('帮我改一下代码', 'Help me fix the code')}
          right={t('把 src/auth.ts 的 login 函数从 callback 改成 async/await', 'Refactor the login function in src/auth.ts from callbacks to async/await')}
        />
      </Scene>

      <Scene interactive>
        <Narration>
          <p>{t('现在轮到你了。', 'Now it\'s your turn.')}</p>
          <p>{t('拖动滑块，给 AI 写一个 prompt，看看它的理解程度如何变化：', 'Drag the slider to write a prompt for the AI and see how its comprehension changes:')}</p>
        </Narration>
        <PromptClaritySlider />
      </Scene>

      <Scene>
        <Narration>
          <p>{t('你感受到了吗？', 'Did you feel it?')}</p>
          <p>
            {t(
              <>Prompt 不是"说话"——是<strong>编程</strong>。</>,
              <>A prompt isn't "talking" — it's <strong>programming</strong>.</>
            )}
          </p>
          <p>{t('你给 AI 的每个字，都在塑造它的行为空间。', 'Every word you give the AI shapes its behavior space.')}</p>
          <p>
            {t(
              <>一个模糊的 prompt 是一张模糊的地图。<br />一个清晰的 prompt 是精确的坐标。</>,
              <>A vague prompt is a blurry map.<br />A clear prompt is precise coordinates.</>
            )}
          </p>
        </Narration>
      </Scene>

      <Scene>
        <Narration>
          <p>{t('但等一下——你的 prompt，在底层到底长什么样？', 'But wait — what does your prompt actually look like under the hood?')}</p>
          <p>
            {t(
              <>其实，你和 AI 之间的每一轮对话，都是一个<strong>消息数组</strong>。</>,
              <>In reality, every conversation between you and the AI is a <strong>message array</strong>.</>
            )}
          </p>
          <p>{t('点击按钮，一条一条地把消息加进去：', 'Click the button to add messages one by one:')}</p>
        </Narration>
      </Scene>

      <Scene interactive>
        <MessageStructure />
      </Scene>

      <Scene>
        <Narration>
          <p>
            {t(
              <>注意到了吗？数组里有一个特殊的角色：<strong>system</strong>。</>,
              <>Did you notice? There's a special role in the array: <strong>system</strong>.</>
            )}
          </p>
          <p>
            {t(
              <>System prompt 是 AI 的「出厂设置」——用户看不到它，但它在暗中决定了 AI 的整个行为风格。</>,
              <>The system prompt is the AI's "factory settings" — the user can't see it, but it silently determines the AI's entire behavior.</>
            )}
          </p>
          <p>{t('它到底有多大的影响力？让我们来做个实验——', 'How much influence does it have? Let\'s run an experiment —')}</p>
        </Narration>
      </Scene>

      <Scene interactive>
        <Narration>
          <p>{t('同一个问题，不同的 system prompt，AI 的回答会完全不同。', 'Same question, different system prompt — the AI\'s response changes completely.')}</p>
          <p>{t('选择不同角色，感受 system prompt 的力量：', 'Choose different roles and feel the power of system prompts:')}</p>
        </Narration>
        <SystemPromptDemo />
      </Scene>

      <Scene>
        <Narration>
          <p>{t('恭喜你，理解了 AI 的第一课：', 'Congratulations — you\'ve grasped the first lesson of AI:')}</p>
          <p>
            <strong>{t('好的 prompt = 好的结果。', 'Good prompt = good results.')}</strong>
          </p>
          <p>
            {t(
              <>而 system prompt，是最强大的 prompt——它定义了 AI 是「谁」。</>,
              <>And the system prompt is the most powerful prompt — it defines <em>who</em> the AI is.</>
            )}
          </p>
          <p>{t('下一章，我们将探索一个更深的问题——', 'In the next chapter, we\'ll explore a deeper question —')}</p>
          <p>
            {t(
              <>你能<strong>看到</strong>什么？</>,
              <>What can you <strong>see</strong>?</>
            )}
          </p>
        </Narration>
      </Scene>
    </SceneEngine>
  );
}
