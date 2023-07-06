# 期末代码

## 基本

### 1.1 最大元素

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

### 1.2 求和

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

### 1.3 统计数组中偶数个数

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



### 1.4 小写转换大写

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



### 1.5 数组查找

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

### 1.6 转换十进制数并输出



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



### 1.7	输入显示

```assembly
;显示
data segment
  value dw ?
data ends

code segment
        assume cs:code, ds:data

  start:
        mov    ax, data
        mov    ds, ax
        mov    bx, 0
        mov    cx, 4

  goon: 
        mov    ah, 07h
        int    21h               ;调用中断21h，这是DOS的功能调用。

        cmp    al, 0dh
        je     stop              ;如果输入了回车键，则跳转到stop标签处。
        cmp    al, '0'
        jb     goon              ;s输入的不是数字,从新到goon
        cmp    al, '9'
        ja     goon


        mov    dl, al            ;将输入的字符存储在寄存器dl中。
        mov    ah, 02h           ;将02h（02的十六进制表示）存储在寄存器ah中。
        int    21h
        and    al, 0fh           ;将al与0fh进行按位与运算，将字符转换为数字（0-9之间的数值）。
        call   mul10             ;调用mul10过程，将当前数字乘以10。
        mov    ah, 0             ;为了下一次乘以10做准备。
        add    bx, ax            ;乘以10后的结果加到bx寄存器中。
        loop   goon

  stop: 
        mov    value, bx
        mov    ah, 4ch
        int    21h

mul10 proc                       ; 子程序proc定义
        sal    bx, 1             ;当前结果乘以2。
        mov    dx, bx
        sal    bx, 1
        sal    bx, 1
        add    bx, dx
        ret
mul10 endp

code ends
end start
```

## 芯片

### 1.	8254计数器初始化

```ts
;13.利用 8254 的计数器 0#和计数器 1#每秒钟产生一次中断请求，共中断 10 次， 每次中断在屏幕上输出一个字符串(字符串的具体内容可随意指定)。
data segment
  str   db "The program is interruptted.", 0dh, 0ah, "$"
  count db 10
data ends

code segment
         assume cs:code, ds:data
  main:  cli                      ;清除中断标志位
         mov    al, 00110110b
         out    43h, al
         mov    ax, 2500          ;频率为 2.5MHz
         out    40h, al
         mov    al, ah
         out    40h, al
         mov    al, 01110110b
         out    43h, al
         mov    ax, 1000
         out    41h, al
         mov    al, ah
         out    41h, al
         mov    al, 00011011b
         out    20h, al
         mov    al, 08h
         out    21h, al
         mov    al, 00000001b
         out    21h, al
         in     al, 21h
         and    al, 11110111b
         out    21h, al
         mov    dx, seg outstr

         mov    ds, dx
         lea    dx, outstr
         mov    al, 0bh
         mov    ah, 25h
         int    21h
         mov    ax, data
         mov    ds, ax
         sti
  wait0: cmp    count, 0
         jne    wait0
         mov    ah, 4ch
         int    21h
outstr proc far
         lea    dx, str
         mov    ah, 9
         int    21h
         dec    count
         mov    al, 00100000b
         out    20h, al
         sti
         iret
outstr endp
code ends
end main
```

### 2.	8254计数器2

```ts
;假设 8254 的四个端口地址分别为 40～43H。
;计数器 0工作在方式 2，计数初值为 240，按二进制计数；
;计数器 1工作在方式 0，计数初值为 5000，按 BCD 码计数；
;计数器 2工作在方式 3，计数初值为 3FFH，按二进制计数
;请分别写出对该 8254 三个计数器初始化的程序段以及读取计数器 2#当前值的程序段，要求把读出结果保存到字变量 CT2 中

;计数器0初始化： 
mov dx,43h
mov al, 00010100b
out 43h, al;在8254芯片中，端口地址 43h 用于控制寄存器的选择
mov al, 240
out 40h, al

;计数器1初始化
mov al, 01110001b
out 43h, al 
mov ax, 5000h
out 41h, al
xchg al, ah
out 41h, al

;计数器2初始化
mov al, 10110110b
out 43h, al
mov ax, 3ffh
out 42h, al
mov al, ah
out 42h, al

; 读计数器 2# 当前值
mov al, 10000000b
out 43h, al
in al, 42h
mov ah, al
in al, 42h
xchg ah, al
mov ct2, ax
```





### 3.	8259A初始化

```ts
;某微型机的中断系统由 3 片 8259A 组成,以级联方式进行连接。其中作为主片的 8259A 的端口地址为 20h 和 21h,工作方式为特殊完全嵌套、电平触发、缓冲及中断非自动结束,中断类型号为 48～4Fh。第一个从片 8259A 的端口地址为 22h 和23h,工作方式为非特殊完全嵌套、电平触发、缓冲及中断非自动结束,中断类型号为 60～67h,中断请求输出端 INT 与主片的 IR2 连接在一起；第二个从片 8259A 的端口地址为 24h 和 25h,工作方式为非特殊完全嵌套、电平触发、缓冲及中断非自动结束,中断类型号为 68～6Fh,中断请求输出端 INT 与主片的 IR5 连接在一起。请编写程序分别对上述三个 8259A 芯片进行初始化

mov al,19h;设置主片的特殊完全嵌套工作方式
out 20h,al;
mov al,48h;中断类型号范围
out 21h,al
mov al,24h;中断请求输出端与从片2连接的IR5
out 21h,al
mov al,1Dh;主片的中断非自动结束模式
out 21h,al

;从片 1 初始化程序段：
mov al,19h
out 22h,al
mov al,60h
out 23h,al
mov al,02h
out 23h,al
mov al,09h
out 23h,al

;从片 2 初始化程序段：
mov al,19h
out 24h,al
mov al,68h
out 25h,al
mov al,05h
out 25h,al
mov al,09h
out 25h,al
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

## 1.8	排序

```assembly
;定义一个带符号的字数组，数组的长度(元素个数)至少为 5。
;请分别编写主程序和中断服务程序，
;要求在主程序中使用 INT 60H 调用中断服务程序 SORT 对上述数组的各元素按从小到大排序。
data segment
  array dw  2,3,4,1
  count equ ($-array)/2
data ends

code segment
        assume cs:code, ds:data
  start:
  ;开始
        mov    dx, seg sort      ;用于后序访问sort
        mov    ds, dx
        lea    dx, sort
  ;中断功能调用
        mov    al, 60h           ;用于DOS功能调用。
        mov    ah, 25h           ;控制转移
        int    21h

        mov    ax, data
        mov    ds, ax
        int    60h

        mov    ah, 4ch
        int    21h

sort proc far
        mov    dx, count
        dec    dx
  next: 
        lea    si, array         ;当前元素
        lea    di, array+2       ;下一个元素
        mov    cx, dx

  goon: 
        mov    ax, [si]
        cmp    ax, [di]
        jle    skip              ;jle skip：如果比较结果小于或等于(less equal)，则跳转到标记skip处。

        xchg   ax, [di]          ;
        xchg   ax, [si]

  skip: 
        inc    si
        inc    si
        inc    di
        inc    di
        loop   goon

        dec    dx
        jne    next              ;如果寄存器dx的值不等于0，则跳转到标记next处，继续下一轮循环。
        iret                     ;iret：中断返回指令，用于从中断处理程序返回。
sort endp

code ends
end start
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
