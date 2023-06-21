# 微机代码

## 数组求和

```ts
DATA SEGMENT                ;定义数据段
  ARRAY DW  -1700,7050,92
        DW  580,-630,-4450
  LEN   EQU ($-ARRAY)/2     ;LEN变量名
  RESL  DW  ?
  RESH  DW  ?               ;（?）通常用作占位符或未知值的标记
DATA ENDS

CODE SEGMENT                    ;定义代码段（code segment）
        ASSUME CS:CODE,DS:DATA  ;ASSUME 建立段寄存器与段名之间的关系
  START:MOV    AX,DATA
        MOV    DS,AX            ;立即数（Immediate value）直接作为操作数传递给寄存器是不允许的,要通过通用寄存器
        MOV    SI,0
        MOV    DI,0
        LEA    BX,ARRAY         ;LEA 是 "Load Effective Address" 的缩写，它执行的是地址计算的操作
        MOV    CX,LEN
        
  GOON: MOV    AX,[BX]
        CWD                     ;16位有符号数扩为32位有符号数
        ADD    SI,AX            ;不进位加
        ADC    DI,DX            ;ADC:带进位的加法操作
        ADD    BX, 2            ;每次+2
        LOOP   GOON
        MOV    RESL,SI
        MOV    RESH,DI
        MOV    AH,4CH
        INT    21H              ;程序会正常退出并返回到操作系统
CODE ENDS
END START ;标记程序的结束点



Q:'ADC    DI,DX ' 是什么
A:`ADC DI, DX` 是一条x86汇编指令，用于将 `DI` 寄存器的值与 `DX` 寄存器的值相加，并将结果存储回 `DI` 寄存器中，考虑进位标志位的值。
具体执行过程如下：
1. 将 `DI` 寄存器的值与 `DX` 寄存器的值相加，得到一个结果。
2. 如果进位标志位（Carry Flag）为1，表示有进位，那么结果会再加上进位标志位的值。
3. 最终的结果会存储回 `DI` 寄存器中。
需要注意的是，进位标志位可以通过之前的算术操作的结果来设置，或者可以手动设置或清除。通过 `ADC` 指令执行的加法操作会考虑到进位标志位的值，以便实现带进位的加法运算。
在给定的代码中，`ADC DI, DX` 执行的是将 `DI` 寄存器与 `DX` 寄存器的值相加，并将结果存储回 `DI` 寄存器中，同时考虑进位标志位的值。  
```

Q:执行到 INT 21H 指令时，控制权会转移到DOS操作系统，然后DOS操作系统会根据 AH 寄存器中的值来执行相应的功能。在这里,AH的值为4Ch，表示程序的正常退出请求。
	A:这个步骤是为了与操作系统进行交互并告知操作系统程序的退出请求。在早期的DOS操作系统中，提供了一组功能服务，可以通过中断调用来请求这些功能。INT 21H是DOS提供的一个中断号，通过触发此中断，程序可以与DOS操作系统进行交互并请求特定的功能。

在中断调用时，程序将设置寄存器的特定值，以指示所需的功能或操作。其中，AH寄存器通常用于指定所需功能的功能码。通过将4Ch值移动到AH寄存器，程序告知DOS操作系统它要请求的功能是程序的正常退出。

当程序执行INT 21H指令时，控制权会转移到DOS操作系统，DOS操作系统会根据AH寄存器中的值来确定所需的功能，并执行相应的操作。在这种情况下，DOS操作系统将接收到程序的正常退出请求，并相应地终止程序的执行。

这个步骤的目的是通过与操作系统进行交互，使程序能够向操作系统发送退出请求，以便程序可以正常地终止执行并返回到操作系统环境。

## 数组求偶数个数

```ts
;统计偶数
DATA SEGMENT
  ARRAY DB  -18,47,-72,55,9
        DB  83,-21,-15,14
  COUNT EQU ($-ARRAY)
  RES   DW  ?
DATA ENDS
CODE SEGMENT
        ASSUME CS:CODE,DS:DATA
  START:MOV    AX,DATA
        MOV    DS,AX
        LEA    BX,ARRAY
        MOV    CX,COUNT
        MOV    DX,0
  GOON: MOV    AL,[BX]
        TEST   AL,1
        JNE    SKIP
        ADD    DX,1
  SKIP: INC    BX
        LOOP   GOON 
        MOV RES,DX 
        MOV AH,4CH 
        INT 21H
CODE ENDS
END START
```

