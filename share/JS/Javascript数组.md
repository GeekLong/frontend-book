# 关于JavaScript 数组你应该知道的事情

## 必不可少的

当跟数组打交道时，有四件事你应该清楚：map,filter,reduce 和 展开操作符。它们富有力量。

### map

你可以在很多种情况下使用它。基本地，每次你需要修改数组的元素时，考虑使用 map。

它接受一个参数：一个方法，在每一个数组元素上调用。然后返回一个新的数组，所以没有副作用。

```
const numbers = [1, 2, 3, 4]
const numbersPlusOne = numbers.map(n => n + 1) // 每个元素 +1
console.log(numbersPlusOne) // [2, 3, 4, 5]

```

你也能创建一个新数组，用于保留对象的一个特殊属性：

```
const allActivities = [
  { title: 'My activity', coordinates: [50.123, 3.291] },
  { title: 'Another activity', coordinates: [1.238, 4.292] },
  // etc.
]

const allCoordinates = allActivities.map(activity => activity.coordinates)
console.log(allCoordinates) // [[50.123, 3.291], [1.238, 4.292]]


```

所以，请记住，当你需要去转换数组时，考虑使用map。

### filter

这个方法的名字在这里十分准确的：当你想去过滤数组的时候使用它。

如同map所做，它接受一个函数作为它的唯一参数，在数组的每个元素上调用。这个方法返回一个布尔值

 * true 如果你需要在数组中保留元素
 * false 如果你不想保留它

 
接着你会得到一个带有你想要保留的元素的新数组

```
const numbers = [1, 2, 3, 4, 5, 6]
const oddNumbers = numbers.filter(n => n % 2 !== 0)
console.log(oddNumbers) // [1, 3, 5]


```

或者你可以在数组中移除特殊的项：

```

const participants = [
  { id: 'a3f47', username: 'john' },
  { id: 'fek28', username: 'mary' },
  { id: 'n3j44', username: 'sam' },
]

function removeParticipant(participants, id) {
  return participants.filter(participant => participant.id !== id)
}

console.log(removeParticipant(participants, 'a3f47')) //  [{ id: 'fek28', username: 'mary' }, { id: 'n3j44', username: 'sam' }];


```

### reduce

reduce 使用有值的数组然后组合成一个新的值。它接受两个参数，一个回调方法就是我们的 reducer 和一个可选的初始化的值（默认是数组的第一个项）。这个 reducer 自己使用四个参数：


* 累计：在你的 reducer 中累积的返回值
* 当前数组的值
* 当前索引
* 当前调用 reduce 的数组


大多数时候，你只需要使用前两个参数：累计值和当前值。

抛开这些理论。来看看常见的一个 reduce 的例子。

```
const numbers = [37, 12, 28, 4, 9]
const total = numbers.reduce((total, n) => total + n)
console.log(total) // 90

```
在第一个遍历时，这个累计值，也就是 total，使用了初始化为 37 的值。它返回的值是 37 + n 并且 n 等于 12，因此得到 49.在第二次遍历时，累加值是 49，返回值是 49 + 28 = 77。如此继续直到第四次。


reduce 是很强大的，你可以实际使用它去构建很多数组的方法，比如 map 或者 filter：


```
const map = (arr, fn) => {
  return arr.reduce((mappedArr, element) => {
    return [...mappedArr, fn(element)]
  }, [])
}

console.log(map([1, 2, 3, 4], n => n + 1)) // [2, 3, 4, 5]

const filter = (arr, fn) => {
  return arr.reduce((filteredArr, element) => {
    return fn(element) ? [...filteredArr] : [...filteredArr, element]
  }, [])
}

console.log(filter([1, 2, 3, 4, 5, 6], n => n % 2 === 0)) // [1, 3, 5]

```

### 展开操作（ES2015）

我知道这不是一个方法。但是，在处理数组时，使用展开操作可以帮助你做很多事情。事实上，你可以在另一个数组中使用它展开一个数组的值。从这一点来说，你可以复制一个数组，或者连接多个数组。

```
const numbers = [1, 2, 3]
const numbersCopy = [...numbers]
console.log(numbersCopy) // [1, 2, 3]

const otherNumbers = [4, 5, 6]
const numbersConcatenated = [...numbers, ...otherNumbers]
console.log(numbersConcatenated) // [1, 2, 3, 4, 5, 6]

```

注意：：展开操作符对原数组做了一次浅拷贝。但什么是 浅拷贝？

