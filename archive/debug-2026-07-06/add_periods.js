const fs = require('fs');
const path = 'index.html';
let html = fs.readFileSync(path, 'utf8');

// ── 1. 从现有期次提取图标 data URI ──
function grabIcon(keyword) {
  // 在现有 HTML 里找一个包含该关键词 alt 的 img src
  const re = new RegExp('<img src="([^"]+)" alt="">[^<]*</div><div class="dim-title-text">' + keyword + '</div>');
  const m = html.match(re);
  if (m) return m[1];
  // 备选：找 alt 里包含关键词的
  const re2 = new RegExp('<img src="([^"]+)" alt="">[\\s\\S]{0,200}?' + keyword);
  const m2 = html.match(re2);
  if (m2) return m2[1];
  return '';
}
const ICON = {
  xiaodian: grabIcon('微信小店'),
  shipinhao: grabIcon('视频号'),
  gzh: grabIcon('公众号'),
  weapp: grabIcon('小程序'),
  qiye: grabIcon('企业微信'),
  pay: grabIcon('微信支付'),
  open: grabIcon('微信开放平台'),
  tuoke: grabIcon('推客'),
};
console.log('图标提取:', Object.keys(ICON).map(k => k + (ICON[k] ? '✓' : '✗')).join(' '));

// ── 2. 构建期次内容块 ──
function dimBlock(icon, name, count, items) {
  const itemsHtml = items.map(it => {
    const cls = it.alert ? 'item alert' : 'item';
    const note = it.note ? `<br><span style="color:#999;font-size:12px">${it.note}</span>` : '';
    const link = it.link ? `<a class="link-btn" href="${it.link}" target="_blank">查看公告</a>` : '';
    return `      <div class="${cls}"><div class="item-title">${it.title}</div><p>${it.desc}${note}</p>${link}</div>`;
  }).join('\n');
  return `  <div class="dim-block">
    <div class="dim-header">
      <div class="dim-icon" style="background:#e8faf0"><img src="${icon}" alt=""></div>
      <div class="dim-title-text">${name}</div>
      <div class="dim-count">${count}</div>
    </div>
    <div class="dim-body">
${itemsHtml}
    </div>
  </div>`;
}

function overview(rows) {
  const trs = rows.map((r, i) => `        <tr><td>${i+1}</td><td><div class="dim-cell"><img src="${r.icon}" alt="">${r.dim}</div></td><td>${r.core}</td><td style="text-align:center">${r.star}</td></tr>`).join('\n');
  return `  <div class="overview-card">
    <div class="card-title">▌ 本期要点速览（${rows[0].period}）</div>
    <table class="overview-table">
      <thead><tr><th>#</th><th>维度</th><th>核心内容</th><th style="text-align:center;width:80px">重要程度</th></tr></thead>
      <tbody>
${trs}
      </tbody>
    </table>
  </div>`;
}

// ── p9: 2026.6.23–6.29 ──
const p9Overview = overview([
  { period:'2026.6.23–6.29', icon:ICON.xiaodian, dim:'微信小店', core:'新规速递-20260629：公示3条+生效7条+新发指引1条', star:'★★★' },
  { period:'2026.6.23–6.29', icon:ICON.gzh, dim:'微信客户端', core:'原生AI助手"小微"正式现身（6.20起内测，8.0.75版本）', star:'★★★' },
  { period:'2026.6.23–6.29', icon:ICON.qiye, dim:'企业微信', core:'5.0.9版本：服务总结+智能表格AI字段+AI助理"大圆"内测', star:'★★★' },
  { period:'2026.6.23–6.29', icon:ICON.shipinhao, dim:'视频号', core:'鸿蒙版8.0.19.16邀测：视频号支持推荐给好友', star:'★★' },
]);

