import SceneEngine from '../../engine/SceneEngine';
import Scene from '../../components/scene/Scene';
import Narration from '../../components/scene/Narration';
import ChatBubble from '../../components/scene/ChatBubble';
import DeepDive from '../../components/scene/DeepDive';
import MCPArchitecture from '../../components/interactive/ch05/MCPArchitecture';
import MCPConnector from '../../components/interactive/ch05/MCPConnector';
import { LanguageProvider, useLanguage } from '../../i18n/LanguageContext';

export default function Ch05Scenes() {
  return <LanguageProvider><Ch05Content /></LanguageProvider>;
}

function Ch05Content() {
  const { t } = useLanguage();
  return (
    <SceneEngine>
      <Scene>
        <Narration>
          <p>{t('你的工具箱够用了吗？', 'Is your toolbox enough?')}</p>
          <p>
            {t(
              <>Read、Write、Bash……都是<strong>本地操作</strong>。</>,
              <>Read, Write, Bash… all <strong>local operations</strong>.</>
            )}
          </p>
          <p>{t('但世界远不止你的电脑。', 'But the world extends far beyond your computer.')}</p>
        </Narration>
      </Scene>

      <Scene>
        <ChatBubble from="user">{t('帮我查一下 Jira 上的这个 ticket', 'Help me check this ticket on Jira')}</ChatBubble>
        <Narration>
          <p>{t('你翻遍了工具箱——', 'You search through your toolbox —')}</p>
          <p>
            {t(
              <>Read？只能读本地文件。<br />Bash？可以 curl，但没有认证信息。<br />没有"读 Jira"这个工具。</>,
              <>Read? Can only read local files.<br />Bash? Can curl, but has no auth credentials.<br />There's no "read Jira" tool.</>
            )}
          </p>
          <p>
            {t(
              <>你<strong>做不到</strong>。</>,
              <>You <strong>can't do it</strong>.</>
            )}
          </p>
        </Narration>
      </Scene>

      <Scene>
        <Narration>
          <p>
            {t(
              <>直到——<strong>MCP</strong> 出现了。</>,
              <>Until — <strong>MCP</strong> came along.</>
            )}
          </p>
          <p>
            {t(
              <>MCP（Model Context Protocol）是一个<strong>开放标准</strong>。</>,
              <>MCP (Model Context Protocol) is an <strong>open standard</strong>.</>
            )}
          </p>
          <p>
            {t(
              '它让任何人都可以给 AI 写新工具——连接数据库、读 Google Drive、操作 Slack……',
              'It lets anyone write new tools for AI — connect to databases, read Google Drive, operate Slack…'
            )}
          </p>
          <p>{t(
            '就像 USB 让任何设备都能插到电脑上一样。',
            'Just like USB lets any device plug into a computer.'
          )}</p>
        </Narration>
      </Scene>

      <Scene interactive>
        <MCPArchitecture />
      </Scene>

      <Scene>
        <Narration>
          <p>
            {t(
              <>MCP 服务器就像<strong>"插头"</strong>——你把它插进 Claude Code，AI 就多了一套新工具。</>,
              <>MCP servers are like <strong>"plug-ins"</strong> — plug one into Claude Code, and the AI gains a new set of tools.</>
            )}
          </p>
          <p>
            {t(
              <>配置只需要一个 <code>.mcp.json</code> 文件。</>,
              <>Configuration only requires a single <code>.mcp.json</code> file.</>
            )}
          </p>
          <p>{t(
            '不需要修改 Claude Code 本身，不需要重新训练模型。',
            'No need to modify Claude Code itself, no need to retrain the model.'
          )}</p>
          <p>{t('插上就能用。', 'Plug in and play.')}</p>
        </Narration>
      </Scene>

      <Scene interactive>
        <Narration>
          <p>{t(
            '让我们模拟一次 MCP 连接的完整过程——',
            'Let\'s simulate a complete MCP connection process —'
          )}</p>
          <p>{t(
            '从配置到调用，感受"即插即用"的力量：',
            'From configuration to invocation, experience the power of "plug and play":'
          )}</p>
        </Narration>
        <MCPConnector />
      </Scene>

      <Scene>
        <Narration>
          <p>
            {t(
              <>MCP 把 AI 从<strong>"本地助手"</strong>变成了<strong>"万能接口"</strong>。</>,
              <>MCP transforms AI from a <strong>"local assistant"</strong> into a <strong>"universal interface"</strong>.</>
            )}
          </p>
          <p>{t(
            '任何有 API 的服务，都可以变成 AI 的工具。',
            'Any service with an API can become an AI tool.'
          )}</p>
          <p>
            {t(
              <>GitHub、Slack、Figma、数据库、浏览器——<br />一个协议，连接一切。</>,
              <>GitHub, Slack, Figma, databases, browsers —<br />One protocol to connect them all.</>
            )}
          </p>
        </Narration>
        <DeepDive title={t('MCP 的设计哲学', 'MCP design philosophy')}>
          <p>
            {t(
              'MCP 遵循 Unix 哲学：每个服务器做一件事，做好一件事。服务器之间通过标准协议通信，可以自由组合。这让 AI 的能力可以像乐高积木一样无限扩展。',
              'MCP follows the Unix philosophy: each server does one thing and does it well. Servers communicate via a standard protocol and can be freely combined. This allows AI capabilities to be infinitely extensible, like LEGO bricks.'
            )}
          </p>
        </DeepDive>
      </Scene>

      <Scene>
        <Narration>
          <p>{t('工具越来越多了。', 'More and more tools.')}</p>
          <p>{t('但有一个根本问题——', 'But there\'s a fundamental problem —')}</p>
          <p>
            {t(
              <><strong>AI 的记忆会消失。</strong></>,
              <><strong>AI's memory disappears.</strong></>
            )}
          </p>
          <p>
            {t(
              <>每次对话结束，一切归零。<br />下一章，我们来解决<strong>遗忘</strong>。</>,
              <>Every conversation ends, everything resets to zero.<br />Next chapter, let's tackle <strong>forgetting</strong>.</>
            )}
          </p>
        </Narration>
      </Scene>
    </SceneEngine>
  );
}
