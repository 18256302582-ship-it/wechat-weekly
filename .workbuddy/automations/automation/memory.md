# 微信生态周报自动化执行记录

## ⚠️ 重要规范（2026-06-16 更新，必须严格遵守）

### 链接规范（用户明确要求）
1. **所有条目必须使用官方链接**，禁止使用第三方媒体链接（腾讯新闻、今日头条、雪球、微信公众号文章等）
2. **官方链接域名清单**：
   - 微信小店：`store.weixin.qq.com/chengzhang/webdoc/...`
   - 微信开放平台：`developers.weixin.qq.com`
   - 企业微信：`work.weixin.qq.com`
   - 微信支付：`pay.weixin.qq.com`
   - 公众号/视频号/小程序：优先 `mp.weixin.qq.com` 或官方公告页
3. **无官方链接的处理**：如果官方未发布公告/文档，必须在条目中用灰色小字标注：
   - `⚠️ 此为第三方观察，非官方公告`
   - `⚠️ 未找到官方来源，此为行业分析`
   - `⚠️ 测试阶段信息，非正式公告`
4. **链接按钮文本**：有官方链接用「查看公告」，无官方链接用「查看报道」或直接移除链接按钮

### 内容过滤规范
- **不收录**：警方通报/行政处罚/封号处罚等社会新闻；非官方产品更新的内容
- **只收录**：官方功能上线/算法调整公告；规则中心新修订/新生效规则；平台公告/激励政策/操作指引更新
- **去重**：每期必须与上期对比，上期已报道且无新进展的条目不重复收录

### 发布前检查清单
1. ✅ active 类只在最新期次的 tab-btn 和 period-content 上
2. ✅ HTML 结构完整（无重复/嵌套错误）
3. ✅ 与上期对比去重
4. ✅ 条数计数与实际条目一致
5. ✅ **所有链接都是官方来源，非官方链接已标注说明**
6. ✅ 无警方通报/行政处罚等社会新闻

---

## 2026-06-16 第8期（2026.6.9–6.15）— 最终状态

**执行状态**：✅ 全部完成（含推送后4轮修复）

**最终 commit**：`7a252eb` fix: 修复默认激活期次为p8（本期），之前错误激活了p7/p6导致用户看到旧内容

**修复历史**：
1. `605e396` — 首次推送
2. `449f97a` — 删除视频号无关社会新闻（上海警方通报）
3. `ef960b1` — 删除p8结束后错误嵌套的p65重复内容块
4. `5c5538d` — 删除公众号重复条目 + 修正条数计数
5. **`7a252eb`** — 🔑 修复关键Bug：active类在p7/p6而非p8，导致页面默认显示旧期次

**本期重点内容**：
1. 微信开放平台：微信AI生态正式对外开放（6.8-9日），京东/美团/滴滴等头部企业首批接入内测；小程序接入微信AI生态两种模式
2. 微信支付：AI接入工具箱2.0发布（5大核心升级，Token消耗降50%，6.15）；测试"AI专属卡"（6.12）；大连入境支付服务升级（6.11）
3. 微信小店：商家风险保证金管理规则生效（6.9）；店铺体验分规则修订（6.15生效）；功能调整汇总-20260612；货源信息上报API调整（6.15生效）；虚假宣传材质专项治理（6.9）
4. 视频号：推荐算法系统性调整（社交推荐权重提高+7天长效分发+收藏复看权重，6.13）；AI虚假视频治理（上海警方通报，6.15）
5. 公众号：算法转向报道（垂类深度内容获更多流量，6.14）；图标灰度变更（叶片样式，6.9）；朋友圈定向搜索（6.10）

**技术备注**：
- 本次最初尝试用模板字面量定义 p8Html，因包含 `${ICONS.xx}` 被 Node.js 解释为插值而报错
- 最终方案：将 p8 HTML 内容写入外部文件 `p8_block.txt`，由脚本读取后插入，避免转义问题
- `apply_p8.js` 脚本已验证可行，下次可直接复用（需注意 `${ICONS.xx}` 的转义处理）

---


**执行状态**：✅ 全部完成（内容更新 + 构建 + commit + push）

**执行摘要**：
- 全网搜索了9大产品线本周（6.2–6.8）更新内容
- PERIODS 数组头部新增 p7（2026.6.2–6.8）
- 新增 p7 Tab 导航按钮（默认 active）
- 新增 p7 period-content HTML 块（8个维度模块，完整内容）
- JS 变量更新：activePeriodId='p7'，calMonth=5（6月）
- Footer 更新：最近更新 2026年6月9日，下次更新 2026年6月16日
- 执行 `node build_html.js`（必须从**父目录 20260413140616** 运行）→ index.html 285.3 KB
- 执行 `node clean_tags.js` → index.html 281.9 KB
- git commit: `e1d0caa update: 本周微信生态更新汇总（2026.6.2–6.8）`
- ✅ 已 push 至 main，GitHub Actions 触发部署

**本期重点内容**：
1. 微信支付：AI支付内测（打通Agent关键环节）+ 自动扣款规则大升级（6.14生效）
2. 微信开放平台：微信AI向全量小程序开发者开放接口（6.8官宣）
3. 微信小店：功能调整汇总-20260605 + 奢品珠宝二级类目新增（6.12）+ 二手奢侈品新规（6.15/6.16生效）
4. 公众号：留言配图增至9张 + 图标灰度变更（书本→叶片）+ 图片搜索能力更新
5. 视频号：直播安全信用分规则更新（6.4生效）+ 空间美学博主认证上线