const p9Content = `  <div class="period-content" id="p9">
${p9Overview}
${dimBlock(ICON.xiaodian, '微信小店', '11 条更新', [
  { title:'微信小店新规速递-20260629（6月23日发布）', desc:'本周平台公告汇总：公示通知3条（商家运费险条款、优选联盟带货者/机构技术服务费修订）、规则生效7条（假一赔三、运费险、评价抽奖、先用后付、商家给平台开票、优选联盟功能服务条款、优选联盟计佣与结算，集中于6.22–6.26生效）、新发指引1条（带货者运营百宝箱）。', link:'https://store.weixin.qq.com/chengzhang/webdoc/wiki/9599/9c849016ed4b2dfb/growth_center_rule_for_store/24' },
  { title:'《微信小店"假一赔三"管理规则》修订生效（6月22日）', desc:'对"二、商家的开通与关闭"进行修订，已正式生效。', alert:true, note:'规则生效' },
  { title:'《微信小店"运费险"管理规则》修订生效（6月22日）', desc:'对"2.3 运费险保险费支付"进行修订，已正式生效。', alert:true, note:'规则生效' },
  { title:'《微信小店"评价抽奖"功能服务条款》修订生效（6月22日）', desc:'新增"评价得店铺券活动"相关内容，已正式生效。', alert:true, note:'规则生效' },
  { title:'《微信小店"先用后付"功能服务条款》修订生效（6月22日）', desc:'对先用后付功能、开通关闭、货款结算、商家/腾讯权利义务、信息保护等多章节修订，已正式生效。', alert:true, note:'规则生效' },
  { title:'《微信小店"商家给平台开票"管理规则》修订生效（6月24日）', desc:'对"二、开票要求"进行修订，已正式生效。', alert:true, note:'规则生效' },
  { title:'《微信小店优选联盟功能服务条款(商家端)》修订生效（6月26日）', desc:'对"三、服务内容""六、费用结算"进行修订，已正式生效。', alert:true, note:'规则生效' },
  { title:'《微信小店优选联盟计佣与结算规则》修订生效（6月26日）', desc:'对"3.1.3 带货佣金结算模式""6.2 投流佣金结算模式结算规则"进行修订，已正式生效。', alert:true, note:'规则生效' },
  { title:'带货者运营百宝箱（新发布指引）', desc:'为方便带货者快速获取平台功能、规则、活动信息，发布"带货百宝箱"系列课程。', link:'https://store.weixin.qq.com/chengzhang/webdoc/wiki/9219/981283b961b580c2/growth_center_lesson_for_finder/1' },
  { title:'优选联盟"潜力带货者免佣限时优惠"公示（6月23日）', desc:'拟在优选联盟带货者/机构技术服务费管理规则中新增"3.4 潜力带货者免佣限时优惠"，进入公示期。', alert:true, note:'公示中' },
])}
${dimBlock(ICON.gzh, '微信客户端', '1 条更新', [
  { title:'原生AI助手"小微"正式现身（6月23日报道，6月20日起内测）', desc:'微信主界面左上角出现绿色眼睛机器人图标，点入为名为"小微"的AI助手（标注"测试版"）。支持文字/语音对话，可发消息、转账、设提醒、读文件、管朋友圈；打通公众号与视频号内容总结；具记忆功能。需微信更新至8.0.75版本。', alert:true, note:'此为媒体公开报道，非官方公告' },
])}
${dimBlock(ICON.qiye, '企业微信', '1 条更新', [
  { title:'企业微信 5.0.9 版本发布（6月28日）', desc:'AI 直接嵌入客户沟通场景：①"服务总结"自动提炼客户需求/意向/成交卡点；②智能表格新增"AI字段"（解析合同发票PDF、处理图片）；③智能文档新增目录导航/划词评论/流程图插入；④"记录面聊"打通日程；⑤原生AI助理"大圆"左滑唤出（灰度内测）。', alert:true, note:'此为第三方测评报道，非官方公告' },
])}
${dimBlock(ICON.shipinhao, '视频号', '1 条更新', [
  { title:'微信鸿蒙版 8.0.19.16 邀测升级（6月24日）', desc:'视频号支持推荐给好友；视频号评论区非话题评论长按新增投诉；听一听新增AI写歌模型选择；元宝由联系人态变更为AI功能态。测试期 2026/6/23–7/22。', alert:true, note:'此为鸿蒙版专属更新，非全平台公告' },
])}
  </div><!-- /p9 -->
`;

// ── p8.5: 2026.6.16–6.22 ──
const p85Overview = overview([
  { period:'2026.6.16–6.22', icon:ICON.xiaodian, dim:'微信小店', core:'新规速递-20260622：投放成长任务激励+6.18返场+7天签到', star:'★★★' },
  { period:'2026.6.16–6.22', icon:ICON.gzh, dim:'微信客户端', core:'原生AI助手"小微"开启小范围内测（6月20日）', star:'★★★' },
  { period:'2026.6.16–6.22', icon:ICON.shipinhao, dim:'视频号/鸿蒙', core:'微信鸿蒙版8.0.18.35大更新，24项功能', star:'★★' },
]);

