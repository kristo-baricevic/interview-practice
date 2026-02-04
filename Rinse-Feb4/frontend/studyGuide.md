# Technical Interview Study Guide

## React Frontend + Python Backend

---

## SESSION 1: REACT FRONTEND (Karina & Fisher)

### Core React Concepts

#### 1. **Component Fundamentals**

- **Functional vs Class Components** (focus on functional - industry standard)
- **JSX syntax and rules**
  - JavaScript expressions in `{}`
  - CamelCase for attributes
  - Self-closing tags
  - Fragments `<></>`

#### 2. **Hooks (Critical)**

**useState**

```javascript
const [count, setCount] = useState(0);
// Updating state
setCount(count + 1);
// Functional update (safer for async)
setCount((prev) => prev + 1);
```

**useEffect**

```javascript
// Runs after every render
useEffect(() => {
  document.title = `Count: ${count}`;
});

// Runs once on mount
useEffect(() => {
  fetchData();
}, []);

// Runs when dependencies change
useEffect(() => {
  const subscription = subscribe(userId);
  return () => subscription.unsubscribe(); // Cleanup
}, [userId]);
```

**useContext**

```javascript
const theme = useContext(ThemeContext);
```

**useRef**

```javascript
const inputRef = useRef(null);
// Access DOM: inputRef.current.focus()
// Persist values without re-render
```

**useMemo & useCallback**

```javascript
// Memoize expensive calculations
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(a, b);
}, [a, b]);

// Memoize functions (prevent child re-renders)
const handleClick = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
```

#### 3. **State Management**

- **Lifting state up** - when multiple components need same state
- **Props drilling** and how to avoid it
- **Context API** for global state
- Basic understanding of **Redux**

#### 4. **Event Handling**

```javascript

// Inline
<button onClick={() => handleClick(id)}>Click</button>

// Reference
<button onClick={handleClick}>Click</button>

// Prevent default
const handleSubmit = (e) => {
  e.preventDefault();
  // handle form
};

```

#### 5. **Lists & Keys**

```javascript
const items = data.map((item) => <ListItem key={item.id} data={item} />);
// Keys must be unique and stable
```

#### 6. **Conditional Rendering**

```javascript
// Ternary
{
  isLoading ? <Spinner /> : <Content />;
}

// && operator
{
  error && <ErrorMessage error={error} />;
}

// Early return
if (isLoading) return <Spinner />;
```

#### 7. **Forms & Controlled Components**

```javascript
const [email, setEmail] = useState("");

<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />;
```

### Common Interview Problems

#### Problem Type 1: **Build a Counter**

- Increment/decrement
- Reset functionality
- Step value

#### Problem Type 2: **Fetch and Display Data**

```javascript
const [data, setData] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
  fetch("api/endpoint")
    .then((res) => res.json())
    .then((data) => {
      setData(data);
      setLoading(false);
    })
    .catch((err) => {
      setError(err.message);
      setLoading(false);
    });
}, []);
```

