/**
 * 修复 build_html_new.js 中 p7 的「公众号 / 微信客户端」dim-block
 * 错误嵌套微信小店内容的问题。
 *
 * 问题：公众号 dim-body 没有正确关闭，
 * 导致微信小店 item 被错误嵌套进公众号块。
 *
 * 修复：在「服务号消息提醒可设置为不显示未读数字」item 之后
 * 补上 </div></div> 关闭 dim-body 和 dim-block，
 * 然后把微信小店 item 放到正确的「微信小店」dim-block 里。
 */

const fs = require('fs');
const path = 'C:\\Users\\v_yiicao\\WorkBuddy\\20260413140616\\wechat-weekly\\build_html_new.js';
let c = fs.readFileSync(path, 'utf8');

/* ===== 第1步：找到 p7 中公众号块的3条内容结尾 ===== */
const p7Idx = c.indexOf('id="p7"');
const afterP7 = c.substring(p7Idx);

/*
 * 公众号块的结构（p7）：
 * <div class="dim-block">
 *   <div class="dim-header">... 公众号 / 微信客户端 ...</div>
 *   <div class="dim-body">
 *     item1: 图标灰度
 *     item2: iOS 8.0.69 内测
 *     item3: 服务号消息提醒...
 *   </div>              ← 这个应该在这里！
 * </div>
 * 但实际上是：
 *     item3 之后直接跟了微信小店 item，没有 </div></div>
 */

// 找公众号 dim-body 的起始
const mpDimBodyIdx = afterP7.indexOf('<div class="dim-body">');
if (mpDimBodyIdx === -1) {
  console.log('❌ 未找到 p7 公众号 dim-body');
  process.exit(1);
}

// 在 dim-body 里找第3个 item 的结束位置
let searchFrom = mpDimBodyIdx;
let itemCount = 0;
let thirdItemEnd = -1;

while (searchFrom !== -1 && itemCount < 3) {
  const itemIdx = afterP7.indexOf('<div class="item ', searchFrom);
  if (itemIdx === -1) break;
  
  // 找这个 item 的结束 </div>>
  let depth = 0;
  let pos = itemIdx;
  while (pos < afterP7.length) {
    if (afterP7.substring(pos, pos + 12) === '<div class="') {
      depth++;
    }
    if (afterP7.substring(pos, pos + 6) === '</div>') {
      depth--;
      if (depth < 0) {
        thirdItemEnd = p7Idx + pos + 6;  // 指向 </div> 之后
        break;
      }
    }
    pos++;
  }
  
  itemCount++;
  searchFrom = pos + 1;
}

console.log('第3个 item 结束位置（绝对）：', thirdItemEnd);
console.log('第3个 item 结束上下文：', c.substring(thirdItemEnd - 50, thirdItemEnd + 200));
