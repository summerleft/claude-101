import SceneEngine from '../../engine/SceneEngine';
import Scene from '../../components/scene/Scene';
import Narration from '../../components/scene/Narration';
import ChatBubble from '../../components/scene/ChatBubble';
import DeepDive from '../../components/scene/DeepDive';
import SubagentDispatch from '../../components/interactive/ch10/SubagentDispatch';
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
          <p>{t('一个任务太大了——', 'A task too big to handle alone—')}</p>
          <p>
            {t(
              '重构整个模块、同时写测试、还要更新文档。',
              'Refactor the entire module, write tests, and update documentation—all at once.'
            )}
          </p>
          <p>
            {t(
              <>你一个人，<strong>忙不过来</strong>。</>,
              <>On your own, you simply <strong>can't keep up</strong>.</>
            )}
          </p>
        </Narration>
      </Scene>

      <Scene>
        <Narration>
          <p>
            {t(
              <>线性执行太慢。一步一步做，context 窗口也要<strong>爆了</strong>。</>,
              <>Sequential execution is too slow. Step by step, the context window is about to <strong>overflow</strong>.</>
            )}
          </p>
          <p>
            {t(
              <>重构需要理解整个模块的结构；<br />测试需要覆盖所有边界条件；<br />文档需要反映最新的 API 变化。</>,
              <>Refactoring requires understanding the entire module structure;<br />Testing needs to cover all edge cases;<br />Documentation must reflect the latest API changes.</>
            )}
          </p>
          <p>{t('每件事都需要大量 context，但 context 是有限的。', 'Each task demands a lot of context, but context is finite.')}</p>
        </Narration>
      </Scene>

      <Scene>
        <Narration>
          <p>
            {t(
              <><strong>分身术</strong>——Subagent。</>,
              <><strong>The Art of Cloning</strong>—Subagents.</>
            )}
          </p>
          <p>
            {t(
              <>你可以派出多个子代理，每个都有自己独立的<strong> context、工具权限</strong>，甚至不同的<strong>模型</strong>。</>,
              <>You can dispatch multiple subagents, each with its own independent <strong>context, tool permissions</strong>, and even different <strong>models</strong>.</>
            )}
          </p>
          <p>
            {t(
              '它们是你的分身——独立思考，独立行动，最后把结果汇报给你。',
              'They are your clones—thinking independently, acting independently, and reporting results back to you.'
            )}
          </p>
        </Narration>
      </Scene>

      <Scene interactive>
        <Narration>
          <p>{t('让我们看看不同类型的子代理。', "Let's look at the different types of subagents.")}</p>
          <p>{t('点击每个子代理了解它的能力，然后派遣它执行任务：', 'Click each subagent to learn about its capabilities, then dispatch it on a task:')}</p>
        </Narration>
        <SubagentDispatch />
      </Scene>

      <Scene>
        <Narration>
          <p>{t(
            <>除了内置的子代理，你还可以定义<strong>自己的</strong>。</>,
            <>Beyond the built-in subagents, you can define <strong>your own</strong>.</>
          )}</p>
          <p>
            {t(
              <>code-reviewer——专门审查代码质量；<br />debugger——专注定位和修复 bug；<br />data-scientist——擅长数据分析和可视化。</>,
              <>code-reviewer—specializing in code quality review;<br />debugger—focused on locating and fixing bugs;<br />data-scientist—skilled in data analysis and visualization.</>
            )}
          </p>
          <p>
            {t(
              <>每个都有专门的系统提示和工具权限，<br />让它成为某个领域的<strong>专家</strong>。</>,
              <>Each has dedicated system prompts and tool permissions,<br />making it an <strong>expert</strong> in its domain.</>
            )}
          </p>
        </Narration>
      </Scene>

      <Scene>
        <Narration>
          <p>
            {t(
              <>关键在于——多个子代理可以<strong>并行工作</strong>。</>,
              <>The key is—multiple subagents can <strong>work in parallel</strong>.</>
            )}
          </p>
          <p>
            {t(
              <>一个在重构代码，一个在写测试，一个在更新文档——<strong>同时进行</strong>。</>,
              <>One refactoring code, one writing tests, one updating docs—<strong>all at the same time</strong>.</>
            )}
          </p>
          <p>
            {t(
              '原来需要一小时的任务，现在可能只需要几分钟。',
              'What used to take an hour might now take just a few minutes.'
            )}
          </p>
        </Narration>
      </Scene>

      <Scene>
        <Narration>
          <p>
            {t(
              <><strong>Subagents 把 AI 从"一个助手"变成了"一个团队"。</strong></>,
              <><strong>Subagents transform AI from "one assistant" into "a team."</strong></>
            )}
          </p>
          <p>
            {t(
              '合理分工，并行执行，是处理复杂任务的关键。',
              'Smart delegation and parallel execution are key to handling complex tasks.'
            )}
          </p>
          <p>
            {t(
              <>就像一个优秀的技术负责人——<br />不是自己写所有代码，而是知道如何分配任务。</>,
              <>Like a great tech lead—<br />not writing all the code themselves, but knowing how to delegate.</>
            )}
          </p>
        </Narration>
      </Scene>

      <Scene>
        <Narration>
          <p>{t('能力越大，责任越大。', 'With great power comes great responsibility.')}</p>
          <p>
            {t(
              <>你现在能读文件、写代码、执行命令、<br />连接外部服务、甚至派出子代理。</>,
              <>You can now read files, write code, execute commands,<br />connect to external services, and even dispatch subagents.</>
            )}
          </p>
          <p>
            {t(
              <>下一章，我们来谈谈信任的边界——<strong>Permissions & Safety</strong>。</>,
              <>Next chapter, let's talk about trust boundaries—<strong>Permissions & Safety</strong>.</>
            )}
          </p>
        </Narration>
      </Scene>
    </SceneEngine>
  );
}
