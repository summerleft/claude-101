import SceneEngine from '../../engine/SceneEngine';
import Scene from '../../components/scene/Scene';
import Narration from '../../components/scene/Narration';
import ChatBubble from '../../components/scene/ChatBubble';
import DeepDive from '../../components/scene/DeepDive';
import SkillBuilder from '../../components/interactive/ch09/SkillBuilder';
import { LanguageProvider, useLanguage } from '../../i18n/LanguageContext';

export default function Ch09Scenes() {
  return <LanguageProvider><Ch09Content /></LanguageProvider>;
}

function Ch09Content() {
  const { t } = useLanguage();

  return (
    <SceneEngine>
      <Scene>
        <Narration>
          <p>{t('你发现自己反复做同样的事——', 'You find yourself doing the same things over and over—')}</p>
          <p>
            {t(
              '部署。代码审查。生成 PR 描述。',
              'Deploying. Code review. Generating PR descriptions.'
            )}
          </p>
          <p>{t('每次都从零开始描述需求。', 'Describing the requirements from scratch every time.')}</p>
          <p>
            {t(
              '"帮我部署一下，先跑测试，然后 build，然后执行 deploy 脚本……"',
              '"Help me deploy—run tests first, then build, then execute the deploy script..."'
            )}
          </p>
          <p>{t('一遍又一遍。', 'Over and over again.')}</p>
        </Narration>
      </Scene>

      <Scene>
        <Narration>
          <p>
            {t(
              <>程序员说 <strong>"Don't Repeat Yourself"</strong>。</>,
              <>Programmers say <strong>"Don't Repeat Yourself"</strong>.</>
            )}
          </p>
          <p>{t('重复的代码要封装成函数。', 'Repetitive code should be encapsulated into functions.')}</p>
          <p>
            {t(
              <>那 AI 的工作流程呢？<br />重复的指令，能不能也"封装"起来？</>,
              <>What about AI workflows?<br />Can repetitive instructions also be "encapsulated"?</>
            )}
          </p>
        </Narration>
      </Scene>

      <Scene>
        <Narration>
          <p>
            {t(
              <><strong>Skills</strong> 就是可复用的"超能力"。</>,
              <><strong>Skills</strong> are reusable "superpowers".</>
            )}
          </p>
          <p>
            {t(
              <>一个 <code>SKILL.md</code> 文件，包含 AI 的指令。</>,
              <>A <code>SKILL.md</code> file containing instructions for the AI.</>
            )}
          </p>
          <p>
            {t(
              <>可以手动触发——输入 <code>/skill-name</code>。<br />也可以让 AI 自动识别和使用。</>,
              <>Can be triggered manually—type <code>/skill-name</code>.<br />Or let the AI automatically recognize and use them.</>
            )}
          </p>
          <p>
            {t(
              <>就像把常用命令写成脚本。<br />只是这次，脚本的执行者是 AI。</>,
              <>Like writing frequently used commands into scripts.<br />Except this time, the executor is the AI.</>
            )}
          </p>
        </Narration>
      </Scene>

      <Scene interactive>
        <Narration>
          <p>{t('让我们一起构建一个 Skill。', 'Let\'s build a Skill together.')}</p>
          <p>{t(
            '选择一个场景，看看 SKILL.md 是如何一步步组装起来的：',
            'Choose a scenario and see how a SKILL.md is assembled step by step:'
          )}</p>
        </Narration>
        <SkillBuilder />
      </Scene>

      <Scene>
        <Narration>
          <p>
            {t(
              '两种触发方式——',
              'Two ways to trigger—'
            )}
          </p>
          <p>
            {t(
              <><strong>手动触发</strong>：输入 <code>/deploy</code>，Claude Code 找到对应的 SKILL.md 并执行。</>,
              <><strong>Manual trigger</strong>: Type <code>/deploy</code>, and Claude Code finds the corresponding SKILL.md and executes it.</>
            )}
          </p>
          <p>
            {t(
              <><strong>自动触发</strong>：AI 读取 skill 的 description，判断当前任务是否匹配。匹配就自动加载。</>,
              <><strong>Auto trigger</strong>: The AI reads the skill's description and determines if it matches the current task. If so, it loads automatically.</>
            )}
          </p>
          <p>
            {t(
              '就像函数可以被显式调用，也可以被框架自动调用。',
              'Just like functions can be called explicitly, or called automatically by a framework.'
            )}
          </p>
        </Narration>
      </Scene>

      <Scene>
        <Narration>
          <p>{t('Skills 住在哪里？', 'Where do Skills live?')}</p>
          <p>
            {t(
              <><strong>个人级</strong>：<code>~/.claude/skills/</code> —— 你自己的私人技能库。</>,
              <><strong>Personal</strong>: <code>~/.claude/skills/</code> — Your own private skill library.</>
            )}
          </p>
          <p>
            {t(
              <><strong>项目级</strong>：<code>.claude/skills/</code> —— 团队共享的项目技能。</>,
              <><strong>Project</strong>: <code>.claude/skills/</code> — Shared project skills for the team.</>
            )}
          </p>
          <p>
            {t(
              <><strong>插件级</strong>：通过插件分发 —— 社区贡献的技能。</>,
              <><strong>Plugin</strong>: Distributed via plugins — Community-contributed skills.</>
            )}
          </p>
          <p>{t(
            '就像工具箱的不同抽屉——私人的、团队的、社区的。',
            'Like different drawers in a toolbox—personal, team, and community.'
          )}</p>
        </Narration>
        <DeepDive title={t('Skill 的发现机制', 'Skill Discovery Mechanism')}>
          <p>
            {t(
              'Claude Code 启动时会扫描所有 skill 目录，收集可用的 skills。每个 skill 的 frontmatter 中有 name 和 description。当用户输入 /name 时精确匹配；当 AI 自主决策时，根据 description 语义匹配当前任务。',
              'When Claude Code starts, it scans all skill directories and collects available skills. Each skill\'s frontmatter contains a name and description. When a user types /name, it matches exactly; when the AI decides autonomously, it semantically matches the description to the current task.'
            )}
          </p>
        </DeepDive>
      </Scene>

      <Scene>
        <Narration>
          <p>
            {t(
              <>Skills 把<strong>"一次性的指令"</strong>变成了<strong>"可复用的能力"</strong>。</>,
              <>Skills turn <strong>"one-off instructions"</strong> into <strong>"reusable capabilities"</strong>.</>
            )}
          </p>
          <p>
            {t(
              <>好的 skill 就像好的函数——<br />做一件事，做得很好。</>,
              <>A good skill is like a good function—<br />it does one thing, and does it well.</>
            )}
          </p>
          <p>
            {t(
              <>名字清晰，描述准确，指令具体。<br />任何人拿到都能用。</>,
              <>Clear name, accurate description, specific instructions.<br />Anyone can pick it up and use it.</>
            )}
          </p>
        </Narration>
      </Scene>

      <Scene>
        <Narration>
          <p>{t('单个 skill 很好用。', 'A single skill works great.')}</p>
          <p>
            {t(
              '但如果想把 skills、hooks、agents 打包成一个可分享的整体呢？',
              'But what if you want to package skills, hooks, and agents into a shareable bundle?'
            )}
          </p>
          <p>
            {t(
              <>下一章——<strong>Plugins</strong>。</>,
              <>Next chapter—<strong>Plugins</strong>.</>
            )}
          </p>
        </Narration>
      </Scene>
    </SceneEngine>
  );
}
