# オブジェクトの一部だけを書き換えたい => スプレッド構文
`obj = {a: 10, b: "foo", c: "123"}`で、cをnumber型に変えたいと思ったとき。

`obj.c = Number(obj.c)`としてしまってもよいが、mapなどと併用してオブジェクトのまま書き換えてしまいたい場合、
`{...obj, c: Number(obj.c)}`
としても実装できる。
記入順に代入されるので、`{c: Number(obj.c), ...obj}`と書くとobj.cが上書きするので意味がなくなる。

# as const句でオブジェクトの値を制限

```
const obj = {
    a: "aaa"
    b: "bbb"
    c: "ccc"
};
obj.a = "abc"; // 通る

```

これを変換ルール的な不変の定数として使いたくても、各キーがstring型であるために書きかえを許してしまう。そこで、`as const`句を使うと値の書き換えをできなくできる。

```
const obj = {
    a: "aaa"
    b: "bbb"
    c: "ccc"
} as const;
obj.a = "abc" // 通らない

```

この変換を関数によってラップするときには、`type Arg = keyof typeof obj;`とすると、引数をここでいう"a","b","c"というリテラル型に限定できる。