```tsx
import React from "react";

/* =========================
   Problem Type 3: Search/Filter List (with debounce)
========================= */

function useDebouncedValue<T>(value: T, delayMs: number) {
  const [debounced, setDebounced] = React.useState(value);

  React.useEffect(() => {
    const id = window.setTimeout(() => setDebounced(value), delayMs);
    return () => window.clearTimeout(id);
  }, [value, delayMs]);

  return debounced;
}

type Person = { id: string; name: string; city: string };

export function SearchFilterList() {
  const items: Person[] = React.useMemo(
    () => [
      { id: "1", name: "Ada Lovelace", city: "London" },
      { id: "2", name: "Grace Hopper", city: "New York" },
      { id: "3", name: "Alan Turing", city: "Manchester" },
      { id: "4", name: "Katherine Johnson", city: "White Sulphur Springs" },
      { id: "5", name: "Edsger Dijkstra", city: "Rotterdam" },
    ],
    []
  );

  const [query, setQuery] = React.useState("");
  const debouncedQuery = useDebouncedValue(query, 250);

  const filtered = React.useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (x) =>
        x.name.toLowerCase().includes(q) || x.city.toLowerCase().includes(q)
    );
  }, [items, debouncedQuery]);

  return (
    <div style={{ maxWidth: 520 }}>
      <h3>Search / Filter List</h3>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search name or city..."
        style={{ width: "100%", padding: 8 }}
      />
      <div style={{ marginTop: 12, opacity: 0.7 }}>
        Showing {filtered.length} of {items.length}
      </div>
      <ul>
        {filtered.map((p) => (
          <li key={p.id}>
            {p.name} · {p.city}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* =========================
   Problem Type 4: Todo List (toggle, delete, localStorage)
========================= */

type Todo = { id: string; text: string; done: boolean };

function loadTodos(): Todo[] {
  try {
    const raw = localStorage.getItem("todos_v1");
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}

function saveTodos(todos: Todo[]) {
  localStorage.setItem("todos_v1", JSON.stringify(todos));
}

export function TodoList() {
  const [text, setText] = React.useState("");
  const [todos, setTodos] = React.useState<Todo[]>(() => loadTodos());

  React.useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  const addTodo = React.useCallback(() => {
    const t = text.trim();
    if (!t) return;
    setTodos((prev) => [
      { id: crypto.randomUUID(), text: t, done: false },
      ...prev,
    ]);
    setText("");
  }, [text]);

  const toggleTodo = React.useCallback((id: string) => {
    setTodos((prev) =>
      prev.map((x) => (x.id === id ? { ...x, done: !x.done } : x))
    );
  }, []);

  const deleteTodo = React.useCallback((id: string) => {
    setTodos((prev) => prev.filter((x) => x.id !== id));
  }, []);

  return (
    <div style={{ maxWidth: 520, marginTop: 24 }}>
      <h3>Todo List</h3>
      <div style={{ display: "flex", gap: 8 }}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a todo..."
          style={{ flex: 1, padding: 8 }}
          onKeyDown={(e) => {
            if (e.key === "Enter") addTodo();
          }}
        />
        <button onClick={addTodo}>Add</button>
      </div>

      <ul style={{ marginTop: 12 }}>
        {todos.map((t) => (
          <TodoRow
            key={t.id}
            todo={t}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
        ))}
      </ul>
    </div>
  );
}

const TodoRow = React.memo(function TodoRow({
  todo,
  onToggle,
  onDelete,
}: {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <li
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "6px 0",
      }}
    >
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => onToggle(todo.id)}
      />
      <span
        style={{ textDecoration: todo.done ? "line-through" : "none", flex: 1 }}
      >
        {todo.text}
      </span>
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </li>
  );
});

/* =========================
   Problem Type 5: Form Validation
========================= */

type FormState = { email: string; password: string; confirm: string };
type FormErrors = Partial<Record<keyof FormState, string>>;

function validateForm(values: FormState): FormErrors {
  const errors: FormErrors = {};

  if (!values.email.trim()) errors.email = "Email is required.";
  else if (!/^\S+@\S+\.\S+$/.test(values.email))
    errors.email = "Email looks invalid.";

  if (!values.password) errors.password = "Password is required.";
  else if (values.password.length < 8)
    errors.password = "Use at least 8 characters.";

  if (!values.confirm) errors.confirm = "Please confirm your password.";
  else if (values.confirm !== values.password)
    errors.confirm = "Passwords do not match.";

  return errors;
}

export function ValidatedForm() {
  const [values, setValues] = React.useState<FormState>({
    email: "",
    password: "",
    confirm: "",
  });

  const [touched, setTouched] = React.useState<Record<string, boolean>>({});
  const [errors, setErrors] = React.useState<FormErrors>({});
  const [submitted, setSubmitted] = React.useState(false);

  const onChange =
    (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const next = { ...values, [key]: e.target.value };
      setValues(next);
      if (touched[key]) setErrors(validateForm(next));
    };

  const onBlur = (key: keyof FormState) => () => {
    setTouched((t) => ({ ...t, [key]: true }));
    setErrors(validateForm(values));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors = validateForm(values);
    setErrors(nextErrors);
    setTouched({ email: true, password: true, confirm: true });

    setSubmitted(Object.keys(nextErrors).length === 0);
  };

  return (
    <div style={{ maxWidth: 520, marginTop: 24 }}>
      <h3>Form Validation</h3>
      <form onSubmit={onSubmit} style={{ display: "grid", gap: 10 }}>
        <label>
          Email
          <input
            value={values.email}
            onChange={onChange("email")}
            onBlur={onBlur("email")}
            style={{ width: "100%", padding: 8 }}
          />
          {touched.email && errors.email && (
            <div style={{ color: "crimson", marginTop: 4 }}>{errors.email}</div>
          )}
        </label>

        <label>
          Password
          <input
            type="password"
            value={values.password}
            onChange={onChange("password")}
            onBlur={onBlur("password")}
            style={{ width: "100%", padding: 8 }}
          />
          {touched.password && errors.password && (
            <div style={{ color: "crimson", marginTop: 4 }}>
              {errors.password}
            </div>
          )}
        </label>

        <label>
          Confirm Password
          <input
            type="password"
            value={values.confirm}
            onChange={onChange("confirm")}
            onBlur={onBlur("confirm")}
            style={{ width: "100%", padding: 8 }}
          />
          {touched.confirm && errors.confirm && (
            <div style={{ color: "crimson", marginTop: 4 }}>
              {errors.confirm}
            </div>
          )}
        </label>

        <button type="submit">Submit</button>

        {submitted && (
          <div style={{ marginTop: 8 }}>Submitted: {values.email}</div>
        )}
      </form>
    </div>
  );
}

/* =========================
   Performance Optimization patterns
========================= */

// React.memo: see TodoRow above
// useMemo: see filtered in SearchFilterList
// useCallback: see handlers in TodoList

// Code splitting: React.lazy + Suspense
export const LazyHeavyWidget = React.lazy(async () => {
  return {
    default: function HeavyWidget() {
      return <div>Loaded lazily.</div>;
    },
  };
});

export function CodeSplitExample() {
  const [show, setShow] = React.useState(false);

  return (
    <div style={{ marginTop: 24 }}>
      <h3>Code splitting</h3>
      <button onClick={() => setShow((s) => !s)}>
        {show ? "Hide" : "Show"} widget
      </button>

      {show ? (
        <React.Suspense fallback={<div>Loading…</div>}>
          <LazyHeavyWidget />
        </React.Suspense>
      ) : null}
    </div>
  );
}
```