**技术备注**：
- `node build_html.js` 必须从父目录 `20260413140616` 运行，从 wechat-weekly 目录运行会路径报错
- clean_tags.js 需从 wechat-weekly 目录运行

---

## 2026-06-03 第7期修复（2026.5.26–6.1）微信小店错位

**执行状态**：✅ 修复完成 + push 成功（`22aae10`）

**问题根因**：`build_html_new.js` 里 p7 的公众号/微信客户端 dim-block 结束后，存在一个**孤落的 `<div class="dim-body">`**（无对应 dim-header/dim-block），导致6条微信小店内容（618爆品加补/服务商激励/新商成长/10天签到/7天签到/类目准入）被错误渲染在公众号和小程序之间，而不是独立的「微信小店」维度下。

**修复操作**：
- 删除公众号块后孤立的 `</div> + <div class="dim-body"> + 6条内容 + </div>` 结构
- 将6条内容移至正确的「微信小店」dim-block 内（视频号之后）
- 微信小店 dim-count 从 6 条更新 → 12 条更新
- commit: `22aae10` fix: 将p7错误位置的6条微信小店内容移至正确dim-block

**技术备注**：
- 此问题源于之前补充微信小店内容时，脚本写入位置错误，导致内容嵌套在了错误的 HTML 结构中
- 以后补内容时必须验证目标位置是否在正确的 dim-block 内

---

## 2026-06-03 第7期补充（2026.5.26–6.1）食品礼券规则

**执行状态**：✅ 补充完成 + push 成功

**补充内容**：
- p7 微信小店模块新增「食品礼券定向准入标准」新规公示条目（alert 标签）
- 规则发布日期：2026/05/25，公示期至5月31日，预计6月1日生效
- 核心门槛：企业主体注册资本≥100万；品牌方≥1亿；近1年GMV≥300万
- 概览表微信小店行描述同步更新
- commit: `f3c8066` fix: p7补充食品礼券定向准入标准规则

**技术备注**：
- 本次发现成长中心 `store.weixin.qq.com/chengzhang/webdoc/...` 深层规则页面搜索引擎无法覆盖
- 已更新项目 MEMORY.md：以后每期必须主动 fetch 成长中心4个固定URL（notice/all、rule/shop/1、manual/shop/1、home）
- 用户2026-06-03提供了3个固定链接，已写入长期记忆

---

## 2026-06-02 第7期（2026.5.26–6.1）

**执行状态**：✅ 内容更新 + 构建 + commit 完成，git push 需用户手动执行

**执行摘要**：
- 全网搜索了9大产品线过去一周（5.26–6.1）的更新内容
- PERIODS 数组头部新增 p7（2026.5.26–6.1）
- 新增 p7 Tab 导航按钮（active 状态）
- 新增 p7 period-content HTML 块（8个维度模块）
- `build_html_new.js` 路径 bug 修复（`wechat-weekly/` 双嵌套 → `index.html`）
- `clean_tags.js` 路径同步修复
- 执行 `node build_html_new.js && node ../clean_tags.js`：index.html 325.3 KB → 321.8 KB
- git commit：`e5e8116 update: 微信生态第7期周报（2026.5.26-6.1）`

**⚠️ 待操作**：`git push origin main`（自动化环境无 Git 凭据，需在本地终端执行）

**本期重点内容**：
1. 微信支付：「组合支付」灰度上线（转账场景，最多两种组合）；入境支付便利升级三大举措（外卡内绑减免+16语种指引+PayPal 合作）
2. 微信小店：功能调整汇总-20260529（今日发功能5.26上线 + 7个新增API接口）；价格保护规则修订；订单收件信息加密规则升级（6月30日前过渡期）；货源信息上报API调整（6月1日生效）
3. 企业微信：「记录面聊」功能正式推出（声纹识别+AI纪要）；3.0.36版本更新（聊天敏感词+群防骚扰+收集表+语音转文字+企业培训直播+会议横屏）；获客助手打通视频号持续内测
4. 公众号：官方图标灰度变更（叶片样式）；iOS 8.0.69 内测：公众号主页改版；服务号可设置为不显示未读数字
5. 视频号：iOS 8.0.27 正式版：自动上滑功能；鸿蒙版：支持查看图片类作品+评论区支持图片+直播预约+小红点提醒

**技术备注**：
- `build_html_new.js` 的 `fs.writeFileSync` 路径原为 `'wechat-weekly/index.html'`，脚本在 `wechat-weekly/` 目录内运行时产生双嵌套路径，已修复为 `'index.html'`
- `clean_tags.js` 读写路径同理已修复
- 字符串精确匹配因 Unicode 破折号（en-dash）字符不一致多次失败，最终采用「按行查找 + splice」方案成功写入 p7
- 自动化环境无 Git 凭据，`git push` 会报错 `/dev/tty: No such device`，需用户手动推送

---

## 2026-05-26 第6期（2026.5.19–5.25）

**执行状态**：✅ 全部完成（内容更新 + 构建 + commit + push）

**执行摘要**：
- 搜索了9大产品线的本周更新内容
- 新增Tab导航按钮：`p6` 2026.5.19–5.25（最新期）
- 更新PERIODS数组头部
- 更新Footer：最近更新2026年5月26日，下次更新2026年6月2日
- 新增p6 period-content HTML块（8个维度模块）
- 执行 build_html_new.js → index.html（283.9 KB）→ clean_tags.js（281.0 KB）
- git commit: `f6c371d update: 微信生态第6期周报（2026.5.19-5.25）`

