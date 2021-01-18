之前出于学习的目的，写了一个jsx的解析器，但是没有接入js环境，于是开始阅读ecma262标准。
这个系列的文章主要目的是，通过用js写一个ecmascript的解析器，完整掌握JavaScript所有的语法内容（最终当然是写一个js的解析器），本系列的代码会放在github上。
本系列的代码使用TypeScript编写。
文章一共分20+章，每一章都会对所有语法进行解析。让我们开始吧。

4.3.1 type
条款6数据值集合的定义

4.3.2 primitive value(原始值)
条款6中定义的 Undefined，Null，Boolean，Number，BigInt，Symbol，或者String这些类型中的一个成员。
注意 一个原始值是语言底层实现的一个数据

4.3.3 object
Object类型的成员
>注意 一个对象是 多个属性的集合，同时这个对象有一个单原型对象。原型可能为null(空)值

4.3.4 constructor
创建和初始化对象们的函数对象
>注意 构造方法的"prototype"属性的值是一个原型对象，这个原型对象被用于实现继承和共享属性。

4.3.5 prototype（原型）
被用于给其他对象共享属性的对象
>注意 当一个构造方法创建一个对象，创建的对象会暗中引用构造方法的"prototype"属性决定属性的引用。构造方法的"prototype"属性能被程序表达式"constructor.prototype"引用，并且"prototype"属性被"共享地"添加到创建的对象的prototype属性里，通过继承，所有的对象共享prototype.或者，一个对象可能通过一个显式的标准prototype创建-使用Object.create构造函数。

4.3.6 ordinary object（普通对象）
基本内置方法都是默认行为的对象

4.3.7 exotic object（奇异对象）
有一个或者多个基本内置方法不是默认行为的对象
>注意 任何对象不是普通对象就是奇异对象

4.3.8 standard object（标准对象）
ecma262规范语义所定义的对象

4.3.9 built-in object（内置对象）
ECMAScript实现的对象

4.3.16 Boolean object
标准内置Boolean构造器的实例，类型为Object。
>注意 一个Boolean object是用Boolean构造器，在一个new表达式中创建的，支持一个布尔值作为一个参数。返回对象有一个内部槽，值为Boolean值。一个Boolean object能被转为一个Boolean值。

4.3.17 String value
一个零个或者多个16字节无符号整数值的有限有序序列的原始值
>注意 一个字符值是字符类型的成员。所有整数值在序列里通常代表一个单16字节单位的UTF-16文本。然而，ECMAScript没有做任何限制和必须，对于String值它们必须是16字节无符号整数。

4.3.18 String type
设置于任何可能的字符值

4.3.19 String object
标准内置String构造器的实例，类型为Object
>注意 一个String object是用String构造器，在一个new表达式中创建的，支持一个字符值作为一个参数。返回对象有一个内部槽，值为String值。一个String object能使用String构造器作为一个函数转成一个String值。
```
let stringObj = new String('foo');
let s1 = String(stringObj); //foo
```

4.3.20 Number value
符合双精度64字节二进制格式IEEE754-2019值的原始值。
>注意 一个数值是数字类型，同时也是一个数字的直接表示。

4.3.21 Number type
设置于任何可能的数值，包含“不是一个数”（NaN）、正无穷、负无穷

4.3.22 Number object
标准内置Number构造器的实例，类型为Object
>注意 一个Number object是用Number构造器，在一个new表达式中创建的，支持一个数值作为一个参数。返回对象有一个内部槽，值为数值。一个Number object能使用String构造器作为一个函数转成一个数值。

4.3.23 Infinity
可能的正无穷数值

4.3.24 NaN
一个IEEE 754-2019 “不是一个树”值的值

4.3.25 BigInt value
符合一个任意精度整数值的原始值

4.3.26 BigInt type
设置于所有可能的BigInt值

4.3.27 BigInt object
标准内置BigInt构造器的实例，类型为Object

4.3.28 Symbol value
相当于一个唯一值，非字符串对象属性键的原始值

4.3.29 Symbol type
设置于所有可能的Symbol值

4.3.30 Symbol object
标准内置Symbol构造器的实例，类型为Object

4.3.31 function
可能作为一个子程序的对象,类型为Object
>注意 除了这些属性之外，一个function包含可执行的代码和当被引用后，决定如何表现的状态。一个function的代码可能会或者可能不会使用ECMAScript编写

4.3.32 built-in function
内置的function对象
>注意 例如，parseInt和Math.exp就是内置的函数。一个ECMAScript实现可能提供规范外的依赖于实现的内置函数。

4.3.33 property
一个对象中的一部分，一个连接key（一个String值或者一个Symbol值）和一个值
>注意 属性的表现方式取决于直接的数据值（一个原始值，一个对象，或者一个function object）或者间接的一对函数的访问方法(get,set)

4.3.34 method（方法）
作为属性值的function
>注意 当一个function被作为一个对象的一个方法来调用，这个对象会传递给function，作为this的值。

4.3.35 built-in method（内置方法）
内置函数作为方法
>注意 标准内置方法在这份规范中被定义，一个ECMAScript实现可能规定和提供其他额外内置方法。

4.3.36 attribute
使用一些特定属性定义的内部值

4.3.37 own property（自有属性）
对象显式包含的属性

4.3.38 inherited property（继承属性）
对象的属性，不是对象的自有属性，但是是对象的属性中的一个属性（例如自有和继承）

4.4 Organization of This Specification（这份规范是如何组织的）
这份规范接下来的内容是这样组织的：
条款5定义用于这份规范的符号约定。
条款6-9定义ECMAScript程序工作的执行环境。