### Performance Optimization

- **Avoid unnecessary re-renders** (React.memo, useMemo, useCallback)
- **Code splitting** with React.lazy and Suspense
- **Virtual DOM** understanding
- **Key prop importance** in lists

### ES6+ JavaScript Essentials

#### Destructuring

```javascript
const { name, age } = user;
const [first, second, ...rest] = array;
```

#### Spread & Rest

```javascript
const newArray = [...oldArray, newItem];
const combined = { ...obj1, ...obj2 };
```

#### Arrow Functions

```javascript
const add = (a, b) => a + b;
const Component = () => <div>Hello</div>;
```

#### Template Literals

```javascript
const message = `Hello, ${name}!`;
```

#### Array Methods

```javascript
// map, filter, reduce, find, some, every
const doubled = numbers.map((n) => n * 2);
const evens = numbers.filter((n) => n % 2 === 0);
const sum = numbers.reduce((acc, n) => acc + n, 0);
```

#### Promises & Async/Await

```javascript
async function fetchData() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
```

---

## SESSION 2: PYTHON BACKEND (Brett & Engineer)

### Core Python Concepts

#### 1. **Data Structures**

**Lists**

```python
# Creation
numbers = [1, 2, 3, 4, 5]
# Methods
numbers.append(6)
numbers.extend([7, 8])
numbers.pop()
numbers.remove(3)
# Slicing
first_three = numbers[:3]
last_two = numbers[-2:]
# List comprehension
squares = [x**2 for x in range(10)]
evens = [x for x in numbers if x % 2 == 0]
```