额，浅拷贝是尽可能少的复制原数组。当你有一个数组包含数字，字符串或者布尔值（基本类型），它们是没问题的，这些值被真正复制。然而，对于 对象和数组 而言，这是不同的。只有 对原值的引用 会被复制！因此，如果你创建一个包含对象的数组的浅拷贝，然后在拷贝的数组中修改了对象，它也会修改原数组的对象，因为它们是 同一个引用。


```

const arr = ['foo', 42, { name: 'Thomas' }]
let copy = [...arr]

copy[0] = 'bar'

console.log(arr) // No mutations: ["foo", 42, { name: "Thomas" }]
console.log(copy) // ["bar", 42, { name: "Thomas" }]

copy[2].name = 'Hello'

console.log(arr) // /!\ MUTATION ["foo", 42, { name: "Hello" }]
console.log(copy) // ["bar", 42, { name: "Hello" }]


```
## 最好了解的

### includes（ES2015）

你曾经尝试用过 indexOf 去查找一个数组中是否存在某个东西吗？这是一个糟糕的方式对吧？幸运的是，includes 为我们做到了这些。给 includes 一个参数，然后会在数组里面搜索它，如果一个元素存在的话。


```

const sports = ['football', 'archery', 'judo']
const hasFootball = sports.includes('football')
console.log(hasFootball) // true

```

### concat

concat 方法可以用来合并两个或者更多的数组。

```

const numbers = [1, 2, 3]
const otherNumbers = [4, 5, 6]

const numbersConcatenated = numbers.concat(otherNumbers)
console.log(numbersConcatenated) // [1, 2, 3, 4, 5, 6]

// You can merge as many arrays as you want
function concatAll(arr, ...arrays) {
  return arr.concat(...arrays)
}

console.log(concatAll([1, 2, 3], [4, 5, 6], [7, 8, 9], [10, 11, 12])) // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]


```
## forEach

无论何时你想为数组的每个元素执行一些事情时，可以使用 forEach。它使用一个函数作为参数，然后给它三个参数：当前值，索引，和当前数组。


```

const numbers = [1, 2, 3, 4, 5]
numbers.forEach(console.log)
// 1 0 [ 1, 2, 3 ]
// 2 1 [ 1, 2, 3 ]
// 3 2 [ 1, 2, 3 ]

```

### indexOf

这个用来在给定的数组中找出第一个被发现的元素的索引。 indexOf 也广泛用于检查元素是否在一个数组中。不过老实说，我如今已经不这样使用了。


```

const sports = ['football', 'archery', 'judo']

const judoIndex = sports.indexOf('judo')
console.log(judoIndex) // 2


```


### find


find 方法十分类似于 filter 方法。你必须提供一个函数用于测试数组的元素。然而，find 一旦发现有一个元素通过测试，就立即停止测试其他元素。不用于 filter，filter 将会迭代整个数组，无论情况如何。


```
const users = [
  { id: 'af35', name: 'john' },
  { id: '6gbe', name: 'mary' },
  { id: '932j', name: 'gary' },
]

const user = users.find(user => user.id === '6gbe')
console.log(user) // { id: '6gbe', name: 'mary' }


```

所以使用 filter，当你想去过滤整个数组时。使用 find 在当你确定在数组中找某个唯一元素的时候。

### findIndex

这个方法完全跟 find 类似，它返回第一个发现元素的索引，而不是直接返回元素。


```
const users = [
  { id: 'af35', name: 'john' },
  { id: '6gbe', name: 'mary' },
  { id: '932j', name: 'gary' },
]

const user = users.findIndex(user => user.id === '6gbe')
console.log(user) // 1


```

你或许认为 findIndex 跟 indexOf 是相同的。额……不完全是。indexOf 的第一个元素是基本值（布尔，数字，字符串，null，undefined或者一个 symbol）而findIndex的第一个元素是一个回调方法。
所以当你需要搜索在数组中的一个元素的基本值时，使用 indexOf。如果有更复杂的元素，比如object，使用 findIndex。

### slice


当你需要取出或者复制数组的一部分，可以使用 slice。但是注意，像展开操作符一样， slice 返回部分的浅拷贝！


```
const numbers = [1, 2, 3, 4, 5]
const copy = numbers.slice()


```

假设你想去从 API 中去除一定量的聊天记录里，然后展示它们中的 5 条。有两种方式实现：一种是循环，另一种是 slice。


