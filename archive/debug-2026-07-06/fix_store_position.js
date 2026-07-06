/**
 * 修复 p7 中微信小店内容错位的问题：
 * 把错误嵌套在「公众号 / 微信客户端」dim-body 里的
 * 微信小店内容挪到正确的「微信小店」dim-block 里。
 *
 * 操作策略（按字符位置）：
 * 1. 找到 p7 中「公众号 / 微信客户端」dim-block 的结束 </div>
 * 2. 找到紧跟其后的微信小店 item 块（从「618 爆品加补」到「类目准入类型」）
 * 3. 把这些 item 从原位置删除
 * 4. 找到 p7 中已有的「微信小店」dim-block 的 </div>（关闭标签）
 * 5. 在这些 item 之前插回去
 *
 * 更简单的做法：直接重建 p7 的公众号和微信小店两个 dim-block。
 * 但由于文件太大，采用「字符串裁剪 + 插入」的方式。
 */

const fs = require('fs');
const path = 'C:\\Users\\v_yiicao\\WorkBuddy\\20260413140616\\wechat-weekly\\build_html_new.js';
let c = fs.readFileSync(path, 'utf8');

/*
 * 分步 1：确认 p7 中「公众号 / 微信客户端」dim-block 的错误范围
 * 错误特征：在 </div>  （dim-body 关闭）之前出现了微信小店 item
 */

// 找 p7 起始
const p7Idx = c.indexOf('id="p7"');
const p7Slice = c.substring(p7Idx);

// 在 p7 里找「公众号 / 微信客户端」的 dim-body 关闭位置
// 正确结构：3个 item 后应有 </div> 关闭 dim-body，再 </div> 关闭 dim-block
// 错误结构：3个 item 后直接跟了微信小店的 item

// 用正则把「公众号 / 微信客户端」dim-body 里错误嵌套的微信小店内容搬出来
const wrongBlockRegex = /(<div class="dim-body">[\s\S]*?服务号消息提醒可设置为不显示未读数字[\s\S]*?<\/div>\n  <\/div>\n\n      )([\s\S]*?类目准入类型[\s\S]*?<\/a><\/div>\n    <\/div>\n  <\/div>)/;

const m = p7Slice.match(wrongBlockRegex);
if (m) {
  console.log('✅ 匹配到错误嵌套块，长度：', m[2].length);
  console.log('内容预览：', m[2].substring(0, 200));
} else {
  console.log('❌ 未匹配到错误嵌套块，尝试其他方法');
  
  // 手动找：公众号 dim-body 的关闭标签位置
  const mpDimBodyStart = p7Slice.indexOf('<div class="dim-header">\n      <div class="dim-icon" style="background:#e8faf0"><img src="${ICONS.mp}" alt=""></div>\n      <div class="dim-title-text">公众号 / 微信客户端</div>');
  console.log('公众号 dim-block 在 p7 中的偏移量：', mpDimBodyStart);
  
  if (mpDimBodyStart !== -1) {
    const mpBlock = p7Slice.substring(mpDimBodyStart);
    // 找 dim-body 开始
    const dimBodyStart = mpBlock.indexOf('<div class="dim-body">');
    const dimBodyContent = mpBlock.substring(dimBodyStart + '<div class="dim-body">'.length);
    // 找第一个 </div>  </div>（错误的关闭）
    const badEnd = dimBodyContent.indexOf('  </div>\n  </div>');
    console.log('dim-body 错误关闭位置（相对）：', badEnd);
    console.log('关闭前200字符：', dimBodyContent.substring(Math.max(0, badEnd - 200), badEnd + 100));
  }
}
