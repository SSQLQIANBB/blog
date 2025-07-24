- lambda表达式

    ```c++
    #include <algorithm>
    #include <cmath>
    
    void abssort(float* x, unsigned n) {
        std::sort(x, x + n,
            // Lambda expression begins
            [](float a, float b) {
                return (std::abs(a) < std::abs(b));
            } // end of lambda expression
        );
    }
    ```


    ![lambdaexpsyntax.png](/notion/images/3506faa46e17bd12deb2d0bb94f78174.png)

    > lambda 表达式示例为 [=] () 可变 throw () -> int { return x+y; }[=] 是捕获子句;在 C++ 规范中也称为 lambda-introducer。 括号表示参数列表。 可变关键字是可选的。 throw () 是可选的异常规范。 -> int 是可选的尾随返回类型。 lambda 正文由大括号内的 语句组成，或返回 x+y;这些内容在图像之后进行了更详细的说明。
    1. capture 子句（在 C++ 规范中也称为 Lambda 引导。）
    2. 参数列表（可选）。 （也称为 Lambda 声明符）
    3. mutable 规范（可选）。
    4. exception-specification（可选）。
    5. trailing-return-type（可选）。
    6. Lambda 体。
