# オプショナルチェーン
オブジェクトのプロパティがnullやundefinedの可能性があるとき、`?`をつけることでReference Errorを回避してundefinedを返すようにできる。

`someObject.maybeNull?.doSomething()`と書くことで、`maybeNull`プロパティがundefinedのときこれもundefinedを返してくれる。
TSではプロパティの型を`<string | null>`のように定義したときはこのように書かないとエラーになるようだ。

# Record型
`Record<K, V>`で宣言する、`Map<K, V>`に似た型。実際にはオブジェクト型。

https://qiita.com/_ken_/items/5f90aa1ea776bc03857b

用法面でMapに比べると、より静的なキーに対して積極的に採用したい型になる。
特にキーをユニオン型などで縛るとより強力になりそう。

# ??演算子
&& ||あたりの短絡演算子の仲間で、左辺がnull、undefinedの場合に右辺を返す演算子。
possibly nullの場合に便利。