const p85Content = `  <div class="period-content" id="p85">
${p85Overview}
${dimBlock(ICON.xiaodian, '微信小店', '10 条更新', [
  { title:'微信小店新规速递-20260622（6月22日发布）', desc:'本周平台公告：①小店投放"成长陪伴·投放任务"上线并限时激励（6.17）；②6.18返场活动（6.19–6.25，发消费券）；③"7天签到1.0"活动（6.19–7.2，签到领券）。意见征集3条（运费险条款、优选联盟带货机构/带货者技术服务费）；公示通知3条（假一赔三、评价抽奖、运费险修订公示）。', link:'https://store.weixin.qq.com/chengzhang/webdoc/wiki/9571/0305ab70f6854bb5/growth_center_rule_for_store/24' },
  { title:'小店投放"成长陪伴·投放任务"限时激励（6月17日）', desc:'为提升商家投放效率、扩大广告出单规模，小店投放正式上线"成长陪伴·投放任务"并限时开启激励活动。', link:'https://store.weixin.qq.com/chengzhang/webdoc/wiki/9571/0305ab70f6854bb5/growth_center_rule_for_store/24' },
  { title:'微信小店 6.18 返场活动（6月19–6月25日）', desc:'活动周期内平台发放消费券，符合条件的用户可参与。', alert:true, note:'活动公告' },
  { title:'微信小店"7天签到1.0"活动（6月19日–7月2日）', desc:'用户完成当天签到任务可领取优惠券；若当天权益为"提升补贴"，持续签到至下一领券节点时券面额提升。', alert:true, note:'活动公告' },
  { title:'《微信小店商家运费险功能服务条款》修订意见征集（6月15日）', desc:'对"三、功能说明""八、其他"进行修订，公开征集意见。', alert:true, note:'意见征集' },
  { title:'《微信小店优选联盟带货机构技术服务费管理规则》修订意见征集（6月17日）', desc:'拟新增"3.4 潜力带货者免佣限时优惠"，面向带货机构征集意见。', alert:true, note:'意见征集' },
  { title:'《微信小店优选联盟带货者技术服务费管理规则》修订意见征集（6月17日）', desc:'拟新增"3.4 潜力带货者免佣限时优惠"，面向带货者征集意见。', alert:true, note:'意见征集' },
  { title:'《微信小店"假一赔三"管理规则》修订公示（6月15日）', desc:'对"二、商家的开通与关闭"进行修订，进入公示期。', alert:true, note:'公示通知' },
  { title:'《微信小店"评价抽奖"功能服务条款》修订公示（6月15日）', desc:'新增"评价得店铺券活动"相关内容，进入公示期。', alert:true, note:'公示通知' },
  { title:'《微信小店"运费险"管理规则》修订公示（6月23日版本）', desc:'对"2.3 运费险保险费支付"进行修订，进入公示期。', alert:true, note:'公示通知' },
])}
${dimBlock(ICON.gzh, '微信客户端', '1 条更新', [
  { title:'原生AI助手"小微"开启小范围内测（6月20日）', desc:'获得内测资格的用户更新至微信8.0.75后，主界面左上角出现"小微"标志，可点击或一键右滑开启；支持文字/语音操作发消息、转账、设提醒、读文件、管朋友圈。', alert:true, note:'此为媒体公开报道，非官方公告' },
])}
${dimBlock(ICON.shipinhao, '视频号/鸿蒙', '1 条更新', [
  { title:'微信鸿蒙版 8.0.18.35 大更新：24项功能（6月2日–7月1日分批）', desc:'涵盖6大版块：登录（切换账号、WeChat开放多国登录）；朋友圈（展示企微朋友圈、评论留草稿、按时间查旧朋友圈）；群（审核入群提醒、群公告链接跳转/文件查看）；直播（红点、评论位置表情）；视频号相关优化。分批次推送，未收到请等待。', alert:true, note:'此为鸿蒙版专属更新，非全平台公告' },
])}
  </div><!-- /p85 -->
`;

// ── 3. 插入 period-content 块（在 p8 之前）──
const p8Pos = html.indexOf('<div class="period-content active" id="p8">');
if (p8Pos < 0) { console.log('ERROR: 未找到 p8 块'); process.exit(1); }
html = html.substring(0, p8Pos) + p9Content + '\n' + p85Content + '\n' + html.substring(p8Pos);

// ── 4. 更新 PERIODS 数组 ──
const periodsOld = `  { id: 'p8',   label: '2026.6.9–6.15',   start: new Date(2026, 5,  9), end: new Date(2026, 5, 15) },`;
const periodsNew = `  { id: 'p9',   label: '2026.6.23–6.29', start: new Date(2026, 5, 23), end: new Date(2026, 5, 29) },
  { id: 'p85',  label: '2026.6.16–6.22', start: new Date(2026, 5, 16), end: new Date(2026, 5, 22) },
  { id: 'p8',   label: '2026.6.9–6.15',   start: new Date(2026, 5,  9), end: new Date(2026, 5, 15) },`;
html = html.replace(periodsOld, periodsNew);

// ── 5. 更新 tab 按钮（在 p8 的 tab 前插入 p9/p85）──
const tabOld = `  <button class="tab-btn active" onclick="switchTab(this,'p8')">📅 2026.6.9–6.15</button>`;
const tabNew = `  <button class="tab-btn active" onclick="switchTab(this,'p9')">📅 2026.6.23–6.29</button>
  <button class="tab-btn" onclick="switchTab(this,'p85')">📅 2026.6.16–6.22</button>
  <button class="tab-btn" onclick="switchTab(this,'p8')">📅 2026.6.9–6.15</button>`;
html = html.replace(tabOld, tabNew);

// ── 6. p8 块去掉 active 类 ──
html = html.replace('<div class="period-content active" id="p8">', '<div class="period-content" id="p8">');
// p9 块加上 active 类（插入时已经是无 active，这里补上）
html = html.replace('<div class="period-content" id="p9">', '<div class="period-content active" id="p9">');

// ── 7. 更新 activePeriodId ──
html = html.replace("let activePeriodId = 'p8';", "let activePeriodId = 'p9';");

fs.writeFileSync(path, html);
console.log('✅ 已插入 p9(6.23-6.29) 和 p85(6.16-6.22)，p9 设为默认激活');
