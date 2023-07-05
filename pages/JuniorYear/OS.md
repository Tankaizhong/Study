# 一 基本概念

## 1.1.1 层次结构

1.计算机系统 = 硬件 + 软件

2.语言划分计算机系统结构:应用->高级->汇编->OS->机器->微程序

3.语言实现的技术:

解释:高级程序->低级,低级程序上实现

翻译:低级程序对高级语言逐条翻译

==解释比翻译更费时间,但占存储少==

4.通用 REG 属性:数据表示,寻址方式,

5.冯诺依曼:1.核心:运算器 2.指令数据同等对待 3.存储器按地址访问,顺序线性编址,单元固定

![](https://nunbey-bill.oss-cn-beijing.aliyuncs.com/2020-weekReport/image-20230619105053393.png)

## 习题

>计算机中优化使用的操作码编码方法是（ ）。
>
>A.哈夫曼编码 B.ASCII 码 C.BCD 码 D.扩展操作码

==解析:在给出选项 A、B、C 和 D 中，用于优化操作码编码的最佳选择是 D. 扩展操作码。==

选项 A 的哈夫曼编码通常用于数据压缩和编码领域，不适用于操作码编码。

选项 B 的 ASCII 码是一种用于表示字符的编码方式，不适用于操作码编码。

选项 C 的 BCD 码（二进制编码十进制）主要用于表示十进制数字，而不是操作码编码。

而选项 D 中的扩展操作码是一种操作码编码方法，用于优化指令集的使用和指令的编码。通过扩展操作码，可以为指令集提供更多的指令变体和扩展功能，从而增加指令的灵活性和效率。

因此，选项 D. 扩展操作码是最适合用于优化操作码编码的选项。

>RISC( Reduced Instruction Set Computer（精简指令集计算机）)采用重叠寄存器窗口技术，从而大大减少了（ ）。
>
>A．绝大多数指令的执行时间 B．程序调用引起的访存次数
>
>C．目标程序的指令条数 D．CPU 访存的访问周期  

==重叠寄存器窗口是一种用于处理函数调用和返回的技术。在函数调用时，重叠寄存器窗口可以提供一组额外的寄存器，称为窗口，用于保存函数的局部变量、参数和返回地址。通过切换窗口，可以轻松地在函数调用之间切换，并将寄存器状态保存在窗口中，而无需每次函数调用都将这些值保存到内存中。==

采用重叠寄存器窗口技术后，函数调用不再需要将局部变量和参数存储在内存中，而是直接保存在寄存器窗口中。这样可以减少对内存的访问次数，提高程序的执行效率。在函数调用返回时，通过切换窗口即可恢复之前的寄存器状态。

因此，选项 B. 程序调用引起的访存次数 是重叠寄存器窗口技术在 RISC 架构中能够大大减少的方面。

>7. 数据表示的含义是（    ）
>
>  A．表示数据所采用的数制和码制         B．数据类型
>
>  C．浮点数的表示方式                 D．硬件能直接识别的数据类型

数据表示的含义是指在计算机系统中，数据以何种形式被表示和存储。这包括数据所采用的数制和码制，数据类型以及浮点数的表示方式等。选项 D 中提到的硬件能直接识别的数据类型指的是计算机硬件可以直接处理和操作的数据类型，如整数、字符、浮点数等。这些数据类型在计算机内部以特定的格式和编码方式表示，以便计算机能够正确地处理它们。因此，选项 D 是数据表示的一部分，而其他选项只是数据表示的一部分或与数据表示相关的概念。

# 二 指令系统

指令系统设计必须由 ==软件设计人员==和==硬件设计人员==共同来完成

数据表示的确定原则：

1.缩短程序运行时间

2.减少CPU与主存储器之间的通信量

3.数据表示的通用性和利用率

## 数据表示

<img src="https://nunbey-bill.oss-cn-beijing.aliyuncs.com/2020-weekReport/image-20230620205452359.png" alt="image-20230620205452359" style="zoom: 33%;" />

><img src="https://nunbey-bill.oss-cn-beijing.aliyuncs.com/2020-weekReport/image-20230620205625765.png" alt="image-20230620205625765" style="zoom:33%;" />

<img src="https://nunbey-bill.oss-cn-beijing.aliyuncs.com/2020-weekReport/image-20230620205913382.png" alt="image-20230620205913382" style="zoom:50%;" />

## 编址优化方式

### 哈夫曼编码

![image-20230620221628854](https://nunbey-bill.oss-cn-beijing.aliyuncs.com/2020-weekReport/image-20230620221628854.png)

解答

![image-20230620221658839](https://nunbey-bill.oss-cn-beijing.aliyuncs.com/2020-weekReport/image-20230620221658839.png)

<img src="https://nunbey-bill.oss-cn-beijing.aliyuncs.com/2020-weekReport/image-20230620221757708.png" alt="image-20230620221757708" style="zoom:50%;" />

<img src="https://nunbey-bill.oss-cn-beijing.aliyuncs.com/2020-weekReport/image-20230620222504290.png" alt="image-20230620222504290" style="zoom:50%;" />

![image-20230620222650223](https://nunbey-bill.oss-cn-beijing.aliyuncs.com/2020-weekReport/image-20230620222650223.png)

### 扩展

![image-20230620222819843](https://nunbey-bill.oss-cn-beijing.aliyuncs.com/2020-weekReport/image-20230620222819843.png)

![image-20230620222844944](https://nunbey-bill.oss-cn-beijing.aliyuncs.com/2020-weekReport/image-20230620222844944.png)

## 2.4指令系统的功能设计

CISC(Complex Instruction Set Computer）

方法：用一条指令代替一串指令

目的： 增加新指令,功能,设置功能复杂的指令,增加寻址方式

增加数据表示方式
优化的途径：
1）面向目标代码
2）面向高级语言
3）面向操作系统  



### RISC指令系统

CISC(Complex Instruction Set Computer） 到RISC

CISC:

1. 增加新的指令
2. 增强指令功能
3. 设置功能复杂的指令
4. 增加寻址方式
5. 增加数据表示方式

RISC( Reduced Instruction Set Computer )的实现

(1).延迟转移技术 >>>

(2).指令取消技术 >>>

(3).重叠寄存器窗口技术 >>>

(4).指令流调整技术 >>>

## 习题

>**10．在CPU中跟踪指令后继地址的寄存器是（   ）。**
>
>**A 主存地址寄存器  B 编址寄存器**  
>
>**C 指针寄存器    D 状态条件寄存器**

A. 主存地址寄存器（Memory Address Register，MAR）是用于存储主存储器地址的寄存器，用于在访问内存时指定要读取或写入的地址。
B. 编址寄存器（Address Register）并非通用术语，没有明确对应的功能。
C. 指针寄存器（Program Counter，PC）是用于存储当前指令地址的寄存器，它指向将要执行的下一条指令的地址。
D. 状态条件寄存器（Condition Register）通常用于存储一些与指令执行相关的条件标志，例如零标志、进位标志等，并非用于跟踪指令后继地址。

因此，选项C指针寄存器是正确答案，因为它专门用于存储当前指令的地址，以便能够顺序执行下一条指令。

>**11．指令系统中采用不同寻址方式的目的主要是（  ）。**

选项A、C、D的描述并不完全涵盖寻址方式的主要目的。存储程序和程序控制可以通过各种寻址方式来实现，而不是仅仅依赖于寻址方式本身。直接访问外存是与具体的计算机系统和指令集相关的特定情况，并不是寻址方式的通用目的。提供扩展操作码和降低译码难度是与指令编码和硬件实现相关的目标，并不是与寻址方式直接相关的主要目的。

# 三 存储系统

## 3.1 定义

虚拟存储器系统(  主存储器和磁盘存储器 )：对应用程序员透明

Cache存储系统( Cache和主存储器 )：对系统程序员以上均透明

### 3.1.2 存储结构

<img src="https://nunbey-bill.oss-cn-beijing.aliyuncs.com/2020-weekReport/image-20230622195842893.png" alt="image-20230622195842893" style="zoom:50%;" />

## 3.2 性能指标

单位容量平均价格C

<img src="https://nunbey-bill.oss-cn-beijing.aliyuncs.com/2020-weekReport/image-20230622174419400.png" alt="image-20230622174419400" style="zoom:50%;" />

命中率

N1访问到次数,N2:没访问到

<img src="https://nunbey-bill.oss-cn-beijing.aliyuncs.com/2020-weekReport/image-20230622174716258.png" alt="image-20230622174716258" style="zoom:50%;" />

<img src="https://nunbey-bill.oss-cn-beijing.aliyuncs.com/2020-weekReport/image-20230622174836282.png" alt="image-20230622174836282" style="zoom:50%;" />

## 3.3 虚拟存储器

地址映象：虚地址与实地址之间对应关系的规则

地址变换：在程序被装入主存储器之后，实际运行，把多用户虚地址变换成主存实地址（内部地址变换）或磁盘存储器地址（外部地址变换）。

访问失效：按虚地址访问的数据不在主存中（未命中）。

### 外部地址变化

![image-20230622192204672](https://nunbey-bill.oss-cn-beijing.aliyuncs.com/2020-weekReport/image-20230622192204672.png)

### 多用户虚拟址

<img src="https://nunbey-bill.oss-cn-beijing.aliyuncs.com/2020-weekReport/image-20230622180014281.png" alt="image-20230622180014281" style="zoom:50%;" />

## 3.4 地址映射

三种虚拟存储器



### 3.4.1段式虚拟存储器

组成

<img src="https://nunbey-bill.oss-cn-beijing.aliyuncs.com/2020-weekReport/image-20230622193425679.png" alt="image-20230622193425679" style="zoom:50%;" />

变换:由用户号找到基址寄存器，读出段表起始地址，与虚地址中段号相加得到段表地址，把段表中的起始地址与段内偏移D相加就能得到主存实地址。



### 3.4.2 页式虚拟存储器

组成

 <img src="https://nunbey-bill.oss-cn-beijing.aliyuncs.com/2020-weekReport/image-20230622193502661.png" alt="image-20230622193502661" style="zoom:50%;" />

地址变换:由用户号找到基址寄存器，从基址寄存器中读出页表的基地址，把页表的基地址Pa与多用户虚拟地址中页号P相加得到页表地址，把页表中给出的主存实页号与虚地址中的页内偏移D拼接起来就得到主存实地址。                     

### 3.4.3 段页式虚拟存储器

先查段表，得到页表起始地址和页表长度，再查页表找到要访问的主存实页号，把实页号p与页内偏移d拼接得到主存实地址。

<img src="https://nunbey-bill.oss-cn-beijing.aliyuncs.com/2020-weekReport/image-20230622193538899.png" alt="image-20230622193538899" style="zoom:50%;" />

### 3.4.4 快慢表

<img src="https://nunbey-bill.oss-cn-beijing.aliyuncs.com/2020-weekReport/image-20230622190254531.png" alt="image-20230622190254531" style="zoom:50%;" />

快表与慢表也构成一个两级存储系统。

## 3.5 页面替换算法

使用场合:

(1)虚拟存储器中，主存页面的替换。一般用软件实现。

(2)Cache中的块替换。一般用硬件实现。

(3)虚拟存储器的快慢表中，快表存储字的替换。用硬件实现。

(4)虚拟存储器中，用户基地址存储器的替换。用硬件实现。

(5)在有些虚拟存储器中，目录表的替换。

### 算法

OPT(理想,替换向后看最远)

LRU最近最久未使用(向前看,最远)

FIFO(Belady现象)

## 散列函数变换

采用散列变换实现快表按地址访问  避免散列冲突：采用相等比较器

![image-20230622192948638](https://nunbey-bill.oss-cn-beijing.aliyuncs.com/2020-weekReport/image-20230622192948638.png)

相等比较器的位数 = 虚拟址的用户号 + 虚页号

## 例题 相等比较器

<img src="https://nunbey-bill.oss-cn-beijing.aliyuncs.com/2020-weekReport/image-20230622195348422.png" alt="image-20230622195348422" style="zoom:50%;" />

<img src="https://nunbey-bill.oss-cn-beijing.aliyuncs.com/2020-weekReport/image-20230622195355245.png" alt="image-20230622195355245" style="zoom:50%;" />

<img src="https://nunbey-bill.oss-cn-beijing.aliyuncs.com/2020-weekReport/image-20230622195400558.png" alt="image-20230622195400558" style="zoom:50%;" />

## 3.6 高速Cache

> CPU与高速缓存之间：字 
>
> 高速缓存与主存储器之间：块
>
> 主存与磁盘之间：页面 
>
> 磁盘与磁带之间：段

### 地址映像与变换方式

地址映象:把主存中的程序按照某种规则装入到Cache中，并建立主存地址与Cache地址之间的对应关系。

地址变换：当程序已经装入到Cache之后，在程序运行过程中，把主存地址变换成Cache地址。

### 3.6.1地址映像

全相联映象:任意

直接映射
