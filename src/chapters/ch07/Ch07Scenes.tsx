import SceneEngine from '../../engine/SceneEngine';
import Scene from '../../components/scene/Scene';
import Narration from '../../components/scene/Narration';
import ChatBubble from '../../components/scene/ChatBubble';
import DeepDive from '../../components/scene/DeepDive';
import CodeSearch from '../../components/interactive/ch07/CodeSearch';
import { LanguageProvider, useLanguage } from '../../i18n/LanguageContext';

export default function Ch07Scenes() {
  return <LanguageProvider><Ch07Content /></LanguageProvider>;
}

function Ch07Content() {
  const { t } = useLanguage();
  return (
    <SceneEngine>
      <Scene>
        <Narration>
          <p>{t(
            <>你的代码库有 <strong>10 万行</strong>代码。</>,
            <>Your codebase has <strong>100K lines</strong> of code.</>
          )}</p>
          <p>{t(
            <>全部读一遍？Context 窗口直接<strong>爆炸</strong>。</>,
            <>Read them all? Context window: <strong>exploded</strong>.</>
          )}</p>
          <p>{t(
            '你需要一种更聪明的方式来理解代码。',
            'You need a smarter way to understand the code.'
          )}</p>
        </Narration>
      </Scene>

      <Scene>
        <ChatBubble from="user">{t('给 UserService 添加删除方法', 'Add a delete method to UserService')}</ChatBubble>
        <Narration>
          <p>{t(
            '"UserService"？',
            '"UserService"?'
          )}</p>
          <p>{t(
            <>你不知道它在哪个文件，不知道它有哪些方法，<br />不知道它依赖什么。</>,
            <>You don't know which file it's in, what methods it has,<br />or what it depends on.</>
          )}</p>
          <p>{t(
            <>但你不需要知道<strong>所有</strong>代码。<br />你只需要找到<strong>相关</strong>的代码。</>,
            <>But you don't need to know <strong>all</strong> the code.<br />You just need to find the <strong>relevant</strong> code.</>
          )}</p>
        </Narration>
      </Scene>

      <Scene>
        <Narration>
          <p>{t('搜索策略：三种工具，各有所长。', 'Search strategy: three tools, each with its strengths.')}</p>
          <p>{t(
            <><strong>Glob</strong>——按文件名模式查找。快速定位文件。</>,
            <><strong>Glob</strong> — find by file name pattern. Quickly locate files.</>
          )}</p>
          <p>{t(
            <><strong>Grep</strong>——在代码中搜索关键词。精确定位代码片段。</>,
            <><strong>Grep</strong> — search keywords in code. Pinpoint exact code snippets.</>
          )}</p>
          <p>{t(
            <><strong>Read</strong>——读取特定文件。深入理解实现细节。</>,
            <><strong>Read</strong> — read a specific file. Deeply understand implementation details.</>
          )}</p>
        </Narration>
      </Scene>

      <Scene interactive>
        <Narration>
          <p>{t('三种搜索工具，各有分工。', 'Three search tools, each with its own role.')}</p>
          <p>{t('点击每个工具，看看它是怎么搜索的：', 'Click each tool to see how it searches:')}</p>
        </Narration>
        <CodeSearch />
      </Scene>

      <Scene>
        <Narration>
          <p>{t(
            <>搜索工具之外，还有一个强大的武器——<strong>LSP</strong>。</>,
            <>Beyond search tools, there's a powerful weapon — <strong>LSP</strong>.</>
          )}</p>
          <p>{t(
            <>Language Server Protocol，语言服务器协议。<br />它为代码提供<strong>语义级</strong>的理解。</>,
            <>Language Server Protocol.<br />It provides <strong>semantic-level</strong> understanding of code.</>
          )}</p>
          <p>{t(
            <>类型信息、函数定义、引用关系——<br />不是文本匹配，而是真正<strong>理解</strong>代码结构。</>,
            <>Type information, function definitions, reference relationships —<br />not text matching, but truly <strong>understanding</strong> code structure.</>
          )}</p>
        </Narration>
        <DeepDive title={t('LSP 能提供什么？', 'What can LSP provide?')}>
          <p>
            {t(
              'Go to Definition（跳转到定义）、Find References（查找引用）、Hover（悬浮查看类型）——这些 IDE 中常见的功能，背后都是 LSP 在工作。Claude Code 可以借助这些能力，像开发者一样导航代码。',
              'Go to Definition, Find References, Hover for type info — these common IDE features are all powered by LSP under the hood. Claude Code can leverage these capabilities to navigate code just like a developer.'
            )}
          </p>
        </DeepDive>
      </Scene>

      <Scene>
        <Narration>
          <p>{t(
            <>这整套搜索策略，本质上就是 <strong>RAG</strong>。</>,
            <>This entire search strategy is essentially <strong>RAG</strong>.</>
          )}</p>
          <p>{t(
            <>Retrieval-Augmented Generation——<br /><strong>检索增强生成</strong>。</>,
            <>Retrieval-Augmented Generation —<br /><strong>retrieve first, then generate</strong>.</>
          )}</p>
          <p>{t(
            <>不是把 10 万行代码全部塞进 context，<br />而是<strong>按需检索</strong>，只拿相关的片段。</>,
            <>Instead of stuffing 100K lines into context,<br /><strong>retrieve on demand</strong>, taking only relevant snippets.</>
          )}</p>
          <p>{t(
            <>先搜索，再阅读，最后生成。<br />每一步都在<strong>缩小范围</strong>，节省 context。</>,
            <>Search first, then read, finally generate.<br />Each step <strong>narrows the scope</strong>, saving context.</>
          )}</p>
        </Narration>
      </Scene>

      <Scene>
        <Narration>
          <p>{t(
            <>记忆让你知道项目的<strong>规则</strong>，<br />代码搜索让你理解项目的<strong>代码</strong>。</>,
            <>Memory tells you the project's <strong>rules</strong>,<br />code search helps you understand the project's <strong>code</strong>.</>
          )}</p>
          <p>{t(
            <>下一章，我们来看自动化触发器——</>,
            <>Next chapter, let's look at automated triggers —</>
          )}</p>
          <p>
            <strong>{t('Hooks', 'Hooks')}</strong>{t('。', '.')}
          </p>
        </Narration>
      </Scene>
    </SceneEngine>
  );
}