**Dictionaries**

```python
# Creation
user = {'name': 'Alice', 'age': 30}
# Access
name = user.get('name', 'default')
# Methods
user.keys()
user.values()
user.items()
# Dict comprehension
squared = {x: x**2 for x in range(5)}
```

**Sets**

```python
unique = {1, 2, 3, 3, 4}  # {1, 2, 3, 4}
# Operations
a.union(b)
a.intersection(b)
a.difference(b)
```

**Tuples**

```python
coords = (10, 20)
# Immutable, unpacking
x, y = coords
```

#### 2. **Functions**

**Basic**

```python
def greet(name, greeting="Hello"):
    return f"{greeting}, {name}!"
```

**Args and Kwargs**

```python
def func(*args, **kwargs):
    # args is tuple of positional args
    # kwargs is dict of keyword args
    pass
```

**Lambda**

```python
square = lambda x: x**2
sorted_data = sorted(data, key=lambda x: x['age'])
```

**Decorators** (Important!)

```python
def timer(func):
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        end = time.time()
        print(f"Time: {end - start}")
        return result
    return wrapper

@timer
def slow_function():
    time.sleep(1)
```

#### 3. **Classes & OOP**

```python
class User:
    def __init__(self, name, email):
        self.name = name
        self.email = email
        self._password = None  # "private"

    def __str__(self):
        return f"User({self.name})"

    @property
    def password(self):
        return self._password

    @password.setter
    def password(self, value):
        self._password = hash(value)

    @classmethod
    def from_dict(cls, data):
        return cls(data['name'], data['email'])

    @staticmethod
    def is_valid_email(email):
        return '@' in email
```

**Inheritance**

```python
class Admin(User):
    def __init__(self, name, email, permissions):
        super().__init__(name, email)
        self.permissions = permissions
```

#### 4. **Error Handling**

```python
try:
    result = risky_operation()
except ValueError as e:
    print(f"Value error: {e}")
except Exception as e:
    print(f"Unexpected error: {e}")
else:
    print("Success!")
finally:
    cleanup()
```

**Custom Exceptions**

```python
class ValidationError(Exception):
    pass

raise ValidationError("Invalid input")
```

#### 5. **File Operations**

```python
# Reading
with open('file.txt', 'r') as f:
    content = f.read()
    # or line by line
    for line in f:
        process(line)

# Writing
with open('file.txt', 'w') as f:
    f.write("Hello, World!\n")

# JSON
import json
with open('data.json', 'r') as f:
    data = json.load(f)
```

#### 6. **Common Algorithms**

**Sorting**

```python
# Built-in
sorted_list = sorted(items)
items.sort()  # in-place

# Custom key
sorted_by_age = sorted(users, key=lambda u: u.age)
```

**Searching**

```python
# Linear search
def find(items, target):
    for i, item in enumerate(items):
        if item == target:
            return i
    return -1

# Binary search (sorted array)
def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1
```

**Common Patterns**

```python
# Two pointers
def two_sum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []

# Sliding window
def max_sum_subarray(arr, k):
    window_sum = sum(arr[:k])
    max_sum = window_sum
    for i in range(k, len(arr)):
        window_sum += arr[i] - arr[i-k]
        max_sum = max(max_sum, window_sum)
    return max_sum
```

### Backend-Specific Topics

#### 1. **REST API Design**

**HTTP Methods**

