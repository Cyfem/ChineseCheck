## 概述
**ChineseCheck**是一个帮助判断字符串是否是纯中文的工具，以函数形式提供调用。主要用于判断是否为中文名。范围包含所有中文（历史文字也能识别，甚至电脑里识别不到的中文，也能识别出来）。
## 原理
原理是获取字符编码，判断字符所在Unicode平面，如果在1、2、4、……平面，则转换为标准的UTF-16编码，再判断编码是否在中文区域。