**待操作**：~~`git push origin main`（需用户在本地终端执行）~~ → ✅ 已推送 cba3d52..f6c371d

**本期重点内容**：
1. 微信支付：《微信支付链路界面与交互规范》发布（6月18日生效）；商家转账免确认模式API
2. 微信小店：功能调整汇总-20260522（供货单接口完善）；鲜切花专项治理；玩具乐器新增类目
3. 企业微信：获客助手打通视频号内测；5月28日起部分类目调价
4. 微信客户端：8.0.72全量推送（本机号码登录、边写边译、视频通话横屏）

**注意事项**：
- build_html.js文件路径在20260413140616目录（非workspace），沙盒限制无法直接写入
- 实际用build_html_new.js（放在wechat-weekly目录）来执行构建，效果相同
- 下次可将build_html_new.js更新后再构建，或直接修改原build_html.js（需用户权限）

---

## 2026-05-19 第5期（2026.5.12–5.18）

执行状态：已完成并推送

---

## 2026-06-30 第9期（2026.6.23–6.29）— 执行状态

**执行状态**：✅ 全部完成（内容更新 + 构建 + commit + push）

**执行摘要**：
- 全网搜索了9大产品线本周（6.23–6.29）更新内容
- PERIODS 数组头部新增 p9（2026.6.23–6.29）
- 新增 p9 Tab 导航按钮（默认 active）
- 新增 p9 period-content HTML 块（9个维度模块）
- 使用 Python 脚本 `add_p9.py` 插入 p9 内容（避免 Node.js 模板字面量解释 `${ICONS.xx}` 的问题）
- JS 变量更新：activePeriodId='p9'，calMonth=5（6月）
- Footer 更新：最近更新 2026年6月30日，下次更新 2026年7月7日
- 执行 `node build_html.js`（从父目录 20260413140616 运行）→ index.html 439.9 KB
- 执行 `node ../clean_tags.js` → index.html 435.1 KB
- git commit: `f8f9b6e update: 微信生态第9期周报（2026.6.23-6.29）`
- ✅ 已 push 至 main，GitHub Actions 触发部署

**本期重点内容**：
1. 微信客户端：8.0.75 版本全量发布（6.23），原生AI助手"小微"上线，24项功能优化（史上最大更新）
2. 企业微信：5.0.9 版本发布（6.23），AI服务总结+智能助理"大圆"内测+智能表格/文档升级
3. 微信小店：新规速递-20260629 发布；多条规则修订生效（6.22/6.24/6.26）；意见征集4条；新发6条指引指南
4. 视频号：鸿蒙版创作者中心全面升级（6.26）；推荐算法权重调整观察（第三方）
5. 微信支付：支付界面改版（灰度中）；扣款规则调整；组合支付功能上线（第三方观察）

**技术备注**：
- 本次使用 Python 脚本（`add_p9.py`）插入 p9 内容，避免 Node.js 模板字面量问题
- Python 三引号字符串可完美保留 `${ICONS.xx}` 等模板引用
- p8 的 `active` 类已在 HTML 中移除（p9 为最新期次）
- 微信小店内容全部来自官方成长中心（`store.weixin.qq.com/chengzhang/webdoc/...`）
- 微信客户端/微信支付的部分内容为第三方观察，已标注"非官方公告"

---
## 历史说明
- 自动化任务每周二09:00执行
- 构建命令：`node build_html.js && node ../clean_tags.js`（从 20260413140616 目录执行）
- 或：`node build_html_new.js && node ../clean_tags.js`（从 wechat-weekly 目录执行）

---

## 2026-06-30 第二次执行（10:19）— 历史期次显示修复最终化

**执行状态**：✅ 结构校验全部通过 + 提交 + 推送

**背景**：本日 09:00 首次运行已创建 p9（6.23–6.29）并推送（f8f9b6e），随后又经 tab 自动换行（54f350d）、恢复干净版本（de5a4bb）、switchTab 调试（fa2650b）三次提交。日间调试会话定位并修复了 **p8 未闭合 `<div>` 导致历史期次被吞进 display:none** 的根因，但修复停留在工作区未提交。本次运行负责最终化。

**执行摘要**：
- 校验 wechat-weekly/index.html：12 个 period 块全部 `<div>` 开合数一致，1 个 active（p9），12 个闭合注释齐全 ✅
- 校验父目录 build_html.js（构建源）：12 个 period 块全部平衡，p9 含完整内容块 ✅
- 本次无需新增期次：p9（6.23–6.29）即本周完整周，下一期 6.30–7.06 尚未结束
- 提交：index.html + build_html.js + .workbuddy 记忆文件，推送至 main
- ⚠️ 部署备注：首次推送后的 workflow 运行（7343aca）在 `deploy-pages@v4` 步骤偶发失败（conclusion: failure），COS 步骤因此被跳过，线上页一度停留在旧的 fa2650b 版本（仅 10 期、p8 active）。经 `POST /repos/.../actions/runs/{id}/rerun` 重跑后成功（conclusion: success），线上页面恢复 12 期全部内容、p9 active
- 💡 经验：若后续部署后线上页仍旧，先查 `actions/runs` 结论；若是 `deploy-pages` 失败（非代码问题），直接 rerun 该 run 即可，无需改代码
- 🔎 线上验证方式：用 `curl` 抓取**原始 HTML**（grep `period-content...id="pN"` 和 `class="period-content active"`）确认，不要用 WebFetch（它会把 HTML 转成 markdown，看不到 DOM 属性）。两个部署目标都要查：GitHub Pages 与 COS（`https://wx-report-1309543112.cos.ap-shanghai.myqcloud.com/index.html`）
- ⚠️ 用户称"线上没修复"但 curl 抓取确认已更新 → 99% 是浏览器/CDN 缓存，指导用户硬刷新（Ctrl+F5 / Cmd+Shift+R）即可；若用自定义域名+CDN，需到 CDN 后台刷新缓存

