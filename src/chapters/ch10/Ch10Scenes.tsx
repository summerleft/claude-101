import SceneEngine from '../../engine/SceneEngine';
import Scene from '../../components/scene/Scene';
import Narration from '../../components/scene/Narration';
import ChatBubble from '../../components/scene/ChatBubble';
import DeepDive from '../../components/scene/DeepDive';
import PluginAnatomy from '../../components/interactive/ch10/PluginAnatomy';
import { LanguageProvider, useLanguage } from '../../i18n/LanguageContext';

export default function Ch10Scenes() {
  return <LanguageProvider><Ch10Content /></LanguageProvider>;
}

function Ch10Content() {
  const { t } = useLanguage();

  return (
    <SceneEngine>
      <Scene>
        <Narration>
          <p>{t('你有了 skills、hooks、agents。', 'You have skills, hooks, and agents.')}</p>
          <p>
            {t(
              <>但它们<strong>散落在各处</strong>。</>,
              <>But they\'re <strong>scattered everywhere</strong>.</>
            )}
          </p>
          <p>
            {t(
              '如果想分享给团队，或者在不同项目间复用呢？',
              'What if you want to share them with your team, or reuse them across projects?'
            )}
          </p>
        </Narration>
      </Scene>

      <Scene>
        <Narration>
          <p>{t(
            '一个 skill 在这里，一个 hook 在那里，一个 agent 定义在别处。',
            'One skill here, one hook there, an agent definition somewhere else.'
          )}</p>
          <p>
            {t(
              <>每次新项目都要<strong>手动复制</strong>。</>,
              <>Every new project requires <strong>manual copying</strong>.</>
            )}
          </p>
          <p>
            {t(
              '文件路径对不上，配置不兼容，版本不一致——',
              'File paths don\'t match, configurations are incompatible, versions are inconsistent—'
            )}
          </p>
          <p>{t(
            '这不是"复用"，这是"复制粘贴地狱"。',
            'This isn\'t "reuse"—it\'s "copy-paste hell".'
          )}</p>
        </Narration>
      </Scene>

      <Scene>
        <Narration>
          <p>
            {t(
              <>于是，<strong>Plugin</strong> 诞生了。</>,
              <>And so, <strong>Plugin</strong> was born.</>
            )}
          </p>
          <p>
            {t(
              <>Plugin 就是一个"超能力包"——把 skills、hooks、agents、MCP 配置打包成一个<strong>可安装、可分享</strong>的整体。</>,
              <>A Plugin is a "superpower package"—bundling skills, hooks, agents, and MCP configurations into one <strong>installable, shareable</strong> package.</>
            )}
          </p>
          <p>
            {t(
              '就像 npm 包之于 JavaScript，Plugin 之于 Claude Code。',
              'Like npm packages are to JavaScript, Plugins are to Claude Code.'
            )}
          </p>
        </Narration>
      </Scene>

      <Scene interactive>
        <Narration>
          <p>{t(
            '一个 Plugin 的内部结构是什么样的？',
            'What does the internal structure of a Plugin look like?'
          )}</p>
          <p>{t(
            '点击文件树中的每一项，看看它的作用：',
            'Click each item in the file tree to see what it does:'
          )}</p>
        </Narration>
        <PluginAnatomy />
      </Scene>

      <Scene>
        <Narration>
          <p>
            {t(
              <>创建 Plugin，从 <code>.claude-plugin/plugin.json</code> 开始。</>,
              <>Creating a Plugin starts with <code>.claude-plugin/plugin.json</code>.</>
            )}
          </p>
          <p>
            {t(
              <>这是插件的<strong>清单文件</strong>——定义名字、版本、描述。</>,
              <>This is the plugin's <strong>manifest file</strong>—defining name, version, and description.</>
            )}
          </p>
          <p>{t(
            '然后，把你的 skills、hooks、agents 一个一个放进对应的目录。',
            'Then, place your skills, hooks, and agents into their corresponding directories one by one.'
          )}</p>
          <p>
            {t(
              <>每个组件自动获得一个<strong>命名空间</strong>：<code>plugin-name:skill-name</code>。</>,
              <>Each component automatically gets a <strong>namespace</strong>: <code>plugin-name:skill-name</code>.</>
            )}
          </p>
          <p>{t('再也不用担心名字冲突了。', 'No more worrying about name conflicts.')}</p>
        </Narration>
      </Scene>

      <Scene>
        <Narration>
          <p>{t('Plugin 做好了，怎么分享？', 'Plugin is ready—how do you share it?')}</p>
          <p>
            {t(
              <>两种方式：通过 <strong>marketplace</strong> 发布，让所有人都能安装；</>,
              <>Two ways: Publish through the <strong>marketplace</strong> so everyone can install it;</>
            )}
          </p>
          <p>
            {t(
              <>或者用 <code>--plugin-dir</code> 指定本地路径，快速加载。</>,
              <>Or use <code>--plugin-dir</code> to specify a local path for quick loading.</>
            )}
          </p>
          <p>
            {t(
              <>团队可以共享 marketplace，统一工具链——<br />每个人用同样的 skills、同样的 hooks、同样的最佳实践。</>,
              <>Teams can share a marketplace and unify their toolchain—<br />everyone using the same skills, same hooks, same best practices.</>
            )}
          </p>
        </Narration>
      </Scene>

      <Scene>
        <Narration>
          <p>
            {t(
              <strong>Plugin 是 Claude Code 生态系统的基石。</strong>,
              <strong>Plugin is the cornerstone of the Claude Code ecosystem.</strong>
            )}
          </p>
          <p>
            {t(
              '它让个人的"超能力"变成了团队的"标准装备"。',
              'It turns individual "superpowers" into team "standard equipment".'
            )}
          </p>
          <p>
            {t(
              <>一个人的最佳实践，通过 Plugin，变成了<strong>所有人的默认配置</strong>。</>,
              <>One person's best practices, through Plugin, become <strong>everyone's default configuration</strong>.</>
            )}
          </p>
        </Narration>
      </Scene>

      <Scene>
        <Narration>
          <p>{t('现在你了解了所有的工具和扩展。', 'Now you understand all the tools and extensions.')}</p>
          <p>
            {t(
              '但如果一个人忙不过来呢？',
              'But what if one person can\'t handle it all?'
            )}
          </p>
          <p>
            {t(
              <>下一章——<strong>分身术</strong>。</>,
              <>Next chapter—<strong>The Art of Cloning</strong>.</>
            )}
          </p>
        </Narration>
      </Scene>
    </SceneEngine>
  );
}
