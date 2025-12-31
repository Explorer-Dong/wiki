---
title: Windows
icon: material/microsoft-windows
---

本文介绍 Windows 11 的常见用法和 [常见命令](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/windows-commands)。

## 基本概念

### 大小写敏感问题

Windows 上是不区分大小写的（即大小写不敏感）。比如 `main.py` 和 `Main.py` 不能存在于同一个文件夹下：

![Windows 大小写不敏感](https://cdn.dwj601.cn/images/20251221152025.png)

而 [Linux](./linux.md) 上是区分大小写的（即大小写敏感）。那么比如 `main.py` 和 `Main.py` 就存在于同一个文件夹下，表示两个不同的文件：

![Linux 大小写敏感](https://cdn.dwj601.cn/images/20251221153013.png)

## 文件管理

### 打印目录内容 Get-ChildItem

```powershell
Get-ChildItem

# 简写
ls

# 简写
dir
```

### 新建文件 New-Item

```powershell
New-Item <file>
```

添加 `-ItemType Directory` 参数表示新建文件夹：

```powershell
New-Item <folder> -ItemType Directory
```

### 删除文件 Remove-Item

```powershell
Remove-Item <file>

# 简写
rm <file>
```

添加 `-Recurse` 参数表示删除文件夹：

```powershell
Remove-Item <folder> -Recurse

# 简写
rm -r <folder>
```

## 网络管理

### 查询 DNS 信息 nslookup

```powershell
nslookup <example.com> <dns_server>
```

## 常见配置

### 微软输入法快捷输入「」符号

Windows 自带的微软输入法挺好用的，至少不会出现兼容性问题。为了避免不同版本的配置路径可能不同的问题，读者可以直接在设置中搜索「拼音」并选择「简体中文拼音输入法设置」：

![在设置中搜索「拼音」并选择「简体中文拼音输入法设置」](https://cdn.dwj601.cn/images/20250928113051186.png)

而配置打出角标的方法，其实就是自定义一个短语。我们进入「词典和自学习」一栏，自己按照习惯配置一下就可以了：

![按照自己的习惯定义角标符号的快捷键](https://cdn.dwj601.cn/images/20250928113223799.png)

*注：上述路径可能会随着 Windows 的版本而有所变化，读者可自行寻找类似的字段进行修改。

### 删除文件打开选项中的失效项

你一定遇到过文件的打开选项中包含了你已经卸载的软件，如下图所示：

![文件的打开选项中包含了你已经卸载的软件](https://cdn.dwj601.cn/images/20251229103556431.png)

如果有一些强迫症的话，可以考虑删除这个选项。具体操作如下：

1）按下 `Windows + S` 进入搜索模式，输入注册表编辑器：

![选择：注册表编辑器](https://cdn.dwj601.cn/images/20251229102836231.png)

2）进入注册表以下路径：

```text
计算机\HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Explorer\FileExts
```

找到对应的文件后缀，例如示例中的 `.json` 后缀，然后进入 OpenWithList 子文件夹，删除其中失效的打开项，并修改 `MRUList` 的值为对应项即可。

!!! warning
    有时上述方法无法成功，可以考虑全局搜索失效的启动项名称，然后逐个删除。但这是危险行为，请谨慎操作。

### 禁止 Windows 更新

想要禁用 Windows 的更新，可以按照如下操作进行：

- 进入注册表的 `计算机\HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\WindowsUpdate\UX\Settings` 路径；
- 新建一个 `DWORD`，然后将其十六进制值改为 `dac` 即可（表示暂停 3500 天，即 500 周）。如果你懂十六进制的话，可以自行修改。

效果如图：

![暂停更新显示到 500 周](https://cdn.dwj601.cn/images/20250928102032578.png)

![最终效果](https://cdn.dwj601.cn/images/20250928102407969.png)

### 配置本地 DNS 服务

在部分网络情况下（比如校园网），有些网站因为各种因素而无法访问。在排除了 [GFW](https://baike.c114.com.cn/view.php?id=23004-44A3EE4E) 以及网站自身因素的情况下，大抵就是 [DNS](../../base/cs/computer-network/application-layer.md#dns-协议) 出问题了——上游网络的 DNS 服务因为各种原因（DNS 劫持、DNS 污染等）导致我们无法获得网站域名的真实 IP。

我们可以分别从「内存 $\to$ 外存 $\to$ 服务器」三个层级逐个配置解决问题。

**内存级，刷新内存中的 DNS 缓存**。使用 ipconfig 工具：

```powershell
# 刷新 DNS 缓存
ipconfig /flushdns

# 查看 DNS 缓存
ipconfig /displaydns
```

**外存级，在本地手动持久化目标域名和 IP 的映射对**。首先需要查询出目标域名的 IP，随便选一个查 IP 的网站即可，这里以 [ip138](https://www.ip138.com) 为例：

![查询域名对应的 IP 地址](https://cdn.dwj601.cn/images/20251228102121565.png)

接下来编辑本地域名映射文件 `C:\Windows\System32\drivers\etc\hosts`，在其末尾添加以下内容：

```text
140.82.116.3 github.com
```

!!! warning
    这种方法相对不那么优雅，特别是当服务供应商改变服务 IP 后，这种方法会导致服务无法访问，排查网络问题时不要忘了这一出噢 😉。

**服务器级，配置 DNS 服务器地址**。Windows 默认情况下会使用 [DHCP](../../base/cs/computer-network/application-layer.md#dhcp-协议) 协议来管理 DNS，这在某些情况下很不稳定，可以考虑改为大厂提供的 DNS 服务：

<img src="https://cdn.dwj601.cn/images/20251231151730251.png" alt="在 Windows 设置中编辑「DNS 服务器分配」选项" style="zoom:50%;" />

阿里的 DNS 服务器 IP：

```text
223.5.5.5
223.6.6.6
```

如果是以太网，配置方法类似：

<img src="https://cdn.dwj601.cn/images/20251231152739672.png" alt="以太网的 DNS 服务器配置方法" style="zoom:50%;" />