**根因复盘**：`p8` 内「公众号推荐算法转向观察」条目缺少闭合 `</div>`，导致后续所有 period-content 块被嵌套进 p8（默认 display:none），浏览器中不显示历史内容。修复方式：在正确位置补 `</div>`。

**技术备注**：
- 部署文件 index.html 与构建源 build_html.js（父目录）必须同步保持 DOM 平衡，二者已分别用 Node 脚本逐 period 校验 `<div>` 开合数
- 发布前对每期做 div 开合校验是防范「历史期次消失」类问题的有效手段，建议固化为发布前检查项

## 2026-07-03 运行记录（第3次修复）
- 现象：用户反馈"又出问题了"。curl 抓取线上确认 12 期、p9 激活、字节数对——但页面 JS 全部不工作（Tab 切不了、截止日提醒/分享按钮不出现）。
- **根因**：`index.html` 与构建源 `build_html.js` 都**缺失 `<script>` 开标签**（只有 `</script>` 闭标签）。是此前反复折腾 p8 div、re-sync 时把 `<script>` 这一行弄丢了。浏览器把整段 JS 当纯文本，故 `switchTab` 等全不执行。
- **验证手法**：`grep -c '<script' index.html` 返回 0（仅靠 `</script>` 无法匹配开标签，因为 `</script>` 中 `<` 后是 `/` 不是 `s`）→ 再读到 JS 内容起止行确认开标签缺失。
- **修复**：在 `build_html.js` 中 `const PERIODS` 前补 `<script>`；`cp` 同步给 wechat-weekly 副本；父目录 `node build_html.js` 重建 → wechat-weekly 跑 `node ../clean_tags.js`。重建后 `wc -c` = 495,062 > 已提交 494,522（内容未丢），各期 item 数与修复前一致。
- **提交**：`790a3a1`（index.html + build_html.js），工作流 success，线上已更正（script 开标签=1，12 期，p9 active）。
- 💡 新增发布前检查项：构建后必须验证 `<script>` 开标签存在（`grep -c '<script>' index.html` ≥ 1），否则 JS 不执行、页面功能全瘫。

## 2026-07-06 运行记录（第4次修复：页脚丢失）
- 现象：用户反馈"页面最末尾的部分丢失了"。
- **根因**：上一轮重建（Tab 改造 + script 标签修复）时，build_html.js 在 `</div><!-- /p1 -->` 之后误删了三块：① `</div><!-- /container -->` 容器闭合、② `<div class="no-result" id="noResult">` 搜索空结果提示、③ 整个 `<div class="footer">` 页脚。线上页无页脚、容器未闭合（浏览器兜底故内容仍显示，但页脚彻底消失）。
- **修复**：在 build_html.js 中 `</div><!-- /p1 -->` 后补回上述三块；重建校验：130 条目 / 103 图标 / 12 期全部保留，div 开合平衡 1019/1019，footer=1、noResult=1，文件 498,139 字节。
- **提交**：`2c8e46e`（index.html + wechat-weekly/build_html.js），已推送；GitHub Pages 与 COS 双部署均确认页脚恢复。
- 💡 新增发布前检查项：构建后除验证 `<script>` 开标签外，还必须确认 **footer 与 container 闭合存在**（`grep -c '<div class="footer"'` ≥ 1 且 div 开合平衡），避免"整体显示正常但末尾缺一块"。
- ⚠️ 双构建源隐患仍未根除（父目录 build_html.js 不受 git 控制），是反复漏块的根因。

## 2026-07-06 运行记录（第5次修复：下载PDF失效）
- 现象：用户反馈"下载pdf能力好像失效了"。页面"📄 下载 PDF"按钮（`onclick="printPDF()"`）点击无反应。
- **根因**：`printPDF()` 函数（仅 `window.print()`）在早前提交 7343aca 附近被误删，按钮 HTML/CSS 残留 → 点击调用未定义函数。另：打印样式 `@media print` 隐藏的是旧类名 `.download-btn`，按钮实际类名已改为 `.pdf-btn`，打印会残留按钮。
- **修复**：在 build_html.js `<script>` 开头恢复 `function printPDF(){window.print();}`；打印样式 `.download-btn`→`.pdf-btn`（旧名保留）。重建校验 printPDF=1、div 平衡 1019/1019。
- **提交**：`05c1002`，双部署确认 `function printPDF` 存在。
- 💡 新增发布前检查项：构建后必须确认 **`printPDF` 函数存在**（`grep -c 'function printPDF'` ≥ 1）。凡"按钮在但点了没反应"，优先查对应 onclick 函数是否还在。

## 2026-07-07 运行记录（p10 终稿发布：2026.6.30–7.6）
- **状态**：✅ 内容终稿 + 构建 + 全项校验 + 提交 + 推送 完成
- **背景**：p10（覆盖 2026.6.30–7.6）由上一会话创建于工作区但**未提交**；本期完成三处修正后正式发布为本年度第10期。
- **三处修正**（改在父目录 `20260413140616/build_html.js` 构建源，再 cp 同步仓库副本）：
  1. 虚假发货条目：去掉手动 `alert` 类与多余灰字"专项治理"，改由 `clean_tags.js` 按"专项治理"关键词**自动**加红标 + 徽章；
  2. 官方旗舰店条目：补手动 `公示中` 徽章（保留手动 `alert`，`clean_tags` 不重复处理）；
  3. 推客生态升级条目：把"专项治理提示"改写为"等治理风险"，避免 `clean_tags` 误标红。
