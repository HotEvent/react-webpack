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
标准内置Boolean构造器的实例，是一个Object。
>一个Boolean object是用Boolean构造器，在new表达式中创建的，支持一个布尔值作为一个参数。返回对象有一个内部槽，值为Boolean的值。一个Boolean object能被转为一个Boolean值。

4.3.17 String value
一个有限