## 上机

### 开关

```ts
DATA SEGMENT
  switchState db 0  ; 存储开关状态
  lightState  db 0  ; 存储灯状态
DATA ENDS
CODE SEGMENT
            ASSUME CS:CODE,DS:DATA
  START:    mov    ax, @data
            mov    ds, ax
            mov    al, 10000000b    ; 设置8255的控制字节，将其配置为模式0
            out    37Ah, al
  MAIN_LOOP:in     al, 378h         ; 从PA口读取开关状态
            mov    switchState, al
            mov    lightState, al   ; 将开关状态作为灯状态
            out    379h, al         ; 将灯状态输出到PB口
            jmp    MAIN_LOOP        ; 无限循环
            MOV    AH,4CH
            INT    21H
CODE ENDS
END START
```

### LED亮,只亮一个灯

```ts
DATA SEGMENT
  PORT_NUM  EQU 378h  ; 并行口地址
  DELAY_VAL EQU 5000  ; 延迟值
DATA ENDS

CODE SEGMENT
            ASSUME CS:CODE, DS:DATA
  START:    
            MOV    AX, DATA
            MOV    DS, AX

            MOV    AL, 11111110b     ; 初始化PA口，将除了最低位外的其他位设置为高电平
            OUT    PORT_NUM, AL

            MOV    AL, 00000001b     ; 从最低位开始逐个点亮LED灯
            MOV    BL, 8             ; 循环计数器，控制点亮的灯的数量

  LOOP_LED: 
            OUT    PORT_NUM, AL      ; 点亮当前LED灯
            MOV    CX, DELAY_VAL     ; 延迟一段时间
  DELAY:    
            NOP
            LOOP   DELAY

            XOR    AL, AL            ; 关闭当前LED灯
            OUT    PORT_NUM, AL
            MOV    CX, DELAY_VAL     ; 延迟一段时间
  DELAY_OFF:
            NOP
            LOOP   DELAY_OFF

            RCL    AL, 1             ; 循环左移1位，点亮下一个LED灯
            DEC    BL
            JNZ    LOOP_LED          ; 若未点亮完所有灯，则继续循环

            MOV    AH,4CH
            INT    21H
CODE ENDS
END START
```

### 数组相加

```ts
DATA SEGMENT
  A    DW 1, 2, 3, 4
  B    DW 5, 6, 7, 8
  C    DD 0, 0, 0, 0  ; 数组C存储结果
DATA ENDS

CODE SEGMENT
        ASSUME CS:CODE,DS:DATA
  START:
        MOV    AX, @DATA
        MOV    DS, AX

        MOV    CX, 4            ; 迭代计数器，表示数组元素的个数

        MOV    SI, 0            ; 用于访问数组A的偏移量
        MOV    DI, 0            ; 用于访问数组B的偏移量
        MOV    BX, 0            ; 用于访问数组C的偏移量

  START:
        MOV    AX, @DATA
        MOV    DS, AX

        MOV    CX, 4            ; 迭代计数器，表示数组元素的个数

        MOV    SI, 0            ; 用于访问数组A的偏移量
        MOV    DI, 0            ; 用于访问数组B的偏移量
        MOV    BX, 0            ; 用于访问数组C的偏移量
        MOV    AH,4CH
        INT    21H
CODE ENDS
END START
```

在这个示例中，我们使用了`.DATA` 和 `.CODE` 分别标识数据段和代码段的开始。`ASSUME CS:CODE, DS:DATA` 建立了代码段和数据段寄存器与相应的段之间的关联。

我们定义了数组A、B和C，并初始化了数组A和数组B的元素。使用`MOV CX, 4`来设置迭代计数器，表示我们要对4个元素进行操作。

使用`MOV SI, 0`、`MOV DI, 0`和`MOV BX, 0`来初始化偏移量寄存器，用于访问数组A、数组B和数组C的元素。

在循环开始前，我们从数组A和数组B中读取当前元素到寄存器AX和DX，并使用`ADD`指令将它们相加。然后，使用`MOV`指令将结果存储到数组C中。

接着，我们增加偏移量寄存器SI、DI和BX，以便在下一次循环中访问下一个元素。然后，使用`LOOP`指令来判断是否继续循环迭代。

请注意，MASM语法和汇编器的具体规则可能因版本和配置而有所不同。在使用不同的汇编器和汇编语言风格时，确保参考相应的文档和规范以正确编写和编译程序。