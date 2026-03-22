import SceneEngine from '../../engine/SceneEngine';
import Scene from '../../components/scene/Scene';
import Narration from '../../components/scene/Narration';
import ChatBubble from '../../components/scene/ChatBubble';
import DeepDive from '../../components/scene/DeepDive';
import ConfigMap from '../../components/interactive/ch12/ConfigMap';
import ConfigBuilder from '../../components/interactive/ch12/ConfigBuilder';
import { LanguageProvider, useLanguage } from '../../i18n/LanguageContext';

export default function Ch12Scenes() {
  return <LanguageProvider><Ch12Content /></LanguageProvider>;
}

function Ch12Content() {
  const { t } = useLanguage();

  return (
    <SceneEngine>
      <Scene>
        <Narration>
          <p>{t('你已经了解了 Claude Code 的所有能力。', "You've learned all of Claude Code's capabilities.")}</p>
          <p>
            {t(
              <>现在，是时候把它变成<strong>「你的」</strong>Claude Code 了。</>,
              <>Now, it's time to make it <strong>"your"</strong> Claude Code.</>
            )}
          </p>
        </Narration>
      </Scene>

      <Scene>
        <Narration>
          <p>
            {t(
              'Settings、CLAUDE.md、Skills、Hooks、Permissions、MCP——',
              'Settings, CLAUDE.md, Skills, Hooks, Permissions, MCP—'
            )}
          </p>
          <p>
            {t(
              <>所有的配置，形成一个<strong>完整的体系</strong>。</>,
              <>All configurations form a <strong>complete system</strong>.</>
            )}
          </p>
          <p>
            {t(
              <>每一个配置文件都有自己的职责，<br />它们共同定义了 Claude Code 如何为你工作。</>,
              <>Each configuration file has its own responsibility,<br />together they define how Claude Code works for you.</>
            )}
          </p>
        </Narration>
      </Scene>

      <Scene interactive>
        <Narration>
          <p>{t('这是 Claude Code 的配置全景图。', "This is Claude Code's configuration panorama.")}</p>
          <p>{t('点击每个配置文件，了解它的作用和层级：', 'Click each config file to learn about its role and hierarchy:')}</p>
        </Narration>
        <ConfigMap />
      </Scene>

      <Scene>
        <Narration>
          <p>
            {t(
              <>配置像<strong>"洋葱"</strong>——一层一层包裹。</>,
              <>Configuration is like an <strong>"onion"</strong>—layer upon layer.</>
            )}
          </p>
          <p>
            {t(
              '组织策略 > 命令行参数 > 本地 > 项目 > 用户。',
              'Organization policy > CLI arguments > Local > Project > User.'
            )}
          </p>
          <p>
            {t(
              <><strong>内层可以覆盖外层</strong>。</>,
              <><strong>Inner layers can override outer layers</strong>.</>
            )}
          </p>
          <p>
            {t(
              <>你的个人偏好可以覆盖项目默认值，<br />但组织策略不可被覆盖——这是安全底线。</>,
              <>Your personal preferences can override project defaults,<br />but organization policies cannot be overridden—that's the security baseline.</>
            )}
          </p>
        </Narration>
      </Scene>

      <Scene>
        <Narration>
          <p>
            {t(
              '好的配置策略：',
              'Good configuration strategy:'
            )}
          </p>
          <p>
            {t(
              <>项目级 <strong>CLAUDE.md</strong> 写团队共识——编码规范、架构决策。<br />个人 <strong>skills</strong> 写个人偏好——你习惯的工作流程。<br /><strong>hooks</strong> 自动化重复工作——lint、test、format。<br /><strong>permissions</strong> 保护安全——明确允许和禁止。</>,
              <>Project-level <strong>CLAUDE.md</strong> for team consensus—coding standards, architecture decisions.<br />Personal <strong>skills</strong> for individual preferences—your preferred workflows.<br /><strong>hooks</strong> to automate repetitive work—lint, test, format.<br /><strong>permissions</strong> to protect safety—explicitly allow and deny.</>
            )}
          </p>
        </Narration>
      </Scene>

      <Scene interactive>
        <Narration>
          <p>{t('让我们来构建你的配置。', "Let's build your configuration.")}</p>
          <p>{t('回答几个问题，看看生成的配置文件：', 'Answer a few questions and see the generated config files:')}</p>
        </Narration>
        <ConfigBuilder />
      </Scene>

      <Scene>
        <Narration>
          <p>
            {t(
              <><strong>恭喜你！</strong></>,
              <><strong>Congratulations!</strong></>
            )}
          </p>
          <p>
            {t(
              '你现在从 AI 的视角，完整理解了 Claude Code 的工作原理。',
              "You now fully understand how Claude Code works, from AI's perspective."
            )}
          </p>
          <p>
            {t(
              <>从一条 prompt 开始，到工具、循环、记忆、扩展、安全——<br />每一层都是为了让 AI <strong>更好地帮助你</strong>。</>,
              <>From a single prompt, to tools, loops, memory, extensions, safety—<br />every layer exists to help AI <strong>serve you better</strong>.</>
            )}
          </p>
        </Narration>
      </Scene>

      <Scene>
        <Narration>
          <p>
            {t(
              <><strong>Claude Code 不只是一个工具——它是你和 AI 协作的界面。</strong></>,
              <><strong>Claude Code isn't just a tool—it's the interface for your collaboration with AI.</strong></>
            )}
          </p>
          <p>
            {t(
              '理解它的工作原理，就是掌握与 AI 协作的艺术。',
              'Understanding how it works is mastering the art of collaborating with AI.'
            )}
          </p>
          <p>
            {t(
              '去创造吧。',
              'Go create.'
            )}
          </p>
        </Narration>
      </Scene>
    </SceneEngine>
  );
}
