/**
 * 站点辅助功能模块 —— 卡片提示、标签展示与访问引导
 * 无需第三方依赖，纯原生实现
 */
(function () {
  'use strict';

  // ---------- 配置数据 ----------
  const config = {
    portalUrl: 'https://home-portal-leisu.com',
    keyword: '雷速',
    siteName: 'LeiSu Portal',
    version: '1.2.0'
  };

  // ---------- 卡片提示数据 ----------
  const tips = [
    { icon: '💡', title: '快速导航', content: '使用顶栏菜单或侧边卡片快速跳转至常用页面。' },
    { icon: '🔍', title: '关键词检索', content: `输入"${config.keyword}"可定位相关功能模块。` },
    { icon: '🌐', title: '外部链接', content: `部分卡片将引导至 ${config.portalUrl} 下的服务。` },
    { icon: '📌', title: '访问说明', content: '本页面无需登录，所有公开信息均可直接浏览。' }
  ];

  // ---------- 关键词徽章 ----------
  const badges = [
    { label: config.keyword, color: '#e74c3c' },
    { label: '首页', color: '#3498db' },
    { label: '帮助', color: '#2ecc71' },
    { label: '更新', color: '#f39c12' }
  ];

  // ---------- 样式注入 ----------
  function injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .ls-helper-tipcard {
        background: #ffffff;
        border: 1px solid #e0e0e0;
        border-radius: 12px;
        padding: 16px 18px;
        margin: 10px 0;
        box-shadow: 0 2px 6px rgba(0,0,0,0.06);
        transition: box-shadow 0.2s ease;
      }
      .ls-helper-tipcard:hover {
        box-shadow: 0 4px 12px rgba(0,0,0,0.12);
      }
      .ls-helper-tipcard-icon {
        font-size: 24px;
        margin-right: 12px;
        vertical-align: middle;
      }
      .ls-helper-tipcard-title {
        font-weight: 600;
        font-size: 16px;
        color: #2c3e50;
        display: inline;
        vertical-align: middle;
      }
      .ls-helper-tipcard-content {
        margin-top: 8px;
        font-size: 14px;
        color: #555;
        line-height: 1.5;
      }
      .ls-helper-badge {
        display: inline-block;
        padding: 4px 12px;
        border-radius: 20px;
        font-size: 13px;
        font-weight: 500;
        color: #fff;
        margin: 4px 6px 4px 0;
        cursor: default;
        user-select: none;
      }
      .ls-helper-tips-container {
        max-width: 720px;
        margin: 20px auto;
        padding: 0 16px;
      }
      .ls-helper-badge-container {
        margin: 12px 0;
        text-align: center;
      }
      .ls-helper-access-note {
        background: #f9f9fb;
        border-left: 4px solid #3498db;
        padding: 12px 16px;
        margin: 20px 0;
        font-size: 14px;
        color: #333;
        border-radius: 0 8px 8px 0;
      }
      .ls-helper-access-note a {
        color: #2980b9;
        text-decoration: none;
      }
      .ls-helper-access-note a:hover {
        text-decoration: underline;
      }
    `;
    document.head.appendChild(style);
  }

  // ---------- 创建提示卡片 ----------
  function createTipCard(tip) {
    const card = document.createElement('div');
    card.className = 'ls-helper-tipcard';
    card.innerHTML = `
      <div>
        <span class="ls-helper-tipcard-icon">${tip.icon}</span>
        <span class="ls-helper-tipcard-title">${escapeHtml(tip.title)}</span>
      </div>
      <div class="ls-helper-tipcard-content">${escapeHtml(tip.content)}</div>
    `;
    return card;
  }

  // ---------- 创建关键词徽章 ----------
  function createBadge(badge) {
    const el = document.createElement('span');
    el.className = 'ls-helper-badge';
    el.style.backgroundColor = badge.color;
    el.textContent = badge.label;
    return el;
  }

  // ---------- 创建访问说明 ----------
  function createAccessNote() {
    const note = document.createElement('div');
    note.className = 'ls-helper-access-note';
    note.innerHTML = `
      <strong>📋 访问说明</strong><br>
      本页面为 ${config.siteName} 辅助工具。所有公开卡片与标签均基于本地数据生成。
      如需访问完整服务，请前往 <a href="${config.portalUrl}" target="_blank" rel="noopener">${config.portalUrl}</a>。
      关键词「${config.keyword}」可用于快速过滤相关功能。
    `;
    return note;
  }

  // ---------- HTML 转义（安全） ----------
  function escapeHtml(text) {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(text));
    return div.innerHTML;
  }

  // ---------- 主初始化函数 ----------
  function init() {
    injectStyles();

    // 容器
    const container = document.createElement('div');
    container.className = 'ls-helper-tips-container';

    // 添加提示卡片
    tips.forEach(tip => {
      container.appendChild(createTipCard(tip));
    });

    // 添加关键词徽章
    const badgeContainer = document.createElement('div');
    badgeContainer.className = 'ls-helper-badge-container';
    badges.forEach(badge => {
      badgeContainer.appendChild(createBadge(badge));
    });
    container.appendChild(badgeContainer);

    // 添加访问说明
    container.appendChild(createAccessNote());

    // 插入到页面主体
    const target = document.querySelector('main') || document.querySelector('.content') || document.body;
    target.appendChild(container);
  }

  // 在 DOM 加载完成后执行
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();