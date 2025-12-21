---
title: Windows
icon: material/microsoft-windows
---

对一些 Windows 11 上常见问题和需求进行自定义配置。

## 使用微软输入法快捷输入「」符号

Windows 自带的微软输入法挺好用的，至少不会出现兼容性问题。为了避免不同版本的配置路径可能不同的问题，读者可以直接在设置中搜索「拼音」并选择「简体中文拼音输入法设置」：

![在设置中搜索「拼音」并选择「简体中文拼音输入法设置」](https://cdn.dwj601.cn/images/20250928113051186.png)

而配置打出角标的方法，其实就是自定义一个短语。我们进入「词典和自学习」一栏，自己按照习惯配置一下就可以了：

![按照自己的习惯定义角标符号的快捷键](https://cdn.dwj601.cn/images/20250928113223799.png)

*注：上述路径可能会随着 Windows 的版本而有所变化，读者可自行寻找类似的字段进行修改。

## 删除文件打开选项中失效的选项

你一定遇到过文件的打开选项中包含了你已经卸载的软件，如下图所示：

![文件的打开选项中包含了你已经卸载的软件](https://cdn.dwj601.cn/images/20250928102727735.png)

如果有一些强迫症的话，可以考虑删除这个选项。具体操作如下：

进入 `计算机\HKEY_USERS\<SID>\Software\Classes` 路径，找到 `<file>_auto_file` 选项，直接删除即可。其中 SID 可以使用以下命令查找：

```bash
wmic useraccount get name,sid
```

我的计算机输出结果如下：

![终端输出结果](https://cdn.dwj601.cn/images/20250319124515341.png)

那么注册表中我寻找的路径就是：

![我的注册表中的寻找路径](https://cdn.dwj601.cn/images/20250319124608769.png)

最终效果如下：

![最终效果](https://cdn.dwj601.cn/images/20250928111612988.png)

完美，强迫症狂喜。

## 禁止 Windows 更新

想要禁用 Windows 的更新，可以按照如下操作进行：

- 进入注册表的 `计算机\HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\WindowsUpdate\UX\Settings` 路径；
- 新建一个 `DWORD`，然后将其十六进制值改为 `dac` 即可（表示暂停 3500 天，即 500 周）。如果你懂十六进制的话，可以自行修改。

效果如图：

![暂停更新显示到 500 周](https://cdn.dwj601.cn/images/20250928102032578.png)

![最终效果](https://cdn.dwj601.cn/images/20250928102407969.png)

## 大小写敏感问题

Windows 上是不区分大小写的（即大小写不敏感）。比如 `main.py` 和 `Main.py` 不能存在于同一个文件夹下：

![Windows 大小写不敏感](https://cdn.dwj601.cn/images/20251221152025.png)

而 [Linux](./linux.md) 上是区分大小写的（即大小写敏感）。那么比如 `main.py` 和 `Main.py` 就存在于同一个文件夹下，表示两个不同的文件：

![Linux 大小写敏感](https://cdn.dwj601.cn/images/20251221153013.png)