```
// 传统方式
// 用循环来决定消息的数量
const nbMessages = messages.length < 5 ? messages.length : 5
let messagesToShow = []
for (let i = 0; i < nbMessages; i++) {
  messagesToShow.push(posts[i])
}

// 假设 arr 少于 5 个元素
// slice 将会返回原数组的整个浅拷贝
const messagesToShow = messages.slice(0, 5)


```

### some

如果你想测试数组中 至少有一个元素 通过测试，那么可以使用 some。就像是 map,filter,和 find，some 用回调函数作为参数。它返回 ture，如果至少一个元素通过测试，返回 true 否则返回 false。

当你处理权限问题的时候，可以使用 some：


```

const users = [
  {
    id: 'fe34',
    permissions: ['read', 'write'],
  },
  {
    id: 'a198',
    permissions: [],
  },
  {
    id: '18aa',
    permissions: ['delete', 'read', 'write'],
  },
]

const hasDeletePermission = users.some(user =>
  user.permissions.includes('delete')
)
console.log(hasDeletePermission) // true

```


### every


类似 some，不同的是 ever 测试了所有的元素是否满足条件（而不是 至少一个）。


```

const users = [
  {
    id: 'fe34',
    permissions: ['read', 'write'],
  },
  {
    id: 'a198',
    permissions: [],
  },
  {
    id: '18aa',
    permissions: ['delete', 'read', 'write'],
  },
]

const hasAllReadPermission = users.every(user =>
  user.permissions.includes('read')
)
console.log(hasAllReadPermission) // false


```


### flat(ES2019)


 在JavaScript 世界中。大致而言，flat 穿件一个新数组，通过组合所有的子数组元素。接受一个参数，数值类型，代表你想展开的深度。
 
 ```
 const numbers = [1, 2, [3, 4, [5, [6, 7]], [[[[8]]]]]]

const numbersflattenOnce = numbers.flat()
console.log(numbersflattenOnce) // [1, 2, 3, 4, Array[2], Array[1]]

const numbersflattenTwice = numbers.flat(2)
console.log(numbersflattenTwice) // [1, 2, 3, 4, 5, Array[2], Array[1]]

const numbersFlattenInfinity = numbers.flat(Infinity)
console.log(numbersFlattenInfinity) // [1, 2, 3, 4, 5, 6, 7, 8]

 ```
 
 ### flatMap(ES2019)
 
 
 ```
 
 const sentences = [
  'This is a sentence',
  'This is another sentence',
  "I can't find any original phrases",
]

const allWords = sentences.flatMap(sentence => sentence.split(' '))
console.log(allWords) // ["This", "is", "a", "sentence", "This", "is", "another", "sentence", "I", "can't", "find", "any", "original", "phrases"]


 ```
 
 这个例子中，数组里有一些句子，然而我们想得到所有的单词。不使用 map 去把所有的句子分割成单词然后展开数组，你可以直接使用 flatMap。
 
 
 与 flatMap 无关的，你可以使用 reduce 方法来计算单词的数量（只是展示另一种 reduce 的用法）
 
 
 ```
 const wordsCount = allWords.reduce((count, word) => {
  count[word] = count[word] ? count[word] + 1 : 1
  return count
}, {})
console.log(wordsCount) // { This: 2, is: 2, a: 1, sentence: 2, another: 1, I: 1, "can't": 1, find: 1, any: 1, original: 1, phrases: 1, }

 ```
 
 
### join
 
 如果你需要基于数组元素创建字符串，join 正是你所寻找的。它允许通过链接数组元素来创建一个新的字符串，通过提供的分割符分割。

举个例子，你可以使用 join 一眼展示活动的参与者：


```
const participants = ['john', 'mary', 'gary']
const participantsFormatted = participants.join(', ')
console.log(participantsFormatted) // john, mary, gary


```

下面的例子更真实，在于你想先过滤参与者然后得到他们的名字。


```

const potentialParticipants = [
  { id: 'k38i', name: 'john', age: 17 },
  { id: 'baf3', name: 'mary', age: 13 },
  { id: 'a111', name: 'gary', age: 24 },
  { id: 'fx34', name: 'emma', age: 34 },
]

const participantsFormatted = potentialParticipants
  .filter(user => user.age > 18)
  .map(user => user.name)
  .join(', ')

console.log(participantsFormatted) // gary, emma

```
### from


这是一个静态方法，从类数组中创建新的数组，或者像例子中的字符串一样遍历对象。当处理 dom 时，这个方法十分有用。

```

const nodes = document.querySelectorAll('.todo-item') // 这是一个 nodeList 实例
const todoItems = Array.from(nodes) // 现在你能使用 map filter 等等，就像在数组中那样!


```

