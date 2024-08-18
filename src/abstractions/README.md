### Component Abstractions

sample scenario. 
Let's say you have a form. Logically speaking, a form contains a field or a bunch of fields.
And each field was constructed as component.

In most codebase, we store this code inside 'components' dir 
```javascript
  <form>
    <InputField>
    <InputField>
    <InputField>
  </form>
```

then we use it on our 'pages'
```javascript
  <main>
    <!--- code here --- >
    <Form />
    <!--- code here --- >
  </main>
```

If you notice, that form is abstracted and use **components** inside it. So I came up with an idea
why not create out own **abstractions** dir where we only abstracted component lives.

This code will not live in **abstractions**
```javascript
  <form>
    <InputField>
    <InputField>
    <InputField>
  </form>
```

and a **components** dir should only have a component without relying to other components 