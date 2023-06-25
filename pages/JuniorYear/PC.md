# 微机代码1

## 1.1 最大元素

```ts
;最大元素
data segment
  arr   dw  1,2,3
        DW  4,5,60
  count equ ($-arr)/2  ;每当程序中出现 count 时，它将被替换为 ($－ARRAY)/2 的
  max   dw  ?
data ends


code segment
        assume cs:code,ds:data

  start:mov    ax,data          ;重载数组
        mov    ds,ax

        lea    bx,arr           ; 获得arr寄存器的基地址

        mov    cx,count         ;重载count
        mov    ax,[bx]          ;将 BX 寄存器中存储的地址所对应的值（数组的第一个元素）加载到 AX 寄存器中。这将作为比较的初始值。
       
  goon: cmp    ax,[bx]
        jae    skip
        mov    ax,[bx]

  skip: 
        inc    bx
        inc    bx

        loop   goon

  ;结果
        mov    max,ax

  ;中断返回
        mov    ah,4ch
        int    21h

code ends
end start
```

Q:执行到 INT 21H 指令时，控制权会转移到DOS操作系统，然后DOS操作系统会根据 AH 寄存器中的值来执行相应的功能。在这里,AH的值为4Ch，表示程序的正常退出请求。
	A:这个步骤是为了与操作系统进行交互并告知操作系统程序的退出请求。在早期的DOS操作系统中，提供了一组功能服务，可以通过中断调用来请求这些功能。INT 21H是DOS提供的一个中断号，通过触发此中断，程序可以与DOS操作系统进行交互并请求特定的功能。

在中断调用时，程序将设置寄存器的特定值，以指示所需的功能或操作。其中，AH寄存器通常用于指定所需功能的功能码。通过将4Ch值移动到AH寄存器，程序告知DOS操作系统它要请求的功能是程序的正常退出。

当程序执行INT 21H指令时，控制权会转移到DOS操作系统，DOS操作系统会根据AH寄存器中的值来确定所需的功能，并执行相应的操作。在这种情况下，DOS操作系统将接收到程序的正常退出请求，并相应地终止程序的执行。

这个步骤的目的是通过与操作系统进行交互，使程序能够向操作系统发送退出请求，以便程序可以正常地终止执行并返回到操作系统环境。

## 1.2 求和

```ts
;求和
data segment
  arr   dw  1,2,3
        dw  4,5,6
  count equ ($-arr)/2
  resl  dw  ?
  resh  dw  ?
data ends

code segment
        assume cs:code,ds:data
  start:mov    ax,data
        mov    ds,ax            ;重载data

        lea    bx,arr           ;重载arr,LEA 是 "Load Effective Address" 的缩写，

        mov    cx,count
  goon: mov    ax,[bx]          ;首元素
        cwd                     ;16位有符号数扩为32位有符号数
        
        add    si,ax            ;不进位加
        adc    di,dx            ;带进位的加法

        add    bx,2
        loop   goon

        mov    resl,si
        mov    resh,di

        mov    ah,4ch
        int    21h
code ends
end start 
```

## 1.3 统计数组中偶数个数

```ts
;统计该数组中偶数
data segment
  arr   dw  1,2,3
        dw  4,5,6
  count equ ($-arr)/2
  res   dw  ?
data ends

code segment
        assume ds:data,cs:code
  start:mov    ax,data
        mov    ds,ax

        lea    bx,arr

        mov    cx,count

        mov    dx,0             ;循坏开始

  goon: mov    al,[bx]
        test   al,1             ;最低位是否为 1?最低位为1跳
        jne    skip             ;JNE 是 x86 汇编语言中的条件跳转指令，用于在前一次比较的结果为不相等时进行跳转。
        add    dx,1

  skip: add    bx,2
        loop   goon
  ;结果
        mov    res,dx
  ;返回
        mov    ah,4ch
        int    21h

code ends
end start
```



## 1.4 小写转换大写

```ts
;所有的小写字母转换为对应的大写字母
data segment
  str   db  "The program is running"
  count equ $-str
data ends


code segment
        assume cs:code,ds:data
  start:mov    ax,data
        mov    ds,ax

        lea    si,str
        cld                     ;依次加载字符串的字符

  goon: lodsb                   ;LODSB 是 x86 汇编语言中的指令，用于将源字符串中的一个字节加载到 AL 寄存器中，并根据方向标志位的设置递增或递减源地址寄存器,加载到al中
        cmp    al,"a"
        jb     skip             ;JB（Jump if Below）

        CMP    al,"z"
        ja     skip             ;JA（Jump if Above）

        sub    al,32            ;变小写,A 的 ASCII 值为 65, a 的 ASCII 值为 97。

  skip: mov    dl,al
        mov    ah,2
        int    21h
        loop   goon

        mov    ah,4ch
        int    21H
code ends
end start
```



## 1.5 数组查找

```ts
data segment
  value dw 2
  arr   dw 1,2,3,4
  len   dw ($-arr)/2
data ends

code segment

        assume cs:code,ds:data
  start:mov    ax,data,
        mov    ds,ax
        lea    bx,arr
        
        mov    ax,value         ;送目标
        mov    cx,len           ;送长度

  ;
        cld                     ; Clear Direction Flag
        repne  scasw
        jne    stop
        cmp    cx,0
        je     skip
        dec    di
        dec    di
        rep    movsw
  ;首先，REPNE 是指令前缀，它用于指示后续的字符串操作要重复执行，直到满足特定条件为止。REPNE 表示重复执行，直到不相等（Not Equal）。

  ;scasw 是字符串比较操作，用于在字符串中搜索指定的字（WORD）。在给定的代码中，它用于在字符串数组中搜索与 AX 寄存器中的值相等的字。

  skip: dec    len
  stop: 
        mov    ah,4ch
        int    21h

code ends
end start
```

## 1.6 转换十进制数并输出



```ts
;
data segment
  num   dw 1001001011001010B
  ascll db 5 dup(?)           ;ascll是一个长度为5字节的数组，每个字节初始值为未知(?)
data ends

code segment
        assume cs:code,ds:data
  start:
        mov    ax,data
        mov    ds,ax
  ;开始
        lea    si,ascll+4
        mov    bx,10
        mov    cx,0
  ;1.将num转换为十进制并存储到ascll中
  div10:mov    dx,0             ;DX寄存器清零
        div    bx               ;将AX寄存器的值除以BX寄存器的值,商存储到AX,余数存储到DX
        add    dl,30h           ;将余数加上30H;得到十进制的ASCII码
        mov    [si],dl          ;dl存储到SI指向的位置
        dec    si               ;然后将SI减一
        inc    cx               ;将计数器CX加一
        cmp    ax,0
        jne    div10            ;如果AX的值不等于0，说明还有未转换的数字，继续循环执行。

  ;2.用于将ASCII数组中的字符逐个显示到屏幕上
  show: inc    si               ;SI寄存器加一
        mov    dl, [si]
        MOV    ah, 2
        INT    21H
        LOOP   show

  ;结束
        mov    ah,4ch
        int    21h

code ends
end start 
```



# 上机

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