你曾经见到过我们使用 Array 代替数组实例吗？这就是问什么 from 被称作静态方法。

接着可以愉快处理这些节点，比如用 forEach 在每个节点上注册事件监听：


```
todoItems.forEach(item => {
  item.addEventListener('click', function() {
    alert(`You clicked on ${item.innerHTML}`)
  })
})

```
### 最好了解突变



下面是其他常见的数组方法。不同之处在于，它们会修改原数组。修改数组并没有什么错，最好是你应该有意识去修改它。

对于这些方法，如果你不想去改变原数组，只能在操作前浅拷贝或者深拷贝。


```
const arr = [1, 2, 3, 4, 5]
const copy = [...arr] // or arr.slice()

```


### sort

是的，sort 修改了原数组。事实上，在这里进行了数组元素排序。默认的排序方法把所有的元素转换成字符串，然后按照字母表排序它们。


```

const names = ['john', 'mary', 'gary', 'anna']
names.sort()
console.log(names) // ['anna', 'gary', 'john', 'mary']


```

### fill

fill 修改或者填充了数组的所有元素，从开始索引到结束索引，使用一个静态值。fill 最有用的作用是使用静态值填充一个新数组。


```

//  Normally I would have called a function that generates ids and random names but let's not bother with that here.
function fakeUser() {
  return {
    id: 'fe38',
    name: 'thomas',
  }
}

const posts = Array(3).fill(fakeUser())
console.log(posts) // [{ id: "fe38", name: "thomas" }, { id: "fe38", name: "thomas" }, { id: "fe38", name: "thomas" }]

```

### reverse


这个方法名在这里显而易见。然而，像留意 sort 那样，reverse 会反转数组的位置。


```

const numbers = [1, 2, 3, 4, 5]

numbers.reverse()
console.log(numbers) // [5, 4, 3, 2, 1]


```

## 你可以替换的方法


### push

处理数组时这是使用最多的方法。事实上，push 允许你在数组中添加一个或者多个元素。它也通常基于一个旧数组构建一个新数组。


```

const todoItems = [1, 2, 3, 4, 5]

const itemsIncremented = []
for (let i = 0; i < todoItems.length; i++) {
  itemsIncremented.push(todoItems[i] + 1)
}

console.log(itemsIncremented) // [2, 3, 4, 5, 6]

const todos = ['Write an article', 'Proofreading']
todos.push('Publish the article')
console.log(todos) // ['Write an article', 'Proofreading', 'Publish the article']


```

并且如果你需要使用 push，当你要添加新元素的时候，展开操作符为你撑腰。


```
const todos = ['Write an article', 'Proofreading']
console.log([...todos, 'Publish the article']) // ['Write an article', 'Proofreading', 'Publish the article']

```

### splice

splice 常常用于作为移除某个索引元素的方法。你可以同样使用 filter 做到。


```
const months = ['January', 'February', 'March', 'April', ' May']

// With splice
months.splice(2, 1) // remove one element at index 2
console.log(months) // ['January', 'February', 'April', 'May']

// Without splice
const monthsFiltered = months.filter((month, i) => i !== 3)
console.log(monthsFiltered) // ['January', 'February', 'April', 'May']

```


你可能会想，如果我需要移除多个元素呢？额，使用 slice：


```

const months = ['January', 'February', 'March', 'April', ' May']

// With splice
months.splice(1, 3) // remove thirds element starting at index 1
console.log(months) // ['January', 'May']

// Without splice
const monthsFiltered = [...months.slice(0, 1), ...months.slice(4)]
console.log(monthsFiltered) // ['January', 'May']


```

### shift

shift 移除数组的第一个元素然后返回它。从功能上来说，你可以使用 spread/rest 实现。


```

const numbers = [1, 2, 3, 4, 5]

// With shift
const firstNumber = numbers.shift()
console.log(firstNumber) // 1
console.log(numbers) // [2, 3, 4, 5]

// Without shift
const [firstNumber, ...numbersWithoutOne] = numbers
console.log(firstNumber) // 1
console.log(numbersWithoutOne) // [2, 3, 4, 5]


```


### unshift

Unshift 允许你在数组开始添加一个或者多个元素。像是 shift， 你可以使用展开操作符做同样的事：


```

const numbers = [3, 4, 5]

// With unshift
numbers.unshift(1, 2)
console.log(numbers) // [1, 2, 3, 4, 5]

// Without unshift
const newNumbers = [1, 2, ...numbers]
console.log(newNumbers) // [1, 2, 3, 4, 5]


```