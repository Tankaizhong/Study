# 考试范围

![image-20230621152137846](https://nunbey-bill.oss-cn-beijing.aliyuncs.com/2020-weekReport/image-20230621152137846.png)

![image-20230621152254933](https://nunbey-bill.oss-cn-beijing.aliyuncs.com/2020-weekReport/image-20230621152254933.png)

# 第二章 

## 基本概念

  1.字母表:元素非空有穷集合

      2. 符号串:

      3. 符号串连接

   4.符号串的幂

   5.前缀和后缀

   6.子符号串

   7.符号串集合

      8. 符号串集合的乘积

      9. 符号串集合的方幂

   10.符号串集合的正闭包

   11.符号串集合的正闭包

## 1.文法

1. 表述文法概念
2. 文法的分类，并运用文法分类的方法判明以文法的类别
3. 表述直接推导、直接推导序列、最左推导、最右推导，并能运用
4. 表述句型、句子、短语、直接短语、句柄的概念，并能判定一个字符串是否为某一文法的句型和句子，能指出句型中的短语、直接短语、句柄。
5. 对于一文法的某一句型或句子能构造其语法树。
6. 对于一简单文法能判别是否为二义性文法。
7. 表述文法的六种等价变换技术，并运用这些技术进行文法的等价变换

## 推到,语法树,短语

![image-20230621155705088](https://nunbey-bill.oss-cn-beijing.aliyuncs.com/2020-weekReport/image-20230621155705088-1687505085682-1.png)

## 2. 二义性

文法二义性:证明该文法G的一个句子有两个或以上的语法树

![image-20230621155154695](https://nunbey-bill.oss-cn-beijing.aliyuncs.com/2020-weekReport/image-20230621155154695-1687505085682-2.png)

## 3.等价变化

### 3.1消除左递归

#### 法一:

![image-20230621161155846](https://nunbey-bill.oss-cn-beijing.aliyuncs.com/2020-weekReport/image-20230621161155846-1687505085682-3.png)

#### 法二:提取公共因子

![image-20230621162429455](https://nunbey-bill.oss-cn-beijing.aliyuncs.com/2020-weekReport/image-20230621162429455-1687505085683-4.png)

![image-20230621163203960](https://nunbey-bill.oss-cn-beijing.aliyuncs.com/2020-weekReport/image-20230621163203960-1687505085683-5.png)

![image-20230621163523129](https://nunbey-bill.oss-cn-beijing.aliyuncs.com/2020-weekReport/image-20230621163523129-1687505085683-6.png)

![image-20230622144415440](https://nunbey-bill.oss-cn-beijing.aliyuncs.com/2020-weekReport/image-20230622144415440-1687505085683-7.png)

### 3.2化简

## 4 正则到有限自动状态机

>步骤:![image-20230621172509297](https://nunbey-bill.oss-cn-beijing.aliyuncs.com/2020-weekReport/image-20230621172509297-1687505085683-8.png)

例题==该题是构造到NFA为止,并不到DFA==

![image-20230621172616621](https://nunbey-bill.oss-cn-beijing.aliyuncs.com/2020-weekReport/image-20230621172616621-1687505085683-9.png)

### 4.1 完整从正则到DFA

![image-20230622131252032](https://nunbey-bill.oss-cn-beijing.aliyuncs.com/2020-weekReport/image-20230622131252032-1687505085683-10.png)

![image-20230622131641803](https://nunbey-bill.oss-cn-beijing.aliyuncs.com/2020-weekReport/image-20230622131641803-1687505085683-13.png)

![image-20230622131841147](https://nunbey-bill.oss-cn-beijing.aliyuncs.com/2020-weekReport/image-20230622131841147-1687505085683-11.png)

### 4.2 从NFA到DFA(不化简)

![image-20230622131921694](https://nunbey-bill.oss-cn-beijing.aliyuncs.com/2020-weekReport/image-20230622131921694-1687505085683-12.png)

### 4.3 从DFA到化简

![image-20230622133038861](https://nunbey-bill.oss-cn-beijing.aliyuncs.com/2020-weekReport/image-20230622133038861-1687505085683-14.png)

解析

![image-20230622133103641](https://nunbey-bill.oss-cn-beijing.aliyuncs.com/2020-weekReport/image-20230622133103641-1687505085683-16.png)

# 三 语法分析

思想:从左到右扫描,自下而上分析,查找当前句型的句柄,利用产生式将找到的句柄规约

## 4.1.2 

### 语法错误类别及错误处理

常见的语法错误有：

（1）程序的开始单词错，表达式的开始单词错，语句的开始单词错，表达式的后继单词错，语句的后继单词错等。

（2）标识符和常量单词错。

（3）括号类错误。

（4）分隔符错。

### 语法分析器错误处理的基本目标是

（1）能够清楚而准确地报告发现的错误，如错误的位置和性质。

（2）能够迅速地从错误中恢复过来，以便继续分析后面可能存在的错误。

（3）错误处理功能不应该明显地影响正确程序的处理效率。

### 分析器可以采用的错误恢复策略

常用的几种方法：

（1）紧急方式恢复

（2）短语级恢复

（3）出错产生式

（4）全局纠正

## 4.1.3 三个重要的集合

### First 与 Follow 

![image-20230623120436610](https://nunbey-bill.oss-cn-beijing.aliyuncs.com/2020-weekReport/image-20230623120436610-1687505085683-17.png)

### First与Follow例题

#### 求Follow

![image-20230623150056043](https://nunbey-bill.oss-cn-beijing.aliyuncs.com/2020-weekReport/image-20230623150056043-1687505085683-15.png)

![1356adb6b8ff12760ca295cea157b94](https://nunbey-bill.oss-cn-beijing.aliyuncs.com/2020-weekReport/1356adb6b8ff12760ca295cea157b94.jpg)

#### 构造LL1分析表

题目:

![image-20230623152257603](https://nunbey-bill.oss-cn-beijing.aliyuncs.com/2020-weekReport/image-20230623152257603-1687505085683-18.png)

![e4c9b742743ddcc0cc8dcf2d48faf33](https://nunbey-bill.oss-cn-beijing.aliyuncs.com/2020-weekReport/e4c9b742743ddcc0cc8dcf2d48faf33.jpg)

