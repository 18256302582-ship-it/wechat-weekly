const fs = require('fs');
const path = 'C:/Users/v_yiicao/WorkBuddy/20260413140616/wechat-weekly/build_html_new.js';
let c = fs.readFileSync(path, 'utf8');

// 概览表 p7 微信小店那行：加入食品礼券规则
const oldLine = '<tr><td>2</td><td><div class="dim-cell"><img src="${ICONS.store}" alt="">微信小店</div></td><td>功能调整汇总-20260529：新增「今日发」功能（5.26上线）+ 7个供货商API接口（获取发货协商结果/提交发货协商申请/获取类目下商品发布规则/批量获取库存信息/获取库存/获取库存流水/快速更新库存）</td><td class="stars" style="text-align:center">★★★</td></tr>';

const newLine = '<tr><td>2</td><td><div class="dim-cell"><img src="${ICONS.store}" alt="">微信小店</div></td><td>「食品礼券」定向准入新规公示（品牌方注册资本≥1亿+近1年GMV≥300万，6.1生效）；功能调整汇总-20260529：新增「今日发」功能（5.26上线）+ 7个供货商API接口</td><td class="stars" style="text-align:center">★★★</td></tr>';

if (c.includes(oldLine)) {
  c = c.replace(oldLine, newLine);
  fs.writeFileSync(path, c, 'utf8');
  console.log('✅ 概览表微信小店行已更新');
} else {
  console.log('❌ 精确匹配失败，尝试模糊搜索...');
  const idx = c.indexOf('功能调整汇总-20260529');
  if (idx > -1) {
    let start = idx;
    while (start > 0 && c[start] !== '\n') start--;
    let end = idx;
    while (end < c.length && c[end] !== '\n') end++;
    console.log('找到行内容：', c.substring(start, end).substring(0, 120));
  }
}
