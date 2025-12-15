---
title: Git 自定义命令
---

懒得敲太多重复命令？自定义一个简化命令！

!!! tip

    本文介绍的方法仅适用于少量命令的自定义，如果需要自定义大量命令流，建议编写命令脚本。

进入 Git 软件的安装目录并编辑 `etc/profile.d/aliases.sh` 文件。下列代码中的标蓝部分表示是我自己定义的命令：

```bash hl_lines="7"
# Some good standards, which are not used if the user
# creates his/her own .bashrc/.bash_profile

# --show-control-chars: help showing Korean or accented characters
alias ls='ls -F --color=auto --show-control-chars'
alias ll='ls -l'
alias gph='git push && hexo clean && hexo g && hexo d'

case "$TERM" in
xterm*)
	# The following programs are known to require a Win32 Console
	# for interactive usage, therefore let's launch them through winpty
	# when run inside `mintty`.
	for name in node ipython php php5 psql python2.7 winget
	do
		case "$(type -p "$name".exe 2>/dev/null)" in
		''|/usr/bin/*) continue;;
		esac
		alias $name="winpty $name.exe"
	done
	;;
esac
```