- `GET` - Retrieve data (idempotent)
- `POST` - Create new resource
- `PUT` - Update/replace resource (idempotent)
- `PATCH` - Partial update
- `DELETE` - Remove resource (idempotent)

**Status Codes**

- `200` OK
- `201` Created
- `400` Bad Request
- `401` Unauthorized
- `403` Forbidden
- `404` Not Found
- `500` Internal Server Error

**Example Flask Route**

```python
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/api/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([u.to_dict() for u in users])

@app.route('/api/users/<int:id>', methods=['GET'])
def get_user(id):
    user = User.query.get_or_404(id)
    return jsonify(user.to_dict())

@app.route('/api/users', methods=['POST'])
def create_user():
    data = request.get_json()
    user = User(**data)
    db.session.add(user)
    db.session.commit()
    return jsonify(user.to_dict()), 201
```

#### 2. **Database Queries (SQL)**

```python
# Using SQLAlchemy or raw SQL knowledge

# SELECT
SELECT * FROM users WHERE age > 18;

# JOIN
SELECT users.name, orders.total
FROM users
JOIN orders ON users.id = orders.user_id;

# GROUP BY
SELECT city, COUNT(*)
FROM users
GROUP BY city;

# Filtering
WHERE age > 18 AND city = 'NYC'
WHERE name LIKE 'A%'
WHERE id IN (1, 2, 3)
```

**Python DB interaction**

```python
import sqlite3

conn = sqlite3.connect('database.db')
cursor = conn.cursor()

# Query
cursor.execute('SELECT * FROM users WHERE age > ?', (18,))
results = cursor.fetchall()

# Insert
cursor.execute('INSERT INTO users (name, age) VALUES (?, ?)',
               ('Alice', 30))
conn.commit()
```

#### 3. **Authentication & Security**

```python
# Password hashing
from werkzeug.security import generate_password_hash, check_password_hash

hashed = generate_password_hash('password123')
is_valid = check_password_hash(hashed, 'password123')

# JWT tokens (basic concept)
import jwt

token = jwt.encode({'user_id': 123}, 'secret', algorithm='HS256')
payload = jwt.decode(token, 'secret', algorithms=['HS256'])
```

#### 4. **Data Validation**

```python
def validate_user(data):
    errors = []

    if not data.get('email') or '@' not in data['email']:
        errors.append('Invalid email')

    if not data.get('age') or data['age'] < 18:
        errors.append('Must be 18+')

    return errors

# Or use libraries like Pydantic
from pydantic import BaseModel, EmailStr, validator

class UserCreate(BaseModel):
    email: EmailStr
    age: int

    @validator('age')
    def age_must_be_adult(cls, v):
        if v < 18:
            raise ValueError('must be 18+')
        return v
```

#### 5. **Common Interview Problems**

**Problem: Rate Limiter**

```python
from time import time
from collections import defaultdict

class RateLimiter:
    def __init__(self, max_requests, window):
        self.max_requests = max_requests
        self.window = window
        self.requests = defaultdict(list)

    def allow_request(self, user_id):
        now = time()
        # Remove old requests
        self.requests[user_id] = [
            req for req in self.requests[user_id]
            if now - req < self.window
        ]

        if len(self.requests[user_id]) < self.max_requests:
            self.requests[user_id].append(now)
            return True
        return False
```

**Problem: Cache with Expiration**

```python
class Cache:
    def __init__(self):
        self.data = {}
        self.expiry = {}

    def set(self, key, value, ttl):
        self.data[key] = value
        self.expiry[key] = time() + ttl

    def get(self, key):
        if key not in self.data:
            return None
        if time() > self.expiry[key]:
            del self.data[key]
            del self.expiry[key]
            return None
        return self.data[key]
```

**Problem: Paginate Results**

