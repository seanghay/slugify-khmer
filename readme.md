### Slugify Khmer

A simple Khmer text slugify built for speed not correctness and was built on top of [`split-khmer`](https://github.com/seanghay/split-khmer)

### Install
```
npm install slugify-khmer
```

### Usage

```javascript
import { slugify } from 'slugify-khmer';

slugify('មិនដឹងទេ that\'s nice') 
// => mindoeng-te that's nice

slugify('មិនដឹងទេ that\'s nice', "_") 
// => mindoeng_te that's nice
```

### `transform(text: string): Generator<string>`

```javascript
import { transform } from 'slugify-khmer';

for (const s of transform('មិនដឹងទេ')) {
	console.log(s);
}
```

### License 

MIT