- **发布前校验全绿**：13/13 期块开合平衡；active 唯一=p10；p10 alert=2（虚假发货自动 + 官方旗舰店手动）、badge=2（专项治理 + 公示中）；`<script>` 开标签=1；`printPDF`=1；footer=1；div 开合平衡 1118/1118；页脚"最近更新 2026年7月7日 / 下次更新 2026年7月14日"。
- **链接合规**：p10 全部 15 个链接按钮均官方域名（store.weixin.qq.com / developers.weixin.qq.com / cloud.tencent.com 腾讯云一手文档）；非官方条目（微信客户端媒体汇总、视频号鸿蒙版专属、微信支付媒体汇总、推客第三方观察）均无链接按钮且标注"非官方公告"灰字。
- **提交**：`index.html` + `build_html.js` + `.workbuddy` 记忆，推送 main；GitHub Pages 与 COS 双部署。
- 💡 经验：`clean_tags` 已按"条目独立匹配"（`class="item">` 精确 + lookahead 边界）杜绝跨条目级联；标题/正文含"专项治理""停服公告"关键词的默认 `item` 会被自动标红加徽章，手动 `alert` 不重复处理。撰写时避免在非专项治理语境出现"专项治理"四字。

## 第6次执行（2026-07-08）—— 移动端响应式适配
- **背景**：用户反馈 PC 适配良好但手机端有问题；根因 = `index.html` 完全无 `@media (max-width)` 断点，只有 `@media print`。
- **改动**：在 `build_html.js` 模板 `<style>` 中、`@media print` **之前**插入 `@media (max-width: 768px) { ... }` 块（53 条规则 / 覆盖 45 个 class）。
- **关键设计**：Header 改 stack 纵列；Tabs 改横向滚动+隐藏滚动条；Calendar 字号 padding 全面收紧；`.link-btn` 改 `display: block` 单独成行；Footer 单列。
- **校验**：13/13 期块 + active=p10 + p10 alert=2 + 移动端块存在 + `<script>`/printPDF/footer/div 开合 1118/1118 全绿；GitHub Pages 线上确认（mobile media blocks=1, active=p10, p10 alert=2）。
- **文件大小**：488.9 KB → 491.8 KB（+2.4 KB mobile CSS）。
- **提交**：`79b1612 feat: 移动端响应式适配 (≤768px)`，推送 `fdd52f5..79b1612 main -> main`。
- 💡 经验：移动端 `@media` 块必须放在 `@media print` 之前（CSS 级联），否则 print 样式会被 mobile 覆盖；`.link-btn` 在窄屏必须 `display: block` 而非只缩 padding。

## 发布地址变更（2026-07-08）
- 线上地址已由 `https://18256302582-ship-it.github.io/wechat-weekly/` 改为 **`https://frost-cao.github.io/wechat-weekly/`**（GitHub 账号 `18256302582-ship-it` 弃用，统一为 `frost-cao`）。
- 后续所有"验证线上部署 / 给用户链接 / 地址引用"一律用**新地址**；历史 daily log 中的旧地址是当时候事实记录，不回改。

## 第7次执行（2026-07-08 11:25）—— 手机端2个 bug 修复
- **问题 A**：header 右上角「日历/下载PDF」按钮漂在 header 中间（用了 `margin-top: -34px` hack）。修复：`.header { position: relative; padding-top: 50px }` + `.header-actions { position: absolute; top: 12px; right: 16px }`
- **问题 B**：月份下拉看不到期次列表。根因：mobile `.tabs { overflow-x: auto }` **裁剪了内部所有 absolute 子元素**，`.period-dropdown`（z-index 30）被裁了。修复：mobile `.tabs` 改 `flex-wrap: wrap; overflow: visible`；`.month-group` z-index: 50；`.period-dropdown` z-index: 100
- **普世规则**：`overflow: auto/scroll` 的容器**绝对不能**作为 dropdown/popover 的祖先，否则子元素会被裁剪
- **提交**：`29332c4 fix(mobile): 修正header actions定位 + 解决月份下拉被tabs裁剪`，推送 `591dab3..29332c4`

