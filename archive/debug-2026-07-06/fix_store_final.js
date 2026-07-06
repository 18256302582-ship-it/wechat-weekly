const fs = require('fs');
const path = 'build_html_new.js';
let c = fs.readFileSync(path, 'utf8');

/* === Step 1: 提取错误位置的6条微信小店内容（312-317行）=== */
// 定位：在 p7 中，公众号块结束后、小程序块之前的孤立结构
const p7 = c.indexOf('id="p7"');

// 找第一个错误微信小店 item 的起始（618爆品）
const wrongItem1 = c.indexOf('微信小店｜618 爆品加补活动政策', p7);
// 往前找孤立 dim-body 的开启标签
const wrongBodyStart = c.lastIndexOf('<div class="dim-body">', wrongItem1);
// 往后找孤立结构的关闭标签（下一个 </div> 之后是小程序 dim-block）
const wrongBodyEnd = c.indexOf('</div>\n\n  <div class="dim-block">\n    <div class="dim-header">\n      <div class="dim-icon" style="background:#e8faf0"><img src="${ICONS.mini}"', wrongItem1);

console.log('错误结构起始:', wrongBodyStart > 0 ? '✅' : '❌', '位置:', wrongBodyStart);
console.log('错误结构结束:', wrongBodyEnd > 0 ? '✅' : '❌', '位置:', wrongBodyEnd);

if (wrongBodyStart < 0 || wrongBodyEnd < 0) {
  console.log('❌ 无法定位错误结构');
  process.exit(1);
}

// 提取6条内容（去掉外层的 <div class="dim-body"> 和 </div>）
let wrongContent = c.substring(wrongBodyStart, wrongBodyEnd);
// 去掉开头的 <div class="dim-body">\n      和结尾的 \n    \n  
wrongContent = wrongContent.replace(/^\s*<div class="dim-body">\s*/, '');
wrongContent = wrongContent.replace(/\s*$/, '');
console.log('提取的内容长度:', wrongContent.length);
console.log('内容预览:', wrongContent.substring(0, 200));

/* === Step 2: 删除错误结构（包括前面孤立的 </div>）=== */
// 往前找孤立 </div> 的位置（在 wrongBodyStart 之前）
const orphanClose = c.lastIndexOf('</div>', wrongBodyStart);
console.log('孤立 </div> 位置:', orphanClose);

// 删除 orphanClose 到 wrongBodyEnd 之间的内容
const beforeOrphan = c.substring(0, orphanClose);
const afterWrong = c.substring(wrongBodyEnd);
console.log('删除区间长度:', wrongBodyEnd - orphanClose);

/* === Step 3: 把6条内容插入到正确微信小店 dim-body 里 === */
// 找正确微信小店块的位置（在 p7 中，视频号之后）
const storeBlockStart = c.indexOf('微信小店', c.indexOf('视频号', p7));
// 找正确微信小店 dim-body 的开启位置
const correctBodyStart = c.indexOf('<div class="dim-body">', storeBlockStart);
// 找正确微信小店 dim-body 的关闭位置
const correctBodyEnd = c.indexOf('</div>', correctBodyStart + 1);

console.log('正确小店 body 起始:', correctBodyStart);
console.log('正确小店 body 结束:', correctBodyEnd);

// 在 correctBodyStart 之后插入6条内容
const beforeInsert = beforeOrphan + afterWrong.substring(0, correctBodyStart - wrongBodyEnd);
const afterInsert = afterWrong.substring(correctBodyStart - wrongBodyEnd);

// 重新计算位置（因为删除了内容，后面所有位置都变了）
// 更简单的方法：在删除后的字符串上重新定位
let newC = beforeOrphan + afterWrong;
const newStoreBlock = newC.indexOf('微信小店', newC.indexOf('视频号', newC.indexOf('id="p7"')));
const newBodyOpen = newC.indexOf('<div class="dim-body">', newStoreBlock);
const newBodyClose = newC.indexOf('</div>', newBodyOpen + 1);

// 在 dim-body 开启后插入6条内容
const insertPos = newBodyOpen + '<div class="dim-body">'.length;
newC = newC.substring(0, insertPos) + '\n      ' + wrongContent + newC.substring(insertPos);

/* === Step 4: 更新正确微信小店的 dim-count === */
// 数一下正确小店块里有多少条 item
const storeBlock = newC.indexOf('dim-title-text">微信小店</div>', newC.indexOf('id="p7"'));
const storeBody = newC.indexOf('<div class="dim-body">', storeBlock);
const storeBodyEnd = newC.indexOf('</div>\n  </div>', storeBody);
const itemCount = (newC.substring(storeBody, storeBodyEnd).match(/<div class="item/g) || []).length;
console.log('正确小店块 item 数量:', itemCount);

// 更新 dim-count
newC = newC.replace(
  /<div class="dim-count">\d+ 条更新<\/div>(?=[\s\S]{0,500}dim-title-text">微信小店)/,
  `<div class="dim-count">${itemCount} 条更新</div>`
);

/* === Step 5: 写回文件 === */
fs.writeFileSync(path, newC, 'utf8');
console.log('✅ 修复完成，写入文件');
console.log('新文件长度:', newC.length);
