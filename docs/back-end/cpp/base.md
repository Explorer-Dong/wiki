---
title: 语法基础
status: new
---

头文件导入：`#include`、宏定义 `#define`

命名空间：`namespace`, `using namespace std`

控制结构：`if/else`, `switch`, `for`, `while`, `do-while`

函数定义：传参、返回值、函数重载

类型系统：`int`, `float`, `bool`, `char`, `auto`, `decltype`

引用与指针：`int*`, `int&`

类与结构体：`struct`, `class`, 构造/析构函数

模板：`template<typename T>`

枚举与常量：`enum`, `constexpr`, `const`

## 运算符

先看看 C++ 都有哪些运算符 [^cpp-op]：

[^cpp-op]: [C++ 运算符 - (zh.cppreference.com)](https://zh.cppreference.com/w/cpp/language/expressions)

![C++ 的运算符](https://cdn.dwj601.cn/images/20250318171949224.png)

再看看这些运算符的优先级 [^cpp-op-pri]：

[^cpp-op-pri]: [C++ 运算符优先级 - (zh.cppreference.com)](https://zh.cppreference.com/w/cpp/language/operator_precedence)

![C++ 的运算符优先级](https://cdn.dwj601.cn/images/20250318172044391.png)

## 命名空间

用久了 `using namespace std` 后，不禁产生疑问，这是什么意思？为什么去掉了这行代码以后，一些常用的类、输入输出等等都需要加上 `std::` 之后才能继续使用（比如 `std::vector`、`std::cout`、`std::endl` 等等）？

先做一个形象的类比。我们知道在一个文件夹下不允许出现两个相同名称的文件，但是不同的文件夹下可以出现相同名称的文件。现在我需要区别的指定某一个文件，就需要显示的声明该文件属于哪一个文件夹下。放在 C++ 的库引用中也是如此。下面继续介绍一个前置知识，C++ 标准库。

关于 C++ 标准库 Standard Library。我们使用 `using namespace std` 就是为了使用这个库的一些内容，这些内容包括 **标准函数库** 和 **面向对象类库**，前者继承自 C 语言函数库并为了支持类型安全做了一定修改；后者则定义了大量常见操作的类。

至此我们已经了解了命名空间的含义与 std 是什么的前置知识，下面开始正式介绍命名空间。命名空间就是一个声明定义了很多类和函数的一个库，开发者可以通过 `::` 作用符来使用该库的所有类和函数，主要作用是为了消除同名类或函数导致的命名冲突。我们就以 std 标准库为例，下面的代码大致罗列了命名空间的使用规范：

```cpp
#include <compare>
#include <initializer_list>
#include <ios>
#include <streambuf>
#include <istream>
#include <ostream>

namespace std {
  // 数学函数(连带勒让德多项式) math.h
  assoc_legendre(unsigned l, unsigned m, x);
  float assoc_legendref(unsigned l, unsigned m, float x);
  long double assoc_legendrel(unsigned l, unsigned m, long double x);
  
  // 动态数组类 vector
  template<class T, class Allocator = allocator<T>> class vector;
 
  template<class T, class Allocator>
    constexpr bool operator==(const vector<T, Allocator>& x,
                              const vector<T, Allocator>& y);
  template<class T, class Allocator>
    constexpr __synth_three_way_result<T> operator<=>(const vector<T, Allocator>& x,
                                                    const vector<T, Allocator>& y);
  
  // 输入输出类 iostream
  extern istream cin;
  extern ostream cout;
  extern ostream cerr;
}
```

可以自定义命名空间，编写属于自己的库，举个例子，我定义一个命名空间叫 `myLibrary`，其中包含很多的功能模块，`eat` 模块，`sleep` 模块：

```cpp
// myLibrary - eat

#include <iostream>

namespace myLibrary {
    // eat class
    class eat {
    private:
        char namep[4];
        int age;

    public:
        void fun();
        void step();
    };

    // eat function
    void go();
}
```

```cpp
// myLibrary - sleep

#include <iostream>

namespace myLibrary {
    // sleep class
    class sleep {
    private:
        char[] who;
        int why;
        
    public:
        void lie();
    };
    
    // sleep function
    void haha();
    void cry();
}
```

也可以嵌套编写命名空间：

```cpp
// anotherLibrary - study

#include <iostream>

namespace anotherLibrary {
    class who {};
    class what {};
    class how {};
    
    void open();
    void close();
    
    // insert namespace
    namespace secondLibrary {
        class where {};
        class which {};
        void write(int a, int b);
    }
}
```

- 如果需要使用第一层命名空间中的类或函数，语法如；`anotherLibrary::who myClass;`
- 如果需要使用嵌套的命名空间中的类或函数，语法如：`anotherLibrary::secondLibrary::write(1, 2);`

我们可以通过 `using` 来显式的指定 **当前作用域** 中使用的命名空间，而不需要每次使用某个命名空间下的类或方法时，显式的标出空间名，比如：

```cpp
#include <iostream>
#include <vector>

int fun(int num) {
	using namespace std;
	
	vector<int> a(num + 1);
	int sum = 0;
	for (int i = 1; i <= num; i++) a[i] = i;
	for (int i = 1; i <= num; i++) sum += a[i];
	
	return sum;
}

int main() {
	std::cout << fun(10) << std::endl;
	
	return 0;
}
```

上述程序中，std 命名空间被显式的在 `fun` 函数作用域中标出了，所以可以直接使用 `vector` 而不用写成 `std::vector`。但是在 `main` 函数作用域中没有显式的标出 std 故还是需要使用 `std::` 才能使用该命名空间中定义的类或方法，此处为输入输出类的 `std::cout` 与 `std::endl`。

## 函数

无论是非内联函数还是内联函数，缺省参数均只能定义在函数的声明语句中，如下面的程序段：

```cpp
#include <iostream>

class demoClass {
public:
	int classFun(int num=100);
};

int fun(int num=100);

int main() {
	std::cout << fun(10) << std::endl;
	return 0;
}

int demoClass::classFun(int num) {
	return num;
}

int fun(int num) {
	return num;
}
```

如果在函数定义中继续进行缺省参数初始化，则会报「重定义缺省参数」的错：

![报错：Redefinition of default argument](https://cdn.dwj601.cn/images/202403041428426.png)

原因在于，编译时编译器会查找函数的声明来获取该函数的签名信息，包括：参数类型和返回类型，并不关心函数体的内容。假如只在函数定义中定义了缺省参数，在函数声明时没有定义缺省参数，此时在调用该函数时没有传递参数，由于编译器在编译函数调用时只会寻找函数声明语句而不关心函数定义，就会发生无法寻找到目标函数的错误：

![无法寻找到目标函数](https://cdn.dwj601.cn/images/202403041428507.png)

因此，无论是非内联函数（全局函数）还是内联函数（成员函数），缺省参数都只能定义在函数声明的参数列表中，而不能只在函数声明中重复定义或者只在函数定义中定义缺省参数值。

## 多文件工程

`.h` 后缀文件编写类的声明文件，`.cpp` 后缀文件编写类的定义文件，示例如下：

.h 文件：

```cpp
#include <iostream>

class TestClassFunction {
private:
	int classVar;

public:
	void classFun();
};
```

.cpp 文件：

```cpp
#include "TestClassFunction.h"
#include <iostream>

void TestClassFunction::classFun() {
	std::cout << "classFunction" << std::endl;
}
```

main 函数文件：

```cpp
#include "TestClassFunction.h"

int main() {
	TestClassFunction obj;
	obj.classFun();

	return 0;
}
```

![输出](https://cdn.dwj601.cn/images/202403012308775.png)

我们知道在 python 中，导入一个模块后除了可以使用模块的类，还可以直接调用模块文件中的函数，那么在 C++ 文件中也可以这样吗？答案是可以的，下面开始实操。

我们在上述 TestClassFunction 类的下面继续添加函数：

```cpp
#include <iostream>

class TestClassFunction {
private:
	int classVar;

public:
	void classFun();
};

void globalFun() {
	std::cout << "globalFunction" << std::endl;
}
```

尝试编译，报错：`multiple definition of globalFun()`，重定义错误。解决方法有两个：

1. 将该 `.h` 文件的函数定义写在 `.cpp` 文件中，`.h` 文件只包含函数声明；
2. 将该 `.h` 文件的函数写成内联函数的形式，即直接在函数返回值前面加上 `inline` 关键字即可。

问：在 `.cpp` 源文件中对函数定义时，`.cpp` 文件的名字必须是：`函数声明文件名.cpp` 吗？

答：不是的，只需要一个 `.cpp` 文件引用了该 `.h` 头文件，在其中进行函数定义即可。`函数声明文件名.cpp` 是一种命名规范，便于管理与识别

![不规范的 .cpp 文件命名方式](https://cdn.dwj601.cn/images/202403012308973.png)

问：内联函数不会产生函数重定义问题的原理是什么？

答：首先说一下非内联函数为什么会引发重定义错误。查阅后得知是因为引用 `.h` 文件时，如果一个函数被定义，那么引用该 `.h` 的文件中 **都会包含这个函数的定义**，由于每个函数（包括全局变量）只能有一个定义，那么很显然在编译链接时就会报重定义的错。接下回答一下问题：当函数被声明为内联时，编译器会尝试将其 **插入到每个调用该函数的地方**，以减少函数调用的开销。因此，内联函数的定义必须在每个调用它的文件中都是可见的，这就是为什么它们通常在头文件中定义。

问：为什么 `.h` 文件就可以直接对类的成员函数进行定义而不会出现重定义问题？

答：C++中的 **类成员函数默认是内联的**（inline）。但是不推荐这种直接定义成员函数的方法，因为这会导致编译时代码膨胀（每个调用的地方都会被插入函数代码），故多文件编程的规范就是：无论是类的成员函数还是全局函数，函数的声明都写在 `.h` 文件中，而对于这些函数声明的定义都写在相同文件名的 `.cpp` 文件中。

## 常用标准库

### 并发库

创建线程：`std::thread`

等待线程结束：`.join()`, `.detach()`

同步机制：`std::mutex`, `std::lock_guard`, `std::unique_lock`

原子变量：`std::atomic<T>`

任务异步：`std::async`, `std::future`, `std::promise`

### 容器库

顺序容器

`std::vector<T>`：动态数组

`std::list<T>`：双向链表

`std::array<T, N>`：定长数组

`std::deque<T>`：双端队列

关联容器

`std::set`, `std::map`：有序红黑树容器，O(logN)

`std::unordered_set`, `std::unordered_map`：哈希容器，O(1) 平均查找时间

`std::multiset`, `std::multimap`：允许重复键

### 日期时间库

定时类型：`std::chrono::seconds`, `milliseconds`

计时器：`std::chrono::steady_clock`, `high_resolution_clock`

睡眠函数：`std::this_thread::sleep_for()`

时间差值计算

### 异常库

基本语法：`try`, `catch`, `throw`

标准异常类：

- `std::exception`
- `std::runtime_error`
- `std::invalid_argument`
- `std::out_of_range`

自定义异常类继承 `std::exception`

### I/O 库

> 标准输入输出：`std::cin`, `std::cout`
>
> 文件输入输出：`std::ifstream`, `std::ofstream`, `std::fstream`
>
> 格式控制：`std::setw`, `std::setprecision`, `std::left`, `std::right`（头文件 `<iomanip>`）
>
> 字符输入输出：`get`, `put`, `getline`

C++ 封装了三个类用来进行文件 IO 操作，分别为 `ifstream`、`ofstream` 和 `fstream`。其中 `ifstream` 负责读文件，`ofstream` 负责写文件，`fstream` 读写都可以，三个类都需要依赖 `iostream` 和 `fstream` 头文件。下面分三个部分大致介绍一下，后续遇到了继续补充：

ifstream 只读

```cpp
#include <iostream>
#include <fstream>

int main() {
	std::ifstream fin;

	fin.open("../test.txt", std::ios::in);

	std::string word;
	while (fin >> word) {
		std::cout << word << " ";
	}

	fin.close();

	return 0;
}
```

ofstream 只写

```cpp
#include <iostream>
#include <fstream>

int main() {
    std::ofstream fout;
    
    fout.open("../test.txt", std::ios::out);
    
    for (int i = 1; i <= 10; i++) {
        fout << i << " ";
    }
    
    fout.close();
    
    return 0;
}
```

fstream 读写

```cpp

```

### 智能指针库

`std::unique_ptr<T>`：独占所有权，不能复制

`std::shared_ptr<T>`：引用计数共享资源

`std::weak_ptr<T>`：不影响计数的引用，解决循环引用问题

`make_shared`, `make_unique`：创建智能指针的推荐方式

### 算法库

> 排序：`std::sort`, `std::stable_sort`, `std::partial_sort`
>
> 查找：`std::find`, `std::binary_search`, `std::find_if`
>
> 修改：`std::reverse`, `std::rotate`, `std::replace`
>
> 统计：`std::count`, `std::accumulate`（需 `<numeric>`）
>
> 拷贝/移动：`std::copy`, `std::move`, `std::swap`

reverse：想要翻转一个容器，大约有以下三种方法，以 string 为例。

1）方法一：使用 `std::reverse()` 原地翻转

```c++
#include <algorithm>
#include <iostream>

using namespace std;

int main() {
    string s = "hello world!";
    cout << s << "\n";

    reverse(s.begin(), s.end());
    cout << s << "\n";

    return 0;
}
```

2）方法二：使用 `std::reverse_copy` 拷贝翻转

```c++
#include <algorithm>
#include <iostream>

using namespace std;

int main() {
    string s = "hello world!";
    cout << s << "\n";

    string t(s.size(), ' ');  // 需要提前申请好内存空间
    reverse_copy(s.begin(), s.end(), t.begin());
    cout << t << "\n";

    return 0;
}
```

3）方法三：重新构造

```c++
#include <algorithm>
#include <iostream>

using namespace std;

int main() {
    string s = "hello world!";
    cout << s << "\n";

    string t = string(s.rbegin(), s.rend());
    cout << t << "\n";

    return 0;
}
```

上述均输出：

```c++
hello world!
!dlrow olleh
```