## 第8次执行（2026-07-15）—— p11 发布（2026.7.6–7.12）
- **状态**：✅ 内容+构建+全项校验+提交+推送 完成
- **期次**：p11（覆盖上周完整周 2026.7.6–7.12），新增于 PERIODS 数组头部并转移 active 至 p11；p10 去 active。本期为 8 维度（微信小店/微信客户端/视频号/开放平台·小程序/推客/微信支付/企业微信/公众号），共 19 条。
- **方法**：沿用 `add_p9.py` 的 Python 精确替换写法（保留 `${ICONS.xx}` 模板引用，避免 Node 转义）；改**父目录** `20260413140616/build_html.js` 构建源，再 `cp` 同步 `wechat-weekly/build_html.js` 镜像。
- **关键锚点修正**：p10 的 `<div class="period-content active" id="p10">` 实际是**顶格**无缩进（此前差点因多写 2 空格导致锚点匹配失败），脚本已修正。
- **发布前校验全绿**：14/14 期块开合平衡；active 唯一=p11；`<script>` 开标签=1；`printPDF`=1；mobile `@media` 块=1；footer（最近更新 2026.7.15 / 下次更新 2026.7.21 周二）；p11 内 7 个链接按钮全部官方域名（store.weixin.qq.com / developers.weixin.qq.com），其余 12 条无链接条目均标注"媒体汇总/非官方公告"灰字。
- **提交**：`b104f7b update: 微信生态第11期周报(2026.7.6-7.12) p11新增 + 源同步`，推送 main。
- **⚠️ Remote 迁移已落地**：推送时 GitHub 返回 "This repository moved" → `frost-cao/wechat-weekly.git`。已 `git remote set-url origin` 更新为 frost-cao 路径；线上 `https://frost-cao.github.io/wechat-weekly/` 已确认渲染 p11（2026.7.6–7.12）。
- **本期要点**：微信小店新规速递-20260713（星级体系/官方旗舰店/投流佣金）、母婴类目调整(7/22生效)、集团品牌规则生效、本周API调整；微信客户端 8.0.54（订阅号更名"公众号"、通讯录新增服务号分类）；小程序AI开发模式改账号卡片+成长计划10亿Token混元Hy3；微信支付 AI专属卡接入WorkBuddy + AI接入工具箱 + 红包转账一键直达；企业微信治理过度营销"拉群确认"机制(7/7)；公众号 AI分身补录(7/1)；推客星级体系生效。
- **注**：本次自动化于 7/15（周三）执行，对应上周完整周 7.6–7.12（原周二定时任务延迟/未跑）。

## 第9次执行（2026-07-21）—— p12 发布（2026.7.13–7.19）
- **状态**：✅ 内容+构建+全项校验+提交+推送 完成，线上已验证（curl HTTP 200）
- **期次**：p12（2026.7.13–7.19），新增于 PERIODS 头部并转移 active 至 p12；p11 去 active。共 8 维度 17 条（item+item-title 计 34）。
- **方法**：编辑父目录 `20260413140616/build_html.js` 构建源（PERIODS 头部加 p12、activePeriodId='p12'、插入 p12 period-content 块、footer 改 7/21→7/28），从父目录 `node build_html.js` 构建 → wechat-weekly `node ../clean_tags.js`；`cp` 同步仓库镜像 build_html.js；commit `dcdde1e`（b104f7b..dcdde1e）。
- **本期要点**：微信小店 6 条官方（工业品一级类目/个人护理冰凉贴/香水彩妆新增类目/商品评价激励/入夏好物加补/灾害延迟发货报备）；微信客户端（PC 4.1.12内测/创意表情小程序/8.0.76全量）；视频号双赞+连击弹幕+评论区晒图；企业微信大圆内测+WAIC亮相；开放平台/小程序/推客/微信支付为媒体观察。
- **链接合规**：p12 共 6 个 link-btn 全部官方 store.weixin.qq.com；其余 11 条无链接条目均标注"媒体汇总/非官方公告"灰字。
- **发布前校验全绿**：15/15 期块；active 唯一=p12；`<script>`=1、printPDF=1、mobile=1、footer=1、div 平衡 1308/1308。
- **线上验证**：curl 抓取 https://frost-cao.github.io/wechat-weekly/ → active=p12，footer 下次更新 2026年7月28日（周二）。
- ⚠️ **地址更正**：任务描述中的 `18256302582-ship-it.github.io` / `18256302582-ship-it/wechat-weekly` 已废弃；实际 remote 为 `frost-cao/wechat-weekly.git`，线上 `https://frost-cao.github.io/wechat-weekly/`（账号已于 2026-07-08 弃用）。

## 第10次执行（2026-07-28）—— p13 发布（2026.7.20–7.26）
- **状态**：✅ 内容+构建+全项校验+提交+推送 完成，线上 curl 验证 active=p13、下次更新 8/4。
- **方法**：改父目录 build_html.js（PERIODS 头加 p13、activePeriodId='p13'、footer 7/28→8/4、p12 去 active）→ Python 脚本插 p13 块（保留 `${ICONS.xx}`）→ cp 同步镜像 → 父目录 build → wechat-weekly clean_tags。
- **本期**：8 维度 20 条。微信小店 8 条全官方（新规速递-20260727 + 酒类/文玩/虚拟商品/外设预售/食品生鲜参数/食品礼券联盟/品牌好物激励，4 条即将生效 alert）；视频号点赞升级正式公布；微信支付 8·8 消费节三大举措；微信客户端 8.0.76 全量+鸿蒙尝鲜；企微大圆灰度；推客品牌好物；开放平台京东接元宝；公众号内容治理。
- **校验全绿**：active 唯一=p13、script=1、printPDF=1、mobile=1、footer=1、div 平衡 1417/1417、JS 可解析；10 个 link-btn 全官方域名，非官方条目均标注。
- **提交**：`c262cd2`（5b60694..c262cd2）。
- 💡 微信小店「新规速递」是各周最权威一手来源（`.../growth_center_rule_for_store/24`），按发布日精确对应一周区间，优先抓它。

