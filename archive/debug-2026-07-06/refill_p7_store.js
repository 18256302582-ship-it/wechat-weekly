const fs = require('fs');
const path = 'C:/Users/v_yiicao/WorkBuddy/20260413140616/wechat-weekly/build_html_new.js';
let c = fs.readFileSync(path, 'utf8');

// 1. p7 微信小店 dim-count: 6 → 12
// 唯一定位：找 p7 区块内的 dim-count（"6 条更新"在 p7 微信小店 div 里）
const p7StoreBlockStart = c.indexOf('id="p7"');
if (p7StoreBlockStart === -1) { console.log('❌ 找不到 p7'); process.exit(1); }

// 在 p7 区块里找「微信小店」dim-header，然后找其后的 dim-count
const p7Slice = c.substring(p7StoreBlockStart);
const storeHeaderIdx = p7Slice.indexOf('微信小店</div>\n      <div class="dim-count">');
if (storeHeaderIdx === -1) { console.log('❌ 找不到 p7 微信小店 dim-count'); process.exit(1); }

const actualIdx = p7StoreBlockStart + storeHeaderIdx + '微信小店</div>\n      '.length;
// 现在 actualIdx 指向 <div class="dim-count"> 开头
const oldCount = '<div class="dim-count">6 条更新</div>';
const newCount = '<div class="dim-count">12 条更新</div>';
if (c.substring(actualIdx, actualIdx + oldCount.length) === oldCount) {
  c = c.substring(0, actualIdx) + newCount + c.substring(actualIdx + oldCount.length);
  console.log('✅ dim-count: 6 → 12');
} else {
  console.log('❌ dim-count 匹配失败，实际内容：', c.substring(actualIdx, actualIdx + 50));
}

// 2. 在 p7 微信小店 dim-body 末尾（</div>\n  </div>\n\n  <div class="dim-block">之前）插入新条目
// 定位 p7 微信小店 dim-body 的结束位置
const storeBodyStart = c.indexOf('<div class="dim-body">', p7StoreBlockStart);
const nextDimBlock = c.indexOf('<div class="dim-block">', storeBodyStart + 1);
const insertPos = c.lastIndexOf('</div>\n  </div>', nextDimBlock);

const newItems = `
      <div class="item notice"><div class="item-title"><span class="tag notice">活动上线</span>微信小店｜端午粮油茗茶商达双选会活动 2026/06/02</div><p>平台精选粮油茗茶类目品牌商家与达人撮合对接，助力商家拓展销路、达人挖掘优质货盘。</p><a class="link-btn" href="https://store.weixin.qq.com/chengzhang/webdoc/wiki/9458/1873a52680b3e8bd/growth_center_platform_notice/2" target="_blank">查看通知</a></div>
      <div class="item rule"><div class="item-title"><span class="tag rule">类目调整</span>微信小店一级类目珠宝首饰新增类目 2026/06/02</div><p>平台对珠宝首饰一级类目进行类目扩充，新增若干三级类目，商家可按更新后的类目规则进行商品发布与经营。</p><a class="link-btn" href="https://store.weixin.qq.com/chengzhang/webdoc/wiki/9443/fad0b1813e3cb518/growth_center_platform_notice/1" target="_blank">查看公告</a></div>
      <div class="item notice"><div class="item-title"><span class="tag notice">活动政策</span>微信小店｜618 爆品加补活动政策 2026/05/29</div><p>平台在618大促期间推出爆品加补活动，入选商品可获得额外流量补贴与爆品标识，助力商家提升大促爆发力。</p><a class="link-btn" href="https://store.weixin.qq.com/chengzhang/webdoc/wiki/9392/fb5af4d28e4be444/growth_center_platform_notice/2" target="_blank">查看通知</a></div>
      <div class="item notice"><div class="item-title"><span class="tag notice">激励政策</span>微信小店服务商｜2026年6月「商家服务商」激励政策 2026/05/29</div><p>针对服务商的商家引入与运营激励政策更新，6月政策在5月基础上调整了部分类目激励系数，服务商需关注最新条款。</p><a class="link-btn" href="https://store.weixin.qq.com/chengzhang/webdoc/wiki/9411/14d8a8750fb343d6/growth_center_platform_notice/2" target="_blank">查看通知</a></div>
      <div class="item notice"><div class="item-title"><span class="tag notice">激励计划</span>微信小店｜新商成长激励计划（26年6月）2026/05/28</div><p>新入驻商家满足一定GMV门槛后可获得平台流量券奖励，6月激励计划调整了部分类目的达标要求，新商需以最新版本为准。</p><a class="link-btn" href="https://store.weixin.qq.com/chengzhang/webdoc/wiki/9436/3d9e25c07b7ededd/growth_center_platform_notice/2" target="_blank">查看通知</a></div>
      <div class="item notice"><div class="item-title"><span class="tag notice">活动规则</span>微信小店「10天签到」活动规则说明 2026/05/28</div><p>商家参与10天签到活动可获得流量奖励，活动规则详细说明商家参与条件、签到天数对应的奖励矩阵及兑换方式。</p><a class="link-btn" href="https://store.weixin.qq.com/chengzhang/webdoc/wiki/9438/81cea35b5b684eba/growth_center_platform_notice/1" target="_blank">查看通知</a></div>
      <div class="item notice"><div class="item-title"><span class="tag notice">活动规则</span>微信小店「7天签到」活动规则说明 2026/05/28</div><p>商家参与7天签到活动可获得流量奖励，活动周期更短、奖励兑现更快，适合新商家快速体验平台激励玩法。</p><a class="link-btn" href="https://store.weixin.qq.com/chengzhang/webdoc/wiki/9437/d4964fd33868e670/growth_center_platform_notice/1" target="_blank">查看通知</a></div>
      <div class="item manual"><div class="item-title"><span class="tag manual">手册更新</span>微信小店「类目准入类型」说明文档更新 2026/05/26</div><p>更新类目准入类型说明文档，明确各一级/二级类目对应的准入资质要求、定向邀约类目范围及申请入口，商家发布商品前建议查阅。</p><a class="link-btn" href="https://store.weixin.qq.com/chengzhang/webdoc/wiki/9388/d0cfbe8f1258129c/growth_center_manual_for_store/1" target="_blank">查看文档</a></div>
`;

// insertPos 是 </div>\n  </div> 的 </div> 位置，需要在 </div>\n  </div>\n\n  <div class="dim-block"> 之前插入
const insertAt = insertPos + '</div>'.length;
c = c.substring(0, insertAt) + '\n' + newItems + '\n    ' + c.substring(insertAt);

fs.writeFileSync(path, c, 'utf8');
console.log('✅ p7 微信小店新增8条遗漏内容（共12条）');
