# DOM

Plugin for DOM manipulation

#### dom.create(name, properties)
```js
dom.create('input', {
    'name': 'name'
  });
// <input name="name">
```

#### dom.create(name, properties, assignmentProperties)
```js
dom.create('button', {
    'type': 'submit',
  }, {
    'innerHTML': 'Submit'
  });
// <button type="submit">Submit</button>
```
# vanilla-lazy-load