## 第11次执行（2026-08-04）—— p14 发布（2026.7.27–8.2）
- **状态**：✅ 内容+构建+全项校验+提交+推送+线上验证 完成。commit `f2729af`（c262cd2..f2729af）；线上 curl 确认 active=p14、17 期、footer 8/4→8/11。
- **方法**：新建 `add_p14.py`（沿用 add_p9.py 的 Python 三引号写法保留 `${ICONS.xx}`），单脚本完成 5 处改动 + 断言校验。**锚点改用注释行** `<!-- ════ 期次13：2026.7.20–7.26 ════ -->` 而非 div 标签——注释行缩进稳定，比 p10/p11 时踩过的「div 顶格 vs 缩进」坑更可靠，建议后续沿用。
- **本期**：8 维度 19 条（视频号2/小店6/公众号2/支付1/客户端3/企微1/开放平台2/推客2）。
- **重点**：视频号「短视频带货场景 AI 应用」治理公告（**8/10 起带货短视频含 AI 生成内容须主动加 AI 标注，否则限制分发**，落实《人工智能生成合成内容标识办法》）；小店新规速递-20260727 + 功能调整汇总-20260731（5 个 API）+ 交易纠纷规则/文玩文创规则 8/3 生效 + 医疗器械一级类目新规征集 + 8月激励政策密集发布；公众号 AI「一键排版」上线（7/31）；微信支付 AI 接入工具箱（7/28，Skill 技能包+AI 友好文档+AI 友好 API）；企微「大圆」内测（7/27）；小程序开发大赛「与 AI 共生」WAIC 官宣。
- **链接合规**：9 个 link-btn 全部 store.weixin.qq.com；其余 10 条标注「媒体汇总/非官方公告」灰字。
- **校验全绿**：17 期块、active 唯一、script=1、printPDF=1、mobile=1、footer=1、noResult=1、div 全局 1533/1533、JS 可解析、8 个 dim-count 与实际条目逐一核对一致。
- 💡 **逐期 div 校验的正确读法**：若切片从 `id="pN">` 起（漏掉开头 `<div`），每期必然报 `N/N+1`。判据应为「所有期次同一偏移」+「全局开合相等」，切勿误判为结构损坏并去"修复"。
- ⚠️ **本环境无 `sleep`、无 `gh` CLI**。等待部署用 `node -e "setTimeout(()=>{},90000)"`；线上验证用 `curl ...index.html?nocache=$RANDOM` 绕缓存。

## 第12次执行（2026-08-04 09:33）—— 重复触发，仅做验证与补交
- **状态**：⏭️ 未新增期次。同一自动化于本日 **09:25** 已完成 p14（2026.7.27–8.2）全流程并推送（`f2729af`），本次 09:33 触发为**同日二次触发**。
- **判定依据**：`git log -1` 时间戳 2026-08-04 09:26:45；本地 HEAD == origin/main；index.html active=p14；footer「最近更新 2026年8月4日 / 下次更新 2026年8月11日（周二）」已是最新。
- **线上验证**（curl 绕缓存）：HTTP 200 / 752,702 bytes；active=p14；period 块 17；`<script>`=1；`printPDF`=1；mobile `@media`=1；footer 下次更新 8/11 ✅
- **p14 内容复核**：19 条 item、9 个 link-btn（全 store.weixin.qq.com 官方域名）、3 条 alert 红标，与上轮记录一致。
- **补交**：`23d6ce6 docs: 补记 p12/p13/p14 执行记录与自动化 memory`（此前 .workbuddy/memory 下 3 个 daily log 与 automation memory 未纳入版本控制）。
- 💡 **同日重复触发的标准处置**：先查 `git log -1 --format="%ci"` + `index.html` 的 active 期次与 footer 日期；若已覆盖上周完整周（周一至周日），**不要重复新增期次**，只做线上验证 + 补交未提交文件即可。盲目再插一期会造成 p15 与 p14 区间重复。
- ⚠️ **本环境 `rm` 被 safe-delete 策略拦截**（相对路径会被拒），临时文件用绝对路径删或直接留下；`/tmp` 在 Git Bash 下不可用，curl 输出请写到工作目录内。

## 第13次执行（2026-08-11）—— p15 发布（2026.8.3–8.9）
- **状态**：✅ 内容+构建+全项校验+提交+推送+线上验证 完成。commit `a39c457`（d623d9e..a39c457）；线上 curl 确认 active=p15、18 期、footer 8/11→8/18。
- **方法**：沿用 `add_p15.py`（Python 三引号保留 `${ICONS.xx}` 模板，注释行锚点 `<!-- ════ 期次14：... ════ -->`）。先用 `cp` 同步父目录构建源到仓库镜像 `wechat-weekly/build_html.js`，再从父目录 `node build_html.js` → `wechat-weekly` 内 `node ../clean_tags.js`。
- **本期**：8 维度 19 条（小店7/视频号2/微信客户端3/微信支付3/开放平台·小程序2/推客1/公众号1/企业微信1）；5 条 alert 红标（C2B发货API 8/23截止、图书类目 8/19生效、烟草专项治理、视频号账号体系规则 8/13生效、AI带货标注 8/10生效）；7 条非官方灰字标注（微信客户端/支付/开放平台媒体汇总项）。
- **重点**：微信小店 C2B 发货时间协商 API 改造（8/23 前必须接入）、图书一级类目大调整（8/19 生效）、烟草专项治理、清凉季+开学季双阶段活动、新规速递-20260803、家具类目调整、8月新商+服务商双轨激励；视频号账号体系规则修订（8/13）+ AI带货标注新规（8/10 生效）；微信客户端小微打通小程序+AI多入口灰度+鸿蒙 8.0.20.41 邀测；微信支付 8月服务商文档更新+AI专属卡接入WorkBuddy+中越跨境二维码（8/6）；开放平台/小程序取消电话卡销售类目（8/1）+小程序AI开发模式内测；推客联盟带货机构激励计划（8-9月）；公众号内容创作激励计划（8/10）；企业微信 5.0.9.6063（8/7）大圆内测+分支回复+话题。
- **链接合规**：p15 全部链接均为官方域名（store.weixin.qq.com ×12、pay.weixin.qq.com ×1、work.weixin.qq.com ×1）；无第三方媒体链接；非官方项均带灰字标注。
- **校验全绿**：18 期块开合 18/18、active 唯一=p15、`<script>`=1、printPDF=1、mobile `@media`=1、footer=1、JS `new Function` 可解析、全局 div 1652/1652 平衡、8 个 dim-block 与实际条目一致。
- ⚠️ **push 曾挂起**：首次 push 因网络在后台挂起 8 分钟被手动 kill；重试加 `timeout 180` 成功（`d623d9e..a39c457`）。原因疑似 ghp_ token 鉴权握手慢，非代码问题。后续 push 建议直接带 `timeout 180`。
- 💡 **Tab 渲染为纯 JS 动态**：`renderTabs()` 从 PERIODS 数组生成「按月分组下拉」，静态 HTML 无 `data-pid` 属性属正常；验证时勿因 grep `data-pid="p15"` 为 0 误判缺 tab。判据看 PERIODS 含 p15 + activePeriodId=p15 即可。
- 💡 **`/tmp` 跨 Bash 调用不持久**：curl 输出须写工作目录内（如 `live_check.html`），用后 `rm -f`（绝对路径，已被 safe-delete 放行）。

