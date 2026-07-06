const fs = require('fs');
const path = 'C:\\Users\\v_yiicao\\WorkBuddy\\20260413140616\\wechat-weekly\\build_html_new.js';
let c = fs.readFileSync(path, 'utf8');

// 1. dim-count: 12 → 10
c = c.replace(
  /(<div class="dim-count">)12( 条更新<\/div>)/,
  '$1' + '10' + '$2'
);

// 2. 删除端午粮油茗茶商达双选会活动（2026/06/02）
const item1 = /<div class="item notice"><div class="item-title"><span class="tag notice">活动上线<\/span>微信小店｜端午粮油茗茶商达双选会活动 2026\/06\/02<\/div><p>平台精选粮油茗茶类目品牌商家与达人撮合对接，助力商家拓展销路、达人挖掘优质货盘。<\/p><a class="link-btn" href="https:\/\/store\.weixin\.qq\.com\/chengzhang\/webdoc\/wiki\/9458\/1873a52680b3e8bd\/growth_center_platform_notice\/2" target="_blank">查看通知<\/a><\/div>/;

// 3. 删除珠宝首饰新增类目（2026/06/02）
const item2 = /<div class="item rule"><div class="item-title"><span class="tag rule">类目调整<\/span>微信小店一级类目珠宝首饰新增类目 2026\/06\/02<\/div><p>平台对珠宝首饰一级类目进行类目扩充，新增若干三级类目，商家可按更新后的类目规则进行商品发布与经营。<\/p><a class="link-btn" href="https:\/\/store\.weixin\.qq\.com\/chengzhang\/webdoc\/wiki\/9443\/fad0b1813e3cb518\/growth_center_platform_notice\/1" target="_blank">查看公告<\/a><\/div>/;

const m1 = c.match(item1);
const m2 = c.match(item2);
console.log('匹配端午活动：', m1 ? '✅' : '❌');
console.log('匹配珠宝类目：', m2 ? '✅' : '❌');

if (m1) c = c.replace(item1, '');
if (m2) c = c.replace(item2, '');

fs.writeFileSync(path, c, 'utf8');
console.log('✅ p7 微信小店：已移除2条6.2内容，dim-count → 10');
