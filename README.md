# dsh-logo-silhouette

DeepSeek 鲸鱼 logo 剪影 —— [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness)（dsh）Web GUI 的全屏背景水印插件。
纯视觉、`pointer-events: none` 完全不挡交互，亮色 / 夜间模式自动适配。

DeepSeek whale-logo silhouette — a full-screen background watermark plugin for
the [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) (dsh)
web GUI. Purely visual, `pointer-events: none`, auto-adapts to light / dark.

## 效果 / Effects

- 固定铺满视口的背景层（`z-index: 0`，不挡点击、不挡滚动）
- 大号鲸鱼 logo 剪影固定在左下角（高 `min(56vh, 600px)`），`aria-hidden`
- 亮色模式：DeepSeek 品牌蓝（设计令牌 `--dsw-static-deepseek-500`），`opacity: .15`
- 夜间模式：柔和浅蓝（`--dsw-static-deepseek-300`），`opacity: .12`
- 夜间模式优化：
  - 颜色 / 透明度随主题 **300ms 平滑过渡**，切换不跳变
  - 鲸鱼顶部 **mask 渐隐**，上缘融入背景，去掉"贴纸感"
  - 暗色下降低不透明度，减少深色底上的眩光
  - 窄屏自动缩小并修正定位（`left`/`bottom`）
  - 尊重 `prefers-reduced-motion`，系统暗色 `prefers-color-scheme` 兜底

## 安装 / Install

```bash
# 任意 dsh profile（推荐 web）
dsh plugin --profile web add dsh-logo-silhouette
```

该包是标准的 dsh bundle（`dsh.bundle.patch`），`dsh plugin add` 会自动把它加入
profile 的层栈（`dsh.profile.bundles`），无需手改任何配置文件。重启 / 刷新
dsh web 后生效。

`dsh plugin --profile web add dsh-logo-silhouette` installs the bundle into the
profile layer stack automatically — no manual config edits. Restart / refresh
the dsh web GUI to see it.

从本地或 git 安装 / From a local path or git:

```bash
dsh plugin --profile web add /path/to/dsh-logo-silhouette
dsh plugin --profile web add github:shangcunyu/dsh-logo-silhouette
```

卸载 / Uninstall:

```bash
dsh plugin --profile web remove dsh-logo-silhouette
```

## 开发 / Develop

- `lib/client.js` —— 手写的 client bundle（`window.__ModuleLoader__` 格式，无构建依赖），
  全部视觉与 CSS 在这里
- `lib/index.js` —— host 半体（纯视觉插件，无宿主逻辑）
- `assets/favicon.svg` —— logo 源文件（vendored from deepseek-harness，MIT）
- `scripts/build.js` —— 从 `assets/favicon.svg` 提取鲸鱼路径并写回 `lib/client.js`：

```bash
npm run build
```

调整样式：改 `lib/client.js` 里的 `CSS` 常量（颜色走 DSH 设计令牌
`--dsw-static-deepseek-*`，带兜底色；位置 / 尺寸 / 透明度直接改数值）。

## License / 许可

MIT。鲸鱼 logo 图形取自 [deepseek-harness](https://github.com/deepseek-ai/deepseek-harness)
仓库（MIT 许可）；DeepSeek 鲸鱼 logo 系 DeepSeek 品牌资产，本插件仅将其作为
装饰性水印展示，不代表与 DeepSeek 官方有关联。
