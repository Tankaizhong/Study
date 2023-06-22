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

![image-20230621155705088](https://nunbey-bill.oss-cn-beijing.aliyuncs.com/2020-weekReport/image-20230621155705088.png)

## 2. 二义性

文法二义性:证明该文法G的一个句子有两个或以上的语法树

![image-20230621155154695](https://nunbey-bill.oss-cn-beijing.aliyuncs.com/2020-weekReport/image-20230621155154695.png)

## 3.等价变化

### 3.1消除左递归

#### 法一:

![image-20230621161155846](https://nunbey-bill.oss-cn-beijing.aliyuncs.com/2020-weekReport/image-20230621161155846.png)

#### 法二:提取公共因子

![image-20230621162429455](https://nunbey-bill.oss-cn-beijing.aliyuncs.com/2020-weekReport/image-20230621162429455.png)

![image-20230621163203960](https://nunbey-bill.oss-cn-beijing.aliyuncs.com/2020-weekReport/image-20230621163203960.png)

![image-20230621163523129](https://nunbey-bill.oss-cn-beijing.aliyuncs.com/2020-weekReport/image-20230621163523129.png)

![C5HF1(./../../../../%25E5%25A4%2587%25E4%25BB%25BD/OneDrive/%25E6%25A1%258C%25E9%259D%25A2/%25E6%259C%25AC%25E5%259C%25B0/C5HF1(6)D79P%2525YZ7P90Q3NP.jpg)D79P%YZ7P90Q3NP](./C5HF1(6)D79P%25YZ7P90Q3NP.jpg)

### 3.2化简

## 4 正则到有限自动状态机

>步骤:![image-20230621172509297](https://nunbey-bill.oss-cn-beijing.aliyuncs.com/2020-weekReport/image-20230621172509297.png)

例题==该题是构造到NFA为止,并不到DFA==

![image-20230621172616621](https://nunbey-bill.oss-cn-beijing.aliyuncs.com/2020-weekReport/image-20230621172616621.png)

### 4.1 完整从正则到DFA

![image-20230622131252032](https://nunbey-bill.oss-cn-beijing.aliyuncs.com/2020-weekReport/image-20230622131252032.png)

![image-20230622131641803](https://nunbey-bill.oss-cn-beijing.aliyuncs.com/2020-weekReport/image-20230622131641803.png)

![image-20230622131841147](https://nunbey-bill.oss-cn-beijing.aliyuncs.com/2020-weekReport/image-20230622131841147.png)

### 4.2 从NFA到DFA(不化简)

![image-20230622131921694](https://nunbey-bill.oss-cn-beijing.aliyuncs.com/2020-weekReport/image-20230622131921694.png)

### 4.3 从DFA到化简

![image-20230622133038861](https://nunbey-bill.oss-cn-beijing.aliyuncs.com/2020-weekReport/image-20230622133038861.png)

解析

![image-20230622133103641](https://nunbey-bill.oss-cn-beijing.aliyuncs.com/2020-weekReport/image-20230622133103641.png)