```python
def paginate(items, page, per_page):
    start = (page - 1) * per_page
    end = start + per_page
    return items[start:end]

# In API
@app.route('/api/items')
def get_items():
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)

    items = Item.query.all()
    paginated = paginate(items, page, per_page)

    return jsonify({
        'items': [i.to_dict() for i in paginated],
        'page': page,
        'per_page': per_page,
        'total': len(items)
    })
```

---

## SESSION 3: CTO CONVERSATION (Sam)

### Preparation Topics

#### 1. **Your Projects Deep Dive**

For each major project on your resume:

- What problem were you solving?
- What technologies did you choose and why?
- What was the architecture?
- What challenges did you face?
- What would you do differently now?
- What metrics/results did you achieve?

#### 2. **Technical Decision-Making**

Be ready to discuss:

- **Trade-offs** (performance vs readability, speed vs quality, etc.)
- **Scalability** considerations
- **When to use** different patterns/architectures
- **Technical debt** decisions

Example questions:

- "When would you use a REST API vs GraphQL?"
- "How do you decide between SQL and NoSQL?"
- "Explain your thought process for choosing React over other frameworks"

#### 3. **System Design Basics**

- **Load balancing**
- **Caching strategies**
- **Database indexing**
- **Microservices vs Monolith**
- **API versioning**

#### 4. **Code Quality & Best Practices**

- **Testing** (unit, integration, e2e)
- **Code reviews**
- **CI/CD**
- **Documentation**
- **Git workflow** (branching strategies)

#### 5. **Collaboration & Process**

- How do you handle disagreements with other engineers?
- How do you approach learning new technologies?
- How do you prioritize tasks?
- Experience with Agile/Scrum?

### Smart Questions to Ask Sam

**About Technology:**

- What's your current tech stack and why did you choose it?
- What are the biggest technical challenges facing the team right now?
- How do you balance technical debt with new features?

**About Team:**

- What does the engineering team structure look like?
- How do you approach code reviews and knowledge sharing?
- What does professional development look like here?

**About Product:**

- What's the roadmap for the next 6-12 months?
- How does engineering collaborate with product/design?
- What metrics do you use to measure success?

**About Culture:**

- What does a typical day/week look like?
- How do you handle on-call and production issues?
- What's the deployment process like?

---

## Practice Strategy (Before Interview Day)

### 3 Days Before

- [ ] Review this entire guide
- [ ] Build a small React app (todo list or similar)
- [ ] Solve 5 Python algorithm problems on LeetCode
- [ ] Practice explaining your past projects out loud

### 2 Days Before

- [ ] Do a mock coding session with a friend
- [ ] Review your resume projects in detail
- [ ] Practice whiteboarding a simple problem
- [ ] Set up and test your interview environment

### 1 Day Before

- [ ] Quick review of key concepts (don't cram)
- [ ] Prepare questions for Sam
- [ ] Get good sleep
- [ ] Prepare workspace and backup plan (phone hotspot, etc.)

### Interview Day

- [ ] Test setup 30 min early (camera, mic, internet)
- [ ] Have water ready
- [ ] Keep this guide open for break reference
- [ ] Breathe and remember: they want you to succeed!

---

## Quick Reference During Breaks

### React Checklist

- ✓ Think aloud while coding
- ✓ Ask clarifying questions first
- ✓ Start with simple solution, then optimize
- ✓ Handle edge cases (empty arrays, null values)
- ✓ Use meaningful variable names

### Python Checklist

- ✓ Discuss time/space complexity
- ✓ Test with example inputs
- ✓ Consider error handling
- ✓ Write clean, readable code
- ✓ Explain your approach before coding

### General Tips

- ✓ It's okay to say "I don't know, but here's how I'd find out"
- ✓ If stuck, talk through your thinking
- ✓ Ask for hints if needed
- ✓ Be enthusiastic and engaged
- ✓ Show you're coachable

---

## Good Luck! 🚀

Remember: Interviews are conversations, not interrogations. They're evaluating fit both ways. Be yourself, show your curiosity, and demonstrate how you think through problems.
