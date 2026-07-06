const fs = require('fs');
const path = 'C:/Users/v_yiicao/WorkBuddy/20260413140616/wechat-weekly/build_html_new.js';
let c = fs.readFileSync(path, 'utf8');

// 概览表：p7 微信小店那行，加入食品礼券规则
const oldOverview = '<tr><td>2</td><td><div class="dim-cell"><img src="${ICONS.store}" alt="">微信小店</div></td><td>功能调整汇总-20260529：新增「今日发」功能（5.26上线）+ 7个供货商API接口（获取发货协商结果/提交发货协商申请/获取类目下商品发布规则/批量获取库存信息/获取库存/获取库存流水/快速更新库存）</td><td class="stars" style="text-align:center">★★★</td></tr>';

const newOverview = '<tr><td>2</td><td><div class="dim-cell"><img src="${ICONS.store}" alt="">微信小店</div></td><td>「食品礼券」定向准入新规公示（品牌方注册资本≥1亿+近1年GMV≥300万，6.1生效）；功能调整汇总-20260529：新增「今日发」功能（5.26上线）+ 7个供货商API接口</td><td class="stars" style="text-align:center">★★★</td></tr>';

if (c.includes(oldOverview)) {
  c = c.replace(oldOverview, newOverview);
  fs.writeFileSync(path, c, 'utf8');
  console.log('✅ 概览表微信小店行已更新（加入食品礼券规则）');
} else {
  console.log('❌ 概览表匹配失败，尝试模糊匹配...');
  // 模糊匹配：找包含「功能调整汇总-20260529」的概览行
  const lines = c.split('\n');
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('功能调整汇总-20260529') && lines[i].includes('stars') && lines[i].includes('p7') === false) {
      // 确认是概览表行（不含 dim-block）
      console.log(`找到疑似行 @${i+1}: ${lines[i].substring(0, 80)}...`);
    }
  }
}