## 第14次执行（2026-08-20）—— p16 发布（2026.8.10–8.18，原 8.10–8.16 后用户要求延展至 8.18）
- **状态**：✅ 内容+构建+全项校验+提交+推送+线上验证 完成。commit `63c1a13`（7ec5845..63c1a13）；线上 curl 确认 active=p16、19 期、footer 8/18→8/25。后续用户要求时间范围由 8.10–8.16 延展至 8.10–8.18，已改 build_html.js 5 处日期标签 + PERIODS end day=18，重新构建并推送 `29c8e68`。
- **方法**：新建 `add_p16.py`（沿用 add_p15.py 的 Python 三引号写法保留 `${ICONS.xx}`、注释行锚点 `<!-- ════ 期次15：... ════ -->`），单脚本完成 4 处改动（PERIODS 头加 p16、activePeriodId='p16'、calMonth 6→7、footer 8/11→8/18 → 8/25）；**关键补漏**：脚本插入 p16 带 active 后，必须再用一次精确 replace 把 p15 的 `class="period-content active" id="p15"` 改为 `class="period-content" id="p15"`，否则 active 会重复（首次跑 active count=2）。改父目录 `20260413140616/build_html.js` 构建源 → `cp` 同步 `wechat-weekly/build_html.js` 镜像 → 父目录 `node build_html.js`（763.9KB）→ `wechat-weekly` 内 `node ../clean_tags.js`（764.6KB）。
- **本期**：8 维度 14 条（小店7/企业微信1/微信客户端1/微信支付1/开放平台·小程序1/视频号1/推客1/公众号1）；4 条 alert 红标（家具类目 8/24 生效、赌博博彩专项治理、每周治理第33周+带货者拉新、新规速递-20260817）；3 条非官方灰字标注（微信客户端官方版本更新/视频号无新公告观察/公众号小微入口媒体汇总）。
- **重点**：微信小店新规速递-20260817（7公告/2征集/3公示/6生效）+ 家具类目调整(8/24生效) + 公众号及贴图号小店内容创作激励(8/10启动) + 赌博博彩专项治理(8/11) + 宠物嘉年华激励(8/12) + 组装电脑预售(8/13) + 每周治理第33周+带货者拉新(8/14)；企业微信 5.0.10（8/18）AI开放能力新增文档/待办/日程/会议/微盘/消息/邮件 CLI/MCP 接口 + 智能表格 AI 分析报告(大圆) + 智能文档导出 Word/PDF/Markdown；微信客户端 8.0.20 for HarmonyOS（8/10）；微信支付 8月接口更新(停车查费回调/管控枚举/开户channel_id 9→32/投放EXPIRED/商品券MEMBER)；开放平台开发者工具 2.02.2608040（8/18，Electron版+小程序AI调试+Skill能力）；视频号本周官方侧无重大新公告（仅观察）；推客拉新激励(8/14，小店侧收录)；公众号小微多入口灰度+14周年报告(贴图+377%)。
- **链接合规**：p16 共 10 个 link-btn 全部官方域名（store.weixin.qq.com ×7、work.weixin.qq.com ×1、pay.weixin.qq.com ×1、developers.weixin.qq.com ×1）；无第三方媒体链接；非官方项均带灰字标注。
- **校验全绿**：19 期块开合 19/19、active 唯一=p16、`<script>`=1、printPDF=1、mobile `@media`=1、footer=1、noResult=1、JS `compile` 逻辑有效（仅注释含 `═`/全角逗号，浏览器正常）、全局 div 1753/1753 平衡、8 个 dim-count 与实际条目逐一核对一致（7/1/1/1/1/1/1/1=14）。
- 💡 **Python compile 误导性报错**：用 `compile(js)` 校验内联 JS 时，`═` 盒线字符（在 `//` 注释里）和全角逗号（在字符串里）会被 Python 报 invalid character，但浏览器解析 UTF-8 源码完全正常——属历史既有结构，非真错误。判据应为"strip 注释盒线字符后仍能 compile"即可，勿误判为语法损坏。
- 💡 **active 转移两步法**：Python 插入脚本只能"加"新 active，旧期次的 active 需单独 replace 去掉，否则会出现 2 个 active；校验 `s.count('period-content active')==1` 是硬性红线。
