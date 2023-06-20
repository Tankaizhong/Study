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

解析:在给出选项 A、B、C 和 D 中，用于优化操作码编码的最佳选择是 D. 扩展操作码。

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

重叠寄存器窗口是一种用于处理函数调用和返回的技术。在函数调用时，重叠寄存器窗口可以提供一组额外的寄存器，称为窗口，用于保存函数的局部变量、参数和返回地址。通过切换窗口，可以轻松地在函数调用之间切换，并将寄存器状态保存在窗口中，而无需每次函数调用都将这些值保存到内存中。

采用重叠寄存器窗口技术后，函数调用不再需要将局部变量和参数存储在内存中，而是直接保存在寄存器窗口中。这样可以减少对内存的访问次数，提高程序的执行效率。在函数调用返回时，通过切换窗口即可恢复之前的寄存器状态。

因此，选项 B. 程序调用引起的访存次数 是重叠寄存器窗口技术在 RISC 架构中能够大大减少的方面。

>7. 数据表示的含义是（    ）
>
>   A．表示数据所采用的数制和码制         B．数据类型
>
>   C．浮点数的表示方式                 D．硬件能直接识别的数据类型

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

![image-20230620221757708](https://nunbey-bill.oss-cn-beijing.aliyuncs.com/2020-weekReport/image-20230620221757708.png)

![image-20230620222504290](https://nunbey-bill.oss-cn-beijing.aliyuncs.com/2020-weekReport/image-20230620222504290.png)

![image-20230620222650223](https://nunbey-bill.oss-cn-beijing.aliyuncs.com/2020-weekReport/image-20230620222650223.png)

### 扩展

![image-20230620222819843](https://nunbey-bill.oss-cn-beijing.aliyuncs.com/2020-weekReport/image-20230620222819843.png)

![image-20230620222844944](https://nunbey-bill.oss-cn-beijing.aliyuncs.com/2020-weekReport/image-20230620222844944.png)